"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Page = () => {
  const [form, setForm] = useState({ name: "", schoolEmail: "", Contact: "", address: "", city: "", state: "", image: null as File | null });
  const [preview, setPreview] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "image" && e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setForm({ ...form, image: file });
      setPreview(URL.createObjectURL(file));
    } else if (e.target.name === "Contact") {
      // Only allow numbers and max 10 digits
      let value = e.target.value.replace(/\D/g, "").slice(0, 10);
      setForm({ ...form, Contact: value });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(null);
    setError(null);
    if (!form.name || !form.address || !form.image) {
      setError("Please fill all required fields and select an image.");
      return;
    }
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("address", form.address);
    formData.append("schoolEmail", form.schoolEmail);
    formData.append("Contact", form.Contact);
    formData.append("city", form.city);
    formData.append("state", form.state);
    if (form.image) formData.append("image", form.image);
    try {
      const res = await fetch("/api/schools", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Failed to save school");
      setSuccess("School added successfully!");
  setForm({ name: "", schoolEmail: "", Contact: "", address: "", city: "", state: "", image: null });
      setPreview(null);
    } catch (err) {
      setError("Error saving school. Please try again.");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-4 text-center">Add School Details</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md mb-8 items-center" encType="multipart/form-data">
        <input
          type="text"
          name="name"
          placeholder="School Name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 rounded w-80"
          required
        />
        <input
          type="text"
          name="schoolEmail"
          placeholder="Email"
          value={form.schoolEmail}
          onChange={handleChange}
          className="border p-2 rounded w-80"
        />
        <input
          type="tel"
          name="Contact"
          placeholder="Contact"
          value={form.Contact}
          onChange={handleChange}
          className="border p-2 rounded w-80"
          maxLength={10}
          pattern="[0-9]{10}"
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          className="border p-2 rounded w-80"
          required
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          className="border p-2 rounded w-80"
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={form.state}
          onChange={handleChange}
          className="border p-2 rounded w-80"
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="border p-2 rounded w-80"
          required
        />
        {preview && (
          <img src={preview} alt="Preview" className="w-32 h-32 object-cover rounded mb-2 mx-auto" />
        )}
        {success && <div className="text-green-600">{success}</div>}
        {error && <div className="text-red-600">{error}</div>}
  <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 w-80">Add School</button>
      </form>
      {/* School list removed; data now saved to database */}
    </main>
  );
};

export default Page;
