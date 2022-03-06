const expect = require('chai').expect;
const sinon = require("sinon");
const ScoreboardController = require('../../src/controller/ScoreboardController');
const ScoreboardService = require('../../src/service/ScoreboardService');

describe('Scoreboard Controller unit test', () => {

    const teamId = 121;
    const date = '2021-09-19';
    let getScoreBoardForTeamAndDateStub, getScoreboardForDateStub, scoreboardController;
    let res, status, json;

    beforeEach(() => {
        const scoreboardService = new ScoreboardService();

        getScoreBoardForTeamAndDateStub = sinon.stub(scoreboardService, "getScoreboardForDateAndTeam");
        getScoreboardForDateStub = sinon.stub(scoreboardService, "getScoreboardForDate");
        scoreboardController = new ScoreboardController(scoreboardService);
        getScoreBoardForTeamAndDateStub.withArgs(teamId, date).returns('sorted list');
        getScoreboardForDateStub.withArgs(date).returns('unsorted list');

        status = sinon.stub();
        json = sinon.spy();
        res = { status, json };
        status.returns(res);
    });
    afterEach(() => {
        sinon.reset();
    });

    it('Should return 200 successful and contain sorted list in payload', async () => {
        let req = { query: { "teamId": teamId, "date": date } };
        await scoreboardController.processScoreBoardRequest(req, res);

        expect(getScoreBoardForTeamAndDateStub.calledOnce, 'scoreboardService calls').to.be.true;
        expect(status.args[0][0], 'response status').to.equal(200);
        expect(json.args[0][0], 'response payload').to.equal('sorted list');
    });

    it('Should still return 200 success with unsorted list in payload when missing teamId param', async () => {
        let req = { query: { "date": date } };
        await scoreboardController.processScoreBoardRequest(req, res)
        expect(getScoreboardForDateStub.calledOnce, 'scoreboardService calls').to.be.true;
        expect(status.args[0][0], 'response status').to.equal(200);
        expect(json.args[0][0], 'response payload').to.equal('unsorted list');
    });

    it('Should return 400 error when both query params', async () => {
        let req = { query: {} };
        await scoreboardController.processScoreBoardRequest(req, res)
        expect(status.args[0][0], 'response status').to.equal(400);
        expect(json.args[0][0].message, 'response payload').to.equal('invalid or missing date query param\n Date is a required paramater, and must be formatted: YYYY-MM-DD');
    });

    it('Should return 400 error when sending invalid date', async () => {
        let req = { query: { "teamId": teamId, "date": "oops" } };
        await scoreboardController.processScoreBoardRequest(req, res)
        expect(status.args[0][0], 'nondate response status').to.equal(400);
        expect(json.args[0][0].message, 'nondate response payload').to.equal('invalid or missing date query param\n Date is a required paramater, and must be formatted: YYYY-MM-DD');

        req = { query: { "teamId": teamId, "date": "2022/03/05" } };
        await scoreboardController.processScoreBoardRequest(req, res)
        expect(status.args[0][0], 'yyy/mm/dd response status').to.equal(400);
        expect(json.args[0][0].message, 'yyy/mm/dd response payload').to.equal('invalid or missing date query param\n Date is a required paramater, and must be formatted: YYYY-MM-DD');

        req = { query: { "teamId": teamId, "date": "2022.03.05" } };
        await scoreboardController.processScoreBoardRequest(req, res)
        expect(status.args[0][0], 'yyy.mm.dd response status').to.equal(400);
        expect(json.args[0][0].message, 'yyy.mm.dd response payload').to.equal('invalid or missing date query param\n Date is a required paramater, and must be formatted: YYYY-MM-DD');

    });

});
