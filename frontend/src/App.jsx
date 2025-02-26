import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Ranking from "./pages/Ranking";
import Class from "./pages/Class";
import Subject from "./pages/Subject";

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
            <Route path="/subject" element={<Subject />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
