import React, { useState } from "react";
import "../styles/App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDay,
  faCaretDown,
  faUserTag,
  faSearch,
  faVial,
} from "@fortawesome/free-solid-svg-icons";

import logoSchool from "../assets/logo-school.svg";

const Ranking = () => {
  return (
    <>
      <Header />
      <Body />
    </>
  );
};

function Header() {
  return (
    <header className="border border-gray-200 h-24 px-8 flex justify-between border-t-0 border-l-0 border-r-0 sticky top-0 bg-white z-10 align-middle items-center">
      <div className="text-2xl font-bold font-raleway text-indigo-700 tracking-widest">
        Ranking
      </div>
      <div className="flex gap-2 align-middle items-center text-indigo-700">
        <img
          src={logoSchool}
          alt="Logo"
          className="w-8 h-8 border rounded-full"
        />
        <div className="font-raleway tracking-widest">Mist High School</div>
      </div>
    </header>
  );
}

function Body() {
  const currentStudentId = 1; // Example student ID for the current account

  const [rankings, setRankings] = useState([
    { id: 1, name: "John Doe", movement: "+3" },
    { id: 2, name: "Jane Smith", movement: "-1" },
    { id: 3, name: "Alice Johnson", movement: "+20" },
    { id: 4, name: "Bob Brown", movement: "-2" },
    { id: 5, name: "Mike Williams", movement: "+5" },
    { id: 6, name: "Sara Davis", movement: "-4" },
    { id: 7, name: "Paul Wilson", movement: "+2" },
    { id: 8, name: "Linda Moore", movement: "-3" },
    { id: 9, name: "Chris Taylor", movement: "+1" },
    { id: 10, name: "Mark Thomas", movement: "+4" },
    { id: 11, name: "**** ****", movement: "*" },
    { id: 54, name: "Vu Minh Quy", movement: "+16" },
    { id: 55, name: "**** ****", movement: "*" },
  ]);

  const [axpRankings, setAxpRankings] = useState([
    { id: 1, name: "John Doe", movement: "+3" },
    { id: 2, name: "Jane Smith", movement: "-1" },
  ]);

  const [classRankings, setClassRankings] = useState([
    { id: 1, name: "11A", movement: "-" },
    { id: 2, name: "11C", movement: "+1" },
    { id: 3, name: "11B", movement: "-1" },
    { id: 4, name: "11D", movement: "+2" },
  ]);

  const [legendRankings, setLegendRankings] = useState([
    { id: 1, name: "Mike Williams" },
    { id: 2, name: "Sara Davis" },
  ]);

  const renderTable = (data) => (
    <table className="min-w-full bg-white shadow-xs rounded-lg ">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b border-indigo-600 text-indigo-700 tracking-wider font-medium">
            Rank
          </th>
          <th className="py-2 px-4 border-b border-indigo-600 text-indigo-700 tracking-wider font-medium text-left">
            Name
          </th>
          <th className="py-2 px-4 border-b border-indigo-600 text-indigo-700 tracking-wider font-medium">
            Movement
          </th>
        </tr>
      </thead>
      <tbody className="text-gray-600">
        {data.map((student, index) => (
          <tr key={student.id}>
            <td className="py-2 px-4 border-b border-gray-200 text-center">
              {index + 1}
            </td>
            <td className="py-2 px-4 border-b border-gray-200">
              {student.name}
            </td>
            <td className="py-2 px-4 border-b border-gray-200 text-center">
              {student.movement}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const logEntries = rankings
    .filter((student) => student.id === currentStudentId)
    .map((student) => `${student.name} moved ${student.movement} ranks`);

  return (
    <div className="flex gap-4 px-8 py-4 align-start items-start">
      <div className="w-full">
        <div className="flex gap-4">
          <div className="border px-4 py-2 w-full border-gray-200 rounded-lg bg-gray-50 text-gray-400 flex justify-between ">
            <div className="flex gap-2 align-middle items-center">
              <div className="text-sm">Rank</div>
              <div className="text-indigo-600">Merit </div>
            </div>
            <div className="flex gap-2 align-middle items-center">
              <div className="text-sm">School-wide</div>
              <div className="text-indigo-600"># 10</div>
            </div>
            <div className="flex gap-2 align-middle items-center">
              <div className="text-sm">Class-wide</div>
              <div className="text-amber-600"># 1</div>
            </div>
          </div>
          <div className="border px-4 py-2 border-gray-200 rounded-lg bg-gray-50 text-gray-400 flex justify-between items-center">
            <div className="text-sm mr-2">State</div>
            <div className="p-2 bg-emerald-700 rounded-full"></div>
          </div>
        </div>
        <div className="border p-3 w-full mt-4 border-gray-200 rounded-lg text-gray-400 text-sm">
          <div className="flex gap-2 flex-col">
            <div className="flex justify-between items-center">
              <div>Filter</div>
              <div className="flex gap-2">
                <div className="px-4 py-1 border rounded flex items-center gap-2 text-amber-700">
                  <FontAwesomeIcon icon={faCalendarDay} />
                  <div>Semester</div>
                  <FontAwesomeIcon icon={faCaretDown} />
                </div>
                <div className="px-4 py-1 border rounded flex items-center gap-2 text-fuchsia-700">
                  <FontAwesomeIcon icon={faVial} />
                  Subject
                  <FontAwesomeIcon icon={faCaretDown} />
                </div>
                <div className="px-4 py-1 border rounded flex items-center gap-2 text-cyan-700">
                  <FontAwesomeIcon icon={faUserTag} />
                  Range
                </div>
                <div className="px-4 py-1 border rounded flex items-center gap-2 text-gray-700">
                  <FontAwesomeIcon icon={faSearch} />
                  <input
                    type="text"
                    placeholder="ID"
                    className="border-none outline-none"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>Type</div>
              <div className="flex gap-2">
                <div className="border rounded px-2 py-1 bg-indigo-600 text-white">
                  Mid-term Ranking
                </div>
                <div className="border rounded px-2 py-1 text-indigo-600 hover:bg-indigo-600 hover:text-white">
                  Final-term Ranking
                </div>
                <div className="border rounded px-2 py-1 text-indigo-600 hover:bg-indigo-600 hover:text-white">
                  SXP Ranking
                </div>
                <div className="border rounded px-2 py-1 text-indigo-600 hover:bg-indigo-600 hover:text-white">
                  2SXP Ranking
                </div>
                <div className="border rounded px-2 py-1 text-indigo-600 hover:bg-indigo-600 hover:text-white">
                  AXP Ranking
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border p-4 w-full mt-4 border-gray-200 rounded-lg bg-gray-50 text-gray-400 text-sm">
          {renderTable(rankings)}
        </div>
      </div>
      <div className="w-3/5">
        <div className="flex flex-col gap-4">
          <div className="border p-5 border-gray-200 rounded-lg bg-gray-50 text-gray-400 text-xs">
            <div className="mb-2">Log</div>
            <ul>
              {logEntries.map((entry, index) => (
                <li key={index}>{entry}</li>
              ))}
            </ul>
          </div>
          <div className="border px-5 py-5 border-gray-200 rounded-lg text-sm bg-gray-50">
            <div className="mb-4 text-gray-400">AXP Ranking</div>
            {renderTable(axpRankings)}
          </div>
          <div className="border px-5 py-5 border-gray-200 rounded-lg text-sm bg-gray-50">
            <div className="mb-4 text-gray-400">Class Ranking</div>
            {renderTable(classRankings)}
          </div>
          <div className="border p-5 border-gray-200 rounded-lg bg-gray-50 text-gray-400 text-sm">
            <div className="mb-4 text-gray-400">Legend Ranking</div>
            {renderTable(legendRankings)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ranking;
