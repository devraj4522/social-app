import React, { useEffect, useState } from "react";
import { useContextValue } from "../contextProvider";
import "./Card.css";

const Card = (props) => {
  const [liked, setLiked] = useState(false);
  const [{ user }, dispatch] = useContextValue();

  useEffect(() => {
    if (props.likes) {
      const likes = props.likes;
      likes.forEach((element) => {
        if (element == user.action.userId) {
          setLiked(true);
        }
      });
    }
  }, [liked]);

  const onLike = () => {
    if (user && props._id && !liked) {
      fetch("http://localhost:5000/api/posts/like", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          likerId: user.action.userId,
          postId: props._id,
        }),
      })
        .then((res) => {
          if (!res.ok) throw new Error(res.status);
          return res.json();
        })
        .then((result) => {
          setLiked(true);
        })
        .catch((err) => console.error("error liking"));
    }
    if (liked) {
      fetch("http://localhost:5000/api/posts/unlike", {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          unLikerId: user.action.userId,
          postId: props._id,
        }),
      })
        .then((res) => {
          if (!res.ok) throw new Error(res.status);
          return res.json();
        })
        .then(() => {
          setLiked(false);
        })
        .catch((err) => console.error("error un liking"));
    }
  };

  return (
    <div className="cardcontainer mb-5">
      {
        <div className="photo">
          <img
            src={
              props.image
                ? "http://localhost:5000/" +
                  props.image +
                  "?auto=format%2Ccompress&cs=tinysrgb&dpr=1&w=500"
                : "https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg"
            }
          />
          <div className="photos">Photos</div>
        </div>
      }
      <div className="content">
        <p className="txt4">{props.title}</p>
        <p className="txt5">A city that never sleeps</p>
        <p className="txt2">{props.desc}</p>
      </div>
      <div className="footer">
        <p>
          <a className="waves-effect waves-light btn btn-card" href="#">
            Read More
          </a>
          <a id="heart" onClick={() => onLike()}>
            <span className="like">
              <i
                className={liked ? "fab fa-gratipay marked" : "fab fa-gratipay"}
              ></i>
              Like
            </span>
          </a>
        </p>
        <p className="txt3">
          <i className="far fa-clock"></i>
          {props.likes.length > 0 ? props.likes.length + " Likes" : ""}
          <span className="comments">
            <i className="fas fa-comments"></i>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Card;
