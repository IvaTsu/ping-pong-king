import { useState } from "react";

import NavigationBar from "../components/NavigationBar";
import ProtectedRoute from "./ProtectedRoute";

export default function AddGame(): JSX.Element {
  const [playerA, setPlayerA] = useState("");

  return (
    <ProtectedRoute>
      <>
        <NavigationBar />

        {/* <div className="flex flex-row justify-between items-center w-full">
          <div>
            <label className="label">
              <span className="label-text">PlayerA Name</span>
            </label>
            <label className="input-group">
              <span>Player A</span>
              <input
                type="text"
                placeholder="Search…"
                className="input input-bordered"
              />
              <button className="btn btn-square">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </label>
          </div>

          <div>
            <label className="label">
              <span className="label-text">PlayerB Name</span>
            </label>
            <label className="input-group">
              <span>Player B</span>
              <input
                type="text"
                placeholder="Search…"
                className="input input-bordered"
              />
              <button className="btn btn-square">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </label>
          </div>

          <div>
            <label className="label">
              <span className="label-text">Office</span>
            </label>
            <select className="select select-bordered">
              <option disabled selected>
                Pick office
              </option>
              <option>T-shirts</option>
              <option>Mugs</option>
            </select>
            <button className="btn">Go</button>
          </div>
        </div>
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h3 className="text-xl font-bold">Game results</h3>
            <div>
              <label className="label">
                <span className="label-text">PlayerA Score</span>
              </label>
              <label className="input-group">
                <span>Score</span>
                <input
                  type="text"
                  placeholder="11"
                  className="input input-bordered"
                />
              </label>
            </div>
            <div>
              <label className="label">
                <span className="label-text">PlayerB Score</span>
              </label>
              <label className="input-group">
                <span>Score</span>
                <input
                  type="text"
                  placeholder="8"
                  className="input input-bordered"
                />
              </label>
            </div>
            <button className="btn btn-success mt-4">Create Game</button>
          </div>
        </div> */}
        <div className="flex justify-center items-center">
          <div>
            <label className="label">
              <span className="label-text">PlayerA Name</span>
            </label>
            <label className="input-group">
              <span>Player A</span>
              <input
                type="text"
                placeholder="Search…"
                className="input input-bordered"
                value={playerA}
                onChange={(e) => {
                  setPlayerA(e.currentTarget.value);
                }}
              />
              <button className="btn btn-square">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </label>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-20 ">
          <ul className="steps steps-vertical lg:steps-horizontal">
            <li className="step step-warning step-success">PlayerA</li>
            <li className="step">PlayerB</li>
            <li className="step">Office</li>
            <li className="step">Game Results</li>
          </ul>
        </div>
      </>
    </ProtectedRoute>
  );
}
