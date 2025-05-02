import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import Ranking from './pages/Ranking';
import Class from './pages/Class';

import AssignmentTeacher from './pages/AssignmentTeacher';
import NewAssignment from './components/NewAssignment';
import AddAssignmentsTeacher from './components/AddAssignmentsTeacher';

// import Subject from "./pages/Subject";
import { Suspense, lazy } from 'react';

// const Subject = lazy(() => import('./pages/Subject'));
const SubjectTeacher = lazy(() => import('./pages/SubjectTeacher'));

function App() {
  return (
    <Router>
      <div className="flex">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/ranking" element={<Ranking />} />
            <Route path="/class" element={<Class />} />
            <Route path="/assignment_teacher" element={<AssignmentTeacher />} />
            <Route path="/assignment_teacher/edit/:id?" element={<NewAssignment />} />
            {/* <Route
              path="/subject"
              element={<Navigate to="/subject/assignments" />}
            />
            <Route
              path="/subject/:tab"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Subject />
                </Suspense>
              }
            /> */}
            <Route path="/subject_teacher" element={<Navigate to="/subject_teacher/assignments" />} />
            <Route
              path="/subject_teacher/:tab"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <SubjectTeacher />
                </Suspense>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
