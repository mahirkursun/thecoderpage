
import React, { useContext, useEffect } from "react";
import "./scss/list-problem.scss";
import { NavLink,  } from "react-router-dom";
import UserContext from "../../context/UserContext";
import image from "../../images/avatar.png";
import Problem from "./Problem";
const ListProblem = () => {
  const { state,getMoreProblem,getProblem } = useContext(UserContext);

  useEffect(() => {
    getProblem()
    window.scrollTo({ top: 0, behavior: 'smooth' });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.selectedCategory]);
 
  return (
    <div id="list-container">
      <div id="list-content">
        <div className="list-state">
          <div className="list-text">
            Kod yazarken karşılaştığınız sorunları paylaşın, çözümleri birlikte
            bulalım.
          </div>
          <div className="list-share-button">
            <button>
              <NavLink className="list-link" to="/home/createproblem">
                Problem Paylaş
              </NavLink>
            </button>
          </div>
        </div>
        {state.problems.sort((a, b) => {
            const dateA = a.createDate.split(" ")[0].split(".").reverse().join("/") + " " + a.createDate.split(" ")[1];
            const dateB = b.createDate.split(" ")[0].split(".").reverse().join("/") + " " + b.createDate.split(" ")[1];
            return new Date(dateB) - new Date(dateA);
          })
          .filter(
            (problem) =>
              !problem.isDeleted &&
              (problem.categoryId === state.selectedCategory ||
                state.selectedCategory === null)
          ).map((problem) => (
            <Problem key={problem.id} problem={problem} />
          ))}

        {
          state.loadMoreButton&& (
            <button
              onClick={ async() =>  getMoreProblem()}
              className="list-load-more"
            >
              Daha Fazla
            </button>
          )
          }


        {state.problems.length ===0 &&
          <div className="no-problem">
            <div className="list-user-picture">
              <img src={image} alt="res" />
              <h3>Bu kategoride henüz problem paylaşılmamış.</h3>
            </div>
          </div>
          
          }
      </div>
    </div>
  );
};

export default ListProblem;
