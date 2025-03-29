import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
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
import Modal from './Modal';

const URL = 'http://localhost:3000/api';

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
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios
        .get(`${URL}/assignments/getAssignment/${id}`)
        .then((res) => {
          console.log(res);
          setState(res.data);
          axios.get(`${URL}/questions/getQuestion/${id}`).then((res) => {
            console.log(res);
            setQuestions(res.data);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);

  const newQuestion = {
    question: '',
    answer: { a: '', b: '', c: '', d: '' },
    correct: '',
    assignment_id: '',
  };
  const NewAssignment = {
    name: 'New Assignment',
    grade: grades[0],
    subject: subjects[0],
    type: types[0],
    duration: durations[0],
    status: 'Draft',
    year: '',
    dateStart: '',
  };
  const [questions, setQuestions] = useState([newQuestion]);
  const [state, setState] = useState(NewAssignment);

  const handleSave = () => {
    const filteredQuestions = questions.filter((q) => Object.keys(q).length > 0 && q.question.trim() !== '');

    axios
      .post(`${URL}/assignments/createAssignment`, state)
      .then((res) => {
        console.log(res);
        const assignment_id = res.data._id;

        const questionRequests = filteredQuestions.map((q) => {
          return axios.post(`${URL}/questions/createQuestion`, {
            ...q,
            assignment_id,
          });
        });

        return Promise.all(questionRequests);
      })
      .then((responses) => {
        console.log(
          'All questions created:',
          responses.map((res) => res.data),
        );
      })
      .catch((err) => console.error('Error:', err.response?.data || err.message));
  };

  return (
    <div className="flex flex-col gap-4 px-8 pb-4 ">
      <div className="sticky top-0 z-1 py-4 border-b-2 border-gray-300 bg-white">
        <input
          className="text-xl font-semibold mb-4 focus:outline-none"
          value={state.name}
          onChange={(e) => setState({ ...state, name: e.target.value })}
        ></input>
        <div className="grid grid-cols-7 gap-4">
          <SelectDropDown filterKey="grade" lists={grades} state={state} setState={setState} />
          <SelectDropDown filterKey="subject" lists={subjects} state={state} setState={setState} />
          <SelectDropDown filterKey="type" lists={types} state={state} setState={setState} />
          <SelectDropDown filterKey="duration" state={state} setState={setState} lists={durations} />
          <DateStart state={state} setState={setState} />
          <div
            className={`${
              state['type'] === 'Essay' && 'col-span-2'
            } ml-4 bg-indigo-700 text-white justify-center items-center flex font-bold rounded-lg transition-all duration-300 hover:bg-white hover:text-indigo-700 hover:border-indigo-700 hover:border-2 hover:scale-105 hover:cursor-pointer`}
          >
            <FontAwesomeIcon icon={faFloppyDisk} />
            <div className="ml-2 " onClick={() => setIsOpen(true)}>
              Save
            </div>
          </div>

          {state['type'] === 'MC' && <Import typeselected={state['type']} />}
        </div>
      </div>
      {state['type'] === 'MC' ? (
        <>
          {questions.map((_, index) => (
            <Question key={index} index={index + 1} questions={questions} setQuestions={setQuestions} />
          ))}
          <div
            className="mx-3 my-2 bg-indigo-700 text-white justify-center items-center flex font-bold text-xl rounded-lg transition-all duration-300 hover:bg-white hover:text-indigo-700 hover:border-indigo-700 hover:border-2 hover:cursor-pointer"
            onClick={() => setQuestions((prev) => [...prev, { ...newQuestion }])}
          >
            <FontAwesomeIcon className="mx-3 my-3" icon={faPlus} />
          </div>
        </>
      ) : (
        <Import typeselected={state['type']} />
      )}
      {isOpen && <Modal title="Save" onClose={() => setIsOpen(false)} handleSubmit={() => handleSave()} />}
    </div>
  );
}

function SelectDropDown({ filterKey, lists, state, setState }) {
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
        <span className="truncate">{state[filterKey]}</span>
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
              onClick={() => setState({ ...state, [filterKey]: list })}
            >
              {list}
              {state[filterKey] === list && (
                <FontAwesomeIcon icon={faCheck} className="text-indigo-700 group-hover:text-white" />
              )}
            </li>
          ))}
        </motion.ul>
      )}
    </div>
  );
}

function Question({ index, questions, setQuestions }) {
  const textareaRef = useRef(null);
  const options = ['A', 'B', 'C', 'D'];

  const handleInput = (e) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[index - 1].question = e.target.value;
      return updatedQuestions;
    });
    textareaRef.current.style.height = 'auto'; // Reset height de tinh lai
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  };

  const handleSelected = (option) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[index - 1].correct = option;
      return updatedQuestions;
    });
  };

  const handleChangeOption = (e, option) => {
    setQuestions((prevQuestions) => {
      return prevQuestions.map((q, i) =>
        i === index - 1
          ? {
              ...q,
              answer: { ...q.answer, [option]: e.target.value },
            }
          : q,
      );
    });
    // console.log(questions[index - 1].answer[option]);
  };

  return (
    <div className="grid grid-cols-1 gap-4 border border-gray-200 p-4 shadow rounded-lg animattion-all duration-300 hover:shadow-lg hover:scale-102">
      <label className="col-span-2 row-span-1 block text-xl text-gray-500">Question {index}</label>
      <textarea
        ref={textareaRef}
        value={questions[index - 1].question}
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
              ${
                questions[index - 1].correct === option
                  ? 'bg-indigo-100 border-indigo-500'
                  : 'border-gray-300'
              }`}
            onDoubleClick={() => handleSelected(option)}
          >
            <span className="text-gray-500">{option}. </span>
            <input
              type="text"
              placeholder="Answer"
              className="flex-1 px-4 py-2 outline-none"
              value={questions[index - 1]?.answer?.[option] ?? ''}
              onChange={(e) => handleChangeOption(e, option)}
            />
            {questions[index - 1].correct === option && (
              <FontAwesomeIcon icon={faCheck} className="text-green-500" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function DateStart({ state, setState }) {
  return (
    <input
      type="datetime-local"
      value={state['dateStart'].slice(0, 16)}
      min={new Date().toISOString().slice(0, 16)}
      onChange={(e) => {
        const date = new Date(e.target.value);
        const formattedDate = date.toISOString().slice(0, 16);

        setState((prev) => ({
          ...prev,
          year: date.getMonth() < 7 ? `${date.getFullYear()}.1` : `${date.getFullYear()}.2`,
          dateStart: formattedDate,
        }));
      }}
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
