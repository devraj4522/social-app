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
import Following from "./user/Following";

const App = () => {
  const [{ user }, dispatch] = useContextValue();

  const navigate = useNavigate();
  useEffect(() => {
    let localUserId = JSON.parse(localStorage.getItem("user"));
    if (!localUserId) navigate("/login");
    else localUserId = localUserId.userId;
    console.log(localUserId);
    fetch("http://localhost:5000/api/users/")
      .then((res) => {
        if (!res.ok) throw new Error("Not fetched");
        else {
          return res.json();
        }
      })
      .then((result) => result.users)
      .then((res) => {
        res.forEach((element) => {
          if (element._id == localUserId) {
            const localUser = element;
            dispatch({ type: allActionTypes.SETUSER, action: localUser });
          }
        });
      })
      .catch(() => console.error("Error in fetching users"));
  }, []);

  const HeaderRoutings = (props) => {
    return (
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="follow" element={<Follow />} />
          <Route path="following" element={<Following />} />
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
