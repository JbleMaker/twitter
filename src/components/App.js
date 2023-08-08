import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";
import { getAuth, onAuthStateChanged, updateCurrentUser } from "firebase/auth";

function App() {
  const [init, setInit] = useState(false);
  const [logIn, setLogIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLogIn(true);
        setUserObj(user);
      } else {
        setLogIn(false);
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = async () => {
    await updateCurrentUser(authService, authService.currentUser);
    setUserObj(authService.currentUser);
  };

  return (
    <>
      {init ? (
        <AppRouter refreshUser={refreshUser} logIn={logIn} userObj={userObj} />
      ) : (
        "Initializing..."
      )}
      <footer>&copy; new Twitter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
