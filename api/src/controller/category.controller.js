import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getCategories = async (_req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error server", error: error.message });
  }
};

export const updateCategory = async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const name = req.body.name;
      const monthlyBudget = req.body.monthlyBudget;
  
      const dataToUpdate = {};
  
      if (name) {
        dataToUpdate.name = name;
      }
  
      if (monthlyBudget !== undefined) {
        dataToUpdate.monthlyBudget = parseFloat(monthlyBudget);
      }
  
      const category = await prisma.category.update({
        where: { id: id },
        data: dataToUpdate,
      });
  
      res.json({
        message: "Category updated",
        category: category,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error server",
        error: error.message,
      });
    }
  };

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const expenses = await prisma.expense.findMany({
      where: { categoryId: parseInt(id) },
    });

    if (expenses.length > 0) {
      return res.status(400).json({
        message: "Unable to delete category: it contains expenses."
      });
    }

    await prisma.category.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: "Category deleted succefully" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

export const getCategoryBudget = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await prisma.category.findUnique({
      where: { id: parseInt(id) },
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const expenses = await prisma.expense.findMany({
      where: { categoryId: parseInt(id) },
      select: { amount: true },
    });

    const totalSpent = expenses.reduce((sum, e) => sum + parseFloat(e.amount), 0);

    res.json({
      category: category.name,
      monthlyBudget: category.monthlyBudget,
      totalSpent,
      remaining: (parseFloat(category.monthlyBudget || 0) - totalSpent),
    });
  } catch (error) {
    res.status(500).json({ message: "Error server", error: error.message });
  }
};

export const setCategoryBudget = async (req, res) => {
  try {
    const { id } = req.params;
    const { monthlyBudget } = req.body;

    if (monthlyBudget === undefined || monthlyBudget < 0) {
      return res.status(400).json({ message: "Budget invalid" });
    }

    const category = await prisma.category.update({
      where: { id: parseInt(id) },
      data: { monthlyBudget: parseFloat(monthlyBudget) },
    });

    res.json({ message: "Budget updated", category });
  } catch (error) {
    res.status(500).json({ message: "Error server", error: error.message });
  }
};
