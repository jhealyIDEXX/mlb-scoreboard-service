const Constants = require('../src/constants');
const axios = require("axios");


const APP_HOST = `http://localhost:${Constants.LOCALHOST_PORT}`;
const METS_TEAM_ID = 121;
const SPECIAL_DATES = ['2021-04-01', '2021-07-13', '2021-09-11', '2021-11-02', '2022-03-31', '2022-07-21'];

SPECIAL_DATES.forEach(async (date) => {
    urlString = `${APP_HOST}/scoreboard`;
    try {
        let response = await axios.get(urlString, {
            params: {'date': date, 'teamId': METS_TEAM_ID}
        });
        console.log(`Recieved ${response.status} for date: ${date}`);
    } catch (err) {
        console.log(`ERROR: ${err.message}`);
    }
});