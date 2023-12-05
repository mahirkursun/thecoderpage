import React, { useContext, useEffect } from "react";
import "./scss/profile.scss";
import UserContext from "../../context/UserContext";
import image from "../../images/avatar.png";
import backgrounImage from "../../images/background.JPG";
import { Outlet, useNavigate, useParams } from "react-router-dom";
// import UserProblems from "../problem/UserProblems";
const Profile = () => {
  const navigate = useNavigate();
  const { userName } = useParams();

  const { state, dispatch,getProfilDetail } = useContext(UserContext);


 
  useEffect(() => {
    getProfilDetail(userName.toLowerCase());
    if (state.activeUser !== null) {
      dispatch({ type: "profileName", payload: state.activeUser.name });
      dispatch({ type: "profileSurname", payload: state.activeUser.surName });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.activeUser]);

  return (
    <div className="profile-container">
      <div className="background-image">
        <img src={backgrounImage} alt="Background" />
      </div>
      <div className="profile-menu">
        <div className="picture-name">
        {state.profileDetail && state.profileDetail.userPicture ? (
          <img
            src={"http://localhost:3001/" + state.profileDetail.userPicture}
            alt="res"
          />
        ) : (
          <img src={image} alt="res" />
        )}
        <h1>
          {state.profileDetail && state.profileDetail.name+" "+state.profileDetail.surName}
        </h1>
        </div>
       
       
        <ul>
          <li onClick={() => navigate(`/home/profile/${state.profileDetail.userName}/detail`)}>Hakkında</li>

          <li
            onClick={() =>
              navigate(`/home/profile/${state.profileDetail.userName}/problems`)
            }
          >
            Problemler
          </li>
          {state.activeUser && state.activeUser.userName===state.profileDetail.userName && (
            <li  disabled={state.activeUser.userName} onClick={() => navigate(`/home/profile/${state.activeUser.userName}/edit`)}>
              Profili düzenle
            </li>
          )}
        </ul>
      </div>

      <div className="profile-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
