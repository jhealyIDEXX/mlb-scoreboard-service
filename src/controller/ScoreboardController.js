const scoreboardService = require('../services/scoreboardService');

class ScoreboardController {
    constructor(scoreboardService) {
        this.scoreboardService = scoreboardService;
    }

    processScoreBoardRequest = (req, res) => {
        res.send(this.scoreboardService.getScoreboardForDateAndTeam('mets', 'yesterday'));
    }
}

module.exports = ScoreboardController;

