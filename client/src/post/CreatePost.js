import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContextValue } from "../shared/contextProvider";
import { allActionTypes } from "../shared/reducer";

const CreatePost = () => {
  const [{ user }, dispatch] = useContextValue();
  // id = email@email.com
  // pw = test123
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
  }, []);

  const submitHandler = async (event) => {
    event.preventDefault();
    console.log(title, image, desc);
    const data = new FormData();
    data.append("title", "title titletitletitle title");
    data.append("desc", "desc title titletitle");
    data.append("image", image);
    data.append("creator", user.action.userId);

    await fetch("/api/posts/create", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        navigate("/profile");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      className="mt-5"
      style={{
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        width: "100%",
      }}
    >
      <div
        className="form-signin p-3"
        style={{
          background: "rgba(34, 34, 34, 0.03) none repeat scroll 0% 0%",
          borderRadius: "7px",
          minWidth: "350px",
        }}
      >
        <img
          className="mb-4"
          src="https://simg.nicepng.com/png/small/63-638330_vine-logo-social-media-icons-red-png.png"
          alt=""
          width="72"
          height="72"
        />
        <h1 className="h3 mb-3 font-weight-normal">Create Post</h1>
        <label htmlFor="title" className="sr-only text-left mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          className="form-control mb-2"
          placeholder="Titile"
          required=""
          autoFocus=""
          onChange={(event) => setTitle(event.target.value)}
          value={title}
        />
        <label htmlFor="desc" className="sr-only text-left mb-2">
          Description
        </label>
        <input
          type="textarea"
          id="desc"
          className="form-control mb-2"
          placeholder="Description"
          required=""
          autoFocus=""
          onChange={(event) => setDesc(event.target.value)}
          value={desc}
        />
        <label htmlFor="image" className="sr-only text-left mb-2">
          Image
        </label>
        <input
          type="file"
          id="image"
          className="form-control mb-2"
          placeholder="Image"
          required=""
          onChange={(event) => setImage(event.target.files[0])}
        />
        <button
          onClick={submitHandler}
          className="btn btn-lg btn-dark btn-block mt-2"
          type="submit"
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
