import { Expense } from "../models/model";

interface Props {
    expense: Expense;
    onEdit: (expense: Expense) => void;
    onDelete: (id: number) => void;
}

export default function ExpenseItem({ expense, onEdit, onDelete }: Props) {
    return (
        <li className="flex border-b p-2 items-center">
            <span className="w-1/6">{Number(expense.amount).toFixed(2)} €</span>
            <span className="w-1/6">{expense.categoryId}</span>
            <span className="w-1/6">{expense.date ? new Date(expense.date).toLocaleDateString() : "-"}</span>
            <span className="w-1/6">{expense.type}</span>
            <span className="w-2/6">{expense.description || "-"}</span>
            <span className="w-1/6 flex gap-2">
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
                    onClick={() => onEdit(expense)}
                >
                    Éditer
                </button>
                <button
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                    onClick={() => onDelete(expense.id)}
                >
                    Supprimer
                </button>
            </span>
        </li>
    );
}
