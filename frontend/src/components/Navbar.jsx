import { Link } from "react-router-dom";
import "../styles/App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUsers,
  faUserCircle,
  faChartBar,
  faInfoCircle,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  return (
    <nav className=" h-screen w-60 flex flex-col items-start  border py-2 px-4 border-gray-200 border-l-0 border-t-0 border-b-0 text-gray-600">
      <div className="flex items-center w-full text-center align-middle justify-center pt-6">
        <div className="text-logo text-indigo-600 text-2xl">arena</div>
      </div>
      <div className="flex flex-col w-full justify-between h-full font-raleway">
        <div className="pt-16 flex flex-col gap-12 w-full">
          <div>
            <div className=" text-gray-400 mb-4 px-3 text-xs">MAIN MENU</div>
            <ul className="flex flex-col w-full gap-1">
              <li>
                <Link
                  to="/"
                  className=" flex w-full py-2 px-3 rounded-full hover:bg-gray-200 align-middle items-center"
                >
                  <div className="flex items-center pl-1 pr-4">
                    <FontAwesomeIcon icon={faHome} />
                  </div>

                  <div>Home</div>
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="flex w-full py-2 px-3 rounded-full hover:bg-gray-200 align-middle items-center"
                >
                  <div className="flex items-center pl-1 pr-4">
                    <FontAwesomeIcon icon={faUsers} />
                  </div>
                  <div>Forum</div>
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="flex w-full py-2 px-3 rounded-full hover:bg-gray-200 align-middle items-center"
                >
                  <div className="flex items-center pl-1 pr-4">
                    <FontAwesomeIcon icon={faUsers} />
                  </div>
                  <div>Forum</div>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className=" text-gray-400 mb-4 px-3 text-xs">PRIVATE</div>
            <ul className="flex flex-col w-full gap-1">
              <li>
                <Link
                  to="/"
                  className=" flex w-full py-2 px-3 rounded-full hover:bg-gray-200  align-middle items-center"
                >
                  <div className="flex items-center pl-1 pr-4">
                    <FontAwesomeIcon icon={faUserCircle} />{" "}
                  </div>

                  <div className="">Profile</div>
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="flex w-full py-2 px-3 rounded-full hover:bg-gray-200  align-middle items-center"
                >
                  <div className="flex items-center pl-1 pr-4">
                    <FontAwesomeIcon icon={faChartBar} />
                  </div>
                  <div>Status</div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <ul className="flex flex-col w-full ">
            <li>
              <Link
                to="/about"
                className="flex w-full py-2 px-3 rounded-full text-gray-400 hover:text-indigo-600 align-middle items-center"
              >
                <div className="flex items-center pl-1 pr-4">
                  <FontAwesomeIcon icon={faInfoCircle} />
                </div>
                <div>About Us</div>
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="flex w-full py-2 px-3 rounded-full text-gray-400 hover:text-red-700  align-middle items-center"
              >
                <div className="flex items-center pl-1 pr-4">
                  <FontAwesomeIcon icon={faSignOutAlt} />
                </div>
                <div>Log Out</div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
