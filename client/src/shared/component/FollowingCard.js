import { useEffect, useState } from "react";
import { useContextValue } from "../contextProvider";
import Card from "./Card";

const FollowingCards = () => {
  const [{ user }, dispatch] = useContextValue();
  const [posts, setposts] = useState([]);
  const [clickedlike, setclickedlike] = useState(null);

  useEffect(() => {
    if (user) {
      const form = new FormData();
      form.append("userId", user.action.userId);
      fetch("http://localhost:5000/api/posts", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.action.userId }),
      })
        .then((res) => res.json())
        .then((result) => {
          setposts(result.allPosts);
          setclickedlike(null);
        });
    }
  }, [clickedlike]);

  return (
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
      {posts.map((post) => {
        return <Card id={Card._id} {...post} />;
      })}
    </div>
  );
};

export default FollowingCards;
