import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const checkUserBudget = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
      select: {
        id: true,
        fullName: true,
        budget: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const expenses = await prisma.expense.findMany({
      where: { userId: parseInt(userId) },
      select: { amount: true },
    });

    const totalSpent = expenses.reduce(
      (sum, e) => sum + parseFloat(e.amount),
      0
    );

    const remaining =
      parseFloat(user.budget || 0) - parseFloat(totalSpent);

    const overBudget = remaining < 0;

    res.json({
      user: user.fullName,
      budget: user.budget,
      totalSpent,
      remaining: remaining < 0 ? 0 : remaining,
      overBudget,
      alert: overBudget
        ? " Warning: exceeded budget"
        : " Budget respected",
    });
  } catch (error) {
    res.status(500).json({ message: "Error server", error: error.message });
  }
};
