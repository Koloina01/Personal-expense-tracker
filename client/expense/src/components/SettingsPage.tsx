import { useState } from "react";

export default function SettingsPage() {
  const [name, setName] = useState("Erickah Rakoto");
  const [email, setEmail] = useState("erickah@example.com");
  const [password, setPassword] = useState("");

  const handleSave = () => {
    alert(`Profil mis à jour : ${name}, ${email}`);
    // Ici tu fais appel à ton API pour sauvegarder les nouvelles infos
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-start">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Paramètres du compte</h1>

        <label className="block mb-2">Nom complet :</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
        />

        <label className="block mb-2">Email :</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
        />

        <label className="block mb-2">Nouveau mot de passe :</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
        />

        <button
          onClick={handleSave}
          className="bg-green-600 text-white px-4 py-2 rounded w-full"
        >
          Sauvegarder
        </button>
      </div>
    </div>
  );
}
