/* eslint-disable array-callback-return */
import React, { createContext, useEffect, useReducer } from "react";
import { adminReducer, initialState } from "../reducers/adminReducer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [state, dispatch] = useReducer(adminReducer, initialState);
  const navigate = useNavigate();
  let url = "http://localhost:3005";

  const date = () => {
    const formatTwoDigits = (value) => {
      return value < 10 ? `0${value}` : value;
    };
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}.${
      currentDate.getMonth() + 1
    }.${currentDate.getFullYear()} ${formatTwoDigits(
      currentDate.getHours()
    )}:${formatTwoDigits(currentDate.getMinutes())}:${formatTwoDigits(
      currentDate.getSeconds()
    )}`;
    return formattedDate;
  };
  //user
  const getUsers = async () => {
    const response = await axios.get(`${url}/users`);
    dispatch({ type: "getUsers", payload: await response.data });
  };

  const getUserDetail = async (id) => {
    const response = await axios.get(`${url}/users/?id=${id}`);

    dispatch({ type: "getUserDetail", payload: await response.data[0] });
    dispatch({ type: "userName", payload: await response.data[0].name });
    dispatch({ type: "userSurname", payload: await response.data[0].surName });
    dispatch({
      type: "userUserName",
      payload: await response.data[0].userName,
    });
    dispatch({ type: "userEmail", payload: await response.data[0].email });
    dispatch({ type: "userRol", payload: await response.data[0].userRol });
  };

  const editUser = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    const response = await axios.get(`${url}/users/${userId}`);
    const user = await response.data;
    const newUser = {
      ...user,
      name: state.userName,
      surName: state.userSurname,
      userName: state.userUserName,
      email: state.userEmail,
      userRol: state.userRol,
      userToken: "",
      picture: "",
    };
    await axios.patch(`${url}/users/${userId}`, newUser);
    // dispatch({ type: "login", payload: newUser });
    navigate(`/admin/users`);
  };

  //comment
  const getComments = async () => {
    const response = await axios.get(`${url}/comments`);
    dispatch({ type: "getComments", payload: await response.data });
  };

  //category
  const getCategory = async () => {
    const response = await axios.get(`${url}/categories`);
    dispatch({ type: "getCategory", payload: await response.data });
  };

  //problem
  const getProblem = async () => {
    const response = await axios.get(`${url}/problems`);
    dispatch({ type: "getProblems", payload: await response.data });
  };
  const getProblemDetail = async (id) => {
    const response = await axios.get(`${url}/problems/${Number(id)}`);
    dispatch({ type: "activeProblemDetail", payload: await response.data });
  };

  const deleteProblem = async (id) => {
    const response = await axios.patch(`${url}/problems/${id}`, {
      isDeleted: true,
    });
    if (response.status === 200) {
      dispatch({ type: "problemSil", id });
      navigate(`/admin/problems`);
    }
  };

  useEffect(() => {
    getProblem();
    getCategory();
    getComments();
    getUsers();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AdminContext.Provider
      value={{
        state,
        dispatch,
        deleteProblem,
        getProblemDetail,
        getUserDetail,
        editUser,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContext;
