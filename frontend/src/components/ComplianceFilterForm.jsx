import React from "react";

const ComplianceFilterForm = ({ onClose }) => {
  const options = {
    "Main Company": ["Company A", "Company B", "Company C"],
    "Select Unit": ["Unit A", "Unit B", "Unit C"],
    "Unit": ["Type 1", "Type 2", "Type 3"],
    "State": ["State X", "State Y", "State Z"],
    "Select Location": ["Location 1", "Location 2", "Location 3"],
    "Vendor Category": ["Category 1", "Category 2", "Category 3"],
    "Vendor": ["Vendor X", "Vendor Y", "Vendor Z"],
    "Display Score Option": ["Option 1", "Option 2", "Option 3"],
    "Seal submitted audit": ["Yes", "No"],
    "Business vertical": ["Vertical A", "Vertical B", "Vertical C"]
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white rounded shadow-md">
      <div className="grid grid-cols-4 gap-4">
        {["Main Company", "Select Unit", "Unit", "State", "Select Location",
          "Audit Start Date", "Audit End Date", "Audit Month", "Vendor Category",
          "Vendor", "Compliance Name", "Display Score Option", "Seal submitted audit",
          "Business vertical"
        ].map((label, index) => (
          <div key={index} className="flex flex-col">
            <label className="font-semibold text-sm mb-1">{label}</label>
            {label.includes('Date') || label === 'Audit Month' || label === 'Compliance Name' ? (
              <input type={label === 'Audit Month' ? 'month' : (label.includes('Date') ? 'date' : 'text')} placeholder={label} className="border p-2 rounded" />
            ) : (
              <select className="border p-2 rounded">
                <option>{`Select ${label}`}</option>
                {options[label]?.map((option, i) => (
                  <option key={i} value={option}>{option}</option>
                ))}
              </select>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={onClose}>Cancel</button>
        <button className="bg-green-500 text-white px-4 py-2 rounded">Filter</button>
      </div>

      <div className="mt-4 text-center text-gray-500">There are no records to display</div>
    </div>
  );
};

export default ComplianceFilterForm;
