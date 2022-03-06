class ScoreboardService {
    constructor(mlbScheduleApi) {
        this.mlbScheduleApi = mlbScheduleApi;
    }

    getSortedScoreboard(teamId){
        return `scoreboard sorted for teamID: ${teamId}`
    }

    getScoreboardForDateAndTeam = (date, teamId) => {
        scoreboard = this.mlbScheduleApi.getByDate(date);
        return this.getSortedScoreboard(scoreboard);
    }
}

module.exports = ScoreboardService;