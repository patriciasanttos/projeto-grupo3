import { useState, useEffect } from "react";
import "./Pagination.scss";

const Pagination = ({ listItems, onPaginate }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const totalPages = Math.ceil(listItems.length / itemsPerPage);
  const isMultiplePages = totalPages > 5;

  const paginate = (items, currentPage, itemsPerPage) => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return items.slice(start, end);
  };

  useEffect(() => {
    onPaginate(paginate(listItems, currentPage, itemsPerPage));
  }, [currentPage]);

  useEffect(() => {
    onPaginate(paginate(listItems, currentPage, itemsPerPage));
  }, [listItems]);

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth <= 768) {
        setItemsPerPage(6);
      } else if (window.innerWidth <= 1024) {
        setItemsPerPage(8);
      } else {
        setItemsPerPage(9);
      }
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);

    return () => {
      window.removeEventListener("resize", updateItemsPerPage);
    };
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const getVisiblePages = () => {
    if (isMultiplePages) {
      const selectedPage = currentPage - 1;

      const isFirstPage = currentPage === 1;
      const isSecondPage = currentPage === 2;
      const isLastPage = currentPage === totalPages;
      const isPenultimatePage = currentPage === totalPages - 1;

      if (isFirstPage)
        return [
          selectedPage,
          selectedPage + 1,
          selectedPage + 2,
          selectedPage + 3,
          selectedPage + 4,
        ];

      if (isSecondPage)
        return [
          selectedPage - 1,
          selectedPage,
          selectedPage + 1,
          selectedPage + 2,
          selectedPage + 3,
        ];

      if (isPenultimatePage)
        return [
          selectedPage - 3,
          selectedPage - 2,
          selectedPage - 1,
          selectedPage,
          selectedPage + 1,
        ];

      if (isLastPage)
        return [
          selectedPage - 4,
          selectedPage - 3,
          selectedPage - 2,
          selectedPage - 1,
          selectedPage,
        ];

      return [
        selectedPage - 2,
        selectedPage - 1,
        selectedPage,
        selectedPage + 1,
        selectedPage + 2,
      ];
    } else {
      return Array.from(Array(totalPages).keys());
    }
  };

  return (
    <>
      {listItems.length > itemsPerPage ? (
        <div className="pagination">
          {isMultiplePages && (
            <button
              onClick={handleFirstPage}
              disabled={currentPage === 1}
              className="arrow-button"
            >
              {`<<`}
            </button>
          )}
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="arrow-button"
          >
            {`<`}
          </button>
          {getVisiblePages().map((index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={index + 1 === currentPage ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="arrow-button"
          >
            {`>`}
          </button>
          {isMultiplePages && (
            <button
              onClick={handleLastPage}
              disabled={currentPage === totalPages}
              className="arrow-button"
            >
              {`>>`}
            </button>
          )}
        </div>
      ) : (
        <div className="pagination">
          <button key="1" className="active">
            1
          </button>
        </div>
      )}
    </>
  );
};

export default Pagination;
