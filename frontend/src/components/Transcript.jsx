import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';

import Score from '../assets/Draft/student_scores.json';

function Transcript() {
  return (
    <div className="grid grid-cols-12 grid-rows-[minmax(0,auto)_1fr] shadow-inner p-6 rounded-lg bg-gray-50 gap-4">
      <div className="col-start-1 col-end-13 row-start-1 row-end-2">
        <Table />
      </div>
      <div className="col-start-4 col-end-10 row-start-2 row-end-3 h-[clamp(1rem,20vh,3rem)] bg-indigo-700 text-white justify-center items-center flex font-bold text-xl rounded-lg transition-all duration-300 hover:bg-white hover:text-indigo-700 hover:border-indigo-700 hover:border-2 hover:scale-105 hover:cursor-pointer">
        <FontAwesomeIcon icon={faArrowUpFromBracket} />
        <div className="ml-2 ">Import</div>
      </div>
    </div>
  );
}

function Table() {
  const ScoreAvg = Score.map((a) => ({
    ...a,
    average: (
      (a['15_minutes'] +
        a['15_minutes_2'] +
        a['15_minutes_3'] +
        a['30_minutes'] +
        a['30_minutes_2'] +
        a['middle_term'] +
        a['final_term']) /
      7
    ).toFixed(2),
  }));

  return (
    <table className="w-full border border-gray-300 shadow-lg text-xs">
      <thead className="text-indigo-700 sticky top-0 bg-white ring">
        <tr>
          {[
            'order',
            'name',
            '15 Minutes',
            '15 Minutes',
            '15 Minutes',
            '30 Minutes',
            '30 Minutes',
            'Middle Term',
            'Final Term',
            'average',
          ].map((col, index) => (
            <th key={index} className="p-3 cursor-pointer text-left hover:bg-gray-300 transition">
              {col.charAt(0).toUpperCase() + col.slice(1)}{' '}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {ScoreAvg.map((assignment, index) => (
          <tr key={assignment.id} className="border-t hover:bg-gray-100 transition group relative">
            <td className="p-3">{index + 1}</td>
            <td className="p-3">{assignment.name}</td>
            <td className="p-3">{assignment['15_minutes']}</td>
            <td className="p-3">{assignment['15_minutes_2']}</td>
            <td className="p-3">{assignment['15_minutes_3']}</td>
            <td className="p-3">{assignment['30_minutes']}</td>
            <td className="p-3">{assignment['30_minutes_2']}</td>
            <td className="p-3">{assignment['middle_term']}</td>
            <td className="p-3">{assignment['final_term']}</td>
            <td className="p-3">{assignment.average}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Transcript;
