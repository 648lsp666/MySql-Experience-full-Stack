import React, { useState, useEffect } from 'react';

function PaginationComponent({ totalItems, itemsPerPage, onPageChange }){
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  useEffect(() => {
    onPageChange(currentPage);
  }, [currentPage, onPageChange]);

  return (
    <div>
      <button className = "formbtn" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
        <span>上一页</span>
      </button>
        <span style={{margin:"0 10px"}}>{currentPage} / {totalPages}</span>
      <button className = "formbtn" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
       <span>下一页</span>
      </button>
    </div>
  );
};

export default PaginationComponent;