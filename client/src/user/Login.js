import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContextValue } from "../shared/contextProvider";
import { allActionTypes } from "../shared/reducer";

const Login = () => {
  const [{ user }, dispatch] = useContextValue();
  // id = email@email.com
  // pw = test123
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/profile");
  }, []);

  const submitHandler = async (event) => {
    event.preventDefault();

    const data = new FormData();
    data.append("email", email);
    data.append("password", password);
    await fetch("http://localhost:5000/api/users/login", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        localStorage.setItem("token", JSON.stringify(data.token));
        localStorage.setItem("user", JSON.stringify(data));
        dispatch({ type: allActionTypes.SETUSER, action: data });
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
      <form
        onSubmit={submitHandler}
        className="form-signin p-3"
        style={{
          background: "rgba(34, 34, 34, 0.03) none repeat scroll 0% 0%",
          borderRadius: "7px",
          minWidth: "320px",
        }}
      >
        <img
          className="mb-4"
          src="https://simg.nicepng.com/png/small/63-638330_vine-logo-social-media-icons-red-png.png"
          alt=""
          width="72"
          height="72"
        />
        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
        <label htmlFor="inputEmail" className="sr-only mb-2">
          Email address
        </label>
        <input
          type="email"
          id="inputEmail"
          className="form-control mb-2"
          placeholder="Email address"
          required=""
          autoFocus=""
          onChange={(event) => setemail(event.target.value)}
          value={email}
        />
        <label htmlFor="inputPassword" className="sr-only mb-2">
          Password
        </label>
        <input
          type="password"
          id="inputPassword"
          className="form-control mb-2"
          placeholder="Password"
          required=""
          onChange={(event) => setpassword(event.target.value)}
        />
        <button className="btn btn-lg btn-dark btn-block mt-2" type="submit">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Login;
