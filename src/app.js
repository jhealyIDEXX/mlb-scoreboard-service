const express = require('express');

const express = require('express');
const Constants = require('./constants')

const app = express();

app.use('/scoreboard', require('./routes/scoreboardRoutes'))

const PORT = process.env.SERVER_PORT || Constants.LOCALHOST_PORT
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}/`))

module.exports = app;