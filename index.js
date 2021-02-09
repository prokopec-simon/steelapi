const HLTV = require('hltv-api').default
const express = require('express')
const { HLTV: HLTV2 } = require("hltv")

const app = express()

app.get('/ranking', async (req, res) => {
//  const ranking= await HLTV2.getTeamRanking()
	const ranking = await HLTV2.getOngoingEvents()
  res.json(ranking)
})

app.get('/ranking/:country', async (req, res) => {
  const parameters = new Object()
  parameters.country = req.params.country
  res.json(await HLTV2.getTeamRanking(parameters))
})

app.get('/ranking/:day/:month/:year', async (req, res) => {
	const parameters = new Object()
	var months = ['january','february','march','april','may','june','july','august','september','october','november','december']
	var date = new Date((new Date(req.params.day + " " + req.params.month + " " + req.params.year)).getTime() + (2 * 60 * 60 * 1000))
		while(date.getDay() != 1) {
			date = new Date(date.getTime() - 86400000)
	}
	parameters.year = date.getFullYear()
	parameters.month = months[date.getMonth()]
	parameters.day = date.getDate()
  res.json(await HLTV2.getTeamRanking(parameters))
})

app.get('/player/:name', async (req, res) => {
  const parameters = new Object()
  parameters.name = req.params.name
  const playerInfo = HLTV2.getPlayerByName(parameters).then(res => {
    return res
	}).catch(err => {return {}})
  res.json(await playerInfo)
})

app.get('/playerstats/:id', async (req, res) => {
  const parameters = new Object()
  parameters.id = req.params.id
  const playerStats = await HLTV2.getPlayerStats(parameters)
  res.json(playerStats)
})

app.get('/upcommingevents', async (req, res) => {
  const upcommingevents = await HLTV2.getEvents()
  res.json(upcommingevents)
})

app.get('/ongoingevents', async (req, res) => {
  const ongoingevents = await HLTV2.getOngoingEvents()
  res.json(ongoingevents)
})

app.get('/event/:id', async (req, res) => {
  const parameters = new Object()
  parameters.id = req.params.id
  const event = await HLTV2.getEvent(parameters)
  res.json(event)
})

app.get('/match/:id', async (req, res) => {
  const parameters = new Object()
  parameters.id = req.params.id
  const match = await HLTV2.getMatch(parameters)
  res.json(match)
})

app.get('/matchstats/:id', async (req, res) => {
  const parameters = new Object()
  parameters.id = req.params.id
  const matchstats = await HLTV2.getMatchStats(parameters)
  res.json(matchstats)
})

app.get('/matchesstats', async (req, res) => {
  const matchesstats = await HLTV2.getMatchesStats({startDate: '2017-07-10', endDate: '2017-07-18'})
  res.json(matchesstats)
})

app.get('/matchmapstats/:id', async (req, res) => {
  const parameters = new Object()
  parameters.id = req.params.id
  const matchmapstats = await HLTV2.getMatchStats(parameters)
  res.json(matchmapstats)
})

app.get('/streams/', async (req, res) => {
  const streams = await HLTV2.getStreams()
  res.json(streams)
})

app.get('/team/:id', async (req, res) => {
  const parameters = new Object()
  parameters.id = req.params.id
  const team = await HLTV2.getTeam(parameters)
  res.json(team)
})

app.get('/teamstats/:id/:currentroster', async (req, res) => {
  const parameters = new Object()
  parameters.currentRosterOnly = req.params.currentroster
  parameters.id = req.params.id
  const teamstats = await HLTV2.getTeamStats(parameters)
  res.json(teamstats)
})

app.get('/teamstats/:id/:currentroster/startdate/:startdate', async (req, res) => {
  const parameters = new Object()
  parameters.currentRosterOnly = req.params.currentroster
  parameters.id = req.params.id
  parameters.startDate = req.params.startdate
  console.log(parameters)
  const teamstats = await HLTV2.getTeamStats(parameters)
  res.json(teamstats)
})

app.get('/teamstats/:id/:currentroster/enddate/:enddate', async (req, res) => {
  const parameters = new Object()
  parameters.currentRosterOnly = req.params.currentroster
  parameters.id = req.params.id
  parameters.EndDate = req.params.enddate
  const teamstats = await HLTV2.getTeamStats(parameters)
  res.json(teamstats)
})

app.get('/teamstats/:id/:currentroster/timeframe/:startdate/:enddate', async (req, res) => {
  const parameters = new Object()
  parameters.currentRosterOnly = req.params.currentroster
  parameters.id = req.params.id
  parameters.startDate = req.params.startdate
  parameters.EndDate = req.params.enddate
  const teamstats = await HLTV2.getTeamStats(parameters)
  res.json(teamstats)
})

var onLogUpdatePrevious
var onLogUpdateCurrent
var onScoreboardUpdatePrevious
var onScoreboardUpdateCurrent

app.get('/scoreboard/:id', async (req, res) => {
		HLTV2.connectToScorebot({
			id: req.params.id, 
			onLogUpdate: (data, done) => {
			if (onLogUpdatePrevious == undefined) {
					onLogUpdatePrevious = data
					fs.writeFile("./scoreboard/" + Date.now() + ".onLogUpdate" + ".json", JSON.stringify(data, null, 4), (err) => {})
				}
				onLogUpdateCurrent = data
				if (onLogUpdatePrevious != onLogUpdateCurrent) {
					console.log("onLogUpdate received")
					fs.writeFile("./scoreboard/" + Date.now() + ".onLogUpdate" + ".json", JSON.stringify(data, null, 4), (err) => {})
					onLogUpdatePrevious = onLogUpdateCurrent
				}
			}, onScoreboardUpdate: (data, done) => {
					if (onScoreboardUpdatePrevious == undefined) {
					onScoreboardUpdatePrevious = data
					fs.writeFile("./scoreboard/" + Date.now() + ".onScoreboardUpdate" + ".json", JSON.stringify(data, null, 4), (err) => {})
					}
				onScoreboardUpdateCurrent = data
				if (onScoreboardUpdatePrevious != onScoreboardUpdateCurrent) {
					console.log("onScoreboardUpdate received")
					fs.writeFile("./scoreboard/" + Date.now() + ".onScoreboardUpdate" + ".json", JSON.stringify(data, null, 4), (err) => {})
					onScoreboardUpdatePrevious = onScoreboardUpdateCurrent
				}
			}, onFullLogUpdate: (data, done) => {
				console.log("onFullLogUpdate received")
//				console.dir(data, {depth: null})
/*				fs.writeFile("./scoreboard/" + Date.now() + ".onFullLogUpdate", JSON.stringify(data, null, 4), (err) => { 
					if (err) { 
				console.log(err)*/
				}
		})
})

//broken
app.get('/playerranking/', async (req, res) => {
//  const parameters = new Object()
//  parameters.startDate = req.params.startdate
//  parameters.endDate = req.params.enddate
  const playerranking = await HLTV2.getPlayerRanking()
//  console.log(playerranking)
  res.json(playerranking)
})

app.get('/', async (req, res) => {
  res.sendFile(__dirname + '/index.html');
})

app.get('/news', async (req, res) => {
  const news = await HLTV.getNews()
  res.json(news)
})

app.get('/results', async (req, res) => {
  const results = await HLTV.getResults()
  res.json(results)
})

app.get('/matches', async (req, res) => {
  const matches = await HLTV.getMatches()
  res.json(matches)
})

app.get('/:matchId(*)', async (req, res) => {
	const { matchId } = req.params
	const stats = await HLTV.getStatsByMatchId(matchId)
	res.json(stats)
})

app.use (function(req, res, next){
    res.setTimeout(500000, function(){
        res.send("Timeout")
    });
    next();
});

app.listen(3000, () => {
  console.log('Listening on port 3000...')
})
