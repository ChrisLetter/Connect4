# Connect4

### About the Project

Connect4 is a multiplayer game that - as the name suggests - allows users to play Connect four. The game is fully responsive.

### Tech Stack

Typescript - React - Chakra UI - Socket.io - Redux - Express

### Screenshots

<img src="screenshots/home-page.png?raw=true" width="400"> <img src="screenshots/local-select-names.png?raw=true" width="400"> <img src="screenshots/game1.png?raw=true" width="400"> <img src="screenshots/game2.png?raw=true" width="400"> <img src="screenshots/online-rooms.png?raw=true" width="400"> <img src="screenshots/waiting-for-friends.png?raw=true" width="400">

### How To Run The Project

1. Clone the repo

```bash
  git clone https://github.com/ChrisLetter/Connect4.git
  cd Connect4
```

2. Install the dependencies in the server folder and start the server

```bash
  cd server
  npm install
  nodemon
```

3. Install the dependencies in the client folder and run the app

```bash
  cd client
  npm install
  npm start
```

4. If you want to test the online multiplayer functionality locally, you can do that by visiting the client's url from another browser. If you create a room in one browser and then join that room from another browser, you will be able to simulate the online functionality of the game.
