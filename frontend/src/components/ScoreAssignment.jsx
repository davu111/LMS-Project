import { useState, useEffect } from 'react';

import axios from 'axios';

import ImageModal from './ImageModal';

const URL = 'http://localhost:3000/api';

function ScoreAssignment({ courseId, assignmentId }) {
  {
    console.log(assignmentId);
  }
  const [students, setStudents] = useState([]);
  const [scores, setScores] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedScore, setSelectedScore] = useState(null);

  useEffect(() => {
    axios
      .get(`${URL}/students/getStudentsByCourse/${courseId}`)
      .then((res) => {
        console.log(res);
        setStudents(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${URL}/scores/getScoresByAssignment/${assignmentId}`)
      .then((res) => {
        console.log(res);
        setScores(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleClick = (score) => {
    setIsOpen(true);
    setSelectedScore(score);
  };

  const handleDone = (score) => {
    setIsOpen(false);
    setSelectedScore(null);

    axios
      .put(`${URL}/scores/updateScore/${score._id}`, score)
      .then((res) => {
        console.log(res);
        setScores((prev) => prev.map((s) => (s._id === score._id ? score : s)));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="shadow-inner p-6 rounded-lg bg-gray-50 flex flex-col gap-2">
        <div className="shadow p-4 rounded-lg bg-white flex gap-2">
          <table className="w-full">
            <thead className="text-indigo-700 sticky top-0 bg-white ring">
              <tr>
                <th className="text-left pl-4">Name</th>
                <th className="text-right pr-4">Score</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => {
                const matchedScore = scores.find((s) => s.student_id._id === student._id);
                const isScored = matchedScore && typeof matchedScore.score === 'number';
                const hasSubmitted = matchedScore && !isScored;

                const rowClass = isScored
                  ? 'bg-green-100 cursor-pointer'
                  : hasSubmitted
                  ? 'bg-red-100 cursor-pointer'
                  : '';

                const handleRowClick = () => {
                  if (matchedScore) handleClick(matchedScore);
                };

                return (
                  <tr
                    key={student._id}
                    className={`border hover:text-gray-500 transition group relative ${rowClass}`}
                    onClick={matchedScore ? handleRowClick : undefined}
                  >
                    <td className="text-left pl-4">{student.name}</td>
                    <td className="text-right pr-4">{isScored ? matchedScore.score : 'N/A'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {isOpen && (
        <ImageModal
          score={selectedScore}
          onDone={(tempScore) => handleDone(tempScore)}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

export default ScoreAssignment;
