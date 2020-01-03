import React, { useState } from "react";
import Form from "./form.jsx"

function Login(props) {



  return (
    <div className="login-form">
      <Form name="Login" next={props.next}></Form>
    </div>
  )
}

export default Login