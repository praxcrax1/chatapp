import React, {useEffect, useRef,useState} from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { ChatEngine } from "react-chat-engine";
import { auth } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

const Chats = () => {
  
  const didMountRef = useRef(false);
  const history = useHistory();
  const { user } = useAuth();
  const [loading,setLoading] = useState(true);


  const handleLogOut = async() =>{
    await auth.signOut();
    history.push("/")
  }

  const getFile = async(url) =>{
    const response = await fetch(url);
    const data = await response.blob();

    return new File([data],"userPhoto.jpg",{type:'image/jpeg'})
  }

  useEffect(()=>{
    if (!didMountRef.current){
      didMountRef.current = true

      if (!user || user === null) {
        history.push("/")
        return
      }

    axios
      .get("https://api.chatengine.io/users/me", {
        headers: {
          "project-id": process.env.REACT_APP_CHAT_ENGINE_ID,
          "user-name": user.email,
          "user-secret": user.uid,
        },
      })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        let formData = new FormData();
        formData.append("email", user.email);
        formData.append("username", user.email);
        formData.append("secret", user.uid);

        getFile(user.photoURL).then((avatar) => {
          formData.append("avatar", avatar, avatar.name);

          axios
            .post("https://api.chatengine.io/users", formData, {
              headers: {
                "private-key": process.env.REACT_APP_CHAT_ENGINE_KEY,
              },
            })
            .then(() => setLoading(false))
            .catch((error) => console.log("error", error.response));
        });
      });
    }
  },[user,history])

  if(!user || loading) return <div/>

  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">UniChat</div>
        <div className="logout-tab" onClick={handleLogOut}>
          Log Out
        </div>
      </div>
      <ChatEngine
        height="calc(100vh - 66px)"
        projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
}

export default Chats;