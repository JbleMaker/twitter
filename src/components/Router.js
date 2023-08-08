import { Routes, Route, HashRouter } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "routes/Profile";
import Navigation from "./Navigation";

const AppRouter = ({ refreshUser, logIn, userObj }) => {
  return (
    <div>
      <HashRouter basename="/">
        {logIn && <Navigation userObj={userObj} />}
        <div
          style={{
            maxWidth: 890,
            width: "100%",
            margin: "0 auto",
            marginTop: 80,
            display: "flex",
            justifyContent: "center",
          }}>
          <Routes>
            {logIn ? (
              <>
                <Route path="/" element={<Home userObj={userObj} />} /> {""}
                <Route
                  path="/profile"
                  element={
                    <Profile userObj={userObj} refreshUser={refreshUser} />
                  }
                />
              </>
            ) : (
              <Route path="/" element={<Auth />} />
            )}
          </Routes>
        </div>
      </HashRouter>
    </div>
  );
};

export default AppRouter;
