/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { useContext } from "react";
import Sidebar from "../sidebar/Sidebar";
import "./list-problem.scss";
import { NavLink, useNavigate } from "react-router-dom";
import DataContext from "../../context/DataContext";
const ListProblem = () => {
  const { state, dispatch } = useContext(DataContext);
  const navigate = useNavigate();
  return (
    <div id="list-container">
      <div id="list-content">
        <div className="list-aciklama">
          <div className="list-text">
            Açıklama Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum has been the industry's standard
            dummy
          </div>
          <div className="list-share-button">
            <button>
              <NavLink className="list-link" to="/home/createproblem">
                Problem Paylaş
              </NavLink>
            </button>
          </div>
        </div>
        {state.problems.map((problem) =>
          problem.categoryId === state.selectedCategory ||
          state.selectedCategory === null ? (
            <div key={problem.id} className="list-problem">
              <div className="list-user-picture">
                <img src="https://media.licdn.com/dms/image/C4D03AQE2WJMTy32AtQ/profile-displayphoto-shrink_200_200/0/1639764302027?e=1704326400&v=beta&t=S3cw8swGln2MV0OR94LgX2l4cHw39_NiXw5Gw1NHf6w" />
                <h3>
                  {state.users.map((user) =>
                    user.id === problem.userId ? user.userName : ""
                  )}
                </h3>
              </div>
              <div className="list-problem-detail">
                <div className="list-problem-head-text">
                  <h3>{problem.problemHead}</h3>
                  <p>
                    {problem.problemContent.slice(0, 150)}
                    <a
                      onClick={() => {
                        navigate(`/home/detailproblem/${problem.id}`);
                        dispatch({
                          type: "viewProblemDetail",
                          payload: problem,
                        });
                      }}
                    >
                      ...Daha fazlası
                    </a>
                  </p>
                </div>

                <div className="list-problem-comment-view">
                  <button>❤️{problem.likeCount}</button>
                  <button>✉️{problem.commentCount}</button>
                </div>

                

                {state.comments
                  .filter((comment) => comment.problemId === problem.id)
                  .slice(0, 2)
                  .map((comment) =>
                    comment.problemId === problem.id ? (
                      <div key={comment.id} className="list-user-comment">
                        <div className="list-comment-user-picture">
                          <img src="https://media.licdn.com/dms/image/C4D03AQE2WJMTy32AtQ/profile-displayphoto-shrink_200_200/0/1639764302027?e=1704326400&v=beta&t=S3cw8swGln2MV0OR94LgX2l4cHw39_NiXw5Gw1NHf6w" />
                          <h4>
                            {state.users.map((user) =>
                              user.id === comment.userId ? user.userName : ""
                            )}
                          </h4>
                        </div>
                        <p>{comment.commentContent}</p>
                      </div>
                    ) : (
                      ""
                    )
                  )}
                <p>
                  {problem.commentCount >= 3
                    ? `+ ${problem.commentCount - 2} yorum daha`
                    : ""}
                </p>
              </div>
            </div>
          ) : (
            ""
          )
        )}
      </div>
      <Sidebar />
    </div>
  );
};

export default ListProblem;
