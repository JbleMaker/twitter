import React, { useRef, useState } from "react";
import { uploadString, ref, getDownloadURL } from "@firebase/storage";
import { uuidv4 } from "@firebase/util";
import { dbServer, storageService } from "fbase";
import { addDoc, collection } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const TwipFatory = ({ userObj }) => {
  const [twitter, setTwitter] = useState("");
  const [file, setFile] = useState("");
  const fileInputClear = useRef();

  const onSubmit = async (event) => {
    event.preventDefault();
    //fileUpload, textUpload
    let imgFileUrl = "";
    if (file !== "") {
      const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      await uploadString(fileRef, file, "data_url");
      imgFileUrl = await getDownloadURL(fileRef);
    }
    const newFile = {
      text: twitter,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      imgFileUrl,
    };
    console.log(newFile);
    await addDoc(collection(dbServer, "twitter"), newFile);

    setTwitter("");
    setFile("");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setTwitter(value);
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishEvent) => {
      const {
        currentTarget: { result },
      } = finishEvent;
      setFile(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClearPhoto = () => {
    setFile(null);
  };

  return (
    <form onSubmit={onSubmit} className="factoryForm">
      <div className="factoryInput__container">
        <input
          className="factoryInput__input"
          value={twitter}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="&rarr;" className="factoryInput__arrow" />
      </div>
      <label htmlFor="attach-file" className="factoryInput__label">
        <span>Add photos</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>
      <input
        id="attach-file"
        type="file"
        accept="image/*"
        onChange={onFileChange}
        style={{
          opacity: 0,
        }}
      />
      <input type="submit" value="twitter" />
      {file && (
        <div className="factoryForm__attachment">
          <img
            src={file}
            style={{
              backgroundImage: file,
            }}
            alt=""
          />
          <div className="factoryForm__clear" onClick={onClearPhoto}>
            <span>Remove</span>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      )}
    </form>
  );
};

export default TwipFatory;
