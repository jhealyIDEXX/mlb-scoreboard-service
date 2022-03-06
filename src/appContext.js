const MLbScheduleApi = require('./api/MLBScheduleAPI');
const ScoreboardService = require('./service/ScoreboardService');
const ScoreboardController = require('./controller/ScoreboardController');
const Constants = require('./constants');

const mlbScheduleApi = new MLbScheduleApi(Constants.MLB_STATS_API_HOST);
const scoreboardService = new ScoreboardService(mlbScheduleApi);
const scoreboardController = new ScoreboardController(scoreboardService);

module.exports = {
    mlbScheduleApi,
    scoreboardService,
    scoreboardController
}