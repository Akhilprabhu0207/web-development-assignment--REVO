"use client";
import React, { useEffect, useState } from "react";

interface School {
  id: number;
  name: string;
  schoolEmail: string;
  Contact: string;
  address: string;
  city: string;
  state: string;
  imagePath: string;
}

const SearchPage = () => {
  const [schools, setSchools] = useState<School[]>([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState<School[]>([]);
  const [selected, setSelected] = useState<School | null>(null);

  useEffect(() => {
    const fetchSchools = async () => {
      const res = await fetch("/api/schools/list");
      const data = await res.json();
      setSchools(data.schools);
      setFiltered(data.schools);
    };
    fetchSchools();
  }, []);

  useEffect(() => {
    setFiltered(
      schools.filter((s) =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.city.toLowerCase().includes(search.toLowerCase()) ||
        s.state.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, schools]);

  return (
    <main className="flex flex-col items-center min-h-screen bg-gray-50 p-8">
      <input
        type="text"
        placeholder="Search by name, city, or state..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="border p-2 rounded w-full max-w-md mb-8"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">
        {filtered.map((school) => (
          <div
            key={school.id}
            className="bg-white rounded shadow p-4 flex flex-col items-center cursor-pointer hover:bg-blue-50 transition"
            onClick={() => setSelected(school)}
          >
            <img src={school.imagePath} alt={school.name} className="w-40 h-40 object-cover rounded mb-4" />
            <div className="text-lg font-semibold mb-2">{school.name}</div>
            <div className="text-gray-700 mb-1">{school.address}</div>
            <div className="text-gray-500">{school.city}, {school.state}</div>
          </div>
        ))}
      </div>

      {/* Modal Popup */}
      {selected && (
        <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl"
              onClick={() => setSelected(null)}
              aria-label="Close"
            >
              &times;
            </button>
            <img src={selected.imagePath} alt={selected.name} className="w-48 h-48 object-cover rounded mb-4 mx-auto" />
            <div className="text-2xl font-bold mb-2 text-center">{selected.name}</div>
            <div className="mb-1"><span className="font-semibold">Email:</span> {selected.schoolEmail}</div>
            <div className="mb-1"><span className="font-semibold">Contact:</span> {selected.Contact}</div>
            <div className="mb-1"><span className="font-semibold">Address:</span> {selected.address}</div>
            <div className="mb-1"><span className="font-semibold">City:</span> {selected.city}</div>
            <div className="mb-1"><span className="font-semibold">State:</span> {selected.state}</div>
          </div>
        </div>
      )}
    </main>
  );
};

export default SearchPage;
