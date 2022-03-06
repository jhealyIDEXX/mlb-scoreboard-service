class ScoreboardService {
    constructor(mlbScheduleApi) {
        this.mlbScheduleApi = mlbScheduleApi;
    }

    isDateValid = (date) => {
        if (!date) {
            return false;
        }

        const dateStringRegexPattern = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
        return date.match(dateStringRegexPattern);

    }

    sortScoreboardByTeamId = (scoreboard, teamId) => {
        const checkGameForTeam = (game) => {
            return game.teams.away.team.id == teamId || game.teams.home.team.id == teamId;
        }

        let newScoreboard = scoreboard;
        newScoreboard.dates[0].games = scoreboard.dates[0].games.sort((a,b) => { return checkGameForTeam(a) ? -1 : checkGameForTeam(b) ? 1 : 0; });

        return newScoreboard;
    }

    getScoreboardForDate = async (date) => {
        try {
            const schedule = await this.mlbScheduleApi.getSchedule(date);
            return schedule;
        } catch (err) {
            throw err;
        }
    }

    getScoreboardForDateAndTeam = async (date, teamId) => {
        try {
            const scoreboard = await this.getScoreboardForDate(date);
            return this.sortScoreboardByTeamId(scoreboard, teamId);
        } catch (err) {
            throw err;
        }
    }
}

module.exports = ScoreboardService;