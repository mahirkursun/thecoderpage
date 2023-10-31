import { Route, Routes } from "react-router-dom";
import Navi from "./components/navi/Navi";
import LoadingPage from "./components/loading/LoadingPage";
import Main from "./components/main/Main";
import Footer from "./components/footer/Footer";
import Profile from "./components/profile/Profile";
import Login from "./components/login/Login";
import SignUp from "./components/signup/SignUp";
import CreateProblem from "./components/problem/CreateProblem";
import ListProblem from "./components/problem/ListProblem";
import DetailProblem from "./components/problem/DetailProblem";
import "./style.scss";

function App() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<LoadingPage />} />
        <Route path="home" element={<Navi />}>
          <Route path="main" element={<Main />} />
          <Route path="profile" element={<Profile />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="createproblem" element={<CreateProblem />} />
          <Route path="listproblem" element={<ListProblem />} />
          <Route path="detailproblem" element={<DetailProblem />} />
  

        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
