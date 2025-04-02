import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faChevronDown, faCheck } from '@fortawesome/free-solid-svg-icons';

// import assignments from '../assets/Draft/assignments.json';
import Pagination from './Pagination';

const URL = 'http://localhost:3000/api/assignments';

const grades = ['All grade', 'Grade 10', 'Grade 11', 'Grade 12'];
const subjects = [
  'All subject',
  'Mathematics',
  'English',
  'Literature',
  'Physics',
  'Chemistry',
  'Biology',
  'History',
  'Geography',
];

const years = ['All year', '2024.2', '2024.1', '2023.2', '2023.1', '2022.2', '2022.1'];

const types = ['All type', 'MC', 'Essay'];

const durations = ['All duration', '15 minutes', '30 minutes', 'Middle Term', 'Final Term'];

function Body({ selectedCount, onImport }) {
  const [selectedFilters, setSelectedFilters] = useState({
    name: '',
    grade: [grades[0]],
    subject: [subjects[0]],
    year: [years[0]],
    type: [types[0]],
    duration: [durations[0]],
    status: [],
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignments, setSelectedAssignments] = useState([]);

  useEffect(() => {
    axios
      .get(`${URL}/getAssignments`)
      .then((res) => setAssignments(res.data))
      .catch((err) => console.log('Error in AssignmentTeacher.jsx: ', err));
  }, []);

  return (
    <>
      <div className="grid grid-cols-12 grid-rows-10 gap-4 px-8 py-4 h-full">
        <button
          onClick={() => onImport(selectedAssignments)}
          disabled={selectedAssignments.length !== selectedCount}
          className={`text-xl font-bold row-span-1 col-span-2 p-2 cursor-pointer rounded bg-indigo-700 text-white transition-all duration-300 hover:bg-white hover:text-indigo-700 hover:border-indigo-700 hover:border-2 ${
            selectedAssignments.length !== selectedCount ? 'hidden' : ''
          }`}
        >
          <FontAwesomeIcon icon={faCheck} className="mr-2" />
          Done
        </button>
        <input
          type="text"
          placeholder="Find your assignment"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="col-start-1 col-end-11 row-start-2 row-end-3 w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />

        <div
          className="col-start-11 col-end-13 row-start-2 row-end-3 bg-indigo-700 text-white justify-center items-center flex font-bold text-xl rounded-lg transition-all duration-300 hover:bg-white hover:text-indigo-700 hover:border-indigo-700 hover:border-2 hover:cursor-pointer"
          onClick={() => {
            setSelectedFilters((prev) => ({ ...prev, name: searchQuery.trim() }));
            setSearchQuery('');
          }}
        >
          <FontAwesomeIcon icon={faSearch} />
          <span className="ml-2 ">Search</span>
        </div>

        <div className=" col-start-1 col-end-3 row-start-3 row-end-5 z-2">
          <SelectDropDown
            filterKey="grade"
            lists={grades}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
          />
        </div>

        <div className=" col-start-3 col-end-5 row-start-3 row-end-5 z-2">
          <SelectDropDown
            filterKey="subject"
            lists={subjects}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
          />
        </div>

        <div className=" col-start-5 col-end-7 row-start-3 row-end-5 z-2">
          <SelectDropDown
            filterKey="year"
            lists={years}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
          />
        </div>

        <div className=" col-start-7 col-end-9 row-start-3 row-end-5 z-2">
          <SelectDropDown
            filterKey="type"
            lists={types}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
          />
        </div>

        <div className=" col-start-9 col-end-11 row-start-3 row-end-5 z-2">
          <SelectDropDown
            filterKey="duration"
            lists={durations}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
          />
        </div>

        <div className="col-start-1 col-end-13 row-start-4 row-end-10 overflow-auto">
          <Table
            assignments={assignments}
            setAssignments={setAssignments}
            selectedFilters={selectedFilters}
            currentPage={currentPage}
            setTotalPages={setTotalPages}
            setCurrentPage={setCurrentPage}
            selectedCount={selectedCount}
            selectedAssignments={selectedAssignments}
            setSelectedAssignments={setSelectedAssignments}
          />
        </div>

        <div className="col-start-1 col-end-13 row-start-10 row-end-11">
          <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
        </div>
      </div>
    </>
  );
}

function SelectDropDown({ filterKey, lists, selectedFilters, setSelectedFilters }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleSelectItem = (item) => {
    setSelectedFilters((prevFilters) => {
      let updatedFilters = { ...prevFilters };
      let prevSelected = updatedFilters[filterKey] || [];

      if (item === lists[0]) return { ...updatedFilters, [filterKey]: [lists[0]] };
      if (prevSelected.includes(lists[0]))
        prevSelected = prevSelected.filter((selectedItem) => selectedItem !== lists[0]);
      if (prevSelected.includes(item)) {
        prevSelected = prevSelected.filter((selectedItem) => selectedItem !== item);
      } else {
        prevSelected = [...prevSelected, item];
      }

      return {
        ...updatedFilters,
        [filterKey]: prevSelected,
      };
    });
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center justify-between w-full px-4 py-2 text-left bg-white text-gray-700 rounded-lg shadow-md cursor-pointer hover:bg-gray-100 overflow-hidden whitespace-nowrap truncate"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="truncate">
          {selectedFilters[filterKey].length > 0
            ? selectedFilters[filterKey].join(', ')
            : toggleSelectItem(lists[0])}
        </span>
        <FontAwesomeIcon icon={faChevronDown} />
      </button>

      {isOpen && (
        <motion.ul
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute w-full mt-2 bg-white border border-gray-200 rounded-md shadow-md max-h-60 overflow-y-auto"
        >
          {lists.map((list) => (
            <li
              key={list}
              className="group flex justify-between items-center px-4 py-2 cursor-pointer hover:bg-indigo-700 hover:text-white"
              onClick={() => toggleSelectItem(list)}
            >
              {list}
              {selectedFilters[filterKey].includes(list) && (
                <FontAwesomeIcon icon={faCheck} className="text-indigo-700 group-hover:text-white" />
              )}
            </li>
          ))}
        </motion.ul>
      )}
    </div>
  );
}

function Table({
  assignments,
  setAssignments,
  selectedFilters,
  currentPage,
  setTotalPages,
  setCurrentPage,
  selectedCount,
  selectedAssignments,
  setSelectedAssignments,
}) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const itemsPerPage = 15;

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const time = date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    const day = date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
    return `${time} ${day}`;
  };

  const filteredData = useMemo(() => {
    return assignments.filter((assignment) => {
      const matchesFilter = Object.entries(selectedFilters).every(([key, value]) => {
        if (key === 'name') return true; // Bỏ qua 'name' vì lọc riêng bên dưới
        if (value.length === 0 || value.includes(`All ${key}`)) return true;
        return value.includes(assignment[key]);
      });
      // Loc theo name
      // console.log(selectedFilters.name);
      // console.log(assignment.name);
      // console.log(assignment.name.toLowerCase().includes(selectedFilters.name.toLowerCase()));
      const matchesSearch = selectedFilters.name
        ? assignment.name.toLowerCase().includes(selectedFilters.name.toLowerCase())
        : true;

      // console.log(matchesFilter, matchesSearch);
      return matchesFilter && matchesSearch;
    });
  }, [assignments, selectedFilters]);
  // console.log('Filtered Data:', filteredData); // Thêm dòng này để debug

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;

    return [...filteredData].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  const sortData = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handleSelect = (assignment) => {
    setSelectedAssignments((prev) => {
      if (prev.find((select) => select._id === assignment._id))
        return prev.filter((a) => a._id !== assignment._id);

      if (prev.length < selectedCount) return [...prev, assignment];
      return prev;
    });
  };

  useEffect(() => {
    setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
  }, [filteredData, itemsPerPage, setTotalPages]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredData, setCurrentPage]);
  const paginateData = sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div>
      <table className="w-full border border-gray-300 shadow-lg">
        <thead className="text-indigo-700 sticky top-0 z-1 bg-white ring">
          <tr>
            {['name', 'grade', 'subject', 'date', 'type', 'duration', 'status'].map((col) => (
              <th
                key={col}
                onClick={() => sortData(col)}
                className="p-3 cursor-pointer text-left hover:bg-gray-300 transition"
              >
                {col.charAt(0).toUpperCase() + col.slice(1)}{' '}
                {sortConfig.key === col ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginateData.map((assignment) => (
            <tr
              key={assignment._id}
              className={`border-t hover:bg-gray-100 transition group relative ${
                selectedAssignments.find((a) => a._id === assignment._id) ? 'bg-gray-100' : ''
              }`}
            >
              <td className="p-3 cursor-pointer hover:underline" onClick={() => handleSelect(assignment)}>
                {assignment.name}
              </td>
              <td className="p-3">{assignment.grade}</td>
              <td className="p-3">{assignment.subject}</td>
              <td className="p-3">{formatDate(assignment.dateStart || new Date())}</td>
              <td className="p-3">{assignment.type}</td>
              <td className="p-3">{assignment.duration}</td>
              <td className="p-3 relative">{assignment.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {filteredData.length === 0 && (
        <p className="text-center text-2xl mt-4 italic text-gray-400">No data found.</p>
      )}
    </div>
  );
}

function SearchModal({ onClose, onImport, selectedCount }) {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black/10 z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose} // Đóng khi click bên ngoài
    >
      <motion.div
        className="relative bg-white p-6 rounded-lg shadow-lg w-[clamp(1rem,90vw,60rem)] h-[clamp(1rem,90vh,50rem)] flex overflow-auto"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()} // Ngăn đóng khi click vào nội dung
      >
        <Body selectedCount={selectedCount} onImport={onImport} />
      </motion.div>
    </motion.div>
  );
}

export default SearchModal;
