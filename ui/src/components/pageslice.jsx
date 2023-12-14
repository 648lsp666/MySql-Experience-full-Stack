// PaginationComponent.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import SingleStudent from './singlestudent';

const PaginationComponent = () => {
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  const itemsPerPage = 10;
  const pagesVisited = pageNumber * itemsPerPage;

  useEffect(() => {
    fetchData();
  }, [pageNumber]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://your-backend-url/data?_page=${pageNumber + 1}&_limit=${itemsPerPage}`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const displayData = data.slice(pagesVisited, pagesVisited + itemsPerPage).map((item) => (
    <SingleStudent props={item} />
  ));

  const pageCount = Math.ceil(data.length / itemsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div>
        
      {displayData}
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </div>
  );
};

export default PaginationComponent;
