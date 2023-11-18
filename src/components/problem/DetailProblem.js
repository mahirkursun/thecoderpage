/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useEffect } from "react";
import Sidebar from "../sidebar/Sidebar";
import "./detail-problem.scss";
import UserContext from "../../context/UserContext";
import { NavLink, useParams } from "react-router-dom";
import image from "../../images/avatar.png";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const DetailProblem = () => {
  const { state, dispatch, writeProblemComment, actionLike, getProblemDetail } =
    useContext(UserContext);

  const { id } = useParams();

  useEffect(() => {
    getProblemDetail(id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return (
    <div id="detail-container">
      <div id="detail-content">
        <div className="detail-aciklama">
          <div className="detail-text">
            Açıklama Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum has been the industry's standard
            dummy
          </div>
          <div className="detail-share-button">
            <button>
              <NavLink className="detail-link" to="/home/createproblem">
                Problem Paylaş
              </NavLink>
            </button>
          </div>
        </div>

        <div className="detail-list-problem">
          <div className="detail-user-picture">
            {state.users.map(
              (user) =>
                user.id === state.activeProblemDetail.userId && (
                  <div key={user.id}>
                    {user.userPicture ? (
                      <img
                        src={"http://localhost:3001/" + user.userPicture}
                        alt="res"
                      />
                    ) : (
                      <img src={image} alt="res" />
                    )}
                    <h3>{user.userName}</h3>
                  </div>
                )
            )}
            <span>{state.activeProblemDetail.createDate}</span>
          </div>
          <div className="detail-problem-detail">
            <div className="detail-problem-head-text">
              {state.activeProblemDetail.isCompleted
                ? "✅ Çözüldü"
                : "❌ Çözüm aranıyor"}

              <h3>{state.activeProblemDetail.problemHead}</h3>
              <br />
              <p>{state.activeProblemDetail.problemContent}</p>
            </div>

            <div className="detail-problem-comment-view">
              <button onClick={() => actionLike(state.activeProblemDetail.id)}>
                {state.activeUser !== null
                  ? state.activeProblemDetail.likesUserId.find(
                      (id) => id === state.activeUser.id
                    )
                    ? "❤️" + state.activeProblemDetail.likesUserId.length
                    : "🤍" + state.activeProblemDetail.likesUserId.length
                  : "🤍" + state.activeProblemDetail.likesUserId.length}
              </button>

              <button>✉️{state.activeProblemDetail.comments.length}</button>
            </div>

            <div className="detail-write-comment">
              <textarea
                value={state.newProblemComment}
                onChange={(e) =>
                  dispatch({
                    type: "newProblemComment",
                    payload: e.target.value,
                  })
                }
                placeholder="Yorum yaz.."
              />
              <button
                onClick={() => writeProblemComment(state.activeProblemDetail)}
              >
                Gönder
              </button>
            </div>
            {state.activeProblemDetail.comments.map((comment) => (
              <div key={comment.id} className="detail-user-comment">
                <div className="detail-comment-user-picture">
                  {state.users.map((user) =>
                    user.id === comment.userId ? (
                      user.userPicture ? (
                        <img
                          key={user.id}
                          src={"http://localhost:3001/" + user.userPicture}
                          alt="res"
                        />
                      ) : (
                        <img key={user.id} src={image} alt="res" />
                      )
                    ) : null
                  )}
                  <h4>
                    {state.users.map((user) =>
                      user.id === comment.userId ? user.userName : null
                    )}
                  </h4>
                  <span>{comment.createDate}</span>
                </div>
              
                <p>{comment.commentContent}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Sidebar />
    </div>
  );
};

export default DetailProblem;
