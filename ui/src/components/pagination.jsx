import { Pagination } from 'antd';
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
    <Pagination
      defaultCurrent={1}
      total={totalPages}
      simple
      current={currentPage}
      onChange={handlePageChange}
      showSizeChanger={false}
      pageSize={itemsPerPage}
    />
  );
};

export default PaginationComponent;