import React from "react";
import "../style/Style.css";
import { useReducer } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdEditNote } from "react-icons/md";

const initialState = {
  task: "",
  taskList: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "taskChange":
      return { ...state, task: action.payload };
    case "addTask":
      return { ...state, taskList: [...state.taskList, state.task], task: "" };
    case "remove":
      return {
        ...state,
        taskList: [
          ...state.taskList.filter((item, index) => {
            return index !== action.payload;
          }),
        ],
      };
    default:
      return new Error();
  }
};

function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (e) => {
    dispatch({ type: "taskChange", payload: e.target.value });
  };
  const handleAdd = () => {
    if(state.task !== ""){
        dispatch({ type: "addTask" });
    }
  };
  const handleRemove = (index) => {
    dispatch({ type: "remove", payload: index });
  };

  return (
    <div className="container container-fluid mt-5 myContainer">
      <h5 style={{ color: "rgb(210, 75, 61)" }}>Todo List</h5>
      <br />
      <br />
      <div className="addTask">
        <input
          type="text"
          placeholder="Enter a new Task"
          className="input"
          onChange={handleChange}
        />
        <button className="add" onClick={handleAdd}>
          Add
        </button>
      </div>
      <br />
      <ul className="list">
        {state.taskList.map((item, index) => {
          return (
            <li key={index}>
              {item}{" "}
              <span>
                <RiDeleteBin5Line onClick={() => handleRemove(index)} />
                &nbsp;&nbsp;&nbsp;&nbsp;
                
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Home;
