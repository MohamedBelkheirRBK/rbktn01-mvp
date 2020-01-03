import React, { useState } from "react";
import auth from "../requests.js";

function Form(props) {

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  var signUp = ()=>{
    auth(user, pass, props.name)
    .then((response)=>{
      console.log("moving on")
        props.next();
    })
    .catch(()=>{
      setUser("");
      setPass("");
    })
  }

  return (
    <div className="form-sign-up">
    <input type="text" className="form-text" value={user} onChange={e=>setUser(e.target.value)}></input>
    <input type="password" className="form-text" value={pass} onChange={e=>setPass(e.target.value)}></input>
    <button className="btn" onClick={signUp}>{props.name}</button>
  </div>
  )
}

export default Form