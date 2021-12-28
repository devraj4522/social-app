import { useEffect, useState } from "react";
import Header from "./shared/component/Header";
import { useContextValue } from "./shared/contextProvider";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./user/Login";
import Signup from "./user/Signup";
import { allActionTypes } from "./shared/reducer";
import CreatePost from "./post/CreatePost";
import Profile from "./user/Profile";
import Home from "./user/Home";
import Follow from "./user/Follow";

const App = () => {
  const [{ user }, dispatch] = useContextValue();

  const navigate = useNavigate();
  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    console.log(localUser);
    if (localUser) {
      dispatch({ type: allActionTypes.SETUSER, action: localUser });
    } else {
      navigate("/login");
    }
  }, []);

  const HeaderRoutings = (props) => {
    return (
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="follow" element={<Follow />} />
          <Route path="profile" element={<Profile />} />
          <Route path="createpost" element={<CreatePost />} />
        </Route>
      </Routes>
    );
  };

  return (
    <div className="App">
      <HeaderRoutings user={user} />
    </div>
  );
};

export default App;
