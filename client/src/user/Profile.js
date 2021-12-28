import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FollowingCards from "../shared/component/FollowingCard";
import { useContextValue } from "../shared/contextProvider";
import "./Profile.css";

const Profile = () => {
  const [{ user }, dispatch] = useContextValue();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
    if (user) {
      setName(user.action.name);
      setEmail(user.action.email);
    }
  }, [user, name]);

  return (
    <div className="body mt-0 pt-5">
      <div className="container ">
        <div className="row d-flex justify-content-center">
          <div className="col-md-7">
            <div className="card p-3 py-4">
              <div className="text-center">
                <img
                  src="https://i.imgur.com/bDLhJiP.jpg"
                  width="100"
                  className="rounded-circle"
                />
              </div>
              <div className="text-center mt-3">
                <span className="bg-secondary p-1 px-4 rounded text-white">
                  Pro
                </span>
                <h5 className="mt-2 mb-0">{name.toLocaleUpperCase()}</h5>{" "}
                <span>{email}</span>
                <div className="px-4 mt-1">
                  <p className="fonts">
                    Consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi
                    ut aliquip ex ea commodo consequat.{" "}
                  </p>
                </div>
                <ul className="social-list">
                  <li>
                    <i className="fab fa-facebook"></i>
                  </li>
                  <li>
                    <i className="fab fa-dribbble"></i>
                  </li>
                  <li>
                    <i className="fab fa-instagram"></i>
                  </li>
                  <li>
                    <i className="fab fa-linkedin"></i>
                  </li>
                  <li>
                    <i className="fab fa-google"></i>
                  </li>
                </ul>
                <div className="buttons">
                  {" "}
                  <button className="btn btn-outline-primary px-4">
                    Followers
                  </button>{" "}
                  <button className="btn btn-primary px-4 ms-3">
                    Following
                  </button>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FollowingCards />
    </div>
  );
};

export default Profile;
