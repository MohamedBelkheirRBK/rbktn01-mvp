import React, { useState } from "react";
import auth from "../requests.js";


function Matching(props) {

  function matchUp() {
    console.log("making a request")
    auth(null, null, "game", "ping")
    .then(response=>{
      if (response.data.status == "wait") {
        console.log("got a wait")
        setTimeout(matchUp(), 2000)
      } else {
        console.log("got a match!")
        props.next();
      }
    })
  }

  matchUp();
  return (
    <div className="matching">
      <h1> Loading.... </h1>
    </div>
  )
}

export default Matching