const express = require('express')
const { HLTV } = require('hltv')
const http = require('http')
const bodyParser = require('body-parser')
const axios = require('axios')
const app = express()

app.use(bodyParser.json())

async function reportError(err, func, opt) {
	return await axios.post('http://debug.revilum.com', {
		"error": err.toString(),
		"function": func,
		"options": opt
	})
}

app.post("/api/getMatch", async (req, res) => {
	try {
		var response = await HLTV.getMatch(req.body)
		res.json(response)
	} catch (err) {
		reportError(err, "getMatch", req.body)
		res.status(400).send(err.toString())
	}
})

app.post("/api/getMatches", async (req, res) => {
	try {
		var response = await HLTV.getMatches(req.body)
		res.json(response)
	} catch (err) {
		reportError(err, "getMatches", req.body)
		res.status(400).send(err.toString())
	}
})

app.post("/api/getMatchesStats", async (req, res) => {
	try {
		var response = await HLTV.getMatchesStats(req.body)
		res.json(response)
	} catch (err) {
		reportError(err, "getMatchesStats", req.body)
		res.status(400).send(err.toString())
	}
})

app.post("/api/getMatchStats", async (req, res) => {
	try {
		var response = await HLTV.getMatchStats(req.body)
		res.json(response)
	} catch (err) {
		reportError(err, "getMatchStats", req.body)
		res.status(400).send(err.toString())
	}
})

app.post("/api/getMatchMapStats", async (req, res) => {
	try {
		var response = await HLTV.getMatchMapStats(req.body)
		res.json(response)
	} catch (err) {
		reportError(err, "getMatchMapStats", req.body)
		res.status(400).send(err.toString())
	}
})

app.post("/api/getStreams", async (req, res) => {
	try {
		var response = await HLTV.getStreams(req.body)
		res.json(response)
	} catch (err) {
		reportError(err, "getStreams", req.body)
		res.status(400).send(err.toString())
	}
})

app.post("/api/getRecentThreads", async (req, res) => {
	try {
		var response = await HLTV.getRecentThreads(req.body)
		res.json(response)
	} catch (err) {
		reportError(err, "getRecentThreads", req.body)
		res.status(400).send(err.toString())
	}
})

app.post("/api/getTeamRanking", async (req, res) => {
	try {
		var response = await HLTV.getTeamRanking(req.body)
		res.json(response)
	} catch (err) {
		reportError(err, "getTeamRanking", req.body)
		res.status(400).send(err.toString())
	}
})

app.post("/api/getTeam", async (req, res) => {
	try {
		var response = await HLTV.getTeam(req.body)
		res.json(response)
	} catch (err) {
		reportError(err, "getTeam", req.body)
		res.status(400).send(err.toString())
	}
})

app.post("/api/getTeamByName", async (req, res) => {
	try {
		var response = await HLTV.getTeamByName(req.body)
		res.json(response)
	} catch (err) {
		reportError(err, "getTeamByName", req.body)
		res.status(400).send(err.toString())
	}
})

app.post("/api/getTeamStats", async (req, res) => {
	try {
		var response = await HLTV.getTeamStats(req.body)
		res.json(response)
	} catch (err) {
		reportError(err, "getTeamStats", req.body)
		res.status(400).send(err.toString())
	}
})

app.post("/api/getPlayer", async (req, res) => {
	try {
		var response = await HLTV.getPlayer(req.body)
		res.json(response)
	} catch (err) {
		reportError(err, "getPlayer", req.body)
		res.status(400).send(err.toString())
	}
})

app.post("/api/getPlayerByName", async (req, res) => {
	try {
		var response = await HLTV.getPlayerByName(req.body)
		res.json(response)
	} catch (err) {
		reportError(err, "getPlayerByName", req.body)
		res.status(400).send(err.toString())
	}
})

app.post("/api/getPlayerStats", async (req, res) => {
	try {
		var response = await HLTV.getPlayerStats(req.body)
		res.json(response)
	} catch (err) {
		reportError(err, "getPlayerStats", req.body)
		res.status(400).send(err.toString())
	}
})

app.post("/api/getPlayerRanking", async (req, res) => {
	try {
		var response = await HLTV.getPlayerRanking(req.body)
		res.json(response)
	} catch (err) {
		reportError(err, "getPlayerRanking", req.body)
		res.status(400).send(err.toString())
	}
})

app.post("/api/getEvents", async (req, res) => {
	try {
		var response = await HLTV.getEvents(req.body)
		res.json(response)
	} catch (err) {
		reportError(err, "getEvents", req.body)
		res.status(400).send(err.toString())
	}
})

app.post("/api/getEvent", async (req, res) => {
	try {
		var response = await HLTV.getEvent(req.body)
		res.json(response)
	} catch (err) {
		reportError(err, "getEvent", req.body)
		res.status(400).send(err.toString())
	}
})

app.post("/api/getEventByName", async (req, res) => {
	try {
		var response = await HLTV.getEventByName(req.body)
		res.json(response)
	} catch (err) {
		reportError(err, "getEventByName", req.body)
		res.status(400).send(err.toString())
	}
})

app.post("/api/getPastEvents", async (req, res) => {
	try {
		var response = await HLTV.getPastEvents(req.body)
		res.json(response)
	} catch (err) {
		reportError(err, "getPastEvents", req.body)
		res.status(400).send(err.toString())
	}
})

app.post("/api/getResults", async (req, res) => {
	try {
		var response = await HLTV.getResults(req.body)
		res.json(response)
	} catch (err) {
		reportError(err, "getResults", req.body)
		res.status(400).send(err.toString())
	}
})

app.post("/api/getNews", async (req, res) => {
	try {
		var response = await HLTV.getNews(req.body)
		res.json(response)
	} catch (err) {
		reportError(err, "getNews", req.body)
		res.status(400).send(err.toString())
	}
})

app.post("/api/getNews", async (req, res) => {
	try {
		var response = await HLTV.getNews(req.body)
		res.json(response)
	} catch (err) {
		reportError(err, "getNews", req.body)
		res.status(400).send(err.toString())
	}
})

var server = app.listen(3000, () => {
	console.log('Listening on port 3000...')
})

