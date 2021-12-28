import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContextValue } from "../shared/contextProvider";
import { allActionTypes } from "../shared/reducer";
import User from "./User";

const Follow = () => {
  const [users, setusers] = useState([]);
  const [{ user }, dispatch] = useContextValue();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      fetch("http://localhost:5000/api/users/")
        .then((res) => {
          if (!res.ok) throw new Error("Not fetched");
          else {
            return res.json();
          }
        })
        .then((res) => res.users)
        .then((res) => {
          let temp = [];
          let following = user.action.follows;
          res.forEach((element) => {
            if (element._id != user.action.userId) {
              if (following) {
                following.forEach((fol) => {
                  if (fol != element._id) {
                    temp.push(element);
                    let tempUser = user;
                    if (!tempUser.follows) tempUser["follows"] = [];
                    tempUser["follows"].push(element);
                    dispatch({
                      type: allActionTypes.SETUSER,
                      action: tempUser,
                    });
                    temp.push(element);
                  }
                });
              } else temp.push(element);
            }
          });
          setusers(temp);
        })
        .catch(() => console.error("Not able to fetch api"));
    }
  }, [user]);

  const onFollow = async (userId) => {
    // userId, selfUserId;

    await fetch("http://localhost:5000/api/users/follow/", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ selfUserId: user.action.userId, userId: userId }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Not fetched users");
        else return res.json();
      })
      .then((result) => {
        console.log(result);
        let temp = users;
        temp = temp.splice(temp.indexOf(result), 1);
        setusers(temp);
      })
      .catch(() => console.error("Not able to fetch api"));
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "550px" }}>
      <div className="row d-flex justify-content-center">
        {users.map((user) => (
          <User key={user._id} {...user} onFollow={onFollow} />
        ))}
      </div>
    </div>
  );
};

export default Follow;
