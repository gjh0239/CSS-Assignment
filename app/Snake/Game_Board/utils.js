// Jun Hang

import { useEffect, useRef } from "react";

// Copied from https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
// Generates a random integer between min and max (inclusive)
export function randomIntFromInterval(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

// Copied from https://overreacted.io/making-setinterval-declarative-with-react-hooks/
// This hook allows us to use setInterval in a declarative way
export function useInterval(callback, delay) {
	const savedCallback = useRef();

	// Remember the latest callback
	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	// Set up the interval
	useEffect(() => {
		function tick() {
			savedCallback.current();
		}
		if (delay !== null) {
			let id = setInterval(tick, delay);
			return () => clearInterval(id);
		}
	}, [delay]);
}