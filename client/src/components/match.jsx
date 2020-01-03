import React, { useState } from "react";
import auth from "../requests.js";

function Match(props) {
  console.log("rerendered")
  const [board, setBoard] = useState([]);
  const [player, setPlayer] = useState(0);
  const [turn, setTurn] = useState()
  const [myTurn, setMyTurn] = useState(true)

  function buildBoard() {
   return board.map((section, row)=>{
      return (
      <div className="row">
        {
          section.map((box, col)=>{
            return (
              <div className="box" onClick = {()=>{handleClick(row, col)}}>
                {box!=0?(box==1?"X":"O"):""}
              </div>
            )
          })
        }
      </div>
      )
    })
  }

  function handleClick(row, col) {
    if(!board[row][col]) {
      board[row][col] = player;
      auth(null, null, "game", "play", board)
      .then((response)=>{
        console.log(response.data)
        if(response.data.status === "played")
        console.log(response.data.game.board)
        setBoard(response.data.game.board)
        setMyTurn(true)
      })
    }
  }

  function ping() {
    auth(null, null, "game", "ping")
    .then(response=>{
      if(response.data.status === "wait"){
        props.goBack();
      }
      if(response.data.status == "go" && myTurn){
      console.log(response)
      setPlayer(response.data.game.turn === response.data.game.player1? 1: 2);
      setBoard(response.data.game.board)
      setTurn(response.data.turn)
      setMyTurn(false)
      } else {
        setTimeout(ping, 1000)
      }
    })
  }

  ping();

  return (
    <div className="match">
      <div>enjoy your game! {turn}</div>
      {buildBoard()}
    </div>
  )
}

export default Match