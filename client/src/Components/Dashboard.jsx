import { Navigate, resolvePath } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import React, { useEffect, useState } from 'react'
import PlusIcon from "./PlusIcon";
import { MdDelete } from "react-icons/md";
import api from "../API/axios";

const Dashboard = ({children}) => {

  const {isAuthenticated} = useAuth();
  const [todoList,setTodoList] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [newStatus, setNewStatus] = useState("not started");
  const [newCreatedAt, setNewCreatedAt] = useState("");
  const [addError, setAddError] = useState("");

   const userID = isAuthenticated.userID;

    useEffect(()=>{
      getTodoList();
    },[]);
    

    async function getTodoList(){
      try{
        const response = await api.get(`/users/${userID}/todos`,{withCredentials:true});
        setTodoList(response.data.todoList.todoList);
      }
      catch(err){
        setAddError("Failed to load your todos. Please try refreshing the page.");
      }
    }

  // Modal submit handler
  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!newTask) {
      setAddError("Task is required");
      return;
    }
    const todo = {
      task: newTask,
      status: newStatus,
    };
    setShowModal(false);
    setNewTask("");
    setNewStatus("not started");
    setAddError("");

    // Sending newTodo to backend

    try{
      const response = await api.post(`/users/${userID}/todos`, todo, {withCredentials: true});
      const addedTodo = response.data.addedTask;
      
      setTodoList(prev => prev ? [...prev,addedTodo] : [addedTodo]);
    }
    catch(err){
      setAddError(err.response?.data?.message || "Failed to add todo. Please try again.");
    }
  };

  const updateStatus = async (newStatus,index) => {
    try{
      const task = todoList[index].task;
      setTodoList(prev => prev.map((todo,i) => i === index ? {...todo, status:newStatus} : todo));
      
      const response = await api.patch(`/users/${userID}/todos`,{task,status:newStatus},{withCredentials:true});
     }
     catch(err){
       setAddError("Failed to update todo status. Please try again.");
     }
  };

  const handleDelete = async (index) => {
    try{
      const deletedTodo = todoList.find((todo,i) => i === index);
      const newTodoList = todoList.filter((todo,i) => i !== index);
      setTodoList(newTodoList)
      const response = await api.delete(`/users/${userID}/todos`,{params: {task: deletedTodo.task},withCredentials:true});
    }
    catch(err){
      setAddError("Failed to delete todo. Please try again.");
    }
  }


  return (
    <div className="p-2 sm:p-6 relative min-h-screen">
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-gray-800 text-gray-200">
          <thead className="hidden sm:table-header-group">
            <tr>
              <th className="px-2 sm:px-6 py-3 bg-gray-700 text-left text-xs font-semibold uppercase tracking-wider border-b border-gray-700">Task</th>
              <th className="px-2 sm:px-6 py-3 bg-gray-700 text-left text-xs font-semibold uppercase tracking-wider border-b border-gray-700">Status</th>
              <th className="px-2 sm:px-6 py-3 bg-gray-700 text-left text-xs font-semibold uppercase tracking-wider border-b border-gray-700">Created At</th>
              <th className="px-2 sm:px-6 py-3 bg-gray-700 text-left text-xs font-semibold uppercase tracking-wider border-b border-gray-700">Delete</th>
            </tr>
          </thead>
          <tbody className="block sm:table-row-group">
            {todoList && todoList.length > 0 ? (
              todoList.map((todo, index) => (
                <tr key={index} className="hover:bg-gray-700 transition-colors block sm:table-row mb-4 sm:mb-0">
                  <td className="px-2 sm:px-6 py-4 border-b border-gray-700 block sm:table-cell before:content-['Task:'] before:font-bold before:text-gray-400 before:block sm:before:content-none">
                    {todo.task}
                  </td>
                  <td className="px-2 sm:px-6 py-4 border-b border-gray-700 block sm:table-cell before:content-['Status:'] before:font-bold before:text-gray-400 before:block sm:before:content-none">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                      <span
                        className={`${
                          todo.status === 'completed'
                            ? 'bg-green-600'
                            : todo.status === 'in progress'
                            ? 'bg-blue-500'
                            : 'bg-gray-500'
                        } text-white px-2 py-1 rounded-full text-xs font-semibold shadow`}
                        style={{ minWidth: '90px', textAlign: 'center', display: 'inline-block' }}
                      >
                        {todo.status === 'not started' ? 'Not Started' : todo.status === 'in progress' ? 'In Progress' : 'Completed'}
                      </span>
                      <select
                        className="bg-gray-700 text-gray-200 border border-gray-600 rounded px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
                        value={todo.status}
                        onChange={e => {
                          const newStatus = e.target.value;
                          updateStatus(newStatus, index);
                        }}
                      >
                        <option value="not started">Not Started</option>
                        <option value="in progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                  </td>
                  <td className="px-2 sm:px-6 py-4 border-b border-gray-700 block sm:table-cell before:content-['Created:'] before:font-bold before:text-gray-400 before:block sm:before:content-none">
                    {todo.createdAt}
                  </td>
                  <td className="px-2 sm:px-6 py-4 border-b border-gray-700 block sm:table-cell">
                    <button className="w-full sm:w-auto hover:bg-red-400 p-2 rounded" onClick={() => handleDelete(index)}>
                      <MdDelete className="size-6 sm:size-8 mx-auto" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-2 sm:px-6 py-4 text-center text-gray-400">No todos found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="text-center absolute right-2 sm:right-8 bottom-8">
        <p className="text-red-500 text-lg sm:text-xl">{addError}</p>
      </div>

      <button
        className="fixed bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg p-3 sm:p-4 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-400"
        onClick={() => setShowModal(true)}
        aria-label="Add Todo"
      >
        <PlusIcon className="w-6 h-6 sm:w-7 sm:h-7" />
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
          <div className="bg-gray-800 rounded-lg shadow-lg p-4 sm:p-8 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 sm:top-3 sm:right-3 text-gray-400 hover:text-white text-xl sm:text-2xl font-bold focus:outline-none"
              onClick={() => setShowModal(false)}
              aria-label="Close"
              type="button"
            >
              &times;
            </button>
            <h2 className="text-white text-lg sm:text-xl mb-4 font-semibold text-center">Add New Todo</h2>
            <form onSubmit={handleAddTodo} className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm mb-1" htmlFor="task">Task</label>
                <input
                  id="task"
                  type="text"
                  className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter task description"
                  value={newTask}
                  onChange={e => setNewTask(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-1" htmlFor="status">Status</label>
                <select
                  id="status"
                  className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newStatus}
                  onChange={e => setNewStatus(e.target.value)}
                >
                  <option value="not started">Not Started</option>
                  <option value="in progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition duration-200"
              >
                Create
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
