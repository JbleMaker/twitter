import React, { useEffect, useState } from "react";
import { authService, dbServer } from "fbase";
import { useNavigate } from "react-router-dom";
import {
  collection,
  where,
  query,
  orderBy,
  onSnapshot,
} from "@firebase/firestore";
import { updateProfile } from "@firebase/auth";

const Profile = ({ userObj, refreshUser }) => {
  const navigate = useNavigate();
  const [newName, setNewname] = useState(userObj.displayName);

  const onLogoutClick = () => {
    authService.signOut();
    navigate("/", { replace: true });
  };

  const getMyNewTwip = async () => {
    const newTwip = await query(
      collection(dbServer, "twitter"),
      where("creatorId", "==", userObj.uid),
      orderBy("createdAt", "desc")
    );
    await onSnapshot(newTwip, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        // console.log(doc.id, "=>", doc.data());
        return { id: doc.id, ...doc.data() };
      });
    });
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewname(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newName) {
      await updateProfile(userObj, {
        displayName: newName,
      });
      refreshUser();
    }
  };

  useEffect(() => {
    getMyNewTwip();
  }, []);

  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          onChange={onChange}
          type="text"
          autoFocus
          placeholder="Display Name"
          value={newName}
          className="formInput"
        />
        <input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{
            marginTop: 10,
          }}
        />
      </form>
      <span className="formBtn cancelBtn logOut" onClick={onLogoutClick}>
        Log Out
      </span>
    </div>
  );
};

export default Profile;
