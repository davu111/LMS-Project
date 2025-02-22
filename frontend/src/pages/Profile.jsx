// import React from "react";
import "../styles/App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFingerprint, faWifi } from "@fortawesome/free-solid-svg-icons";
import qrtest from "../assets/qr-test.svg";

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
    <div className=" flex gap-4 items-center px-8 py-4">
      <div className="w-full">
        <div className="flex gap-4 ">
          <div className="border p-5 w-1/2 border-gray-200 rounded-lg">
            Card
          </div>
          <div className="border p-5 w-1/4 border-gray-200 rounded-lg">
            Card
          </div>
          <div className="border p-5 w-1/4 border-gray-200 rounded-lg">
            Card
          </div>
        </div>
        <div className="border p-5 w-full mt-4 border-gray-200 rounded-lg">
          big card
        </div>
      </div>
      <div className=" w-3/5">
        <div className="flex flex-col gap-4">
          <div className="border px-3 py-5 border-gray-200 rounded-lg text-sm ">
            <div className="mb-4">Student Card</div>
            <StudentCard />
          </div>
          <div className="border p-5 border-gray-200 rounded-lg">Card</div>
          <div className="border p-5 border-gray-200 rounded-lg">Card</div>
        </div>
      </div>
    </div>
  );
}

function StudentCard() {
  return (
    <>
      <div className="mt-2 w-full h-48 student-card rounded-lg flex flex-col text-white p-7 font-space-mono">
        <div className="flex justify-between ">
          <FontAwesomeIcon icon={faFingerprint} className="text-xl" />
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

export default Profile;
