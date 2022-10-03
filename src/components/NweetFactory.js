import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Nweet from "../components/Nweet"
import { dbService, storageService } from "../myBase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
 import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const NweetFactory = ({userObj}) => {
    const [nweet, setNweet] = useState("");
    const [attachment, setAttachment] = useState("");
    const onSubmit = async (e) => {
        if (nweet === "") {
            return;
          }
        e.preventDefault();
        let attachmentUrl = "";
        if(attachment !== ""){
            const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
            const response = await attachmentRef.putString(attachment, "data_url");
            attachmentUrl = await response.ref.getDownloadURL();
        }
        const nweetObj = {
            text: nweet,
            createAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl,
        }
        await dbService.collection("nweets").add(nweetObj);
        setNweet(""); 
        setAttachment("");
    };
    const onChange = (e) => {
        const {target:{value}} = e;
        setNweet(value);   /* 이 코드들은 버튼을 누를때 새로고침이 되지않게함 */
    }
    const onFileChange = (e) => {
        const {target: {files}} = e; /* 1. 파일을 먼저 열고 */
        const theFile = files[0]; /* 2. 첫번째 파일만 받음(input은 하나만 가능) */
        const reader = new FileReader(); /* 3. 리더를 읽고 */
        reader.onloadend = (finishedEvent) => { /* 4. 이벤트 리스너를 추가해 finish로 받음 */
            /* console.log(finishedEvent) *//* 5. 읽는게 끝나면 finishedEvent를 갖게 됨 */
            const {currentTarget:{result}}= finishedEvent;
            setAttachment(result);
        }
        reader.readAsDataURL(theFile); /* 6. 그 다음 readAsDataURL 실행 */
    }
    const onClearAttachment = () => setAttachment("");
    return (
        <form onSubmit={onSubmit} className="factoryForm">
        <div className="factoryInput__container">
          <input
            className="factoryInput__input"
            value={nweet}
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
       {attachment && (
         <div className="factoryForm__attachment">
           <img
             src={attachment}
             style={{
               backgroundImage: attachment,
             }}
           />
           <div className="factoryForm__clear" onClick={onClearAttachment}>
             <span>Remove</span>
             <FontAwesomeIcon icon={faTimes} />
           </div>
         </div>
       )}
     </form>
    )
}
export default NweetFactory;