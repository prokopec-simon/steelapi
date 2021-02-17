const express = require('express')
const { HLTV } = require("hltv")
const fs = require("fs")

const app = express()
const enableWs = require('express-ws')(app)

app.get('/api/matches', async (req, res) => {
  const matches = await HLTV.getMatches()
	fs.writeFile("./cache/matches.json", JSON.stringify(matches, null, 4), (err) => {})
  res.json(matches)
})

app.get('/api/ranking/:country', async (req, res) => {
  const parameters = new Object()
  parameters.country = req.params.country
  res.json(await HLTV.getTeamRanking(parameters))
})

app.get('/api/ranking', async (req, res) => {
	const ranking = await HLTV.getTeamRanking()
  res.json(ranking)
})

app.get('/api/results', async (req, res) => {
	const results = HLTV.getResults({startPage:0,endPage:2})
  res.json(await results)
})

app.get('/api/ranking/:day/:month/:year', async (req, res) => {
	const parameters = new Object()
	var months = ['january','february','march','april','may','june','july','august','september','october','november','december']
	var date = new Date((new Date(req.params.day + " " + req.params.month + " " + req.params.year)).getTime() + (2 * 60 * 60 * 1000))
		while(date.getDay() != 1) {
			date = new Date(date.getTime() - 86400000)
	}
	parameters.year = date.getFullYear()
	parameters.month = months[date.getMonth()]
	parameters.day = date.getDate()
  res.json(await HLTV.getTeamRanking(parameters))
})

app.get('/api/player/:name', async (req, res) => {
  const parameters = new Object()
  parameters.name = req.params.name
  const playerInfo = await HLTV.getPlayerByName(parameters).then(res => {
    return res
	}).catch(err => {return {}})
  res.json(playerInfo)
})

app.get('/api/playerstats/:id', async (req, res) => {
  const parameters = new Object()
  parameters.id = req.params.id
  const playerStats = await HLTV.getPlayerStats(parameters)
  res.json(playerStats)
})

app.get('/api/upcommingevents', async (req, res) => {
  const upcommingevents = await HLTV.getEvents()
  res.json(upcommingevents)
})

app.get('/api/ongoingevents', async (req, res) => {
  const ongoingevents = await HLTV.getOngoingEvents()
  res.json(ongoingevents)
})

app.get('/api/event/:id', async (req, res) => {
  const parameters = new Object()
  parameters.id = req.params.id
  const event = await HLTV.getEvent(parameters)
  res.json(event)
})

app.get('/api/match/:id', async (req, res) => {
  const parameters = new Object()
  parameters.id = req.params.id
  const match = await HLTV.getMatch(parameters)
  res.json(match)
})

app.get('/api/matchstats/:id', async (req, res) => {
  const parameters = new Object()
  parameters.id = req.params.id
  const matchstats = await HLTV.getMatchStats(parameters)
  res.json(matchstats)
})

app.get('/api/matchesstats', async (req, res) => {
  const matchesstats = await HLTV.getMatchesStats({startDate: '2017-07-10', endDate: '2017-07-18'})
  res.json(matchesstats)
})

app.get('/api/matchmapstats/:id', async (req, res) => {
  const parameters = new Object()
  parameters.id = req.params.id
  const matchmapstats = await HLTV.getMatchStats(parameters)
  res.json(matchmapstats)
})

app.get('/api/streams/', async (req, res) => {
  const streams = await HLTV.getStreams()
  res.json(streams)
})

app.get('/api/team/:id', async (req, res) => {
  const parameters = new Object()
  parameters.id = req.params.id
  const team = await HLTV.getTeam(parameters)
  res.json(team)
})

app.get('/api/teamstats/:id/:currentroster', async (req, res) => {
  const parameters = new Object()
  parameters.currentRosterOnly = req.params.currentroster
  parameters.id = req.params.id
  const teamstats = await HLTV.getTeamStats(parameters)
  res.json(teamstats)
})

app.get('/api/teamstats/:id/:currentroster/startdate/:startdate', async (req, res) => {
  const parameters = new Object()
  parameters.currentRosterOnly = req.params.currentroster
  parameters.id = req.params.id
  parameters.startDate = req.params.startdate
  console.log(parameters)
  const teamstats = await HLTV.getTeamStats(parameters)
  res.json(teamstats)
})

app.get('/api/teamstats/:id/:currentroster/enddate/:enddate', async (req, res) => {
  const parameters = new Object()
  parameters.currentRosterOnly = req.params.currentroster
  parameters.id = req.params.id
  parameters.EndDate = req.params.enddate
  const teamstats = await HLTV.getTeamStats(parameters)
  res.json(teamstats)
})

app.get('/api/teamstats/:id/:currentroster/timeframe/:startdate/:enddate', async (req, res) => {
  const parameters = new Object()
  parameters.currentRosterOnly = req.params.currentroster
  parameters.id = req.params.id
  parameters.startDate = req.params.startdate
  parameters.EndDate = req.params.enddate
  const teamstats = await HLTV.getTeamStats(parameters)
  res.json(teamstats)
})

function getLiveIDs() {
	var matches
	var matchIDs = []
	try {
		const data = fs.readFileSync('cache/matches.json', 'utf8')
		matches = JSON.parse(data)
	} catch (err) {
		console.error(err)
	}
	matches.forEach(obj => {
		if (obj.live == true) {
			matchIDs.push(obj.id) 
		}
	})
	return matchIDs
}

app.get('/api/ongoingmatches/', async (req, res) => {
	var matches = []
	const matchesFile = JSON.parse(fs.readFileSync('cache/matches.json', 'utf8'))
	getLiveIDs().forEach(id => {
		var object = matchesFile.find(obj => obj.id == id)
		var element = new Object()
		element.id = id
		element.websocketURL = "ws://hltv-api-steel.vercel.app/api/scoreboard/" + id
		element.stars = object.stars
		matches.push(element)
	})
	res.json(matches)
})

getLiveIDs().forEach(id => {
	app.ws('/api/scoreboard/' + id, async function(ws, req) {
		var onLogUpdatePrevious
		var onLogUpdateCurrent
		var onScoreboardUpdatePrevious
		var onScoreboardUpdateCurrent
		var scoreboard = HLTV.connectToScorebot({
			id: id,
			onLogUpdate: (data, done) => {
				if (onLogUpdatePrevious == undefined) {
					onLogUpdatePrevious = data
					ws.send(JSON.stringify(data))
//					console.log("message sent for:" + id)
				}
				onLogUpdateCurrent = data
				if (onLogUpdatePrevious != onLogUpdateCurrent) {
					ws.send(JSON.stringify(data))
//					console.log("message sent for:" + id)
					onLogUpdatePrevious = onLogUpdateCurrent
				}
			},
			onScoreboardUpdate: (data, done) => {
				if (onScoreboardUpdatePrevious == undefined) {
					onScoreboardUpdatePrevious = data
					ws.send(JSON.stringify(data))
//					console.log("message sent for:" + id)
				}
				onScoreboardUpdateCurrent = data
				if (onScoreboardUpdatePrevious != onScoreboardUpdateCurrent) {
					ws.send(JSON.stringify(data))
//					console.log("message sent for:" + id)
					onScoreboardUpdatePrevious = onScoreboardUpdateCurrent
				}
			},
			onFullLogUpdate: (data, done) => {
				if (onFullLogUpdatePrevious == undefined) {
					onFullLogUpdatePrevious = data
					ws.send(JSON.stringify(data))
//					console.log("message sent for:" + id)
				}
				onFullLogUpdateCurrent = data
				if (onFullLogUpdatePrevious != onFullLogUpdateCurrent) {
					ws.send(JSON.stringify(data))
//					console.log("message sent for:" + id)
					onFullLogUpdatePrevious = onFullLogUpdateCurrent
				}
			}
		})
	})
})

//broken
app.get('/api/playerranking/:startdate/:enddate', async (req, res) => {
  const parameters = new Object()
  parameters.startDate = req.params.startdate
  parameters.endDate = req.params.enddate
  const playerranking = await HLTV.getPlayerRanking(parameters)
//  console.log(playerranking)
  res.json(playerranking)
})

app.get('/api/', async (req, res) => {
  res.sendFile(__dirname + '/index.html');
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
