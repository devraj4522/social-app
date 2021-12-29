import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContextValue } from "../shared/contextProvider";
import { allActionTypes } from "../shared/reducer";
import User from "./User";

function operation(list1, list2, isUnion) {
  var result = [];

  for (var i = 0; i < list1.length; i++) {
    var item1 = list1[i],
      found = false;
    for (var j = 0; j < list2.length && !found; j++) {
      found = item1._id === list2[j]._id;
    }
    if (found === !!isUnion) {
      // isUnion is coerced to boolean
      result.push(item1);
    }
  }
  return result;
}

const Follow = () => {
  const [users, setusers] = useState([]);
  const [following, setFollwing] = useState([]);
  const [{ user }, dispatch] = useContextValue();
  const navigate = useNavigate();

  console.log(users);
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
          //   console.log(res);
          setFollwing(res);
        })
        .catch(() => console.error("Error fetching users"));

      await fetch("http://localhost:5000/api/users/")
        .then((res) => {
          if (!res.ok) throw new Error("Not fetched");
          else {
            return res.json();
          }
        })
        .then((res) => res.users)
        .then((res) => {
          let temp = [];
          res.forEach((element) => {
            if (element._id != user.action._id) {
              temp.push(element);
            }
          });
          //   temp = ;
          if (user) {
            const arr = operation(temp, following);
            console.log(arr);
            setusers(arr);
          }
        })
        .catch(() => console.error("Not able to fetch api"));
    }
  }, [users]);

  const onFollow = async (userId) => {
    // userId, selfUserId;

    await fetch("http://localhost:5000/api/users/follow/", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ selfUserId: user.action._id, userId: userId }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Not fetched users");
        else return res.json();
      })
      .then((result) => {
        console.log(result);
        let temp = users;
        temp.splice(temp.indexOf(result), 1);
        setusers(temp);
      })
      .catch(() => console.error("Not able to fetch api"));
  };

  return (
    <div
      style={{
        margin: 0,
        paddingTop: "2rem",
        fontFamily: "'roboto', sans-serif",
        backgroundColor: "#f2f2f2",
      }}
    >
      <div className="container mt-0" style={{ maxWidth: "550px" }}>
        <div className="row d-flex justify-content-center">
          {users.map((user) => (
            <User key={user._id} {...user} onFollow={onFollow} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Follow;
