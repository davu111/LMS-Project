// import React from "react";
import "../styles/App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFingerprint,
  faWifi,
  faFeatherAlt,
} from "@fortawesome/free-solid-svg-icons";

import logoSchool from "../assets/logo-school.svg";

const Class = () => {
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
        Class
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

// ...existing code...

function Body() {
  return (
    <div className="flex gap-4 px-8 py-4 align-start items-start">
      <div className="">
        <div className="flex gap-4">
          <div className="border px-4 py-2 border-gray-200 rounded-lg bg-gray-50 text-gray-400 flex justify-between">
            <div className="flex gap-2 align-middle items-center">
              <div className="text-sm">Rank</div>
              <div className="text-indigo-600">#2</div>
            </div>
          </div>
        </div>
        <div className="border py-8 mt-4 border-gray-200 rounded-lg bg-gray-50 flex justify-center items-center">
          <div className="flex gap-4 flex-wrap justify-center">
            {subjects.map((subject, index) => (
              <SubjectCard
                key={index}
                name={subject.name}
                color={subject.color}
                exp={subject.exp}
                grade={subject.grade}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="w-3/5">
        <div className="flex flex-col gap-4">
          <div className="border px-3 py-5 border-gray-200 rounded-lg text-sm bg-gray-50">
            <div className="mb-4 text-gray-400">Student Card</div>
          </div>

          <div className="border p-5 border-gray-200 rounded-lg bg-gray-50 text-gray-400 text-sm">
            Achievement
          </div>
          <div className="border p-5 border-gray-200 rounded-lg bg-gray-50 text-gray-400 text-sm">
            <div className="mb-2">Activity log</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ...existing code...

const subjects = [
  {
    name: "Mathematics",
    color: "amber",
    exp: 3000,
    grade: "A+",
  },
  {
    name: "History",
    color: "pink",
    exp: 5000,
    grade: "A+",
  },
  {
    name: "Mandarin",
    color: "cyan",
    exp: 5000,
    grade: "A+",
  },
  {
    name: "Literature",
    color: "emerald",
    exp: 5000,
    grade: "A+",
  },
  {
    name: "Physics",
    color: "red",
    exp: 5000,
    grade: "A+",
  },
  {
    name: "Chemistry",
    color: "blue",
    exp: 5000,
    grade: "A+",
  },
];

function SubjectCard({ name, color, exp, grade }) {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg flex gap-4 flex-col justify-items-start items-start min-w-56 hover:shadow-xl transition duration-300 cursor-pointer">
      <div
        className={`w-8 h-8 bg-${color}-600 rounded-full flex justify-center items-center`}
      ></div>
      <div className={`font-medium text-${color}-600 `}>{name}</div>
      <div className="flex justify-between w-full text-sm text-gray-400  ">
        <div>Exp: {exp}xp</div>
        <div>{grade}</div>
      </div>
    </div>
  );
}

export default Class;
