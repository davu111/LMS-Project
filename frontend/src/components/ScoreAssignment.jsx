import { useState, useEffect } from 'react';

import axios from 'axios';

import ImgaeModal from './ImageModal';

const URL = 'http://localhost:3000/api';

function ScoreAssignment({ assignemntId }) {
  const [scores, setScores] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedScore, setSelectedScore] = useState(null);

  useEffect(() => {
    axios
      .get(`${URL}/scores/getScoresByAssignment/${assignemntId}`)
      .then((res) => {
        console.log(res);
        setScores(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [assignemntId]);

  const handleClick = (score) => {
    setIsOpen(true);
    setSelectedScore(score);
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
              {scores.map((score) => (
                <tr
                  key={score._id}
                  className={`border hover:bg-gray-100 transition group relative ${
                    score.images.length > 0 ? 'bg-green-100 cursor-pointer' : ''
                  }`}
                  onClick={() => score.images.length > 0 && handleClick(score)}
                >
                  <td className="text-left pl-4 ">{score.student_id.name}</td>
                  <td className="text-right pr-4">{score.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isOpen && <ImgaeModal score={selectedScore} onClose={() => setIsOpen(false)} />}
    </>
  );
}

export default ScoreAssignment;
