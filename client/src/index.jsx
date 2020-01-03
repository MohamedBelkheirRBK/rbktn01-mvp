import React, { useState } from "react"
import ReactDOM from "react-dom"

import Signup from "./components/signup.jsx"
import Login from "./components/login.jsx"
import Matching from "./components/matching.jsx"
import Match from "./components/match.jsx"

function App() {
  const [view, setView] = useState("login")

  switch(view) {
    case "login":
      return <Login next={()=>{setView("matching")}}/>
    case "matching":
      return <Matching next={()=>{setView("match")}} />
    case "match":
      return <Match goBack = {()=>{setView("login")}}/>
    default:
      return <Signup next={()=>{setView("login")}}/>
  }
}

ReactDOM.render(<App />, document.getElementById("root"))