import React, { useState } from "react";

function Form(props) {

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  return (
    <div className="form-sign-up">
    <input type="text" className="form-text" value={user} onChange={e=>setUser(e.target.value)}></input>
    <input type="password" className="form-text" value={pass} onChange={e=>setPass(e.target.value)}></input>
    <button className="btn" onClick={props.next}>{props.name}</button>
  </div>
  )
}

export default Form