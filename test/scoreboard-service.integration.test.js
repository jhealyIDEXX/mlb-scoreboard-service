const app = require('../src/app');
const expect = require('chai').expect;
const supertest = require('supertest');
const statsApiMocks = require('./service/statsapiMocks');

const date = '2021-09-19';
const dateWithNoGames = '2021-01-01';
const doubleHeaderDate = statsApiMocks.doubleHeaderMockResponse.dates[0].date;
const teamId = 121;

describe('Scoreboard service API integration tests', async () => {
    it('should return 200 with json data', async () => {
        const urlString = `/scoreboard?date=${date}&teamId=${teamId}`;
        try {
            const res = await supertest(app).get(urlString);
            expect(res.status, 'response status: ').to.equal(200);
            expect(res.body.dates[0].games[0].teams.home.team.id, 'response body, first game:').to.equal(teamId);
        } catch(err) {
            throw err;
        }
    });

    it('should return 200 with json data, even when no games', async() => {
        const urlString = `/scoreboard?date=${dateWithNoGames}&teamId=${teamId}`;
        try {
            const res = await supertest(app).get(urlString);
            expect(res.status, 'response status: ').to.equal(200);
            expect(res.body.totalGames, 'response body, total games:').to.equal(0);
        } catch(err) {
            throw err;
        }
    });

    it('should properly sort double headers', async() => {
        const urlString = `/scoreboard?date=${doubleHeaderDate}&teamId=${teamId}`;
        try { 
            const res = await supertest(app).get(urlString);
            expect(res.status, 'response status: ').to.equal(200);
            expect(res.body.totalGames, 'response body, total games:').to.equal(statsApiMocks.doubleHeaderMockResponse.totalGames);
            const firstGame = res.body.dates[0].games[0];
            const secondGame = res.body.dates[0].games[1];

            expect(firstGame.teams.home.team.id, 'first game teamId').to.equal(teamId);
            expect(secondGame.teams.home.team.id, 'second game teamId').to.equal(teamId);
            expect(Date.parse(firstGame.gameDate), 'first game gameDate').to.be.lessThan(Date.parse(secondGame.gameDate));
        } catch (err) {
            throw err;
        }
    })
})