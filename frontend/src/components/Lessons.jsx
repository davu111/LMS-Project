import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faFontAwesomeFlag,
  faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons";

export default function Lessons() {
  return (
    <div>
      <div className="shadow-inner p-6 rounded-lg bg-gray-50 flex flex-col gap-2">
        <div className="p-4 bg-white rounded-lg shadow-md h-96 text-sm flex flex-col gap-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-4 text-xs font-medium">
              <div className="bg-indigo-100 px-4 py-2 rounded-lg text-indigo-700">
                All lessons
              </div>
              <div className="text-gray-500">In progress</div>
              <div className="text-gray-500">Completed</div>
            </div>
          </div>
          <div className="flex justify-center items-center gap-2 ">
            <div className="border p-4 flex- min-w-1/2 max-w-1/2 rounded-lg border-gray-200 shadow-xs flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="text-xs text-rose-500 font-medium">
                  Important
                </div>
                {/* <div className="w-1/2 flex items-center gap-2">
                  <div className="w-full bg-indigo-100 rounded-full h-1.5">
                    <div
                      className="bg-indigo-600 h-1.5 rounded-full"
                      style={{ width: "80%" }}
                    ></div>
                  </div>
                  <div className="text-xs text-indigo-400">80%</div>
                </div> */}
              </div>
              <div className="font-semibold text-lg">
                🥊 C.1 Why do we use it?
              </div>
              <div className="flex gap-2 text-xs flex-col">
                <div className=" text-gray-500">
                  Lipsum is simply dummy text of the printing and typesetting
                  industry. Lorem Ipsum has been the industry's standard dummy
                  text ever si...
                </div>
                <div className="flex items-center gap-2 ">
                  <div className="px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                    Math
                  </div>
                  <div className="px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                    Algebra
                  </div>
                  <div className="px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                    Geometry
                  </div>
                </div>
              </div>
              <hr className="text-gray-300" />
              <div className="flex items-center justify-between">
                <div className="w-3/5 flex items-center gap-2">
                  <div className="w-full bg-indigo-100 rounded-full h-1.5">
                    <div
                      className="bg-indigo-600 h-1.5 rounded-full"
                      style={{ width: "80%" }}
                    ></div>
                  </div>
                  <div className="text-xs text-indigo-400">80%</div>
                </div>
                <div className="flex items-center text-xs border border-indigo-600 rounded-2xl px-4 py-2 text-indigo-600 font-medium bg-indigo-100">
                  Continue
                </div>
              </div>
            </div>
            <div className="border p-4 flex- min-w-1/2 max-w-1/2 rounded-lg border-gray-200 shadow-xs flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="text-xs text-rose-500 font-medium">
                  Important
                </div>
                {/* <div className="w-1/2 flex items-center gap-2">
                  <div className="w-full bg-indigo-100 rounded-full h-1.5">
                    <div
                      className="bg-indigo-600 h-1.5 rounded-full"
                      style={{ width: "80%" }}
                    ></div>
                  </div>
                  <div className="text-xs text-indigo-400">80%</div>
                </div> */}
              </div>
              <div className="font-semibold text-lg">
                🥊 C.1 Why do we use it?
              </div>
              <div className="flex gap-2 text-xs flex-col">
                <div className=" text-gray-500">
                  Lipsum is simply dummy text of the printing and typesetting
                  industry. Lorem Ipsum has been the industry's standard dummy
                  text ever si...
                </div>
                <div className="flex items-center gap-2 ">
                  <div className="px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                    Math
                  </div>
                  <div className="px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                    Algebra
                  </div>
                  <div className="px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                    Geometry
                  </div>
                </div>
              </div>
              <hr className="text-gray-300" />
              <div className="flex items-center justify-between">
                <div className="w-3/5 flex items-center gap-2">
                  <div className="w-full bg-indigo-100 rounded-full h-1.5">
                    <div
                      className="bg-indigo-600 h-1.5 rounded-full"
                      style={{ width: "80%" }}
                    ></div>
                  </div>
                  <div className="text-xs text-indigo-400">80%</div>
                </div>
                <div className="flex items-center text-xs border border-indigo-600 rounded-2xl px-4 py-2 text-indigo-600 font-medium bg-indigo-100">
                  Continue
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
