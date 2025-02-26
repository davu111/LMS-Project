import "../styles/App.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFingerprint,
  faClock,
  faSort,
  faBroadcastTower,
  faGlobe,
  faCheckDouble,
  faPastafarianism,
} from "@fortawesome/free-solid-svg-icons";

import logoSchool from "../assets/logo-school.svg";

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
  {
    name: "Biology",
    color: "amber",
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
  {
    name: "Biology",
    color: "amber",
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
  {
    name: "Biology",
    color: "amber",
    exp: 5000,
    grade: "A+",
  },
];

const colorClasses = {
  amber: {
    bg: "bg-amber-600",
    text: "text-amber-600",
  },
  pink: {
    bg: "bg-pink-600",
    text: "text-pink-600",
  },
  cyan: {
    bg: "bg-cyan-600",
    text: "text-cyan-600",
  },
  emerald: {
    bg: "bg-emerald-600",
    text: "text-emerald-600",
  },
  red: {
    bg: "bg-red-600",
    text: "text-red-600",
  },
  blue: {
    bg: "bg-blue-600",
    text: "text-blue-600",
  },
};

function Class() {
  return (
    <>
      <Header />
      <Body />
    </>
  );
}

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

function Body() {
  return (
    <div className="flex gap-4 px-8 py-4 align-start items-start ">
      <div className="w-4/5">
        <LeftSection />
      </div>
      <div className="w-2/5">
        <RightSection />
      </div>
    </div>
  );
}

function LeftSection() {
  return (
    <div className=" py-4 border-gray-200 rounded-lg bg-gray-50 flex justify-center items-center flex-col shadow-inner">
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
  );
}

function RightSection() {
  return (
    <div className="flex flex-col gap-4">
      <div className="border px-3 py-5 border-gray-200 rounded-lg text-sm bg-gray-50">
        <SemesterCard />
      </div>
      <div className="border p-5 border-gray-200 rounded-lg bg-gray-50 flex flex-col gap-2">
        <NewAnnouncementsCard />
      </div>
      <div className="border p-5 border-gray-200 rounded-lg bg-gray-50 text-gray-400 text-sm">
        <div className="mb-2 ">Exam schedule (optional) </div>
      </div>
    </div>
  );
}

function SemesterCard() {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex  items-center justify-between">
        <div className="flex  items-center font-medium gap-4 px-2">
          <FontAwesomeIcon icon={faBroadcastTower} />
          <div>Semester </div>
        </div>
        <div className="px-2 py-1 border flex gap-2 border-gray-300 text-sm text-gray-500 rounded-sm font-xs shadow-xs hover:text-gray-700 hover:border-gray-500 cursor-pointer transition duration-300 items-center">
          <div>2024.2</div>
          <FontAwesomeIcon icon={faSort} />
        </div>
      </div>

      <hr className="text-gray-300 my-3" />
      <div className="flex gap-2 flex-col  pl-2 ">
        <div className="flex items-center font-medium justify-between">
          <div className="flex items-center gap-2 ">
            <div className="">Class</div>
            <div className=" text-gray-500">10A</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="">Students</div>
            <div className=" text-gray-500">34</div>
          </div>
        </div>

        <div className="flex font-medium flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="">Mid-term</div>
            <div className=" text-emerald-600">Done</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="">Final-term</div>
            <div className=" text-rose-500">34 days left</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SubjectCard({ name, color, exp, grade }) {
  const { bg, text } = colorClasses[color] || {
    bg: "bg-gray-400",
    text: "text-gray-400",
  };

  return (
    <Link to="/subject">
      <div
        className="p-4 bg-white shadow-md rounded-lg flex gap-4 flex-col justify-items-start items-start min-w-56 hover:shadow-xl transition duration-300 cursor-pointer border border-transparent 
               hover:scale-105"
      >
        <div
          className={`w-8 h-8 ${bg} rounded-full flex justify-center items-center`}
        ></div>

        <div className={`font-medium ${text}`}>{name}</div>

        <div className="flex justify-between w-full text-sm text-gray-400">
          <div>Exp: {exp}xp</div>
          <div>{grade}</div>
        </div>
      </div>
    </Link>
  );
}

function NewAnnouncementsCard() {
  return (
    <div className="bg-white flex flex-col w-full text-sm rounded-lg shadow-md p-4 gap-4">
      <div className="flex items-center justify-between">
        <div className="font-medium">New Announcements</div>
        <div className="flex gap-1 items-center text-indigo-600">
          <div className="text-xs">Mark as read</div>
          <FontAwesomeIcon icon={faCheckDouble} className="rotate-12 text-xs" />
        </div>
      </div>
      <hr className="text-gray-200" />

      <div className="flex items-center gap-2">
        <FontAwesomeIcon
          icon={faGlobe}
          className="p-2 bg-black text-white rounded-full"
        />
        <div
          className="bg-black text-white px-4 py-2 rounded-2xl flex flex-col gap-1 shadow-md
          hover:outline-2 hover:outline-black hover:bg-white hover:text-black transition duration-300
          "
        >
          <div className="text-xs text-gray-400">Global</div>
          <div>
            Lipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada
            lorem et nunc.
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <FontAwesomeIcon
          icon={faPastafarianism}
          className="p-2 bg-indigo-600 text-white rounded-full "
          style={{ width: "14px", height: "14px" }}
        />
        <div className="bg-indigo-600 text-white px-4 py-2 rounded-2xl flex flex-col gap-1 shadow-md hover:outline-2 hover:outline-indigo-600 hover:bg-white hover:text-indigo-600 transition duration-300">
          <div className="text-xs text-indigo-300">Homeroom Teacher</div>
          <div>
            Lipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada
            lorem et nunc.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Class;
