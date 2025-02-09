// MING XUAN
'use client';

import React, { useRef, useState } from 'react'; //import dependencies 
import './tictactoe.css'                         //import css styles for game
import circle_icon from '/public/Circle.png'     //import images
import cross_icon from '/public/Cross.png'       //import images
import Image from 'next/image'                   //import Image component from next

let data = ["", "", "", "", "", "", "", "", ""];   //initialize tictactoe board to be empty 

const TicTacToe = () => {
    const titleRef = useRef(null);
    let box1 = useRef(null);
    let box2 = useRef(null);
    let box3 = useRef(null);
    let box4 = useRef(null);
    let box5 = useRef(null);
    let box6 = useRef(null);
    let box7 = useRef(null);
    let box8 = useRef(null);
    let box9 = useRef(null);

    let gameBox = [box1, box2, box3, box4, box5, box6, box7, box8, box9]
    let [count, setCount] = useState(0);    //keep track of number of moves made
    let [lock, setLock] = useState(false);  //lock game if game is over
    const toggle = (e, num) => {            //function to alternate between X and O based on the count
        if (lock) {
            return 0;
        }
        if (count % 2 === 0) {              //if count == even, X's turn
            e.target.innerHTML = `<img src='${cross_icon}' alt='X'>`;
            data[num] = "x";
            setCount(++count);
        }
        else {
            e.target.innerHTML = `<img src='${circle_icon}' alt = 'O'>`;  //O's turn
            data[num] = "o";
            setCount(++count);
        }
        checkWinner();  //check for winner after each move
    }

    const checkWinner = () => {         //check for winner after every move
        if (data[0] === data[1] && data[1] === data[2] && data[2] !== "") {    //for example: if box1's value is equal to 2 and 3 and box 3 is not null, winner is decided
            won(data[2]);
        }
        else if (data[3] === data[4] && data[4] === data[5] && data[5] !== "") {
            won(data[5]);
        }
        else if (data[6] === data[7] && data[7] === data[8] && data[8] !== "") {
            won(data[8]);
        }
        else if (data[0] === data[3] && data[3] === data[6] && data[6] !== "") {
            won(data[6]);
        }
        else if (data[1] === data[4] && data[4] === data[7] && data[7] !== "") {
            won(data[7]);
        }
        else if (data[2] === data[5] && data[5] === data[8] && data[8] !== "") {
            won(data[8]);
        }
        else if (data[0] === data[4] && data[4] === data[8] && data[8] !== "") {
            won(data[8]);
        }
        else if (data[0] === data[1] && data[1] === data[2] && data[2] !== "") {
            won(data[2]);
        }
        else if (data[2] === data[4] && data[4] === data[6] && data[6] !== "") {
            won(data[6]);
        }
    }

    const won = (winner) => {   //function to handle when a player wins
        setLock(true);          //sets lock to true to prevent anymore moves being made
        if (winner === "x") {
            console.log('X is the winner!')
            titleRef.current.innerHTML = 'X is the winner!'
        }
        else {
            console.log('O is the winner!')
            titleRef.current.innerHTML = 'O is the winner!'
        }
    }

    const reset = () => {   //function to reset the game
        setLock(false);     //unlocks the game and clears the board
        data = ["", "", "", "", "", "", "", "", ""];
        titleRef.current.innerHTML = 'Tic Tac Toe Game'
        gameBox.map((e) => {
            e.current.innerHTML = ""
        })
    }

    return (      //renders game board, title and reset button used onClick for user to click on the buttons  
        <div className='container'>
            <h1 className="title" ref={titleRef}>Tic Tac Toe Game</h1>
            <div className="board">
                <div className='row1'>
                    <div className='boxes' ref={box1} onClick={(e) => { toggle(e, 0) }}></div>
                    <div className='boxes' ref={box2} onClick={(e) => { toggle(e, 1) }}></div>
                    <div className='boxes' ref={box3} onClick={(e) => { toggle(e, 2) }}></div>
                </div>
                <div className='row2'>
                    <div className='boxes' ref={box4} onClick={(e) => { toggle(e, 3) }}></div>
                    <div className='boxes' ref={box5} onClick={(e) => { toggle(e, 4) }}></div>
                    <div className='boxes' ref={box6} onClick={(e) => { toggle(e, 5) }}></div>
                </div>
                <div className='row3'>
                    <div className='boxes' ref={box7} onClick={(e) => { toggle(e, 6) }}></div>
                    <div className='boxes' ref={box8} onClick={(e) => { toggle(e, 7) }}></div>
                    <div className='boxes' ref={box9} onClick={(e) => { toggle(e, 8) }}></div>
                </div>
            </div>
            <button className='reset' onClick={() => reset()}>Reset</button>
        </div>
    )
}

export default TicTacToe