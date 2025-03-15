import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faCheck, faFileArrowUp, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

const grades = ['Grade 10', 'Grade 11', 'Grade 12'];
const subjects = [
  'Mathematics',
  'English',
  'Literature',
  'Physics',
  'Chemistry',
  'Biology',
  'History',
  'Geography',
];

const years = ['2024.2', '2024.1', '2023.2', '2023.1', '2022.2', '2022.1'];

const types = ['MC', 'Essay'];

const durations = ['15 minutes', '30 minutes', 'Middle Term', 'Final Term'];

function NewAssignment() {
  return (
    <div className="display flex flex-col gap-4 px-8 py-4">
      <div className="grid grid-cols-7 gap-4">
        <SelectDropDown lists={grades} />
        <SelectDropDown lists={subjects} />
        <SelectDropDown lists={years} />
        <SelectDropDown lists={types} />
        <SelectDropDown lists={durations} />

        <div className=" ml-4 bg-indigo-700 text-white justify-center items-center flex font-bold text-xl rounded-lg transition-all duration-300 hover:bg-white hover:text-indigo-700 hover:border-indigo-700 hover:border-2 hover:scale-105 hover:cursor-pointer">
          <FontAwesomeIcon icon={faFloppyDisk} />
          <div className="ml-2 ">Save</div>
        </div>

        <div className=" bg-green-700 text-white justify-center items-center flex font-bold text-xl rounded-lg transition-all duration-300 hover:bg-white hover:text-green-700 hover:border-green-700 hover:border-2 hover:scale-105 hover:cursor-pointer">
          <FontAwesomeIcon icon={faFileArrowUp} />
          <div className="ml-2 ">Import</div>
        </div>
      </div>
      <Question />
    </div>
  );
}

function SelectDropDown({ lists }) {
  const [selected, setSelected] = useState(lists[0]);
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

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center justify-between w-full px-4 py-2 text-left bg-white text-gray-700 rounded-lg shadow-md cursor-pointer hover:bg-gray-100 overflow-hidden whitespace-nowrap truncate"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="truncate">{selected}</span>
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
              onClick={() => setSelected(list)}
            >
              {list}
              {selected === list && (
                <FontAwesomeIcon icon={faCheck} className="text-indigo-700 group-hover:text-white" />
              )}
            </li>
          ))}
        </motion.ul>
      )}
    </div>
  );
}

function Question() {
  return (
    <div className="grid grid-cols-2 gap-4 border border-gray-200 p-4 shadow rounded-lg animattion-all duration-300 hover:shadow-lg hover:scale-102">
      <div className="col-span-2">
        <input
          type="text"
          placeholder="Question"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
        />
      </div>
      <div className="col-span-2">
        <input
          type="text"
          placeholder="Answer"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
        />
      </div>
    </div>
  );
}

export default NewAssignment;
