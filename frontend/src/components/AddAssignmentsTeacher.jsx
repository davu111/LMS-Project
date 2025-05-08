import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faPlus } from '@fortawesome/free-solid-svg-icons';

import SearchtoAddModal from './SearchToAddModal';
import Modal from './Modal';
import ScoreAssignment from './ScoreAssignment';

const URL = 'http://localhost:3000/api';
const subjectId = '68196447c90cd9f85bc6f0bd';
const courseId = '662f0d9023c8b8a8a1111111';

function AddAssignmentsTeacher() {
  const [view, setView] = useState({ mode: 'list' }); // "list" hoặc "score"

  const handleViewDetails = (courseId, assignmentId) => {
    setView({ mode: 'score', courseId, assignmentId });
  };

  return (
    <>
      {view.mode === 'score' ? (
        <ScoreAssignment courseId={view.courseId} assignmentId={view.assignmentId} />
      ) : (
        <AssignmentsCard subjectId={subjectId} onViewDetails={handleViewDetails} />
      )}
    </>
  );
}

function AssignmentsCard({ subjectId, onViewDetails }) {
  // const assignments = [
  //   { id: 1, date: '1 day ago', title: 'Title' },
  //   { id: 2, date: '1 day ago', title: 'Title' },
  //   { id: 3, date: '1 day ago', title: 'Title' },
  //   { id: 4, date: '1 day ago', title: 'Title' },
  //   { id: 5, date: '1 day ago', title: 'Title' },
  //   { id: 6, date: '1 day ago', title: 'Title' },
  //   { id: 7, date: '1 day ago', title: 'Title' },
  //   { id: 8, date: '1 day ago', title: 'Title' },
  //   { id: 9, date: '1 day ago', title: 'Title' },
  //   { id: 10, date: '1 day ago', title: 'Title' },
  // ];
  const [assignments, setAssignments] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);
  const emptyAssignments = {
    subjects: null,
    title: '',
    instructions: '',
    assignment: null,
    notes: '',
    timeStart: toLocalDatetimeString(new Date()),
    deadline: toLocalDatetimeString(new Date()),
    change: true,
  };
  const [selectedAssignments, setSelectedAssignments] = useState(emptyAssignments);

  function toLocalDatetimeString(date) {
    const pad = (n) => String(n).padStart(2, '0');

    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1); // getMonth() trả 0-11
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  useEffect(() => {
    axios
      .get(`${URL}/assignment_subjects/getAssignmentSubjectsBySubject/${subjectId}`)
      .then((response) => {
        console.log(response.data);
        setAssignments(response.data);
      })
      .catch((error) => {
        console.error('Error fetching subjects:', error);
      });
  }, [reloadKey]);

  const onImport = (assignmentSubject) => {
    console.log(assignmentSubject);

    const NewAssignmentSubject = {
      ...assignmentSubject,
      subjects: subjectId,
    };

    axios.put(`${URL}/assignment_subjects/createAssignmentSubject`, NewAssignmentSubject).then((res) => {
      console.log(res);
      const savedAssignment = res.data;
      setAssignments([...assignments, savedAssignment]);
      setReloadKey((prev) => prev + 1);
    });

    setIsOpen(false);
  };

  const handleDelete = () => {
    axios
      .delete(`${URL}/assignment_subjects/deleteAssignmentSubject/${isModalOpen}`)
      .then((res) => {
        console.log(res.data);
        setAssignments((prev) => prev.filter((assignment) => assignment._id !== isModalOpen));
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="shadow-inner p-6 rounded-lg bg-gray-50 flex flex-col gap-2">
      <div className="flex flex-wrap items-center justify-start gap-5">
        <div
          className="p-19 border-2 border-dashed border-indigo-500 bor rounded-lg min-w-56 max-w-56 flex flex-col gap-2 
             transition-all duration-300
            hover:bg-white hover:scale-105 cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          <FontAwesomeIcon icon={faPlus} className="text-indigo-500 text-3xl" />
        </div>
        {assignments.map((assignment, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-md min-w-56 max-w-56 flex flex-col gap-2 
            hover:shadow-xl transition-all duration-300 border border-transparent 
            hover:border-indigo-500 hover:scale-105 group"
          >
            <div className="flex items-center justify-between text-sm">
              <div className="text-gray-400 text-xs">
                {new Date(assignment.timeStart).toLocaleString('vi-VN', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                })}
              </div>
              <div
                className="flex gap-2 items-center text-red-200 border rounded px-2 py-1 text-xs opacity-0 group-hover:opacity-100 hover:border-red-500 cursor-pointer transition duration-300 hover:text-red-500"
                onClick={() => setIsModalOpen(assignment._id)}
              >
                <div>Delete</div>
              </div>
              <div className="flex gap-2 items-center text-gray-400 border rounded px-2 py-1 text-xs hover:border-indigo-600 cursor-pointer transition duration-300 hover:text-indigo-600">
                <div>Save</div>
                <FontAwesomeIcon icon={faBookmark} />
              </div>
            </div>
            <div
              className="font-medium cursor-pointer hover:text-indigo-500"
              onClick={() => {
                new Date(assignment.timeStart) <= new Date()
                  ? setSelectedAssignments({ ...assignment, change: false })
                  : setSelectedAssignments({ ...assignment, change: true });
                console.log(assignment);
                setIsOpen(true);
              }}
            >
              {assignment.title}
            </div>
            <div className="text-xs inline-flex gap-2">
              <div className=" px-2 py-1 bg-rose-200 rounded-full text-rose-500">Math</div>
              <div className=" px-2 py-1 bg-emerald-200 rounded-full text-emerald-500">MCQ</div>
            </div>
            <hr className="text-gray-300 my-2" />
            <div className="flex items-center justify-between text-xs">
              <div className="flex gap-0 items-start flex-col">
                <div className="text-sm font-medium">
                  {new Date(assignment.deadline).toLocaleDateString('vi-VN')}
                </div>
                <div className="text-gray-400">
                  {new Date(assignment.deadline).toLocaleTimeString('vi-VN', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                  })}
                </div>
              </div>

              <div
                className=" cursor-pointer border border-indigo-600 text-indigo-600 px-2 py-1 rounded-lg text-xs hover:bg-indigo-600 hover:text-white transition duration-300
              "
                onClick={() => onViewDetails(courseId, assignment._id)}
              >
                View Details
              </div>
            </div>
          </div>
        ))}
      </div>
      {isOpen && (
        <SearchtoAddModal
          onClose={() => setIsOpen(false)}
          onImport={onImport}
          selectedAssignments={selectedAssignments}
          setSelectedAssignments={setSelectedAssignments}
        />
      )}
      {isModalOpen && (
        <Modal
          title={'Delete Assignment'}
          onClose={() => setIsModalOpen(null)}
          handleSubmit={() => handleDelete()}
        />
      )}
    </div>
  );
}

export default AddAssignmentsTeacher;
