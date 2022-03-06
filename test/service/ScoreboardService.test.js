const expect = require('chai').expect;
const sinon = require("sinon");
const MLBScheduleAPI = require('../../src/api/MLBScheduleAPI');
const ScoreboardService = require('../../src/service/ScoreboardService');
const statsApiMocks = require('../service/statsapiMocks');

describe('Scoreboard Service', () => {
    const mockScheduleAPIResponse = statsApiMocks.scheduleEndpointMockResponse;
    const date = mockScheduleAPIResponse.dates[0].date;
    const teamId = 121;
    let scoreboardService, mlbScheduleApi, getScheduleStub;

    before(() => {
        mlbScheduleApi = new MLBScheduleAPI();
        getScheduleStub = sinon.stub(mlbScheduleApi, "getSchedule");
        getScheduleStub.withArgs(date).returns(mockScheduleAPIResponse);
        scoreboardService = new ScoreboardService(mlbScheduleApi);
    });
    afterEach(() => {
        sinon.reset();
    });
    
    const checkGameForTeamId = (game) => {
        return game.teams.away.team.id == teamId || game.teams.home.team.id == teamId;
    } 

    it('Should sort the schedule api response so that the passed in team id is on top',  async () => {
        const sortedScoreboard = await scoreboardService.getScoreboardForDateAndTeam(date, teamId);
        expect(getScheduleStub.calledOnce).to.be.true;
        expect(sortedScoreboard.dates[0].date, 'sorted scoreboard: date').to.equal(date);
        expect(sortedScoreboard.dates[0].totalGames, 'sorted scoreboard: total games').to.equal(mockScheduleAPIResponse.dates[0].totalGames);
        expect(checkGameForTeamId(sortedScoreboard.dates[0].games[0]), 'provided teamId is in first game').to.be.true;
    });
});