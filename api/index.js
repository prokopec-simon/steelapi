const express = require('express')
const { HLTV } = require('hltv')
const http = require('http')
const app = express()

function catchErrors(err, func, parameters) {
	if (parameters == undefined) {
		parameters = ""
	}
	http.get("http://debug.revilum.com/?error=" + func + "(" + JSON.stringify(parameters) + ")" + err)
	if (err == "Error: Access denied | www.hltv.org used Cloudflare to restrict access") {
		return "403"
	} else {
		return "404"
	}
}

app.get('/api/', async (req, res) => {
  res.sendFile(__dirname + '/index.html');
})

//everything about results

app.get('/api/results', async (req, res) => {
	const date = new Date((new Date()).setDate((new Date()).getDate() - 1))
	var startmonth = date.getMonth() + 1
	var startday = date.getUTCDate()
	var endmonth = (new Date()).getMonth() + 1
	var endday = (new Date()).getUTCDate()
	if (startmonth.toString().length == 1) {
		startmonth = "0" + startmonth.toString()
	}
	if (startday.toString().length == 1) {
		startday = "0" + startday.toString()
	}
	if (endmonth.toString().length == 1) {
		endmonth = "0" + endmonth.toString()
	}
	if (endday.toString().length == 1) {
		endday = "0" + endday.toString()
	}
	var parameters = {startDate: date.getYear() + 1900 + "-" + startmonth + "-" + startday, endDate: (new Date()).getYear() + 1900 + "-" + endmonth + "-" + endday, delayBetweenPageRequests: 300}
	res.json(await HLTV.getResults(parameters).catch(err =>{res.send(catchErrors(err, "getResults", parameters))}))
})

app.get('/api/results/teams/:teams', async (req, res) => {
	const date = new Date((new Date()).setDate((new Date()).getDate() - 90))
	var startmonth = date.getMonth() + 1
	var startday = date.getUTCDate()
	var endmonth = (new Date()).getMonth() + 1
	var endday = (new Date()).getUTCDate()
	if (startmonth.toString().length == 1) {
		startmonth = "0" + startmonth.toString()
	}
	if (startday.toString().length == 1) {
		startday = "0" + startday.toString()
	}
	if (endmonth.toString().length == 1) {
		endmonth = "0" + endmonth.toString()
	}
	if (endday.toString().length == 1) {
		endday = "0" + endday.toString()
	}
	var parameters = {startDate: date.getYear() + 1900 + "-" + startmonth + "-" + startday, endDate: (new Date()).getYear() + 1900 + "-" + endmonth + "-" + endday, delayBetweenPageRequests: 300, teamIds: JSON.parse(req.params.teams)}
	res.json(await HLTV.getResults(parameters).catch(err =>{res.send(catchErrors(err, "getResults", parameters))}))
})

app.get('/api/results/events/:events', async (req, res) => {
	const date = new Date((new Date()).setDate((new Date()).getDate() - 90))
	var startmonth = date.getMonth() + 1
	var startday = date.getUTCDate()
	var endmonth = (new Date()).getMonth() + 1
	var endday = (new Date()).getUTCDate()
	if (startmonth.toString().length == 1) {
		startmonth = "0" + startmonth.toString()
	}
	if (startday.toString().length == 1) {
		startday = "0" + startday.toString()
	}
	if (endmonth.toString().length == 1) {
		endmonth = "0" + endmonth.toString()
	}
	if (endday.toString().length == 1) {
		endday = "0" + endday.toString()
	}
	var parameters = {startDate: date.getYear() + 1900 + "-" + startmonth + "-" + startday, endDate: (new Date()).getYear() + 1900 + "-" + endmonth + "-" + endday, eventIds: JSON.parse(req.params.events), delayBetweenPageRequests: 300}
	res.json(await HLTV.getResults(parameters).catch(err =>{res.send(catchErrors(err, "getResults", parameters))}))
})

//everything about players

app.get('/api/player/:name', async (req, res) => {
	var parameters = {name: req.params.name, delayBetweenPageRequests: 300}
	res.json(await HLTV.getPlayerByName(parameters).catch(err =>{res.send(catchErrors(err, "getPlayerByName", parameters))}))
})

app.get('/api/playerById/:id', async (req, res) => {
	var parameters = {name: req.params.id}
	res.json(await HLTV.getPlayer(parameters).catch(err =>{res.send(catchErrors(err, "getPlayer", parameters))}))
})

app.get('/api/playerstats/:id', async (req, res) => {
	var parameters = {id: req.params.id, delayBetweenPageRequests: 300}
	res.json(await HLTV.getPlayerStats(parameters).catch(err =>{res.send(catchErrors(err, "getPlayerStats", parameters))}))
})

app.get('/api/playerranking/', async (req, res) => {
	var endmonth = (new Date()).getMonth() + 1
	var endday = (new Date()).getUTCDate()
	if (endmonth.toString().length == 1) {
		endmonth = "0" + endmonth.toString()
	}
	if (endday.toString().length == 1) {
		endday = "0" + endday.toString()
	}
	var parameters = {startDate: (new Date()).getYear() + 1900 + "-01-01", endDate: (new Date()).getYear() + 1900 + "-" + endmonth + "-" + endday, delayBetweenPageRequests: 300}
	res.json(await HLTV.getPlayerRanking(parameters).catch(err =>{res.send(catchErrors(err, "getPlayerRanking", parameters))}))
})

app.get('/api/playerranking/:year', async (req, res) => {
	var endmonth = (new Date()).getMonth() + 1
	var endday = (new Date()).getUTCDate()
	if (endmonth.toString().length == 1) {
		endmonth = "0" + endmonth.toString()
	}
	if (endday.toString().length == 1) {
		endday = "0" + endday.toString()
	}
	var parameters = {startDate: req.params.year + 1900 + "-01-01", endDate: req.params.year + "-" + endmonth + "-" + endday, delayBetweenPageRequests: 300}
	res.json(await HLTV.getPlayerRanking(parameters).catch(err =>{res.send(catchErrors(err, "getPlayerRanking", parameters))}))
})

//everything about events

app.get('/api/events', async (req, res) => {
	var parameters
	res.json(await HLTV.getEvents(parameters).catch(err =>{res.send(catchErrors(err, "getEvents", parameters))}))
})

app.get('/api/event/:name', async (req, res) => {
	var parameters = {name: req.params.name, delayBetweenPageRequests: 300}
	res.json(await HLTV.getEventByName(parameters).catch(err =>{res.send(catchErrors(err, "getEventByName", parameters))}))
})

app.get('/api/eventById/:id', async (req, res) => {
	var parameters = {id: req.params.id}
	res.json(await HLTV.getEvent(parameters).catch(err =>{res.send(catchErrors(err, "getEvent", parameters))}))
})

app.get('/api/pastevents/', async (req, res) => {
	const date = new Date((new Date()).setDate((new Date()).getDate() - 32))
	var startmonth = date.getMonth() + 1
	var startday = date.getUTCDate()
	var endmonth = (new Date()).getMonth() + 1
	var endday = (new Date()).getUTCDate()
	if (startmonth.toString().length == 1) {
		startmonth = "0" + startmonth.toString()
	}
	if (startday.toString().length == 1) {
		startday = "0" + startday.toString()
	}
	if (endmonth.toString().length == 1) {
		endmonth = "0" + endmonth.toString()
	}
	if (endday.toString().length == 1) {
		endday = "0" + endday.toString()
	}
	var parameters = {startDate: date.getYear() + 1900 + "-" + startmonth + "-" + startday, endDate: (new Date()).getYear() + 1900 + "-" + endmonth + "-" + endday, delayBetweenPageRequests: 300}
	res.json(await HLTV.getPastEvents(parameters).catch(err =>{res.send(catchErrors(err, "getPastEvents", parameters))}))
})

app.get('/api/pastevents/teams/:teamids', async (req, res) => {
	const date = new Date((new Date()).setMonth((new Date()).getMonth() - 12)) 
	var startmonth = date.getMonth() + 1
	var startday = date.getUTCDate()
	var endmonth = (new Date()).getMonth() + 1
	var endday = (new Date()).getUTCDate()
	if (startmonth.toString().length == 1) {
		startmonth = "0" + startmonth.toString()
	}
	if (startday.toString().length == 1) {
		startday = "0" + startday.toString()
	}
	if (endmonth.toString().length == 1) {
		endmonth = "0" + endmonth.toString()
	}
	if (endday.toString().length == 1) {
		endday = "0" + endday.toString()
	}
	var parameters = {startDate: date.getYear() + 1900 + "-" + startmonth + "-" + startday, endDate: (new Date()).getYear() + 1900 + "-" + endmonth + "-" + endday, attendingTeamIds: JSON.parse(req.params.teamids), delayBetweenPageRequests: 300}
	res.json(await HLTV.getPastEvents(parameters).catch(err =>{res.send(catchErrors(err, "getPastEvents", parameters))}))
})

app.get('/api/pastevents/players/:playerids', async (req, res) => {
	const date = new Date((new Date()).setMonth(new Date()).getMonth() - 12)
	var startmonth = date.getMonth() + 1
	var startday = date.getUTCDate()
	var endmonth = (new Date()).getMonth() + 1
	var endday = (new Date()).getUTCDate()
	if (startmonth.toString().length == 1) {
		startmonth = "0" + startmonth.toString()
	}
	if (startday.toString().length == 1) {
		startday = "0" + startday.toString()
	}
	if (endmonth.toString().length == 1) {
		endmonth = "0" + endmonth.toString()
	}
	if (endday.toString().length == 1) {
		endday = "0" + endday.toString()
	}
	var parameters = {startDate: date.getYear() + 1900 + "-" + startmonth + "-" + startday, endDate: (new Date()).getYear() + 1900 + "-" + endmonth + "-" + endday, attendingPlayerIds: JSON.parse(req.params.playerids), delayBetweenPageRequests: 300}
	res.json(await HLTV.getPastEvents(parameters).catch(err =>{res.send(catchErrors(err, "getPastEvents", parameters))}))
})

//everything about teams

app.get('/api/team/:name', async (req, res) => {
	var parameters = {name: req.params.name, delayBetweenPageRequests: 300}
	res.json(await HLTV.getTeamByName(parameters).catch(err =>{res.send(catchErrors(err, "getTeamByName", parameters))}))
})

app.get('/api/teamById/:id', async (req, res) => {
	var parameters = {id: req.params.id}
	res.json(await HLTV.getTeam(parameters).catch(err =>{res.send(catchErrors(err, "getTeam", parameters))}))
})

app.get('/api/teamstats/:id/', async (req, res) => {
	var parameters = {id: req.params.id, delayBetweenPageRequests: 300}
	res.json(await HLTV.getTeamStats(parameters).catch(err =>{res.send(catchErrors(err, "getTeamStats", parameters))}))
})

//everything about teamranking

app.get('/api/ranking', async (req, res) => {
	var parameters
	res.json(await HLTV.getTeamRanking(parameters).catch(err =>{res.send(catchErrors(err, "getTeamRanking", parameters))}))
})

app.get('/api/ranking/:country', async (req, res) => {
	var parameters = {country: req.params.country}
	res.json(await HLTV.getTeamRanking(parameters).catch(err =>{res.send(catchErrors(err, "getTeamRanking", parameters))}))
})

const months = ['january','february','march','april','may','june','july','august','september','october','november','december']
app.get('/api/ranking/:day/:month/:year', async (req, res) => {
	var date = new Date((new Date(req.params.day + " " + req.params.month + " " + req.params.year)).getTime() + 7200000)
	while (date.getDay() != 1) {
		date = new Date(date.getTime() - 86400000)
	}
	var parameters = {year: date.getFullYear(), month: months[date.getMonth()], day: date.getDate()}
  res.json(await HLTV.getTeamRanking(parameters).catch(err =>{res.send(catchErrors(err, "getTeamRanking", parameters))}))
})

//everything about matches

app.get('/api/matches', async (req, res) => {
	var parameters
	res.json(await HLTV.getMatches(parameters).catch(err =>{res.send(catchErrors(err, "getMatches", parameters))}))
})

app.get('/api/match/:id', async (req, res) => {
	var parameters = {id: req.params.id}
	res.json(await HLTV.getMatch(parameters).catch(err =>{res.send(catchErrors(err, "getMatch", parameters))}))
})

app.get('/api/matchstats/:id', async (req, res) => {
	var parameters = {id: req.params.id}
	res.json(await HLTV.getMatchStats(parameters).catch(err =>{res.send(catchErrors(err, "getMatchStats", parameters))}))
})

app.get('/api/matchesstats', async (req, res) => {
	const date = new Date((new Date()).setDate((new Date()).getDate() - 1))
	var startmonth = date.getMonth() + 1
	var startday = date.getUTCDate()
	var endmonth = (new Date()).getMonth() + 1
	var endday = (new Date()).getUTCDate()
	if (startmonth.toString().length == 1) {
		startmonth = "0" + startmonth.toString()
	}
	if (startday.toString().length == 1) {
		startday = "0" + startday.toString()
	}
	if (endmonth.toString().length == 1) {
		endmonth = "0" + endmonth.toString()
	}
	if (endday.toString().length == 1) {
		endday = "0" + endday.toString()
	}
	var parameters = {startDate: date.getYear() + 1900 + "-" + startmonth + "-" + startday, endDate: (new Date()).getYear() + 1900 + "-" + endmonth + "-" + endday, delayBetweenPageRequests: 300}
	res.json(await HLTV.getMatchesStats(parameters).catch(err =>{res.send(catchErrors(err, "getMatchesStats", parameters))}))
})

app.get('/api/matchmapstats/:id', async (req, res) => {
	var parameters = {id: req.params.id}
	res.json(await HLTV.getMatchMapStats(parameters).catch(err =>{res.send(catchErrors(err, "getMatchMapStats", parameters))}))
})

app.get('/api/streams/', async (req, res) => {getStreams
	var parameters
	res.json(await HLTV.getMatchesStats(parameters).catch(err =>{res.send(catchErrors(err, "getMatchesStats", parameters))}))
})

app.get('/api/time/', async (req, res) => {
	res.send(new Date())
})

app.get('/api/error/', async (req, res) => {
	res.send("error")
})

app.get('/api/test/', async (req, res) => {
	res.send("test")
})

var server = app.listen(3000, () => {
	console.log('Listening on port 3000...')
})
