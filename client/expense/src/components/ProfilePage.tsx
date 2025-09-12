import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const navigate = useNavigate();

  
  const user = {
    fullName: "Erickah Rakoto",
    email: "erickah@example.com",
    budget: 250000,
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4">Profil utilisateur</h1>

      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">
        <p><strong>Nom :</strong> {user.fullName}</p>
        <p><strong>Email :</strong> {user.email}</p>
        <p><strong>Budget :</strong> {user.budget} Ar</p>
      </div>

  
      <div className="mt-6 flex flex-col gap-4 w-full max-w-md">
        <button
          onClick={() => navigate("/expenses")}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow"
        >
          Expense Management
        </button>
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-green-500 text-white px-4 py-2 rounded-lg shadow"
        >
          Dashboard
        </button>
        <button
          onClick={() => navigate("/settings")}
          className="bg-gray-700 text-white px-4 py-2 rounded-lg shadow"
        >
          Paramètres
        </button>
      </div>
    </div>
  );
}
