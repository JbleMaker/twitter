import React from "react";
import { authService } from "fbase";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import AuthForm from "../components/AuthForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGoogle,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const Auth = () => {
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
      // const result = await signInWithPopup(authService, provider);
    } else if (name === "facebook") {
      provider = new FacebookAuthProvider();
      // const result = await signInWithPopup(authService, provider);
    }
    const result = await signInWithPopup(authService, provider);
    console.log(result);
  };

  return (
    <div className="authContainer">
      <FontAwesomeIcon
        icon={faTwitter}
        color={"#04AAFF"}
        size="3x"
        style={{ marginBottom: 30 }}
      />
      <AuthForm />
      <div className="authBtns">
        <button onClick={onSocialClick} name="google" className="authBtn">
          Continue with Google <FontAwesomeIcon icon={faGoogle} />
        </button>
        <button name="facebook" onClick={onSocialClick} className="authBtn">
          Continue with facebook <FontAwesomeIcon icon={faFacebook} />
        </button>
      </div>
    </div>
  );
};

export default Auth;
