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

    checkGameForTeam = (game, teamId) => {
        return game.teams.away.team.id == teamId || game.teams.home.team.id == teamId;
    }

    sortScoreboardByTeamId = (scoreboard, teamId) => {
        let newScoreboard = scoreboard;
        newScoreboard.dates[0].games = scoreboard.dates[0].games.sort((a,b) => { 
            return this.checkGameForTeam(a, teamId) ? -1 : this.checkGameForTeam(b, teamId) ? 1 : 0; 
        });

        return newScoreboard;
    }

    validateSchedule = (scheduleRespopnse, teamId) => {
        if(scheduleRespopnse.totalGames == 0 || scheduleRespopnse.totalItems == 0){
            console.log(`No game data returned from MLB API`);
            return false;
        }

        //dont sort the schedule if the provided team isn't playing on that day
        const gamesWithTeam = scheduleRespopnse.dates[0].games.filter((game) => {
            return this.checkGameForTeam(game, teamId);
        });
        if(gamesWithTeam.length == 0){
            console.log(`TeamId: ${teamId} has 0 games for date: ${date}`);
            return false;
        }
        return true;
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
            const scheduleRespopnse = await this.getScoreboardForDate(date);
            return this.validateSchedule(scheduleRespopnse, teamId) ? this.sortScoreboardByTeamId(scheduleRespopnse, teamId) : scheduleRespopnse;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = ScoreboardService;