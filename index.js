/*
 *
 * Exercise!
 *
 * Add let and const where appropriate and take advantage of block scoping
 *
 */

var express = require('express');
var nunjucks = require('nunjucks');
var app = express();
var athletes = require('./athletes.json');

var add = function (a, b) {
    return a + b;
};

var data = {
    runnersData: athletes.runners,
    swimmersData: athletes.swimmers,
    runnersTeamNames: getTeamNames(athletes.runnersTeam, athletes.runners),
    get: function() {
        var allRuns = this.runnersData.reduce(function(array, athlete) {
            return array.concat(athlete.runs);
        }, []);
        var allLanes = this.swimmersData.reduce(function(array, athlete) {
            return array.concat(athlete.lanes);
        }, []);
        var allEvents = [].concat(allRuns).concat(allLanes);
        var totalDistanceRun = allRuns.reduce(add, 0);
        var totalDistanceLanes = allLanes.reduce(add, 0);
        var totalDistanceEvents = allEvents.reduce(add, 0);

        var getRunningTeam = function() {
            return getTeam(this.runnersTeamNames)
        };

        return {
            runningTeam: getRunningTeam.call(this),
            runners: this.runnersData.map(function(athlete) {
                return runnerData(athlete.id, athlete.name, athlete.runs)
            }),
            totalsRunners: {
                allRuns: allRuns,
                totalDistanceRun: totalDistanceRun
            },
            totalSwimmers: {
                allLanes: allLanes,
                totalDistanceLanes: totalDistanceLanes
            },
            totalOverall: {
                allEvents: allEvents,
                totalDistanceEvents: totalDistanceEvents
            }
        }
    }
};

function runnerData(id, name, runs) {
    return {
        id: id,
        name: name,
        runs: runs,
        getAverageDistance: function() {
            return calculateAverageDistance.apply(null, this.runs);
        },
        getTotalRuns: function() {
            return this.runs.length;
        }
    }
}

function getTeamNames(team, athletes) {
    return team.map(function(member) {
        return getAthlete(athletes, member).name;
    })
}

function getTeam(team) {
    var captain = team[0];
    var players = team.slice(1);
    return {
        captain: captain,
        players: players
    }
}

function calculateAverageDistance() {
    var events = [].slice.call(arguments);
    var totalDistance = events.reduce(add, 0);
    var average = totalDistance / events.length;
    return Math.round(average * 100) / 100;
}

function getAthlete(athletes, id) {
    var athlete;

    for (var i = 0; i < athletes.length; i++) {
        if (athletes[i].id === id) {
            athlete = athletes[i];
        }
    }

    return athlete;
}

function getRunnerMW(req, res, next) {
    res.data.runner = getAthlete(res.data.runners, parseInt(req.params.id, 10))
    next();
}

function getCompareRunnersMW(req, res, next) {
    var queryIds = (req.query.id) ? req.query.id : [];
    var runnerAId = queryIds[0];
    var runnerBId = queryIds[1];
    var runners = res.data.runners;
    var runnerA, runnerB;

    if (!runnerAId || !runnerBId) {
        res.status(400).end('I need two id\'s');
        return;
    }

    for (var i = 0; i < runners.length; i++) {
        if (runners[i].id === parseInt(runnerAId, 10)) {
            runnerA = runners[i];
        }
    }
    if (!runnerA) {
        res.status(404).end('I could not find id ' + runnerAId);
        return;
    }

    for (var j = 0; j < runners.length; j++) {
        if (runners[j].id === parseInt(runnerBId, 10)) {
            runnerB = runners[j];
        }
    }
    if (!runnerB) {
        res.status(404).end('I could not find id ' + runnerBId);
        return;
    }

    res.data.compare = {
        runnerA: runnerA,
        runnerB: runnerB
    };

    next();
}

function getDataMW(req, res, next) {
    res.data = data.get();
    next();
}

nunjucks.configure('views', {
    autoescape: true,
    express   : app
});

app.use(getDataMW);

app.get('/', function(req, res) {
    res.render('index.html', res.data);
});

app.use('/runner/:id', getRunnerMW);
app.get('/runner/:id', function(req, res) {
    res.render('runner.html', res.data);
});

app.use('/compare', getCompareRunnersMW);
app.get('/compare', function(req, res) {
    res.render('compare.html', res.data);
});

app.get('/totals', function(req, res) {
    res.render('totals.html', res.data);
});

app.listen(3000, function() {
    console.log('App listening on port 3000!');
});
