import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://collegesugestion.onrender.com/api/colleges";

export default function Dashboard() {
  const [colleges, setColleges] = useState([]);
  const [form, setForm] = useState({
    name: "",
    slug: "",
    ownership: "Private",
    established: "",
    state: "",
    city: "",
    category: "",
    courses: [""],
    logo: "",
    overview: "",
    coursesAndFees: [{ name: "", duration: "", totalFees: "", seats: "", level: "" }],
    amenities: [""],
    cutoff: [{ courseName: "", cutoffValue: "" }],
    faculty: { total: "", studentRatio: "" },
  });

  const [editingId, setEditingId] = useState(null);

  const fetchColleges = async () => {
    const res = await axios.get(API_URL);
    setColleges(res.data);
  };

  useEffect(() => {
    fetchColleges();
  }, []);

  const generateSlug = (name) =>
    name.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");

  const handleChange = (field, value) => {
    if (field === "name") {
      setForm({ ...form, name: value, slug: generateSlug(value) });
    } else {
      setForm({ ...form, [field]: value });
    }
  };

  const handleArrayChange = (field, index, subField, value) => {
    const updatedArray = [...form[field]];
    if (subField) {
      updatedArray[index][subField] = value;
    } else {
      updatedArray[index] = value;
    }
    setForm({ ...form, [field]: updatedArray });
  };

  const addArrayItem = (field, newItem) => {
    setForm({ ...form, [field]: [...form[field], newItem] });
  };

  const removeArrayItem = (field, index) => {
    const updatedArray = form[field].filter((_, i) => i !== index);
    setForm({ ...form, [field]: updatedArray });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`${API_URL}/${editingId}`, form);
    } else {
      await axios.post(API_URL, form);
    }
    resetForm();
    fetchColleges();
  };

  const resetForm = () => {
    setForm({
      name: "",
      slug: "",
      ownership: "Private",
      established: "",
      state: "",
      city: "",
      category: "",
      courses: [""],
      logo: "",
      overview: "",
      coursesAndFees: [{ name: "", duration: "", totalFees: "", seats: "", level: "" }],
      amenities: [""],
      cutoff: [{ courseName: "", cutoffValue: "" }],
      faculty: { total: "", studentRatio: "" },
    });
    setEditingId(null);
  };

  const handleEdit = (college) => {
    setForm(college);
    setEditingId(college._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await axios.delete(`${API_URL}/${id}`);
      fetchColleges();
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">
        College Management
      </h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-2xl p-4 sm:p-6 mb-6 space-y-6"
      >
        {/* Basic Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <input type="text" placeholder="College Name" value={form.name} onChange={(e) => handleChange("name", e.target.value)} className="p-2 border rounded-lg w-full" required />
          <input type="text" placeholder="Slug" value={form.slug} readOnly className="p-2 border rounded-lg bg-gray-100 w-full" />
          <select value={form.ownership} onChange={(e) => handleChange("ownership", e.target.value)} className="p-2 border rounded-lg w-full">
            <option value="Private">Private</option>
            <option value="Government">Government</option>
          </select>
          <input type="text" placeholder="Established" value={form.established} onChange={(e) => handleChange("established", e.target.value)} className="p-2 border rounded-lg w-full" />
          <input type="text" placeholder="State" value={form.state} onChange={(e) => handleChange("state", e.target.value)} className="p-2 border rounded-lg w-full" />
          <input type="text" placeholder="City" value={form.city} onChange={(e) => handleChange("city", e.target.value)} className="p-2 border rounded-lg w-full" />
          <input type="text" placeholder="Category" value={form.category} onChange={(e) => handleChange("category", e.target.value)} className="p-2 border rounded-lg w-full" />
          <input type="text" placeholder="Logo URL" value={form.logo} onChange={(e) => handleChange("logo", e.target.value)} className="p-2 border rounded-lg w-full" />
        </div>

        <textarea placeholder="Overview" value={form.overview} onChange={(e) => handleChange("overview", e.target.value)} className="w-full p-2 border rounded-lg"></textarea>

        {/* Courses & Fees */}
        <div>
          <h3 className="font-semibold mb-2">Courses & Fees</h3>
          {form.coursesAndFees.map((c, i) => (
            <div key={i} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-2 mb-2">
              <input placeholder="Course Name" value={c.name} onChange={(e) => handleArrayChange("coursesAndFees", i, "name", e.target.value)} className="p-2 border rounded-lg w-full" />
              <input placeholder="Duration" value={c.duration} onChange={(e) => handleArrayChange("coursesAndFees", i, "duration", e.target.value)} className="p-2 border rounded-lg w-full" />
              <input placeholder="Total Fees" value={c.totalFees} onChange={(e) => handleArrayChange("coursesAndFees", i, "totalFees", e.target.value)} className="p-2 border rounded-lg w-full" />
              <input placeholder="Seats" value={c.seats} onChange={(e) => handleArrayChange("coursesAndFees", i, "seats", e.target.value)} className="p-2 border rounded-lg w-full" />
              <input placeholder="Level" value={c.level} onChange={(e) => handleArrayChange("coursesAndFees", i, "level", e.target.value)} className="p-2 border rounded-lg w-full" />
              <button type="button" onClick={() => removeArrayItem("coursesAndFees", i)} className="bg-red-500 text-white px-2 rounded">x</button>
            </div>
          ))}
          <button type="button" onClick={() => addArrayItem("coursesAndFees", { name: "", duration: "", totalFees: "", seats: "", level: "" })} className="bg-blue-500 text-white px-3 py-1 rounded">
            + Add Course
          </button>
        </div>

        {/* Amenities */}
        <div>
          <h3 className="font-semibold mb-2">Amenities</h3>
          {form.amenities.map((a, i) => (
            <div key={i} className="flex flex-col sm:flex-row gap-2 mb-2">
              <input placeholder="Amenity" value={a} onChange={(e) => handleArrayChange("amenities", i, null, e.target.value)} className="p-2 border rounded-lg flex-1" />
              <button type="button" onClick={() => removeArrayItem("amenities", i)} className="bg-red-500 text-white px-2 rounded">x</button>
            </div>
          ))}
          <button type="button" onClick={() => addArrayItem("amenities", "")} className="bg-blue-500 text-white px-3 py-1 rounded">
            + Add Amenity
          </button>
        </div>

        {/* Cutoff */}
        <div>
          <h3 className="font-semibold mb-2">Cutoffs</h3>
          {form.cutoff.map((c, i) => (
            <div key={i} className="flex flex-col sm:flex-row gap-2 mb-2">
              <input placeholder="Course Name" value={c.courseName} onChange={(e) => handleArrayChange("cutoff", i, "courseName", e.target.value)} className="p-2 border rounded-lg flex-1" />
              <input placeholder="Cutoff Value" value={c.cutoffValue} onChange={(e) => handleArrayChange("cutoff", i, "cutoffValue", e.target.value)} className="p-2 border rounded-lg flex-1" />
              <button type="button" onClick={() => removeArrayItem("cutoff", i)} className="bg-red-500 text-white px-2 rounded">x</button>
            </div>
          ))}
          <button type="button" onClick={() => addArrayItem("cutoff", { courseName: "", cutoffValue: "" })} className="bg-blue-500 text-white px-3 py-1 rounded">
            + Add Cutoff
          </button>
        </div>

        {/* Faculty */}
        <div>
          <h3 className="font-semibold mb-2">Faculty</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <input placeholder="Total Faculty" value={form.faculty.total} onChange={(e) => setForm({ ...form, faculty: { ...form.faculty, total: e.target.value } })} className="p-2 border rounded-lg w-full" />
            <input placeholder="Student Ratio" value={form.faculty.studentRatio} onChange={(e) => setForm({ ...form, faculty: { ...form.faculty, studentRatio: e.target.value } })} className="p-2 border rounded-lg w-full" />
          </div>
        </div>

        <button className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 w-full sm:w-auto">
          {editingId ? "Update College" : "Add College"}
        </button>
      </form>

      {/* TABLE */}
      <div className="bg-white shadow-md rounded-2xl overflow-x-auto">
        <table className="w-full border min-w-[600px]">
          <thead className="bg-gray-200 text-sm sm:text-base">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Slug</th>
              <th className="p-2 border">City</th>
              <th className="p-2 border">State</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {colleges.map((c) => (
              <tr key={c._id} className="text-sm sm:text-base">
                <td className="p-2 border">{c.name}</td>
                <td className="p-2 border">{c.slug}</td>
                <td className="p-2 border">{c.city}</td>
                <td className="p-2 border">{c.state}</td>
                <td className="p-2 border">
                  <button onClick={() => handleEdit(c)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(c._id)} className="bg-red-600 text-white px-2 py-1 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {colleges.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  No colleges available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
