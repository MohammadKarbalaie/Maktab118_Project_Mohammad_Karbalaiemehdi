import React from 'react';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages }) => {
  return (
    <div className="pagination flex justify-center items-center px-4 py-6">
      {currentPage > 1 && (
        <a href={`?page=${currentPage - 1}`} className="pagination-button px-6 py-2 bg-gray-800 text-white rounded-xl">قبلی</a>
      )}
      <span className='flex items-center justify-center px-4'>صفحه {currentPage} از {totalPages}</span>
      {currentPage < totalPages && (
        <a href={`?page=${currentPage + 1}`} className="pagination-button px-6 py-2 bg-gray-800 text-white rounded-xl">بعدی</a>
      )}
    </div>
  );
};

export default Pagination;