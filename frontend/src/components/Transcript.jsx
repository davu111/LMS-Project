import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';

import Score from '../assets/Draft/student_scores.json';
import SearchModal from './SearchModal';
import '../styles/App.css';
import axios from 'axios';

const URL = 'http://localhost:3000/api';

const types = [
  '15_minutes',
  '15_minutes_2',
  '15_minutes_3',
  '30_minutes',
  '30_minutes_2',
  'middle_term',
  'final_term',
];

function Transcript() {
  const [isOpen, setIsOpen] = useState(false);

  const ScoreAvg = Score.map((a) => ({
    ...a,
    average: (types.reduce((total, type) => total + a[type], 0) / types.length).toFixed(2),
  }));

  const [scores, setScores] = useState(ScoreAvg);
  const [selectedColumns, setSelectedColumns] = useState([]);

  const handleChange = (index, key, value) => {
    const updatedScores = [...scores];
    console.log(updatedScores);
    updatedScores[index][key] = parseFloat(value);
    updatedScores[index].average = (
      types.reduce((total, type) => total + updatedScores[index][type], 0) / types.length
    ).toFixed(2);
    setScores(updatedScores);
  };

  const handleColumnSelect = (column) => {
    if (selectedColumns.includes(column)) {
      setSelectedColumns(selectedColumns.filter((col) => col !== column));
    } else {
      setSelectedColumns([...selectedColumns, column]);
    }
  };

  const handleImport = (selectedAssignments) => {
    // console.log(selectedAssignments);
    const updatedScores = scores.map((student) => ({ ...student })); // Tạo bản sao mới của scores

    const fetchPromises = selectedAssignments.map((assignment, idx) =>
      axios.get(`${URL}/scores/getScores/${assignment._id}`).then((res) => {
        updatedScores.forEach((student, i) => {
          updatedScores[i] = {
            ...updatedScores[i], // Đảm bảo mỗi student có một object mới
            [selectedColumns[idx]]: parseFloat(res.data[0].score) / 10,
          };
        });
      }),
    );

    Promise.all(fetchPromises).then(() => {
      setScores(updatedScores); // Chỉ setScores sau khi tất cả request hoàn thành
      setIsOpen(false);
    });

    // const updatedScores = [...scores];
    // selectedAssignments.forEach((assignment, idx) => {
    //   scores.forEach((student, i) => {
    //     updatedScores[i][selectedColumns[idx]] = assignment.scores[student.id] || 0;
    //   });
    // });
    // setScores(updatedScores);
    // setIsOpen(false);
  };

  return (
    <div className="grid grid-cols-12 grid-rows-[minmax(0,auto)_1fr] shadow-inner p-6 rounded-lg bg-gray-50 gap-4">
      <div className="col-start-1 col-end-13 row-start-1 row-end-2">
        <Table
          selectedColumns={selectedColumns}
          scores={scores}
          handleChange={handleChange}
          handleColumnSelect={handleColumnSelect}
        />
      </div>
      <div
        className="col-start-4 col-end-10 row-start-2 row-end-3 h-[clamp(1rem,20vh,3rem)] bg-indigo-700 text-white justify-center items-center flex font-bold text-xl rounded-lg transition-all duration-300 hover:bg-white hover:text-indigo-700 hover:border-indigo-700 hover:border-2 hover:scale-105 hover:cursor-pointer"
        onClick={() => {
          setIsOpen(true);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      >
        <FontAwesomeIcon icon={faArrowUpFromBracket} />
        <div className="ml-2 ">Import</div>
      </div>
      {console.log(selectedColumns)}
      {isOpen && (
        <SearchModal
          onClose={() => setIsOpen(false)}
          onImport={handleImport}
          selectedCount={selectedColumns.length}
        />
      )}
    </div>
  );
}

function Table({ selectedColumns, scores, handleChange, handleColumnSelect }) {
  return (
    <table className="w-full border border-gray-300 shadow-lg text-xs">
      <thead className="text-indigo-700 sticky top-0 bg-white ring">
        <tr>
          {['order', 'name', ...types.map((t) => t.replace('_', ' ')), 'average'].map((col, index) => (
            <th
              key={index}
              className="p-3 cursor-pointer text-left hover:bg-gray-300 transition"
              onClick={() =>
                types.includes(col.replace(' ', '_')) && handleColumnSelect(col.replace(' ', '_'))
              }
            >
              {col.charAt(0).toUpperCase() + col.slice(1)}{' '}
              {selectedColumns.includes(col.replace(' ', '_')) ? '✔ ' : ''}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {scores.map((student, index) => (
          <tr key={student.id} className="border-t hover:bg-gray-100 transition group relative">
            <td className="p-3">{index + 1}</td>
            <td className="p-3">{student.name}</td>
            {types.map((type) => (
              <td key={type} className="p-3">
                <input
                  type="number"
                  value={student[type]}
                  onChange={(e) => handleChange(index, type, e.target.value)}
                  className="w-full text-center no-spinner"
                />
              </td>
            ))}
            <td className="p-3">{student.average}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Transcript;
