const express = require('express')
const { HLTV } = require('hltv-next')
const bodyParser = require('body-parser')
const { gotScraping } = require('got-scraping')

const hltv = HLTV.createInstance({
	loadPage: (url) => gotScraping({ url }).then((res) => res.body)
});

const app = express();
app.use(bodyParser.json());

function createEndpoint(endpoint, func) {
  app.post(endpoint, async (req, res) => {
    try {
      const response = await func(req.body);
      res.json(response);
    } catch (err) {
      res.status(400).send({ error: err.toString(), id: -1 });
    }
  });
}

dict = {
  "/api/getMatch": hltv.getMatch,
  "/api/getMatches": hltv.getMatches,
  "/api/getMatchesStats": hltv.getMatchesStats,
  "/api/getMatchStats": hltv.getMatchStats,
  "/api/getMatchMapStats": hltv.getMatchMapStats,
  "/api/getStreams": hltv.getStreams,
  "/api/getRecentThreads": hltv.getRecentThreads,
  "/api/getTeamRanking": hltv.getTeamRanking,
  "/api/getTeam": hltv.getTeam,
  "/api/getTeamByName": hltv.getTeamByName,
  "/api/getTeamStats": hltv.getTeamStats,
  "/api/getPlayer": hltv.getPlayer,
  "/api/getPlayerByName": hltv.getPlayerByName,
  "/api/getPlayerStats": hltv.getPlayerStats,
  "/api/getPlayerRanking": hltv.getPlayerRanking,
  "/api/getEvents": hltv.getEvents,
  "/api/getEvent": hltv.getEvent,
  "/api/getEventByName": hltv.getEventByName,
  "/api/getPastEvents": hltv.getPastEvents,
  "/api/getResults": hltv.getResults,
  "/api/getNews": hltv.getNews,
  "/api/getRssNews": hltv.getRssNews,
};

for (const [key, value] of Object.entries(dict)) {
  createEndpoint(key, value);
}

app.listen(3000, () => {
  console.log("Listening on port 3000...");
});
