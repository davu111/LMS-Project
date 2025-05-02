import '../styles/App.css';
import { motion } from 'framer-motion';
import { Suspense, lazy } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSort,
  faBroadcastTower,
  faGlobe,
  faCheckDouble,
  faPastafarianism,
  faBriefcase,
  faBookOpen,
  faBell,
  faPersonBooth,
  faChartPie,
} from '@fortawesome/free-solid-svg-icons';

import logoSchool from '../assets/logo-school.svg';

const Announcements = lazy(() => import('../components/Annoucements'));
const Lessons = lazy(() => import('../components/Lessons'));
// const Assignments = lazy(() => import('../components/Assignments'));
const AddAssignmentsTeacher = lazy(() => import('../components/AddAssignmentsTeacher'));
const Notebook = lazy(() => import('../components/Annoucements'));
const Statistics = lazy(() => import('../components/Annoucements'));
const Transcript = lazy(() => import('../components/Transcript'));

function SubjectTeacher() {
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
      <div className="text-2xl font-bold font-raleway text-indigo-700 tracking-widest">Mathematics</div>
      <div className="flex gap-2 align-middle items-center text-indigo-700">
        <img src={logoSchool} alt="Logo" className="w-8 h-8 border rounded-full" />

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

const tabs = [
  { id: 'announcements', icon: faBell, label: 'Announcements' },
  { id: 'lessons', icon: faBookOpen, label: 'Lessons' },
  { id: 'assignments', icon: faBriefcase, label: 'Assignments' },
  { id: 'notebook', icon: faPersonBooth, label: 'My Notebook' },
  { id: 'statistics', icon: faChartPie, label: 'Statistics' },
  { id: 'transcript', icon: faCheckDouble, label: 'Transcript' },
];

function Tabs() {
  const { tab } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <div className="relative p-1 border-gray-300 rounded-lg flex justify-between items-center bg-gray-50 h-12 shadow-inner">
        {tabs.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/subject_teacher/${item.id}`)}
            className="px-4 relative text-sm h-full w-full rounded-lg  flex items-center gap-2 cursor-pointer justify-center"
          >
            {tab === item.id && (
              <motion.div
                layoutId="active-tab"
                className="absolute inset-0 bg-white rounded-lg drop-shadow-md shadow"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}

            <div
              className={`relative flex items-center gap-2 z-10 ${
                tab === item.id ? 'text-indigo-700 transition duration-400' : 'text-gray-400'
              }`}
            >
              <FontAwesomeIcon icon={item.icon} />
              <div>{item.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <Suspense fallback={<div>Loading...</div>}>
          {tab === 'announcements' && <Announcements />}
          {tab === 'lessons' && <Lessons />}
          {tab === 'assignments' && <AddAssignmentsTeacher />}
          {tab === 'notebook' && <Notebook />}
          {tab === 'statistics' && <Statistics />}
          {tab === 'transcript' && <Transcript />}
        </Suspense>
      </div>
    </div>
  );
}

function LeftSection() {
  return (
    <div className="flex flex-col gap-4">
      <Tabs />
    </div>
  );
}

function RightSection() {
  return (
    <div className="flex flex-col gap-4">
      <div className=" px-3 py-5 rounded-lg text-sm bg-gray-50 shadow-inner">
        <SemesterCard />
      </div>
      <div className=" p-5  rounded-lg bg-gray-50 flex flex-col gap-2 shadow-inner">
        <NewAnnouncementsCard />
      </div>
      <div className=" p-5  rounded-lg bg-gray-50 text-gray-400 text-sm shadow-inner">
        {/* <div className="mb-2 ">Exam schedule (optional) </div> */}
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
        <FontAwesomeIcon icon={faGlobe} className="p-2 bg-black text-white rounded-full" />
        <div
          className="bg-black text-white px-4 py-2 rounded-2xl flex flex-col gap-1 shadow-md
          hover:outline-2 hover:outline-black hover:bg-white hover:text-black transition duration-300
          "
        >
          <div className="text-xs text-gray-400">Global</div>
          <div>Lipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada lorem et nunc.</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <FontAwesomeIcon
          icon={faPastafarianism}
          className="p-2 bg-indigo-600 text-white rounded-full "
          style={{ width: '14px', height: '14px' }}
        />
        <div className="bg-indigo-600 text-white px-4 py-2 rounded-2xl flex flex-col gap-1 shadow-md hover:outline-2 hover:outline-indigo-600 hover:bg-white hover:text-indigo-600 transition duration-300">
          <div className="text-xs text-indigo-300">Homeroom Teacher</div>
          <div>Lipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada lorem et nunc.</div>
        </div>
      </div>
    </div>
  );
}

export default SubjectTeacher;
