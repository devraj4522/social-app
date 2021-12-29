import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContextValue } from "../shared/contextProvider";
import User from "./User";

const Following = () => {
  const [users, setusers] = useState([]);
  const [{ user }, dispatch] = useContextValue();
  const navigate = useNavigate();
  // console.log(user);

  useEffect(async () => {
    if (!user) {
      navigate("/login");
    } else {
      await fetch("http://localhost:5000/api/users/following/", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.action._id }),
      })
        .then((res) => {
          if (!res.ok)
            throw new Error("Not able to fetch following users list.");
          else return res.json();
        })
        .then((res) => res.users)
        .then((res) => {
          setusers(res);
        })
        .catch(() => console.error("Error fetching users"));
    }
  }, [users]);

  // const removeFollow = async (userId) => {
  //   // userId, selfUserId;

  //   await fetch("http://localhost:5000/api/users/follow/", {
  //     method: "post",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ selfUserId: user.action._id, userId: userId }),
  //   })
  //     .then((res) => {
  //       if (!res.ok) throw new Error("Not fetched users");
  //       else return res.json();
  //     })
  //     .then((result) => {
  //       console.log(result);
  //       let temp = users;
  //       temp.splice(temp.indexOf(result), 1);
  //       setusers(temp);
  //     })
  //     .catch(() => console.error("Not able to fetch api"));
  // };

  return (
    <div className="container mt-5" style={{ maxWidth: "550px" }}>
      <div className="row d-flex justify-content-center">
        {users.map((user) => (
          <User key={user._id} {...user} />
        ))}
      </div>
    </div>
  );
};

export default Following;
