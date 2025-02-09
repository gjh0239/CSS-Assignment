# CSS-Assignment
Created a snake game for my assignment, using knowledge from beyond the curriculum to achieve A+ for my module

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

<hr/>

# Snake Game

ALL CODE WITHIN GAME_BOARD BELONGS TO JUN HANG (Game_Board.jsx, Game_Board.css, utils.js (code from the internet))

## Board logic

### Grid layout

Since the board is 15 by 15, we can create a list to store
every single grid object (which is 225 objects in total).

### Snake

Create a singly linked list to store the SNAKE with reference
to the PREVIOUS SNAKE square (current: tail, next: tail-1)
since we need to change the position of the last square to the
position of the square right before it (aka moving it forward)

### Fruit

Fruit generation should be handled by a random coords generator
based on available tiles (not currently occupied by a fruit or snake)\
However, assuming that we keep track of each tile in a separate list,
There might be possible performance issues (KEEP TRACK IN DEVELOPMENT!)

## Game Logic

### Snake movement

Snake movement should be governed by event listeners that listen to
user keyboard inputs. There is a bug that the snake will kill itself
if it goes in the opposite direction of where it is currently travelling
in (e.g., if the snake is going left currently, and the user gives a input
such that the snake has to go right immediately, the snake will kill
itself).\
I have tried fixing it with:

```js
  const snakeWillRunIntoItself =
   getOppositeDirection(newDirection) === direction && snakeCells.size > 1;
  // for some reason, it doesn't work, for the same reason that
  // `useInterval` is needed. Specifically, the `direction` and `snakeCells`
  // will currently never reflect their "latest version" when `handleKeydown`
  // is called.
  if (snakeWillRunIntoItself) return;
```

Potetial fix is too performance costly:

```js
import { useRef, useEffect } from 'react';

// ...

const directionRef = useRef(direction);
const snakeCellsRef = useRef(snakeCells);

useEffect(() => {
  directionRef.current = direction;
}, [direction]);

useEffect(() => {
  snakeCellsRef.current = snakeCells;
}, [snakeCells]);

const handleKeydown = e => {
  const newDirection = getDirectionFromKey(e.key);
  const isValidDirection = newDirection !== '';
  if (!isValidDirection) return;
  const snakeWillRunIntoItself =
    getOppositeDirection(newDirection) === directionRef.current && snakeCellsRef.current.size > 1;
  if (snakeWillRunIntoItself) return;
  setDirection(newDirection);
};
```

### Snake growth

If the snake HEAD travels across a tile that is set to a FRUIT, then the
intended mechanic is for the HEAD to overtake that tile and grow a tile at
the END of the snake (TAIL).\
One possible method is to keep a copy of the TAIL grid such that we can simply
re-insert the previous TAIL back into the singly linked list and solve our
issue of growing. This should also prevent bugs but is probably costly performance-wise.

### Game initialisation

We should initialise the board using SET parameters determined by a CONFIG section. Additionally, initialise the snake with LENGTH of 2, at predetermined coordinates. Same goes for the fruit.

### Game over

Handle game over when: there are no more available space to generate a fruit\
Alternatively, we can keep track of that with the SCORE: if SCORE = BOARD_SIZE^2-2, game completed.\
\
In case where the user has LOST, conditions are as follows: SNAKE_HEAD would exit game board in the
next tick ( AFTER direction has been input by user ).\
OR, SNAKE_HEAD runs into a SNAKE tile.\
\
In case of game over, update HIGH_SCORE in local storage

### Game ticks

Game ticks should be handled in this manner:

1. Process user input.
2. Check for collisions ( Game over if true )
3. Tick movement
4. Check for fruit or empty tile.
5. Increment score if required ( fruit ). Also overtake fruit and mutate it to a snake tile.
6. Update board
7. Next loop

In case where 2. fails (after running game over check), end game and reinitialise the board
In case where 5. succeeds increment the score.\
\
To look for where each of the functions (1 till 6) has been implemented, use CTRL+F and search ```FUNCTION <num>```\
E.g., to see where function 3 was implemented, search ```FUNCTION 3```

## Display

### Design Rationale

No particular reason why I chose this colour scheme (Ivan told me to (he likes purple ALLEGEDLY)), but the grind in the centre
looks cool so why not.\
Board size of 15 so I don't die instantly (I'm bad at snake game so testing
was a nightmare). Oh and Ivan also told me to make the inner grid "look" dimmer so yeah there's that too.\
\
As for the individual tiles, I just coloured snakes as green and fruit (it's an APPLE) as red.\
\
As for the output html,

```html
<h1>Score: {score}</h1>
<h1>High Score: {highScore}</h1>
<div className="board">
  {board.map((row, rowIdx) => (
    <div key={rowIdx} className="row">
      {row.map((cellValue, cellIdx) => {
        const className = getCellClassName(
          cellValue,
          foodCell,
          snakeCells,
        );
        return <div key={cellIdx} className={className}></div>;
      })}
    </div>
  ))}
</div>
```

The ```.map((row, IDx) => ( more code ))``` was used to correctly map out the individual cells
and using CSS to style the individual cells into a nice looking square grid.

The ```return <div key={cellIdx} className={className}></div>;``` was used so that the className
could be swapped to ```cell``` if it's neutral, ```cell-green``` if it's a snake tile or ```cell-red```
if it's a fruit tile.
