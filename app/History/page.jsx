// Jun Heng

import React from 'react';
import './page.css'; // Import your CSS file containing styles

function GameHistory() {
	return (
		<div>
			<h1 id="header">The history of Tic-Tac-Toe and Snake!</h1>

			<h1 className="Header">Tic-Tac-Toe</h1>
			<div id="TicTacToe_information" className="TicTacToe">
				<p><b>History of Tic-Tac-Toe</b></p>
				<p>Its origins can be traced to ancient Egypt, where similar games involving arranging marks on a grid have been found on temple walls.
					The earliest documented version of tic-tac-toe as we know it today can be traced back to the Roman Empire, where it was played on wooden boards with wooden pieces.
					It became particularly well-known in Europe during the Renaissance period, where it was played on paper with pen and ink.
				</p>

				<p><b>Where did the name come from?</b></p>
				<p>
					The early Roman version was known as terni lapilli, or three pebbles at a time. In the mid-1800s,
					Britain used the name noughts and crosses, with nought referring to the O’s (or zeros) used in the game.
					The United States officially adopted the name tic tac toe in the 20th century.
				</p>

				<p><b>Some fun facts!</b></p>
				<ul>
					<li>It is a staple in children's games and is often used as a tool for teaching logic and strategy</li>
					<li>Tic-tac-toe is one of the first games to be implemented in software form</li>
					<li>There are 255,168 possible unique games of tic-tac-toe!</li>
				</ul>
				<img src="Tic-Tac-Toe.png" alt="People playing tic tac toe" height="200" width="300" />
			</div>

			<h1 className="Header">Snake</h1>
			<div id="SnakeGame_information" className="SnakeGame">
				<p><b>History of Snake</b></p>
				<p>One of the earliest versions of the game was developed by Gremlin Industries in 1976 and was titled "Blockade."
					Blockade was a two-player game where each player controlled a snake-like creature that grew longer as it moved.
					The goal was to outmaneuver the opponent and avoid crashing into walls or the opponent's snake.
					The game gained widespread popularity in the late 1990s when it was pre-installed on Nokia mobile phones,
					particularly the Nokia 6110, released in 1997.
				</p>

				<p><b>Some fun facts!</b></p>
				<ul>
					<li>It's often used as a symbol of early mobile gaming and nostalgia for the 1990s.</li>
					<li>Snake is often used as a teaching tool in computer science and programming courses to demonstrate concepts such as game mechanics, collision detection, and algorithm optimization.</li>
					<li>Snake's simple yet challenging gameplay transcends cultural and language barriers, making it a universally enjoyable game that has been played by people of all ages around the world.</li>
				</ul>
				<img src="SnakeGame.png" alt="Snake Game" height="300" width="300" />
			</div>
		</div>
	);
}

export default GameHistory;