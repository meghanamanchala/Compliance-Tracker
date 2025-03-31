import React, { useState, useEffect } from 'react';

const CategoryManagement = () => {
  const [categories, setCategories] = useState(() => {
    const savedCategories = localStorage.getItem('categories');
    return savedCategories ? JSON.parse(savedCategories) : [];
  });
  const [tasks, setTasks] = useState([]);
  const [isTaskModalOpen, setTaskModalOpen] = useState(false);
  const [isSubCategoryModalOpen, setSubCategoryModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  const addCategory = () => {
    const newCategory = prompt('Enter category name:');
    if (newCategory) {
      setCategories([...categories, { name: newCategory, status: 'active' }]);
    }
  };

  const openTaskModal = (category) => {
    setSelectedCategory(category);
    setTaskModalOpen(true);
  };

  const openSubCategoryModal = (category) => {
    setSelectedCategory(category);
    setSubCategoryModalOpen(true);
  };

  const closeModals = () => {
    setTaskModalOpen(false);
    setSubCategoryModalOpen(false);
  };

  const handleAddTask = () => {
    setTasks([...tasks, { category: selectedCategory, question: '', weightage: '', mandatory: false, file: null }]);
  };

  const handleChange = (index, field, value) => {
    const updatedTasks = [...tasks];
    updatedTasks[index][field] = value;
    setTasks(updatedTasks);
  };

  const handleFileChange = (index, file) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].file = file;
    setTasks(updatedTasks);
  };

  return (
    <section className="mx-2">
      <div className="w-full flex flex-col gap-2 overflow-hidden mb-5">
        <div className="flex justify-end">
          <button className="bg-green-400 p-2 rounded-md text-white flex items-center gap-2" onClick={addCategory}>
            ➕ Add Category
          </button>
        </div>
      </div>
      {categories.map((category, index) => (
        <div key={index} className="pl-2 border-gray-300">
          <div className="grid grid-cols-2 items-center space-x-2 border-b p-2">
            <div className="flex items-center">
              <span className={`text-sm ${category.status === 'active' ? 'text-green-600' : 'text-red-400'}`}>⬤</span>
              <span className="font-medium mx-1">{category.name}</span>
              <span className="text-gray-400 text-xs">(compliance Category)</span>
            </div>
            <div className="flex justify-end gap-2">
              <button className="text-green-600 border p-1 rounded-md flex items-center gap-1" onClick={() => openTaskModal(category.name)}>➕ Add Task</button>
              <button className="text-green-600 border p-1 rounded-md flex items-center gap-1" onClick={() => openSubCategoryModal(category.name)}>➕ Add Sub Category</button>
            </div>
          </div>
        </div>
      ))}

      
      {/* Task Modal */}
      {isTaskModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-lg font-bold mb-4">Tasks for "{selectedCategory}"</h2>
            {tasks.filter(task => task.category === selectedCategory).map((task, index) => (
              <div key={index} className="mb-4 border-b pb-4">
                <input type="text" placeholder="Enter question" className="border p-2 rounded w-full mb-2" value={task.question} onChange={(e) => handleChange(index, 'question', e.target.value)} />
                <input type="number" placeholder="%" className="border p-2 rounded w-full mb-2" value={task.weightage} onChange={(e) => handleChange(index, 'weightage', e.target.value)} />
                <label className="flex items-center mb-2">
                  <input type="checkbox" checked={task.mandatory} onChange={(e) => handleChange(index, 'mandatory', e.target.checked)} />
                  <span className="ml-2">Mandatory</span>
                </label>
                <input type="file" className="border p-2 w-full" onChange={(e) => handleFileChange(index, e.target.files[0])} />
              </div>
            ))}
            <button onClick={handleAddTask} className="bg-green-500 text-white p-2 rounded mb-4">➕ Add Task</button>
            <div className="flex justify-end gap-2">
              <button onClick={closeModals} className="bg-red-500 text-white p-2 rounded">Cancel</button>
              <button onClick={closeModals} className="bg-green-500 text-white p-2 rounded">Submit</button>
            </div>
          </div>
        </div>
      )}

      {/* SubCategory Modal */}
      {isSubCategoryModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-md w-[500px]">
            <h2 className="text-xl font-bold flex items-center gap-2">⨀ Add Sub category</h2>
            <div className="mt-4">
              <label className="block font-medium">Name <span className="text-red-500">*</span></label>
              <input type="text" placeholder="Enter name" className="w-full p-2 border rounded my-2" />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <label className="block font-medium">Critical</label>
                <select className="w-full p-2 border rounded">
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
              <div>
                <label className="block font-medium">Risk</label>
                <select className="w-full p-2 border rounded">
                  <option>Select Risk Level</option>
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>
            </div>
            <div className="mt-2">
              <label className="block font-medium">Nature</label>
              <select className="w-full p-2 border rounded">
                <option>Select Nature</option>
                <option>Register</option>
                <option>Remittance</option>
                <option>Rule</option>
                <option>Returns</option>
              </select>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button className="text-white bg-red-500 p-2 rounded flex items-center gap-1" onClick={closeModals}>❌ Cancel</button>
              <button className="text-white bg-green-500 p-2 rounded flex items-center gap-1" onClick={closeModals}>✅ Submit</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CategoryManagement;
