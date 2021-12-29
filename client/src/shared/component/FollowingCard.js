import { useEffect, useState } from "react";
import { useContextValue } from "../contextProvider";
import Card from "./Card";

const FollowingCards = () => {
  const [{ user }, dispatch] = useContextValue();
  const [posts, setposts] = useState([]);
  const [clickedlike, setclickedlike] = useState(null);
  console.log(user);
  useEffect(() => {
    if (user) {
      const form = new FormData();
      form.append("userId", user.action._id);
      fetch("http://localhost:5000/api/posts", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.action._id }),
      })
        .then((res) => res.json())
        .then((result) => {
          setposts(result.allPosts);
          setclickedlike(null);
        });
    }
  }, []);

  return (
    <div className="body pt-5 mt-5">
      <div
        className="my-5 container mx-auto"
        style={{
          display: "flex",
          flexWrap: "wrap",
          listStyle: "none",
          margin: 0,
          padding: 0,
          justifyContent: "left",
        }}
      >
        {posts &&
          posts.map((post, key) => {
            return <Card key={key} {...post} />;
          })}
      </div>
    </div>
  );
};

export default FollowingCards;
