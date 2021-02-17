const { HLTV } = require("hltv")

var matchesFile

function getMatchesFile() {
	if (matchesFile == undefined) {
		matchesFile = HLTV.getMatches().then(function(data){
			console.log(data)
			return data
		})
	}
	return matchesFile
}

getMatchesFile()
