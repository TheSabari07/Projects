import React from 'react';


const FilterBar = () => {
  return (
    <div className="filter-bar">
      <input type="text" placeholder="Search by title or content..." />
      <select>
        <option value="">All Tags</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
      </select>
    </div>
  );
};

export default FilterBar;
