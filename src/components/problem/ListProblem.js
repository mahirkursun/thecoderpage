
import React, { useContext, useEffect } from "react";
import "./scss/list-problem.scss";
import { NavLink,  } from "react-router-dom";
import UserContext from "../../context/UserContext";
import image from "../../images/avatar.png";
import Problem from "./Problem";
const ListProblem = () => {
  const { state,getProblem } = useContext(UserContext);

  useEffect(() => {
    getProblem(5)
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
            const dateA = new Date(a.createDate);
            const dateB = new Date(b.createDate);
            return dateB - dateA;
          })
          .filter(
            (problem) =>
              !problem.isDeleted
          ).map((problem) => (
            <Problem key={problem.id} problem={problem} />
          ))}

        {
          state.loadMoreButton&& (
            <button
              onClick={ async() =>  getProblem(3,true)}
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
