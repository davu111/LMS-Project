import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

function AssignmentsCard() {
  const assignments = [
    { id: 1, date: "1 day ago", title: "Title" },
    { id: 2, date: "1 day ago", title: "Title" },
    { id: 3, date: "1 day ago", title: "Title" },
    { id: 4, date: "1 day ago", title: "Title" },
    { id: 5, date: "1 day ago", title: "Title" },
    { id: 6, date: "1 day ago", title: "Title" },
    { id: 7, date: "1 day ago", title: "Title" },
    { id: 8, date: "1 day ago", title: "Title" },
    { id: 9, date: "1 day ago", title: "Title" },
    { id: 10, date: "1 day ago", title: "Title" },
  ];

  return (
    <div className="shadow-inner p-6 rounded-lg bg-gray-50 flex flex-col gap-2">
      <div className="flex flex-wrap items-center justify-start gap-5">
        {assignments.map((assignment) => (
          <div
            key={assignment.id}
            className="bg-white p-4 rounded-lg shadow-md min-w-56 max-w-56 flex flex-col gap-2 
            hover:shadow-xl transition-all duration-300 border border-transparent 
            hover:border-indigo-500 hover:scale-105"
          >
            <div className="flex items-center justify-between text-sm">
              <div className="text-gray-400 text-xs">{assignment.date}</div>
              <div className="flex gap-2 items-center text-gray-400 border rounded px-2 py-1 text-xs hover:border-indigo-600 cursor-pointer transition duration-300 hover:text-indigo-600">
                <div>Save</div>
                <FontAwesomeIcon icon={faBookmark} />
              </div>
            </div>
            <div className="font-medium">{assignment.title}</div>
            <div className="text-xs inline-flex gap-2">
              <div className=" px-2 py-1 bg-rose-200 rounded-full text-rose-500">
                Math
              </div>
              <div className=" px-2 py-1 bg-emerald-200 rounded-full text-emerald-500">
                MCQ
              </div>
            </div>
            <hr className="text-gray-300 my-2" />
            <div className="flex items-center justify-between text-xs">
              <div className="flex gap-0 items-start flex-col">
                <div className="text-sm font-medium">18/02/2024</div>
                <div className="text-gray-400">08:00 AM</div>
              </div>

              <div
                className=" cursor-pointer border border-indigo-600 text-indigo-600 px-2 py-1 rounded-lg text-xs hover:bg-indigo-600 hover:text-white transition duration-300
              "
              >
                View Details
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Assignments() {
  return (
    <div>
      {/* <div>📝 Assignments Content (Large Data Here)</div> */}
      <AssignmentsCard />
    </div>
  );
}
