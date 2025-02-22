// import React from "react";
import "../styles/App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFingerprint,
  faWifi,
  faFeatherAlt,
} from "@fortawesome/free-solid-svg-icons";
import qrtest from "../assets/qr-test.svg";
import avt from "../assets/avt.jpeg";
import a02 from "../assets/achivement/a02.svg";
import a01 from "../assets/achivement/a01.svg";
import a03 from "../assets/achivement/a03.svg";

const Profile = () => {
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
        Profile
      </div>
      <div className="border flex ">
        <div className="px-10 bg-amber-100"> stage bar </div>
        <div className="p-3 rounded-full bg-amber-400"></div>
      </div>
    </header>
  );
}

function Body() {
  return (
    <div className=" flex gap-4 px-8 py-4 align-start items-start">
      <div className="w-full">
        <div className="flex gap-4 ">
          <div className="border p-5 w-1/2 border-gray-200 rounded-lg bg-gray-50 text-gray-400">
            Card
          </div>
          <div className="border p-5 w-1/4 border-gray-200 rounded-lg">
            Card
          </div>
          <div className="border p-5 w-1/4 border-gray-200 rounded-lg">
            Card
          </div>
        </div>
        <div className="border p-5 w-full mt-4 border-gray-200 rounded-lg bg-gray-50 text-gray-400">
          Profile
          <ProfileSection />
        </div>
      </div>
      <div className=" w-3/5">
        <div className="flex flex-col gap-4">
          <div className="border px-3 py-5 border-gray-200 rounded-lg text-sm bg-gray-50">
            <div className="mb-4 text-gray-400">Student Card</div>
            <StudentCard />
          </div>
          <div className="border p-5 border-gray-200 rounded-lg bg-gray-50 text-gray-400 text-sm">
            Achievement
            <AchievementCard />
          </div>
          <div className="border p-5 border-gray-200 rounded-lg">Card</div>
        </div>
      </div>
    </div>
  );
}

function StudentCard() {
  return (
    <>
      <div className="mt-2 w-full h-48 student-card rounded-lg flex flex-col text-white p-7 font-space-mono shadow-sm">
        <div className="flex gap-4 align-middle items-center ">
          <FontAwesomeIcon icon={faFingerprint} className="text-xl" />
          <FontAwesomeIcon icon={faFeatherAlt} className="text-lg" />
          <FontAwesomeIcon icon={faWifi} className="rotate-90 " />
        </div>
        <div className="flex w-full align-middle items-center justify-between">
          <div className="flex flex-col mt-4 mb-4">
            <div className="text-gray-300 text-xs">ID</div>
            <div className=" text-xl tracking-widest">440126</div>
          </div>
          <img src={qrtest} alt="Logo" className="w-15 h-12 " />
        </div>

        <div className="flex text-xs justify-between">
          <div className=" flex flex-col justify-center align-middle items-start gap-1">
            <div className="text-gray-300">Name</div>
            <div className=" text-sm">Vu Minh Quy</div>
          </div>
          <div className=" flex gap-8">
            <div className=" flex flex-col justify-center align-middle items-start gap-1">
              <div className="text-gray-300">Grade</div>
              <div className=" text-sm">44-A</div>
            </div>
            <div className=" flex flex-col justify-center align-middle items-start gap-1">
              <div className="text-gray-300">Exp Date</div>
              <div className="text-sm">08/2026</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function ProfileSection() {
  return (
    <div className="border p-5 w-full mt-4 border-gray-200 rounded-lg bg-white text-black">
      <div className="flex gap-4 flex-col">
        <div className="flex gap-4 items-start">
          <div className="border bg-gray-100 px-4 py-4 border-gray-200 rounded-lg w-1/4 flex items-start">
            <img src={avt} alt="baby" className="" />
          </div>
          <div className="w-full flex flex-col gap-2">
            <div className="flex align-middle items-center gap-2">
              <div className="text-gray-400 text-sm min-w-24">Full name</div>
              <div className="border border-gray-200 bg-gray-50 px-4 py-2 rounded-lg text-gray-500 flex-1">
                Vu Minh Quy
              </div>
            </div>
            <div className="flex align-middle items-center gap-2">
              <div className="text-gray-400 text-sm min-w-24">D.O.B</div>
              <div className="border border-gray-200 bg-gray-50 px-4 py-2 rounded-lg text-gray-500 flex-1">
                03/05/2004
              </div>
            </div>
            <div className="flex align-middle items-center gap-2">
              <div className="text-gray-400 text-sm min-w-24">Address</div>
              <div className="border border-gray-200 bg-gray-50 px-4 py-2 rounded-lg text-gray-500 flex-1">
                18 Minh Khai St., Hanoi
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2 flex-col pl-2">
          <div className="flex align-middle items-center gap-2">
            <div className="text-gray-400 text-sm min-w-16">ID</div>
            <div className="border border-gray-200 bg-gray-50 px-4 py-2 rounded-lg text-gray-500 flex-1">
              440126
            </div>
          </div>
          <div className="flex align-middle items-center gap-2">
            <div className="text-gray-400 text-sm min-w-16">Email</div>
            <div className="border border-gray-200 bg-gray-50 px-4 py-2 rounded-lg text-gray-500 flex-1">
              quy.vtm@gmail.com
            </div>
          </div>
          <div className="flex align-middle items-center gap-2">
            <div className="text-gray-400 text-sm min-w-16">Phone</div>
            <div className="border border-gray-200 bg-gray-50 px-4 py-2 rounded-lg text-gray-500 flex-1">
              N/A
            </div>
          </div>
          <div className="flex align-middle items-center gap-2">
            <div className="text-gray-400 text-sm min-w-16">Parent</div>
            <div className="border border-gray-200 bg-gray-50 px-4 py-2 rounded-lg text-gray-500 flex-1">
              Parent name
            </div>
            <div className="border border-gray-200 bg-gray-50 px-4 py-2 rounded-lg text-gray-500 flex-1">
              0327392989
            </div>
          </div>
          <div className="flex align-middle items-center gap-2">
            <div className="text-gray-400 text-sm min-w-16">Parent</div>
            <div className="border border-gray-200 bg-gray-50 px-4 py-2 rounded-lg text-gray-500 flex-1">
              Parent name
            </div>
            <div className="border border-gray-200 bg-gray-50 px-4 py-2 rounded-lg text-gray-500 flex-1">
              0327392989
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AchievementCard() {
  return (
    <div className="border p-3 w-full mt-4 border-gray-200 rounded-lg bg-white text-black flex gap-2">
      <img
        src={a02}
        alt="baby"
        className="w-16 h-16 rounded-full border p-2 border-gray-300 drop-shadow-lg"
      />
      <img
        src={a01}
        alt="baby"
        className="w-16 h-16 rounded-full border p-2 border-gray-300 drop-shadow-lg"
      />
      <img
        src={a03}
        alt="baby"
        className="w-16 h-16 rounded-full border p-2 border-gray-300 drop-shadow-lg"
      />
    </div>
  );
}

export default Profile;
