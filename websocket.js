/*const enableWs = require('express-ws')(app)

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
		var closeWebsocket = setInterval(stopWebsocket, 10000)
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

setInterval(checkForNewMatches, 10000)
*/ 
