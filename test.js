const { HLTV } = require("hltv")

var test2 = [1, 2, 3, 4, 5, 6]
var test1 = [0, 1, 2, 3]
function compareArrays(arr1, arr2) {
	var a = []
	var diff = []
	arr1.forEach(id => {
		a[arr1.find()] = true
	})
	for (var i = 0; i < arr2.length; i++) {
		if (a[arr2[i]]) {
			delete a[arr2[i]];
		} else {
			a[arr2[i]] = true;
		}
	}
	for (var k in a) {
		diff.push(k);
	}
	return diff;
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
	if (miss == true) {
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
var 
//console.log(compareArrays(test1, test2))
test = test1.concat(arrayDiff(test1, test2, false))
console.log(test1.concat(arrayDiff(test1, test2, false)))
//console.log(test1.concat(test2))
var id = 10
//console.log(test1.includes(id))
//console.log(test1.includes(1))
//test1 = test1.concat(arrayDiff(test1, test2, true))
//console.log(test1)




