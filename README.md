# eureka-solver
solves the board game [Dr. Eureka](https://boardgamegeek.com/boardgame/181345/dr-eureka)

the function returns the list of moves that takes you from your current configuration of tubes to the one you are trying to reach with the smallest number of moves

The function takes in 6 arrays, tube_1, tube_2, tube_3, final_tube_1, final_tube_2, and final_tube_3. The tubes (tube_1, tube_2, and tube_3) in total contain 6 balls, which are represented by elements in the arrays, each element being a string named either "red", "blue", or "green". There are 2 red balls, 2 blue balls, and 2 green balls. A tube can contain up to only 5 balls at once. The three tubes can pass along balls from one to another by popping elemtns off themselves and pushing elements into other tubes. For example, if the tubes looked something like this:
```JavaScript
tube_1 = ['green']
tube_2 = ['red', 'green', 'blue']
tube_3 = ['blue', 'red']
```

then one move, which is one transfer of 1 ball from 1 tube to another, might look something like this e.g.: "2 -> 1", which represents the transfer from tube_2 to tube_1, resulting in the following configuration of tubes:

```JavaScript
tube_1 = ['green', 'blue']
tube_2 = ['red', 'green',]
tube_3 = ['blue', 'red']
```

to perform this move, one would pop an element off of tube_2 and push it into tube_1. The function returns a string of moves, which would look something like this: '3 -> 2, 3 -> 1, 2 -> 3, 2 -> 3, 2 -> 1'. The returning sequence of moves must be the smallest list of moves that makes it so that the three tubes match the three final tubes (final_tube_1, final_tube_2, and final_tube_3). To match means the following:

Suppose

```JavaScript
match_123 = JSON.stringify(tube_1) === JSON.stringify(final_tube_1) && JSON.stringify(tube_2) === JSON.stringify(final_tube_2) && JSON.stringify(tube_3) === JSON.stringify(final_tube_3)

match_132 = JSON.stringify(tube_1) === JSON.stringify(final_tube_1) && JSON.stringify(tube_2) === JSON.stringify(final_tube_3) && JSON.stringify(tube_3) === JSON.stringify(final_tube_2)

match_213 = JSON.stringify(tube_1) === JSON.stringify(final_tube_2) && JSON.stringify(tube_2) === JSON.stringify(final_tube_1) && JSON.stringify(tube_3) === JSON.stringify(final_tube_3)

match_231 = JSON.stringify(tube_1) === JSON.stringify(final_tube_2) && JSON.stringify(tube_2) === JSON.stringify(final_tube_3) && JSON.stringify(tube_3) === JSON.stringify(final_tube_1)

match_312 = JSON.stringify(tube_1) === JSON.stringify(final_tube_3) && JSON.stringify(tube_2) === JSON.stringify(final_tube_1) && JSON.stringify(tube_3) === JSON.stringify(final_tube_2)

match_321 = JSON.stringify(tube_1) === JSON.stringify(final_tube_3) && JSON.stringify(tube_2) === JSON.stringify(final_tube_2) && JSON.stringify(tube_3) === JSON.stringify(final_tube_1)
```

Then to match would mean that match_123 or match_132 or match_213 or match_231 or match_312 or match_321 is true.  
