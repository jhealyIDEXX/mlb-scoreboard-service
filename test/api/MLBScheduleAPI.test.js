const expect = require('chai').expect;
const sinon = require("sinon");
const MLBScheduleAPI = require("../../src/api/MLBScheduleAPI");
const Constants = require("../../src/constants");
const statsApiMocks = require("../service/statsapiMocks");

describe('MLB Schedule API', () => {
    const expectedResponse = statsApiMocks.scheduleEndpointMockResponse;
    const date = expectedResponse.dates[0].date

    let mlbScheduleAPI;
    before(() => {
        mlbScheduleAPI = new MLBScheduleAPI(Constants.MLB_STATS_API_HOST);
    });
    afterEach(() => {
        sinon.reset();
    });

    it('Should return 200 with expected response', async () => {
        try { 
            res = await mlbScheduleAPI.getSchedule(date);
        } catch (err) {
            throw err;
        }
        //Can't compare whole object, too big for mocha
        expect(res.dates[0].date, 'Response payload: date').to.equal(date)
        expect(res.dates[0].totalGames, 'Response payload: totalGames').to.equal(expectedResponse.dates[0].totalGames)
        expect(res.dates[0].totalItems, 'Response payload: totalGames').to.equal(expectedResponse.dates[0].totalItems)
    });
    
});