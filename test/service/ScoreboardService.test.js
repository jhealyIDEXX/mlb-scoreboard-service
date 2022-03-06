const expect = require('chai').expect;
const sinon = require("sinon");
const MLBScheduleAPI = require('../../src/api/MLBScheduleAPI');
const ScoreboardService = require('../../src/service/ScoreboardService');
const statsApiMocks = require('../service/statsapiMocks');

describe('Scoreboard Service', async () => {
    const mockScheduleAPIResponse = statsApiMocks.scheduleEndpointMockResponse;
    const mockDoubleHeaderResponse = statsApiMocks.doubleHeaderMockResponse;
    const date = mockScheduleAPIResponse.dates[0].date;
    const doubleHeaderDate = mockDoubleHeaderResponse.dates[0].date;

    const teamId = 121;
    let scoreboardService, mlbScheduleApi, getScheduleStub;

    before(() => {
        mlbScheduleApi = new MLBScheduleAPI();
        getScheduleStub = sinon.stub(mlbScheduleApi, "getSchedule")
            .withArgs(date).returns(mockScheduleAPIResponse)
            .withArgs(doubleHeaderDate).returns(mockDoubleHeaderResponse);

        scoreboardService = new ScoreboardService(mlbScheduleApi);
    });

    it('Should sort the schedule api response so that the passed in team id is on top',  async () => {
        const sortedScoreboard = await scoreboardService.getScoreboardForDateAndTeam(date, teamId);
        expect(sortedScoreboard.dates[0].date, 'sorted scoreboard: date').to.equal(date);
        expect(sortedScoreboard.dates[0].totalGames, 'sorted scoreboard: total games').to.equal(mockScheduleAPIResponse.dates[0].totalGames);
        expect(scoreboardService.checkGameForTeam(sortedScoreboard.dates[0].games[0], teamId), 'provided teamId is in first game').to.be.true;
    });

    /**
     * If both games are in the future, the earlier game should be listed first.
     * If both games are in the past, the games should also be sorted chronologically
     * If if either game is live, that game should be listed first
     * When the first game is live, this is still chronological
     * When the second game is live, the earlier game should appear after the later game
     */
    it('Should sort double headers correctly', async() => {
        const sortedScoreboard = await scoreboardService.getScoreboardForDateAndTeam(doubleHeaderDate, teamId);
        expect(sortedScoreboard.dates[0].date, 'sorted scoreboard: date').to.equal(doubleHeaderDate);
        expect(sortedScoreboard.dates[0].totalGames, 'sorted scoreboard: total games').to.equal(mockDoubleHeaderResponse.dates[0].totalGames);
        expect(scoreboardService.checkGameForTeam(sortedScoreboard.dates[0].games[0], teamId), 'provided teamId is in first game').to.be.true;
    });
});