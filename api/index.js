const express = require('express')
const { HLTV } = require("hltv")
const fs = require("fs")

const app = express()
const enableWs = require('express-ws')(app)

var matchesFile
async function getMatchesFile() {
	if (matchesFile == undefined) {
		matchesFile = await HLTV.getMatches()
		return matchesFile
	} else {
		return matchesFile
	}
}

async function getLiveIDs() {
	var matchIDs = []
	var cacheFile = await getMatchesFile()
	cacheFile.forEach(obj => {
		if (obj.live == true) {
			matchIDs.push(obj.id) 
		}
	})
	return matchIDs
}

function arrayDiff (old, neww, miss) {
	var a = []
	diff = []
	for (var i = 0; i < old.length; i++) {
		a[old[i]] = true;
	}
	for (var i = 0; i < neww.length; i++) {
		if (a[neww[i]]) {
			delete a[neww[i]];
		} else {
			a[neww[i]] = true;
		}
	}
	for (var k in a) {
		diff.push(k);
	}
	var finalReturn = []
	if (miss) {
		old.forEach(id => {
			if (diff.find(newid => newid == id)) {
				finalReturn.push(id)
			}
		})
		return finalReturn
	} else {
		neww.forEach(id => {
			if (diff.find(newid => newid == id)) {
				finalReturn.push(id)
			}
		})
		return finalReturn
	}
}



app.get('/api/ongoingmatches/', async (req, res) => {
	var ongoingmatches = []
	var cacheFile = await getMatchesFile()
	var cacheID = await getLiveIDs()
	cacheID.forEach(id => {
		var object = cacheFile.find(obj => obj.id == id)
		var element = new Object()
		element.id = id
		element.websocketURL = "ws://hltv-api-steel.vercel.app/api/scoreboard/" + id
		element.stars = object.stars
		ongoingmatches.push(element)
	})
	res.json(ongoingmatches)
	
})

async function startScoreboardWebsocket(id) {
	app.ws('/api/scoreboard/' + id, async function(ws, req) {
		var currentServer = app
		var onLogUpdatePrevious
		var onLogUpdateCurrent
		var test = false
		var onScoreboardUpdatePrevious
		var onScoreboardUpdateCurrent
		var onFullLogUpdatePrevious
		var onFullLogUpdateCurrent
		var test = false
		var closeWebsocket = setInterval(stopWebsocket, 60000)
		function stopWebsocket() {
			if (justended.includes(id)) {
				ws.close()
				justended.splice(justended.indexOf(id), 1)
				clearInterval(closeWebsocket)
			}
			test = true
		}
		HLTV.connectToScorebot({
			id: id,
			onLogUpdate: (data, done) => {
				if (onLogUpdatePrevious == undefined) {
					onLogUpdatePrevious = data
					if (ws.readyState === 1) {
						ws.send(JSON.stringify(data))
					}
//					console.log("message sent for:" + id)
					if (justended.includes(id)) {
						done()
					}
				}
				onLogUpdateCurrent = data
				if (onLogUpdatePrevious != onLogUpdateCurrent) {
					if (ws.readyState === 1) {
						ws.send(JSON.stringify(data))
					}
//					console.log("message sent for:" + id)
					if (justended.includes(id)) {
						done()
					}
					onLogUpdatePrevious = onLogUpdateCurrent
				}
			},
			onScoreboardUpdate: (data, done) => {
				if (onScoreboardUpdatePrevious == undefined) {
					onScoreboardUpdatePrevious = data
					if (ws.readyState === 1) {
						ws.send(JSON.stringify(data))
					}
//					console.log("message sent for:" + id)
					if (justended.includes(id)) {
						done()
					}
				}
				onScoreboardUpdateCurrent = data
				if (onScoreboardUpdatePrevious != onScoreboardUpdateCurrent) {
					if (ws.readyState === 1) {
						ws.send(JSON.stringify(data))
					}
//					console.log("message sent for:" + id)
					if (justended.includes(id)) {
						done()
					}
					onScoreboardUpdatePrevious = onScoreboardUpdateCurrent
				}
			},
			onFullLogUpdate: (data, done) => {
				if (onFullLogUpdatePrevious == undefined) {
					onFullLogUpdatePrevious = data
					if (ws.readyState === 1) {
						ws.send(JSON.stringify(data))
					}
					console.log("message sent for:" + id)
					if (justended.includes(id)) {
						done()
					}
				}
				onFullLogUpdateCurrent = data
				if (onFullLogUpdatePrevious != onFullLogUpdateCurrent) {
					if (ws.readyState === 1) {
						ws.send(JSON.stringify(data))
					}
					console.log("message sent for:" + id)
					if (justended.includes(id)) {
						done()
					}
					onFullLogUpdatePrevious = onFullLogUpdateCurrent
				}
			}
		})
	})
}
var justarted = []
var justended = []
var ongoingIDsCurrent
var ongoingIDsPrevious
async function checkForNewMatches() {
	if (ongoingIDsPrevious == undefined) {
		ongoingIDsPrevious = await getLiveIDs()
		ongoingIDsPrevious.forEach(id => {
			startScoreboardWebsocket(id)
		})
	}
	ongoingIDsCurrent = await getLiveIDs()
	if (JSON.stringify(ongoingIDsCurrent) != JSON.stringify(ongoingIDsPrevious)) {
		var justendedDifference = arrayDiff(ongoingIDsCurrent, ongoingIDsPrevious, false)
		var justartedDifference = arrayDiff(ongoingIDsCurrent, ongoingIDsPrevious, true)
		justended = justended.concat(justendedDifference)
		justarted = justarted.concat(justartedDifference)
		if (justarted != []) {
			//match started
			justarted.forEach(id => {
				justarted.splice(justarted.indexOf(id), 1)
				startScoreboardWebsocket(id)
			})
		}
	}
	ongoingIDsPrevious = ongoingIDsCurrent
}

//broken
app.get('/api/playerranking/:startdate/:enddate', async (req, res) => {
  const parameters = new Object()
  parameters.startDate = req.params.startdate
  parameters.endDate = req.params.enddate
  const playerranking = await HLTV.getPlayerRanking(parameters)
  res.json(playerranking)
})

app.get('/api/', async (req, res) => {
  res.sendFile(__dirname + '/index.html');
})

setInterval(checkForNewMatches, 60000)

app.get('/api/matches', async (req, res) => {
  const matches = await HLTV.getMatches()
//	fs.writeFileSync('/tmp/matches.json', JSON.stringify(matches), 'utf8', (err) => {})
	matchesFile = matches
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

app.get('/api/eventById/:id', async (req, res) => {
  const parameters = new Object()
  parameters.id = req.params.id
  const event = await HLTV.getEvent(parameters)
  res.json(event)
})

app.get('/api/team/:name', async (req, res) => {
  const parameters = new Object()
  parameters.name = req.params.name
  const team = await HLTV.getTeamByName(parameters)
  res.json(team)
})

app.get('/api/event/:name', async (req, res) => {
  const parameters = new Object()
  parameters.name = req.params.name
  const event = await HLTV.getEventByName(parameters)
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

app.get('/api/teamById/:id', async (req, res) => {
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

 var server = app.listen(3000, () => {
  console.log('Listening on port 3000...')
})
