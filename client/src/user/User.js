const toUpperCase = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

const User = (props) => {
  return (
    <div className="col-md-12 m-3">
      <div
        className="card  p-3 py-4"
        style={{ flexDirection: "row", justifyContent: "space-around" }}
      >
        <div
          className="text-center"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAZyFdywMPXJlTpPImDs4x5RkRvjCqAk6tsA&usqp=CAU"
            width="100"
            className="rounded-circle"
          />
          <span className="bg-secondary p-1 px-4 rounded text-white">Pro</span>
        </div>
        <div className="text-center mt-3">
          <h5 className="mt-2 mb-0">{toUpperCase(props.name)}</h5>
          <div className="px-4 mt-1">{props.email}</div>
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
            <button
              className="btn btn-outline-primary px-4"
              onClick={() => props.onFollow(props._id)}
            >
              Follow
            </button>
            <button className="btn btn-primary px-4 ms-3">Profile</button>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
