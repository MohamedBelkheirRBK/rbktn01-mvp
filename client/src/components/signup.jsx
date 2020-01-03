import React, { useState } from "react";
import Form from "./form.jsx"

function Signup(props) {



  return (
    <div className="sign-up-main">
      <div className="sign-up-splash">
        <h1>Tic-Tac-Tac Online</h1>
      </div>
      <div className="form">
        <Form name="signup" next={props.next}/>
      </div>
    </div>
  )
}

export default Signup