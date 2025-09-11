import { Category } from "../models/model";

interface Props {
  categories: Category[];
  selectedCategory: number | null;
  onChange: (categoryId: number | null) => void;
}

export default function ExpenseFilter({ categories, selectedCategory, onChange }: Props) {
  return (
    <div className="mb-4">
      <select
        className="border px-2 py-1 rounded"
        value={selectedCategory || ""}
        onChange={(e) => onChange(e.target.value ? Number(e.target.value) : null)}
      >
        <option value="">Toutes les catégories</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
    </div>
  );
}
