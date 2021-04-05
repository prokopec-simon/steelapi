const express = require('express')
const { HLTV } = require('hltv')
const http = require('http')
const app = express()

app.get('/api/', async (req, res) => {
  res.sendFile(__dirname + '/index.html');
})

//everything about results
http.get("http://debug.revilum.com/?error=/api/results")
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
	res.json(await HLTV.getResults({startDate: date.getYear() + 1900 + "-" + startmonth + "-" + startday, endDate: (new Date()).getYear() + 1900 + "-" + endmonth + "-" + endday, delayBetweenPageRequests: 500}).catch(err =>{http.get("http://debug.revilum.com/?error=/api/results")}))
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
	res.json(await HLTV.getResults({startDate: date.getYear() + 1900 + "-" + startmonth + "-" + startday, endDate: (new Date()).getYear() + 1900 + "-" + endmonth + "-" + endday,
	delayBetweenPageRequests: 500, teamIds: JSON.parse(req.params.teams)}).catch(err =>{http.get("http://debug.revilum.com/?error=/api/results/teams/:teams")}))
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
	res.json(await HLTV.getResults({startDate: date.getYear() + 1900 + "-" + startmonth + "-" + startday, endDate: (new Date()).getYear() + 1900 + "-" + endmonth + "-" + endday,
	eventIds: JSON.parse(req.params.events), delayBetweenPageRequests: 500}).catch(err =>{http.get("http://debug.revilum.com/?error=/api/results/events/:events")}))
})

//everything about players

app.get('/api/player/:name', async (req, res) => {
	res.json(await HLTV.getPlayerByName({name: req.params.name, delayBetweenPageRequests: 500}).catch(err =>{console.log("/api/player/:name")}).catch(err =>{http.get("http://debug.revilum.com/?error=/api/player/:name")}))
})

app.get('/api/playerById/:id', async (req, res) => {
	res.json(await HLTV.getPlayer({name: req.params.id}))
})

app.get('/api/playerstats/:id', async (req, res) => {
	res.json(await HLTV.getPlayerStats({id: req.params.id, delayBetweenPageRequests: 500}).catch(err =>{http.get("http://debug.revilum.com/?error=/api/playerstats/:id")}))
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
	res.json(await HLTV.getPlayerRanking({startDate: (new Date()).getYear() + 1900 + "-01-01", endDate: (new Date()).getYear() + 1900 + "-" + endmonth + "-" + endday, delayBetweenPageRequests: 500}).catch(err =>{http.get("http://debug.revilum.com/?error=/api/playerranking")}))
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
	res.json(await HLTV.getPlayerRanking({startDate: req.params.year + 1900 + "-01-01", endDate: req.params.year + "-" + endmonth + "-" + endday, delayBetweenPageRequests: 500}).catch(err =>{http.get("http://debug.revilum.com/?error=/api/playerranking/:year")}))
})

//everything about events

app.get('/api/events', async (req, res) => {
	res.json(await HLTV.getEvents().catch(err =>{http.get("http://debug.revilum.com/?error=/api/events")}))
})

app.get('/api/event/:name', async (req, res) => {
	res.json(await HLTV.getEventByName({name: req.params.name, delayBetweenPageRequests: 500}).catch(err =>{http.get("http://debug.revilum.com/?error=/api/event/:name")}))
})

app.get('/api/eventById/:id', async (req, res) => {
	res.json(await HLTV.getEvent({id: req.params.id}).catch(err =>{http.get("http://debug.revilum.com/?error=/api/eventById/:id")}))
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
	res.json(await HLTV.getPastEvents({startDate: date.getYear() + 1900 + "-" + startmonth + "-" + startday, endDate: (new Date()).getYear() + 1900 + "-" + endmonth + "-" + endday, delayBetweenPageRequests: 500}).catch(err =>{http.get("http://debug.revilum.com/?error=/api/pastevents")}))
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
	res.json(await HLTV.getPastEvents({startDate: date.getYear() + 1900 + "-" + startmonth + "-" + startday, endDate: (new Date()).getYear() + 1900 + "-" + endmonth + "-" + endday,
	attendingTeamIds: JSON.parse(req.params.teamids), delayBetweenPageRequests: 500}).catch(err =>{http.get("http://debug.revilum.com/?error=/api/pastevents/teams/:teamids")}))
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
	res.json(await HLTV.getPastEvents({startDate: date.getYear() + 1900 + "-" + startmonth + "-" + startday, endDate: (new Date()).getYear() + 1900 + "-" + endmonth + "-" + endday,
	attendingPlayerIds: JSON.parse(req.params.playerids), delayBetweenPageRequests: 500}).catch(err =>{http.get("http://debug.revilum.com/?error=/api/pastevents/players/:playerids")}))
})

//everything about teams

app.get('/api/team/:name', async (req, res) => {
	res.json(await HLTV.getTeamByName({name: req.params.name, delayBetweenPageRequests: 2000}).catch(err =>{http.get("http://debug.revilum.com/?error=/api/team/:name")}))
})

app.get('/api/teamById/:id', async (req, res) => { 
	res.json(await HLTV.getTeam({id: req.params.id}).catch(err =>{http.get("http://debug.revilum.com/?error=/api/teamById/:id")}))
})

app.get('/api/teamstats/:id/', async (req, res) => {
	res.json(await HLTV.getTeamStats({id: req.params.id, delayBetweenPageRequests: 1000}).catch(err =>{http.get("http://debug.revilum.com/?error=/api/teamstats/:id")}))
})

//everything about teamranking

app.get('/api/ranking', async (req, res) => {
	res.json(await HLTV.getTeamRanking().catch(err =>{http.get("http://debug.revilum.com/?error=/api/ranking")}))
})

app.get('/api/ranking/:country', async (req, res) => {
	res.json(await HLTV.getTeamRanking({country: req.params.country}).catch(err =>{http.get("http://debug.revilum.com/?error=/api/ranking/country")}))
})

const months = ['january','february','march','april','may','june','july','august','september','october','november','december']
app.get('/api/ranking/:day/:month/:year', async (req, res) => {
	var date = new Date((new Date(req.params.day + " " + req.params.month + " " + req.params.year)).getTime() + 7200000)
	while (date.getDay() != 1) {
		date = new Date(date.getTime() - 86400000)
	}
  res.json(await HLTV.getTeamRanking({year: date.getFullYear(), month: months[date.getMonth()], day: date.getDate()}).catch(err =>{http.get("http://debug.revilum.com/?error=/api/ranking/:day/:month/:year")}))
})

//everything about matches

app.get('/api/matches', async (req, res) => {
	res.json(await HLTV.getMatches().catch(err =>{http.get("http://debug.revilum.com/?error=/api/matches")}))
})

app.get('/api/match/:id', async (req, res) => {
	res.json(await HLTV.getMatch({id: req.params.id}).catch(err =>{http.get("http://debug.revilum.com/?error=/api/match/:id")}))
})

app.get('/api/matchstats/:id', async (req, res) => {
	res.json(await HLTV.getMatchStats({id: req.params.id}).catch(err =>{http.get("http://debug.revilum.com/?error=/api/matchstats/:id")}))
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
	res.json(await HLTV.getMatchesStats({startDate: date.getYear() + 1900 + "-" + startmonth + "-" + startday, endDate: (new Date()).getYear() + 1900 + "-" + endmonth + "-" + endday, delayBetweenPageRequests: 500}).catch(err =>{http.get("http://debug.revilum.com/?error=/api/matchesstats")}))
})

app.get('/api/matchmapstats/:id', async (req, res) => {
	res.json(await HLTV.getMatchStats({id: req.params.id}).catch(err =>{http.get("http://debug.revilum.com/?error=/api/matchmapstats/:id")}))
})

app.get('/api/streams/', async (req, res) => {
	res.json(await HLTV.getStreams().catch(err =>{http.get("http://debug.revilum.com/?error=/api/streams")}))
})

app.get('/api/time/', async (req, res) => {
	res.send(new Date())
})

var server = app.listen(3000, () => {
	console.log('Listening on port 3000...')
})
