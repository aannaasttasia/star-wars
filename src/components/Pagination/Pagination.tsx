import React from "react";
import { useDispatch } from "react-redux";
import {
  decrement,
  increment,
  setPageNumber,
} from "../../features/characters/charactersSlice";

import './css/Pagination.scss'

interface PaginationProps {
  totalCount: number;
  currentPage: number;
}

let postsPerPage = 10;

const getPageNumbers= ({totalCount, currentPage}:PaginationProps) =>{ 
  const paginationNumbers: any[] = [];
  const totalPages = Math.ceil(totalCount / postsPerPage);

  if (currentPage > 1 && currentPage < totalPages) {
    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      if (i > 0 && i <= totalPages) {
        paginationNumbers.push(i);
      }
    }
  } else {
    if (currentPage === 1) {
      for (let i = currentPage; i <= currentPage + 2; i++) {
        paginationNumbers.push(i);
      }
    }
    if (currentPage === totalPages) {
      for (let i = currentPage -2 ; i <= currentPage; i++) {
        paginationNumbers.push(i);
      }
    }
  }
  return {paginationNumbers, totalPages}
}

const Pagination = ({ totalCount, currentPage }: PaginationProps) => {
  console.log(totalCount);
  const dispatch = useDispatch();

  const paginationNumbers: any[] = getPageNumbers({totalCount, currentPage}).paginationNumbers;
  const totalPages = getPageNumbers({totalCount, currentPage}).totalPages;

  return (
    <div className="pagination">
      <button
        onClick={() => dispatch(decrement())}
        disabled={currentPage === 1}
        className="button"
      >
        Previous
      </button>
      {paginationNumbers.map((pageNumber) => (
        <a
          key={pageNumber}
          onClick={() => dispatch(setPageNumber(pageNumber))}
          className={pageNumber === currentPage ? 'active' : ''}
        >
          {pageNumber}
        </a>
      ))}
      <button
        onClick={() => dispatch(increment())}
        disabled={currentPage === totalPages}
        className="button"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
