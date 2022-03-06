const handleError = (res, status, err) => {
    return res.status(status).json({
        message: err 
    });
}

class ScoreboardController {
    constructor(scoreboardService) {
        this.scoreboardService = scoreboardService;
    }
    
    processScoreBoardRequest = async (req, res) => {
        const {teamId, date} = req.query;

        if(this.scoreboardService.isDateValid(date)){
            let payload = await (teamId ? this.scoreboardService.getScoreboardForDateAndTeam(teamId, date) : this.scoreboardService.getScoreboardForDate(date));
            return res.status(200).json(payload);
        } else {
            return handleError(res, 400, 'invalid or missing date query param\n Date is a required paramater, and must be formatted: YYYY-MM-DD')
        }
    }
}

module.exports = ScoreboardController;