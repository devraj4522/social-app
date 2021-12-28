import React, { useEffect, useState } from "react";
import "./Card.css";

const Card = (props) => {
  return (
    <div class="cardcontainer mb-5">
      <div class="photo">
        <img
          src={
            props.url
              ? props.url + "?auto=format%2Ccompress&cs=tinysrgb&dpr=1&w=500"
              : ""
          }
        />
        <div class="photos">Photos</div>
      </div>
      <div class="content">
        <p class="txt4">{props.title}</p>
        <p class="txt5">A city that never sleeps</p>
        <p class="txt2">{props.desc}</p>
      </div>
      <div class="footer">
        <p>
          <a class="waves-effect waves-light btn" href="#">
            Read More
          </a>
          <a id="heart">
            <span class="like" onClick={() => console.log("liked")}>
              <i class="fab fa-gratipay"></i>Like
            </span>
          </a>
        </p>
        <p class="txt3">
          <i class="far fa-clock"></i>10 Minutes Ago{" "}
          <span class="comments">
            <i class="fas fa-comments"></i>
            {props.likes}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Card;
