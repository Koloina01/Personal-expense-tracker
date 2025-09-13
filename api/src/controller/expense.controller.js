import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    const user = await prisma.user.create({
      data: {
        fullName: fullName || null,
        email,
        password, 
      },
    });
    res.status(201).json(user);
  } catch (error) {

    console.error("Prisma error", error);
    res.status(500).json({ error: "Failed to create user" });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name, description, userId } = req.body;
    if (!name || !userId) {
      return res.status(400).json({ error: "Name and userId are required" });
    }
    const category = await prisma.category.create({
      data: {
        name,
        description: description || null,
        userId,
      },
    });
    res.status(201).json(category);
  } catch (error) {
    console.error("Error creating category", error);
    res.status(500).json({ error: "Failed to create category" });
  }
};

export const createExpense = async (req, res) => {
  try {
    const {
      amount,
      date,
      categoryId,
      description,
      type,
      userId,
      receiptUploadId,
      startDate,
      endDate,
    } = req.body;

    if (!amount || !userId || !categoryId) {
      return res.status(400).json({ error: "amount, userId and categoryId are required" });
    }

    const expense = await prisma.expense.create({
      data: {
        amount: amount.toString(),
        date: date ? new Date(date) : null,
        categoryId,
        description: description || null,
        type: type || "ONE_TIME",
        userId,
        receiptUploadId: receiptUploadId || null,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
      },
    });

    res.status(201).json(expense);
  } catch (error) {
    console.error("Error creating expenses", error);
    res.status(500).json({ error: "Failed to create expense" });
  }
};

export const getAllExpenses = async (_req, res) => {
  try {
    const expenses = await prisma.expense.findMany({
        include: { user: { id: true, fullName: true, email: true },
            category: { id: true, name: true },
            receiptUpload: true,
        },
    });
    res.status(200).json(expenses);
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ error: "Failed to fetch expenses" });
  }
};

export const getExpenseById = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await prisma.expense.findUnique({
      where: { id: parseInt(id) },
      include: { user: { id: true, fullName: true, email: true },
        category: { id: true, name: true },
        receiptUpload: true,
      },
    });
    if (!expense) {
      return res.status(404).json({ error: "Expense not found" });
    }
    res.status(200).json(expense);
  } catch (error) {
    console.error("Error fetching expense:", error);
    res.status(500).json({ error: "Failed to fetch expense" });
  }
};



export const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      amount,
      date,
      categoryId,
      description,
      type,
      receiptUploadId,
      startDate,
      endDate,
    } = req.body;

     const updatedExpense = await prisma.expense.update({
      where: { id: parseInt(id) },
      data: {
        amount: amount !== undefined ? amount.toString() : undefined,
        date: date ? new Date(date) : undefined,
        categoryId: categoryId || undefined,
        description: description || undefined,
        type: type || undefined,
        receiptUploadId: receiptUploadId || undefined,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
      },
    });

    res.status(200).json(updatedExpense);
  } catch (error) {
    console.error("Error updating expense:", error);
    res.status(500).json({ error: "Failed to update expense" });
  }
};




export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.expense.delete({
      where: { id: parseInt(id) },
    });
    res.json( { message: "Expense deleted successfully"} );
  } catch (error) {
    console.error("Error deleting expense:", error);
    res.status(500).json({ error: "Failed to delete expense" });
  }
};