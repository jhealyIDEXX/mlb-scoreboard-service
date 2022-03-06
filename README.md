# mlb-scoreboard-service
Middleware service that utilizes the MLB Stats API schedule endpoint to sort games for a scoreboard

### Prerequisites
This service is built with node 12, to run the app you will need to install the following: 
- [node 12](https://nodejs.org/es/blog/release/v12.13.0/)
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

### Using the service
1. Follow the [Steps to run](#steps-to-run) to get the service running locally.
2. In a web browser, navigate to https://statsapi.mlb.com/api/v1/teams?season=2021&sportId=1 and inspect the json to find the teamId of your favorite team
3. in postman, curl, or a web browser send a GET request to 
    ```
    http://localhost:3000/scoreboard?date={date}&teamId={teamId}
    ```
    - date: any date you want in yyyy-mm-dd format
    - teamId: the teamId of your favorite team from step 2
    - the default port can be customized in [constants.js](https://github.com/jhealyIDEXX/mlb-scoreboard-service/blob/main/src/constants.js)

## Steps to run
  ```bash
  # download the source code
  git clone https://github.com/jhealyIDEXX/mlb-scoreboard-service
  cd mlb-scoreboard-service
  
  # use Node 12
  nvm use

  # set up your local env in constants.js file
  open open src/constants.js

  # install the dependencies
  npm install

  # run the app!
  npm start
  ```
  
## Steps to test
  ```bash
  # run all tests
  npm test

  # run individual tests 
  mocha test/{testFile}.test.js

  # once you've started the app, you can also run this automated test script:
  node test/testscript.js
  ```
