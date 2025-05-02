import React, { useEffect, useState } from "react";
import axios from "axios";
import { Truck, Car, Bike, Check, Save, Trash2, Edit } from "lucide-react";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

const VEHICLE_TYPES = [
  {
    value: "Bike",
    icon: Bike,
    title: "Bike",
    desc: "Perfect for small packages and quick local deliveries.",
  },
  {
    value: "Car",
    icon: Car,
    title: "Car",
    desc: "Suitable for small to medium packages within city limits.",
  },
  {
    value: "Truck/Large Vehicles",
    icon: Truck,
    title: "Truck/Large Vehicles",
    desc: "Ideal for large packages and long-distance deliveries.",
  },
];

const initialForm = {
  type: "Car",
  make: "",
  model: "",
  year: "",
  licensePlate: "",
};

const VehicleType = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Fetch vehicles on mount
  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/vehicles", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVehicles(res.data);
      setLoading(false);
    };
    fetchVehicles();
  }, []);

  // Handle vehicle type card select
  const handleVehicleSelect = (type) => {
    setForm((prev) => ({ ...prev, type }));
  };

  // Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFormSubmitted(false);
  };

  // Add or update vehicle
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      if (editingVehicle) {
        await axios.put(
          `http://localhost:5000/api/vehicles/${editingVehicle._id}`,
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          "http://localhost:5000/api/vehicles",
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      // Refetch vehicles
      const res = await axios.get("http://localhost:5000/api/vehicles", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVehicles(res.data);
      setForm(initialForm);
      setEditingVehicle(null);
      setFormSubmitted(true);
    } catch (err) {
      alert("Failed to save vehicle details");
    }
  };

  // Delete vehicle
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    await axios.delete(
      `http://localhost:5000/api/vehicles/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setVehicles(vehicles.filter((v) => v._id !== id));
    if (editingVehicle && editingVehicle._id === id) {
      setEditingVehicle(null);
      setForm(initialForm);
    }
  };

  // Edit vehicle
  const handleEdit = (vehicle) => {
    setEditingVehicle(vehicle);
    setForm({
      type: vehicle.type,
      make: vehicle.make,
      model: vehicle.model,
      year: vehicle.year,
      licensePlate: vehicle.licensePlate,
    });
    setFormSubmitted(false);
  };

  // Cancel edit
  const handleCancel = () => {
    setEditingVehicle(null);
    setForm(initialForm);
    setFormSubmitted(false);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-blue-700 mb-6 flex items-center">
        <Truck size={24} className="mr-2 text-blue-500" /> My Vehicles
      </h2>
      {/* Vehicle List */}
      <div className="mb-8">
        {vehicles.length === 0 ? (
          <div className="text-gray-500">No vehicles added yet.</div>
        ) : (
          <ul className="space-y-4">
            {vehicles.map((v) => (
              <li key={v._id} className="flex items-center justify-between border p-4 rounded-lg bg-gray-50">
                <div>
                  <span className="font-semibold">{v.type}</span> - {v.make} {v.model} ({v.year}) | Plate: {v.licensePlate}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(v)} className="text-blue-600" title="Edit">
                    <Edit size={18} />
                  </button>
                  <button onClick={() => handleDelete(v._id)} className="text-red-600" title="Delete">
                    <Trash2 size={18} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Add/Edit Form */}
      <form onSubmit={handleSubmit} className="border border-gray-200 rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
          <div className="bg-blue-500 text-white p-2 rounded-full mr-2">
            {form.type === "Car" ? <Car size={18} /> : form.type === "Truck/Large Vehicles" ? <Truck size={18} /> : <Bike size={18} />}
          </div>
          {editingVehicle ? "Edit Vehicle" : "Add Vehicle"}
        </h3>
        {/* Vehicle Type Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {VEHICLE_TYPES.map((v) => {
            const Icon = v.icon;
            const selected = form.type === v.value;
            return (
              <div
                key={v.value}
                className={`border-2 ${selected ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"} rounded-xl p-4 flex flex-col items-center transition-all duration-300 cursor-pointer shadow-sm hover:shadow`}
                onClick={() => handleVehicleSelect(v.value)}
                tabIndex={0}
                role="button"
                aria-pressed={selected}
                onKeyPress={(e) => { if (e.key === "Enter") handleVehicleSelect(v.value); }}
              >
                <div className={`${selected ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"} p-3 rounded-full mb-2 transition-colors duration-300`}>
                  <Icon size={28} />
                </div>
                <h4 className="text-base font-medium text-gray-800 mb-1">{v.title}</h4>
                <p className="text-xs text-gray-600 text-center mb-2">{v.desc}</p>
                {selected ? (
                  <div className="bg-blue-500 text-white px-2 py-0.5 rounded-full flex items-center text-xs">
                    <Check size={14} className="mr-1" /> Selected
                  </div>
                ) : (
                  <span className="text-blue-600 border border-blue-600 px-2 py-0.5 rounded-full text-xs">Select</span>
                )}
              </div>
            );
          })}
        </div>
        {/* Vehicle Details Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Make <span className="text-red-500">*</span></label>
            <input
              name="make"
              value={form.make}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="e.g., Toyota"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Model <span className="text-red-500">*</span></label>
            <input
              name="model"
              value={form.model}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="e.g., Corolla"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Year <span className="text-red-500">*</span></label>
            <input
              name="year"
              type="number"
              value={form.year}
              onChange={handleChange}
              required
              min="1950"
              max="2030"
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="e.g., 2022"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">License Plate <span className="text-red-500">*</span></label>
            <input
              name="licensePlate"
              value={form.licensePlate}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="e.g., ABC-1234"
            />
          </div>
        </div>
        <div className="mt-6 flex items-center gap-4">
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center shadow-sm transition-colors duration-300">
            <Save size={18} className="mr-2" /> {editingVehicle ? "Update" : "Add"}
          </button>
          {editingVehicle && (
            <button type="button" onClick={handleCancel} className="text-gray-600 underline">
              Cancel
            </button>
          )}
          {formSubmitted && (
            <div className="text-green-600 bg-green-50 px-3 py-1 rounded-full flex items-center">
              <Check size={16} className="mr-1" /> Details Saved
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default VehicleType;