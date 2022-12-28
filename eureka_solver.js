function smallestMoves(tube_1, tube_2, tube_3, final_tube_1, final_tube_2, final_tube_3) {
  // Create a queue to store the tubes at each step of the search
  const queue = [];
  // Create a set to store the tubes that have been visited
  const visited = new Set();
  // Create a map to store the moves that lead to each tube configuration
  const moves = new Map();

  // Push the initial tube configuration into the queue
  queue.push([tube_1, tube_2, tube_3]);
  // Set the initial move to an empty string
  moves.set(JSON.stringify([tube_1, tube_2, tube_3]), '');

  // Perform a breadth-first search
  while (queue.length > 0) {
    // Get the current tubes
    const [tube1, tube2, tube3] = queue.shift();

    // Check if the current tubes match the final tubes
    if (match(tube1, tube2, tube3, final_tube_1, final_tube_2, final_tube_3)) {
      // Return the moves that led to the final tube configuration
      return moves.get(JSON.stringify([tube1, tube2, tube3]));
    }

    // Generate all possible next moves
    const nextMoves = [];
    if (tube1.length > 0) {
      // take from tube 1 and give to tube 2
      if (tube2.length < 5) {
        tube2.push(tube1.pop())
        nextMoves.push({"tubes": [tube1.slice(), tube2.slice(), tube3.slice()], "move": "1 -> 2"})
        tube1.push(tube2.pop())
      }
      // take from tube 1 and give to tube 3
      if (tube3.length < 5) {
        tube3.push(tube1.pop())
        nextMoves.push({"tubes": [tube1.slice(), tube2.slice(), tube3.slice()], "move": "1 -> 3"})
        tube1.push(tube3.pop())
      }
    }

    if (tube2.length > 0) {
      // take from tube 2 and give to tube 1
      if (tube1.length < 5) {
        tube1.push(tube2.pop())
        nextMoves.push({"tubes": [tube1.slice(), tube2.slice(), tube3.slice()], "move": "2 -> 1"})
        tube2.push(tube1.pop())
      }
      // take from tube 2 and give to tube 3
      if (tube3.length < 5) {
        tube3.push(tube2.pop())
        nextMoves.push({"tubes": [tube1.slice(), tube2.slice(), tube3.slice()], "move": "2 -> 3"})
        tube2.push(tube3.pop())
      }
    }

    if (tube3.length > 0) {
      // take from tube 3 and give to tube 1
      if (tube1.length < 5) {
        tube1.push(tube3.pop())
        nextMoves.push({"tubes": [tube1.slice(), tube2.slice(), tube3.slice()], "move": "3 -> 1"})
        tube3.push(tube1.pop())
      }
      // take from tube 3 and give to tube 2
      if (tube2.length < 5) {
        tube2.push(tube3.pop())
        nextMoves.push({"tubes": [tube1.slice(), tube2.slice(), tube3.slice()], "move": "3 -> 2"})
        tube3.push(tube2.pop())
      }
    }    
    // Loop through the next moves
    for (const nextMove of nextMoves) {
      // Get the next tube configuration
      const [nextTube1, nextTube2, nextTube3] = nextMove.tubes;

      // Check if the next tube configuration has been visited
      if (!visited.has(JSON.stringify([nextTube1, nextTube2, nextTube3]))) {
        // Mark the next tube configuration as visited
        visited.add(JSON.stringify([nextTube1, nextTube2, nextTube3]));

        // Update the moves map
        moves.set(
          JSON.stringify([nextTube1, nextTube2, nextTube3]),
          moves.get(JSON.stringify([tube1, tube2, tube3])) + nextMove.move + ", "
        );

        // Push the next tube configuration into the queue
        queue.push([nextTube1, nextTube2, nextTube3]);
      }
    }
  }

  // If no solution is found, return an empty string
  return '';
}

// Helper function to check if two tubes match
function match(tube_1, tube_2, tube_3, final_tube_1, final_tube_2, final_tube_3) {
  match_123 = JSON.stringify(tube_1) === JSON.stringify(final_tube_1) && 
  JSON.stringify(tube_2) === JSON.stringify(final_tube_2) && 
  JSON.stringify(tube_3) === JSON.stringify(final_tube_3)

  match_132 = JSON.stringify(tube_1) === JSON.stringify(final_tube_1) &&
  JSON.stringify(tube_2) === JSON.stringify(final_tube_3) && 
  JSON.stringify(tube_3) === JSON.stringify(final_tube_2)
  
  match_213 = JSON.stringify(tube_1) === JSON.stringify(final_tube_2) && 
  JSON.stringify(tube_2) === JSON.stringify(final_tube_1) && 
  JSON.stringify(tube_3) === JSON.stringify(final_tube_3)
  
  match_231 = JSON.stringify(tube_1) === JSON.stringify(final_tube_2) &&
  JSON.stringify(tube_2) === JSON.stringify(final_tube_3) && 
  JSON.stringify(tube_3) === JSON.stringify(final_tube_1)
  
  match_312 = JSON.stringify(tube_1) === JSON.stringify(final_tube_3) &&
  JSON.stringify(tube_2) === JSON.stringify(final_tube_1) && 
  JSON.stringify(tube_3) === JSON.stringify(final_tube_2)
  
  match_321 = JSON.stringify(tube_1) === JSON.stringify(final_tube_3) &&
  JSON.stringify(tube_2) === JSON.stringify(final_tube_2) &&
  JSON.stringify(tube_3) === JSON.stringify(final_tube_1)

  return match_123 || match_132 || match_213 || match_231 || match_312 || match_321
}

tube_1 = ["green"]
tube_2 = ["red", "blue", "green"]
tube_3 = ["blue", "red"]

final_tube_1 = ["green", "blue", "blue"]
final_tube_2 = ["red"]
final_tube_3 = ["red", "green"]

console.log(smallestMoves(tube_1, tube_2, tube_3, final_tube_1, final_tube_2, final_tube_3))