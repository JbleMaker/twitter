import { dbServer } from "fbase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Twip from "../components/Twip";
import TwipFatory from "../components/TwipFactory";

const Home = ({ userObj }) => {
  // console.log(userObj);

  const [comment, setComment] = useState([]);

  useEffect(() => {
    const q = query(
      collection(dbServer, "twitter"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const twitterArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // console.log(twitterArr);
      setComment(twitterArr);
    });
  }, []);

  return (
    <div className="container">
      <TwipFatory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {comment.map((comment) => (
          <Twip
            key={comment.id}
            twipObj={comment}
            owner={comment.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
