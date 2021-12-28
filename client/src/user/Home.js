import FollowingCards from "../shared/component/FollowingCard";
import "./Home.css";
const Home = () => {
  return (
    <>
      <div className="body">
        <h1 className="txt4" style={{ textAlign: "center" }}>
          Posts
        </h1>
        <FollowingCards />
      </div>
    </>
  );
};
export default Home;
