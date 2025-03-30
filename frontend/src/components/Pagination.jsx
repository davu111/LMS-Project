import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCaretLeft, faSquareCaretRight } from '@fortawesome/free-solid-svg-icons';

function Pagination({ currentPage, totalPages, setCurrentPage }) {
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (totalPages === 0) return null;
  return (
    <div className="flex justify-center items-center">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        className="px-4 py-2 mr-2 bg-indigo-700 text-white rounded-md border-2 hover:bg-white hover:text-indigo-700 transition-all duration-300 hover:border-indigo-700 hover:border-2 hover:cursor-pointer"
      >
        <FontAwesomeIcon icon={faSquareCaretLeft} />
      </button>
      <div>
        <span className="mx-2 border border-gray-300 px-4 py-2">
          {currentPage} / {totalPages}
        </span>
      </div>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        className="px-4 py-2 bg-indigo-700 text-white rounded-md border-2 hover:bg-white hover:text-indigo-700 transition-all duration-300 hover:border-indigo-700 hover:border-2 hover:cursor-pointer"
      >
        <FontAwesomeIcon icon={faSquareCaretRight} />
      </button>
    </div>
  );
}

export default Pagination;
