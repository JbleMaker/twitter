import { deleteObject, ref } from "@firebase/storage";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dbServer, storageService } from "fbase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";

const Twip = ({ twipObj, owner }) => {
  const [editing, setEditing] = useState(false);
  const [newTwip, setNewTwip] = useState(twipObj.text);

  const onDel = async () => {
    const ok = window.confirm("글을 삭제하시겠습니까?");
    const fileUrl = twipObj.imgFileUrl;
    if (ok) {
      await deleteDoc(doc(dbServer, `twitter/${twipObj.id}`));
      if (fileUrl) {
        await deleteObject(ref(storageService, fileUrl));
      }
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(twipObj, newTwip);
    await updateDoc(doc(dbServer, `twitter/${twipObj.id}`), {
      text: newTwip,
    });
    setEditing(false);
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewTwip(value);
  };

  return (
    <div className="nweet">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container nweetEdit">
            <input
              type="text"
              placeholder="Edit your twip"
              value={newTwip}
              required
              autoFocus
              onChange={onChange}
              className="formInput"
            />
            <input type="submit" value="update" className="formBtn" />
          </form>
          <button onClick={toggleEditing} className="formBtn cancelBtn">
            cancel
          </button>
        </>
      ) : (
        <>
          <div>
            <h5>{twipObj.text}</h5>
            {twipObj.imgFileUrl && <img src={twipObj.imgFileUrl} alt="" />}

            {owner && (
              <div className="nweet__actions">
                <span onClick={onDel}>
                  <FontAwesomeIcon icon={faTrash} />
                </span>
                <span onClick={toggleEditing}>
                  <FontAwesomeIcon icon={faPencilAlt} />
                </span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
export default Twip;
