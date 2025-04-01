import React, { useState, useEffect } from "react";
import ComplianceForm from "./ComplianceForm";
import ComplianceFilterForm from "./ComplianceFilterForm";

const API_URL = "https://compliance-tracker-vw7x.onrender.com/api/compliances";

const ComplianceTracker = () => {
    const [activeForm, setActiveForm] = useState(null);
    const [complianceRecords, setComplianceRecords] = useState([]);

    useEffect(() => {
        fetch(API_URL)
            .then(res => res.json())
            .then(data => setComplianceRecords(data))
            .catch(err => console.error("Error fetching records:", err));
    }, []);

    const handleSave = async (formData) => {
        try {
            await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
    
            // ✅ Instead of manually adding, re-fetch updated records
            const res = await fetch(API_URL);
            const updatedRecords = await res.json();
            setComplianceRecords(updatedRecords);
        } catch (err) {
            console.error("Error saving record:", err);
        }
    
        setActiveForm(null);
    };
    
    return (
        <div className="p-6 max-w-7xl mx-auto bg-white rounded shadow-md">
            <div className="flex justify-end gap-2 mb-4">
                {activeForm !== "filter" && activeForm !== "add" && (
                    <button onClick={() => setActiveForm("filter")} className="bg-yellow-500 text-white px-4 py-2 rounded">
                        Filter
                    </button>
                )}
                {activeForm !== "add" && (
                    <button onClick={() => setActiveForm("add")} className="bg-green-500 text-white px-4 py-2 rounded">
                        Add
                    </button>
                )}
            </div>

            {activeForm === "add" && <ComplianceForm onClose={() => setActiveForm(null)} onSave={handleSave} />}
            {activeForm === "filter" && <ComplianceFilterForm onClose={() => setActiveForm(null)} />}

            {!activeForm && complianceRecords.length === 0 && (
                <div className="mt-4 text-center text-gray-500">There are no records to display</div>
            )}

            {!activeForm && complianceRecords.length > 0 && (
                <div className="mt-4">
                    {complianceRecords.map((record, index) => (
                        <div key={index} className="p-4 border rounded-md shadow mb-2">
                            <h3 className="font-bold">{record.complianceName}</h3>
                            <p>Start Date: {record.startDate}</p>
                            <p>End Date: {record.endDate}</p>
                            <p>Target Days: {record.targetDays}</p>
                            <p>Categories: {record.categories.join(", ")}</p>
                            <p>Description: {record.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ComplianceTracker;
