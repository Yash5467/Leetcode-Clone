import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleUp,
  faArrowAltCircleUp,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "../component";

function ProblemList() {
  const [problemList, setProblemList] = useState([]);
  const [isDifficulty, setIsDifficulty] = useState(false);
  const [sorting, setSorting] = useState(null);
  const difficulty = [
    { tittle: "Easy" },
    { tittle: "Medium" },
    { tittle: "Hard" },
  ];
  const sortProblems = (key) => {
    const previousProblems = [...problemList];
    previousProblems.sort((a, b) => {
      if (a.difficulty === key) return -1;
      else return 1;
    });

    setProblemList(previousProblems);
  };
  const findProblems = async (e) => {
    const { data: data } = await axios.post(
      import.meta.env.VITE_SERVER_ENDPOINT + "/problem/search",
      { searchKey: e.target.value }
    );
    setProblemList(data.data);
  };
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_SERVER_ENDPOINT + "/problem/get-all")
      .then((data) => setProblemList(data.data.data))
      .then(() => {});
  }, []);

  return (
    <>
      <div className="flex md:px-52 gap-5 mt-5 mb-5">
        <div className="max-w-xs  ">
          <div className="relative flex items-center w-full h-9 rounded-lg focus-within:shadow-lg bg-dark-layer-1 overflow-hidden">
            <div className="grid place-items-center h-full w-9 text-gray-300">
              <FontAwesomeIcon icon={faSearch} />
            </div>

            <input
              onChange={(e) => findProblems(e)}
              className="peer h-full bg-dark-layer-1 w-full outline-none text-sm text-dark-gray-8 pr-2"
              type="text"
              id="search"
              placeholder="Search something.."
            />
          </div>
        </div>
        <div>
          <div
            className="text-sm"
            onClick={() => setIsDifficulty((prev) => !prev)}
          >
            <Button
              onClick={() => setIsDifficulty((prev) => !prev)}
              content={"Difficulty"}
              bg={"dark-layer-1"}
              textBg={"dark-gray-8"}
              icon={faAngleUp}
            />
          </div>
          <div
            className={` z-10 ${
              !isDifficulty ? "hidden" : ""
            } absolute mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-dark-layer-1`}
          >
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
              {difficulty.map((item, index) => (
                <li
                  key={index}
                  onClick={() => {
                    sortProblems(item.tittle);
                    setIsDifficulty((prev) => !prev);
                  }}
                >
                  <span className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-dark-fill-2 dark:hover:text-white">
                    {item.tittle}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="md:px-52">
        <div className="relative overflow-x-auto ">
          <table className="w-full max-w-[80%] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-white dark:bg-dark-layer-2 dark:text-dark-gray-6">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Tittle
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Difficulty
                </th>
                <th scope="col" className="px-6 py-3">
                  Submissions
                </th>
              </tr>
            </thead>
            <tbody>
              {problemList.map((problem, index) => (
                <tr
                  key={index}
                  className="odd:bg-white odd:dark:bg-dark-layer-2 even:bg-dark-fill-3 even:dark:bg-dark-fill-3 "
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {problem.tittle}
                  </th>
                  <td className="px-6 py-4">false</td>
                  <td
                    className={`px-6 py-4 ${
                      problem.difficulty === "Easy"
                        ? "text-dark-green-s"
                        : problem.difficulty === "Medium"
                        ? "text-dark-yellow"
                        : "text-dark-pink"
                    } `}
                  >
                    {problem.difficulty}
                  </td>
                  <td className="px-6 py-4">0</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ProblemList;
