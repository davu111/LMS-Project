import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faCheck,
  faFileArrowUp,
  faFloppyDisk,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import Header from './Header';

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

const types = ['MC', 'Essay'];

const durations = ['15 minutes', '30 minutes', 'Middle Term', 'Final Term'];

function Body() {
  const [questions, setQuestions] = useState([{}]);
  const [typeselected, setTypeselected] = useState(types[0]);
  return (
    <div className="flex flex-col gap-4 px-8 pb-4 ">
      <div className="sticky top-0 z-1 py-4 border-b-2 border-gray-300 bg-white grid grid-cols-7 gap-4">
        <SelectDropDown lists={grades} />
        <SelectDropDown lists={subjects} />
        <SelectDropDown lists={types} setTypeselected={setTypeselected} />
        <SelectDropDown lists={durations} />
        <DateStart />
        <div
          className={`${
            typeselected === 'Essay' && 'col-span-2'
          } ml-4 bg-indigo-700 text-white justify-center items-center flex font-bold rounded-lg transition-all duration-300 hover:bg-white hover:text-indigo-700 hover:border-indigo-700 hover:border-2 hover:scale-105 hover:cursor-pointer`}
        >
          <FontAwesomeIcon icon={faFloppyDisk} />
          <div className="ml-2 ">Save</div>
        </div>

        {typeselected === 'MC' && <Import typeselected={typeselected} />}
      </div>
      {typeselected === 'MC' ? (
        <>
          {questions.map((_, index) => (
            <Question key={index} index={index + 1} />
          ))}
          <div
            className="mx-3 my-2 bg-indigo-700 text-white justify-center items-center flex font-bold text-xl rounded-lg transition-all duration-300 hover:bg-white hover:text-indigo-700 hover:border-indigo-700 hover:border-2 hover:cursor-pointer"
            onClick={() => setQuestions([...questions, {}])}
          >
            <FontAwesomeIcon className="mx-3 my-3" icon={faPlus} />
          </div>
        </>
      ) : (
        <Import typeselected={typeselected} />
      )}
    </div>
  );
}

function SelectDropDown({ lists, setTypeselected }) {
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
              onClick={() => {
                setSelected(list);
                setTypeselected(list);
              }}
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

function Question({ index }) {
  const textareaRef = useRef(null);
  const [text, setText] = useState('');
  const [selected, setSelected] = useState(null);
  const options = ['A', 'B', 'C', 'D'];

  const handleInput = (e) => {
    setText(e.target.value);
    textareaRef.current.style.height = 'auto'; // Reset height de tinh lai
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  };
  return (
    <div className="grid grid-cols-1 gap-4 border border-gray-200 p-4 shadow rounded-lg animattion-all duration-300 hover:shadow-lg hover:scale-102">
      <label className="col-span-2 row-span-1 block text-xl text-gray-500">Question {index}</label>
      <textarea
        ref={textareaRef}
        value={text}
        onInput={handleInput}
        placeholder="Question"
        className="col-span-2 row-span-1 w-full px-4 py-2 border border-gray-300 rounded-lg break-words resize-none overflow-hidden focus:outline-none focus:border-indigo-500"
        rows={1}
      />
      <div className="col-span-2 grid grid-cols-2 grid-rows-2 gap-4">
        {options.map((option) => (
          <div
            key={option}
            className={`flex items-center border  rounded px-3 py-1 hover:border-indigo-500 hover:cursor-pointer transition-all 
              ${selected === option ? 'bg-indigo-100 border-indigo-500' : 'border-gray-300'}`}
            onDoubleClick={() => setSelected(option)}
          >
            <span className="text-gray-500">{option}. </span>
            <input type="text" placeholder="Answer" className="flex-1 px-4 py-2 outline-none" />
            {selected === option && <FontAwesomeIcon icon={faCheck} className="text-green-500" />}
          </div>
        ))}
      </div>
    </div>
  );
}

function DateStart() {
  return (
    <input
      type="datetime-local"
      className="w-full px-4 py-2 bg-white text-gray-700 rounded-lg shadow-md cursor-pointer hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
    />
  );
}

function Import({ typeselected }) {
  return (
    <div className="flex items-center justify-center">
      <input
        type="file"
        className="hidden"
        id="fileInput"
        accept=".csv"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
              const content = event.target.result;
              console.log(content);
            };
            reader.readAsText(file);
          }
        }}
      />
      <label
        htmlFor="fileInput"
        className={`${
          typeselected === 'MC' ? 'w-full h-full' : 'w-1/2 h-20 text-2xl'
        } bg-green-700 text-white justify-center items-center flex font-bold rounded-lg transition-all duration-300 hover:bg-white hover:text-green-700 hover:border-green-700 hover:border-2 hover:scale-105 hover:cursor-pointer`}
      >
        <FontAwesomeIcon icon={faFileArrowUp} />
        <div className="ml-2">Import</div>
      </label>
    </div>
  );
}

function NewAssignment() {
  return (
    // <div className="flex flex-col h-screen">
    //   <Header name="New Assignment" className="flex-shrink-0" />
    //   <div className="flex-1 flex overflow-auto">
    //     <Body />
    //   </div>
    // </div>
    <Body />
  );
}

export default NewAssignment;
