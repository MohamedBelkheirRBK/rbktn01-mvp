import React, { useState } from "react";
import auth from "../requests.js";

function Match(props) {

  const [board, setBoard] = useState([]);
  const [player, setPlayer] = useState(0);
  const [turn, setTurn] = useState()

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
      })
    }
  }

  function ping() {
    auth(null, null, "game", "ping")
    .then(response=>{
      if(response.data.status == "go"){
      setPlayer(response.data.game.turn === response.data.game.player1? 1: 2);
      setBoard(response.data.game.board)
      setTurn(response.data.turn)
      } else {
        setTimeout(ping, 5000)
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