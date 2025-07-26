# Getting Started:

This github repository is a very rudimentary, extrememly simple proof of concept for my skills in node.js and web handling. Attached is a number guessing game, whereby a random number will be generated and the user will attempt to correctly guess it.

## Requirements:
- [Node.js](https://nodejs.org/en)
- Ensure server.js and the frontend folder are in the same directory

## Starting server:

- Open Node.js
- Navigate to the directory server.js is stored in
- Run the following line:
  ```
  node server.js
  ```
- Open your browser and navigate to ``` http://localhost:8080 ```

## Description:
To log in, simply click the ```create account``` button and set any username and password. This information is simply stored in a list within the server.js for referencing (i.e. there is no secure handling of this information - again, this is just a demo proof of concept). Then, log into your newly created "account" and begin the game!

This web server is a simple number guessing game, where the server will generate a random number within a given range and the user will have 10 attempts to guess it correctly. after each guess, the server will respond in one of three ways:
- Your guess was too low : ```Guess Higher!```
- Your guess was too high : ```Guess Lower!```
- You are within 3 numbers of the correct guess : ```You're very close!```

After each game, your score will be added to a scoreboard containing your final guess count, the winning number, and whether or not you had won.
