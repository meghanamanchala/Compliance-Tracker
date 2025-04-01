import React, { useState, useEffect } from "react";
import ComplianceForm from "./ComplianceForm";
import ComplianceFilterForm from "./ComplianceFilterForm";

const ComplianceTracker = () => {
    const [activeForm, setActiveForm] = useState(null);
    const [complianceRecords, setComplianceRecords] = useState([]);

    // Fetch compliance records from backend
    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const response = await fetch("https://compliance-tracker-vw7x.onrender.com/api/compliances");
                const data = await response.json();
    
                if (Array.isArray(data)) {
                    setComplianceRecords(data); // Ensure setting only once
                } else {
                    console.error("API response is not an array:", data);
                    setComplianceRecords([]);
                }
            } catch (error) {
                console.error("Error fetching compliance records:", error);
            }
        };
        
        fetchRecords();
    }, []); // Empty dependency array ensures it runs only once
    

    const handleSave = async (formData) => {
        try {
            const response = await fetch("https://compliance-tracker-vw7x.onrender.com/api/compliances", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
    
            if (response.ok) {
                const newRecord = await response.json();
                if (newRecord && newRecord.data) {
                    setComplianceRecords(prevRecords => [...prevRecords, newRecord.data]);
                }
                setActiveForm(null);
            } else {
                alert("Error saving compliance record");
            }
        } catch (error) {
            console.error("Error saving compliance:", error);
        }
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
            record ? ( // Check if record is defined
                <div key={index} className="p-4 border rounded-md shadow mb-2">
                    <h3 className="font-bold">{record.complianceName || "Unknown Name"}</h3>
                    <p>Start Date: {record.startDate || "N/A"}</p>
                    <p>End Date: {record.endDate || "N/A"}</p>
                    <p>Target Days: {record.targetDays || "N/A"}</p>
                    <p>Categories: {Array.isArray(record.categories) ? record.categories.join(", ") : "N/A"}</p>
                    <p>Description: {record.description || "No description provided"}</p>
                </div>
            ) : (
                <div key={index} className="p-4 border rounded-md shadow mb-2 text-red-500">
                    Invalid record
                </div>
            )
        ))}
    </div>
)}

        </div>
    );
};

export default ComplianceTracker;