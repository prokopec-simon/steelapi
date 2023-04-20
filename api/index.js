const express = require("express");
const { HLTV } = require("hltv-next");
const bodyParser = require("body-parser");
const chromium = require("chrome-aws-lambda");
const puppeteer = require("puppeteer");
//const StealthPlugin = require("puppeteer-extra-plugin-stealth");

//puppeteer.use(StealthPlugin());
let browser;
(async () => {
  let exec_path = await chromium.executablePath;

  if (process.env.AWS_EXECUTION_ENV === undefined) {
    console.log("AWS Chromium not found, trying to use local chromium...");
    exec_path = process.env.LOCAL_CHROMIUM;
  }
  browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: exec_path,
    headless: chromium.headless,
  });

  const page = await browser.newPage();
  await page.goto("https://www.google.com");
  console.log(await page.title());
  page.close();
})();

const hltv = HLTV.createInstance({
  loadPage: async (url) => {
    let page = await browser.newPage();
    await page.setViewport({ width: 800, height: 600 });
    await page.goto(url);
    await page.waitForSelector(".navbar");
    let buffer = await page.content();
    await page.close();
    return buffer;
  },
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

const dict = {
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
