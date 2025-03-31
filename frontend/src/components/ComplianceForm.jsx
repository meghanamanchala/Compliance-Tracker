import React, { useState } from "react";

const ComplianceForm = ({ onClose, onSave, categories = ["Test", "Testing Compliance", "New", "Labour", "Test", "Aniket", "IT"] }) => {
    const [formData, setFormData] = useState({
        complianceName: "",
        startDate: "",
        endDate: "",
        targetDays: "", 
        frequency: "",
        vendor: "",
        auditor: "",
        priority: "",
        categories: categories.length > 0 ? [""] : [],
        description: "",
        documents: [],
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCategoryChange = (index, value) => {
        const updatedCategories = [...formData.categories];
        updatedCategories[index] = value;
        setFormData({ ...formData, categories: updatedCategories });
    };

    const addCategoryField = () => {
        setFormData({ ...formData, categories: [...formData.categories, ""] });
    };

    const handleFileUpload = (e) => {
        setFormData({ ...formData, documents: e.target.files });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("https://compliance-tracker-vw7x.onrender.com/api/compliances", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                alert("Compliance saved successfully!");
                onSave(formData); // Update frontend state
                onClose(); // Close form
            } else {
                alert("Error saving compliance");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    

    return (
        <div className="p-8 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-yellow-500 text-white p-4 rounded">Compliance Configuration</h2>
            <form onSubmit={handleSubmit}>
                <label className="block font-semibold">Compliance Name</label>
                <input type="text" name="complianceName" placeholder="Enter name" value={formData.complianceName} onChange={handleChange} className="border p-3 w-full rounded-md mb-4" />
                
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block font-semibold">Start Date</label>
                        <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="border p-3 w-full rounded-md" />
                    </div>
                    <div>
                        <label className="block font-semibold">End Date</label>
                        <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className="border p-3 w-full rounded-md" />
                    </div>
                </div>
                
                <label className="block font-semibold mt-4">Target Days (No. of days)</label>
                <input type="text" name="targetDays" value={formData.targetDays} onChange={handleChange} className="border p-3 w-full rounded-md" />
                
                <label className="block font-semibold mt-4">Compliance For</label>
                {formData.categories.map((category, index) => (
                    <div key={index} className="flex items-center gap-4 mt-2">
                        <select 
                            value={category} 
                            onChange={(e) => handleCategoryChange(index, e.target.value)} 
                            className="border p-3 flex-grow rounded-md"
                        >
                            <option value="">Select Category</option>
                            {categories.map((cat, i) => (
                                <option key={i} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addCategoryField}
                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Add More
                </button>
                
                <label className="block font-semibold mt-4">Description</label>
                <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="border p-3 w-full rounded-md" />
                
                <label className="block font-semibold mt-4">Upload Documents</label>
                <input type="file" multiple onChange={handleFileUpload} className="border p-3 w-full rounded-md" />
                
                <div className="flex justify-between mt-8">
                    <button type="button" className="bg-red-500 text-white px-6 py-3 rounded" onClick={onClose}>Cancel</button>
                    <button type="submit" className="bg-green-500 text-white px-6 py-3 rounded">Save Compliance</button>
                </div>
            </form>
        </div>
    );
};

export default ComplianceForm;
