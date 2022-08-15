const express = require('express')
const { HLTV } = require('hltv-next')
const bodyParser = require('body-parser')
const axios = require('axios')
const app = express()

app.use(bodyParser.json())

async function reportError(err, func, opt) {
	var result = await axios.post('https://debug.revilum.com', {
		"error": err.toString(),
		"function": func,
		"options": opt
	})
	return result.data
	
}

app.post("/api/getMatch", async (req, res) => {
	try {
		const response = await HLTV.getMatch(req.body)
		res.json(response)
	} catch (err) {
		const errorId = await reportError(err, "getMatch", req.body)
		res.status(400).send({error: err.toString(), id: errorId})
	}
})

app.post("/api/getMatches", async (req, res) => {
	try {
		const response = await HLTV.getMatches(req.body)
		res.json(response)
	} catch (err) {
		const errorId = await reportError(err, "getMatches", req.body)
		res.status(400).send({error: err.toString(), id: errorId})
	}
})

app.post("/api/getMatchesStats", async (req, res) => {
	try {
		const response = await HLTV.getMatchesStats(req.body)
		res.json(response)
	} catch (err) {
		const errorId = await reportError(err, "getMatchesStats", req.body)
		res.status(400).send({error: err.toString(), id: errorId})
	}
})

app.post("/api/getMatchStats", async (req, res) => {
	try {
		const response = await HLTV.getMatchStats(req.body)
		res.json(response)
	} catch (err) {
		const errorId = await reportError(err, "getMatchStats", req.body)
		res.status(400).send({error: err.toString(), id: errorId})
	}
})

app.post("/api/getMatchMapStats", async (req, res) => {
	try {
		const response = await HLTV.getMatchMapStats(req.body)
		res.json(response)
	} catch (err) {
		const errorId = await reportError(err, "getMatchMapStats", req.body)
		res.status(400).send({error: err.toString(), id: errorId})
	}
})

app.post("/api/getStreams", async (req, res) => {
	try {
		const response = await HLTV.getStreams(req.body)
		res.json(response)
	} catch (err) {
		const errorId = await reportError(err, "getStreams", req.body)
		res.status(400).send({error: err.toString(), id: errorId})
	}
})

app.post("/api/getRecentThreads", async (req, res) => {
	try {
		const response = await HLTV.getRecentThreads(req.body)
		res.json(response)
	} catch (err) {
		const errorId = await reportError(err, "getRecentThreads", req.body)
		res.status(400).send({error: err.toString(), id: errorId})
	}
})

app.post("/api/getTeamRanking", async (req, res) => {
	try {
		const response = await HLTV.getTeamRanking(req.body)
		console.log(response)
		if (response.length === 0) {
			throw new TypeError("invalid country")
		}
		res.json(response)
	} catch (err) {
		const errorId = await reportError(err, "getTeamRanking", req.body)
		res.status(400).send({error: err.toString(), id: errorId})
	}
})

app.post("/api/getTeam", async (req, res) => {
	try {
		const response = await HLTV.getTeam(req.body)
		res.json(response)
	} catch (err) {
		const errorId = await reportError(err, "getTeam", req.body)
		res.status(400).send({error: err.toString(), id: errorId})
	}
})

app.post("/api/getTeamByName", async (req, res) => {
	try {
		const response = await HLTV.getTeamByName(req.body)
		res.json(response)
	} catch (err) {
		const errorId = await reportError(err, "getTeamByName", req.body)
		res.status(400).send({error: err.toString(), id: errorId})
	}
})

app.post("/api/getTeamStats", async (req, res) => {
	try {
		const response = await HLTV.getTeamStats(req.body)
		res.json(response)
	} catch (err) {
		const errorId = await reportError(err, "getTeamStats", req.body)
		res.status(400).send({error: err.toString(), id: errorId})
	}
})

app.post("/api/getPlayer", async (req, res) => {
	try {
		const response = await HLTV.getPlayer(req.body)
		res.json(response)
	} catch (err) {
		const errorId = await reportError(err, "getPlayer", req.body)
		res.status(400).send({error: err.toString(), id: errorId})
	}
})

app.post("/api/getPlayerByName", async (req, res) => {
	try {
		const response = await HLTV.getPlayerByName(req.body)
		res.json(response)
	} catch (err) {
		const errorId = await reportError(err, "getPlayerByName", req.body)
		res.status(400).send({error: err.toString(), id: errorId})
	}
})

app.post("/api/getPlayerStats", async (req, res) => {
	try {
		const response = await HLTV.getPlayerStats(req.body)
		res.json(response)
	} catch (err) {
		const errorId = await reportError(err, "getPlayerStats", req.body)
		res.status(400).send({error: err.toString(), id: errorId})
	}
})

app.post("/api/getPlayerRanking", async (req, res) => {
	try {
		const response = await HLTV.getPlayerRanking(req.body)
		res.json(response)
	} catch (err) {
		const errorId = await reportError(err, "getPlayerRanking", req.body)
		res.status(400).send({error: err.toString(), id: errorId})
	}
})

app.post("/api/getEvents", async (req, res) => {
	try {
		const response = await HLTV.getEvents(req.body)
		res.json(response)
	} catch (err) {
		const errorId = await reportError(err, "getEvents", req.body)
		res.status(400).send({error: err.toString(), id: errorId})
	}
})

app.post("/api/getEvent", async (req, res) => {
	try {
		const response = await HLTV.getEvent(req.body)
		res.json(response)
	} catch (err) {
		const errorId = await reportError(err, "getEvent", req.body)
		res.status(400).send({error: err.toString(), id: errorId})
	}
})

app.post("/api/getEventByName", async (req, res) => {
	try {
		const response = await HLTV.getEventByName(req.body)
		res.json(response)
	} catch (err) {
		const errorId = await reportError(err, "getEventByName", req.body)
		res.status(400).send({error: err.toString(), id: errorId})
	}
})

app.post("/api/getPastEvents", async (req, res) => {
	try {
		var response = await HLTV.getPastEvents(req.body)
		res.json(response)
	} catch (err) {
		var errorId = await reportError(err, "getPastEvents", req.body)
		res.status(400).send({error: err.toString(), id: errorId})
	}
})

app.post("/api/getResults", async (req, res) => {
	try {
		var response = await HLTV.getResults(req.body)
		res.json(response)
	} catch (err) {
		var errorId = await reportError(err, "getResults", req.body)
		res.status(400).send({error: err.toString(), id: errorId})
	}
})

app.post("/api/getNews", async (req, res) => {
	try {
		var response = await HLTV.getNews(req.body)
		res.json(response)
	} catch (err) {
		var errorId = await reportError(err, "getNews", req.body)
		res.status(400).send({error: err.toString(), id: errorId})
	}
})



app.get("/api/test", async (req, res) => {
	const ja = await HLTV.getTeamStats({ id: 6137 })
	res.json(ja)
})

app.listen(3000, () => {
	console.log('Listening on port 3000...')
})
