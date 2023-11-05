/* eslint-disable array-callback-return */
import React, { createContext, useEffect, useReducer } from "react";
import { reducer, initialState } from "../reducer/reducer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { type } from "@testing-library/user-event/dist/type";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();
  let url = "http://localhost:3005";

  const getCategory = async () => {
    const response = await axios.get(`${url}/categories`);
    dispatch({ type: "getCategory", payload: await response.data });
  };

  const getProblem = async () => {
    const response = await axios.get(`${url}/problems`);
    dispatch({ type: "getProblems", payload: await response.data });
  };

  const getComments = async () => {
    const response = await axios.get(`${url}/comments`);
    dispatch({ type: "getComments", payload: await response.data });
  };

  const getUsers = async () => {
    const response = await axios.get(`${url}/users`);
    dispatch({ type: "getUsers", payload: await response.data });
  };

  const createProblem = async (e) => {
    e.preventDefault();
    const newProblem = {
      id: state.problems.length,
      userId: 0,
      categoryId: state.categoryId,
      problemHead: state.problemHead,
      problemContent: state.problemContent,
      commentCount: 0,
      likesUserId: [],
      createDate: "25.11.2023",
    };
    dispatch({type:"createProblem",payload:newProblem})
    await axios.post(`${url}/problems`, newProblem);
    navigate(`/home/detailproblem/${newProblem.id}`);
  };

  const writeProblemComment = async (data) => {
    const newProblemComment = {
      id: state.comments.length,
      problemId: data.id,
      userId: 1,
      commentContent: state.newProblemComment,
      createDate: "25.11.2023",
    };
    
    console.log(state.newProblemComment);
    await axios.post(`${url}/comments`, newProblemComment);
    dispatch({type:"createComment",payload:newProblemComment})
    dispatch({
      type: "newProblemComment",
      payload:"",
    })
    // navigate(`/home/detailproblem/${data.id}`);
    // window.location.reload();
  };

  const actionLike=async(problemId)=>{
    if (state.activeUser)
     {
      const problem = state.problems.find((problem) => problem.id === problemId);
      if(problem && problem.likesUserId && problem.likesUserId.find((id) => id === state.activeUser.id)===state.activeUser.id)
      {
        const response = await axios.get(`${url}/problems?id=${problemId}`);
         const veri= await response.data[0].likesUserId.filter(id => id !== state.activeUser.id)
         await axios.patch(`${url}/problems/${problemId}`, { likesUserId: veri })


      
         const a=()=>{
          const updatedLikesUserId = response.data[0].likesUserId.filter(id => id !== state.activeUser.id)
            return {
              ...problem,
              likesUserId: updatedLikesUserId,
            };
         }
            
       console.log();

         dispatch({type:"activeProblemDetail",payload:a()})


            //  window.location.reload();

      }
    } 
    else {
      alert("lütfen beğenmek için giriş yapınız!")
    }
  }

  useEffect(() => {
    getProblem();
    getCategory();
    getComments();
    getUsers();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DataContext.Provider
      value={{ state, dispatch, createProblem, writeProblemComment,actionLike }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
