class ScoreboardService {
    constructor(mlbScheduleApi) {
        this.mlbScheduleApi = mlbScheduleApi;
    }

    isDateValid = (date) => {
        if(!date){
            return false;
        }
        
        const dateStringRegexPattern = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
        return date.match(dateStringRegexPattern);
        
    }

    getSortedScoreboard(teamId){
        return `scoreboard sorted for teamID: ${teamId}`
    }

    getScoreboardForDate = (date) => {
        return 'scoreboard for date';
    } 

    getScoreboardForDateAndTeam = (date, teamId) => {
        scoreboard = this.getScoreboardForDate(date);
        return this.getSortedScoreboard(scoreboard);
    }
}

module.exports = ScoreboardService;