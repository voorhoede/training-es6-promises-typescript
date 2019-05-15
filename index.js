/*
 *
 * Exercise!
 *
 * Destructure values where possible
 *
 */
const express = require('express');
const nunjucks = require('nunjucks');
const app = express();
const { runners: runnersData, runnersTeam, swimmers: swimmersData } = require('./athletes.json');

const add = (a, b) => a + b;

const data = {
  runnersData,
  swimmersData,
  runnersTeamNames: getTeamNames(runnersTeam, runnersData),
  get() {
    const allRuns = this.runnersData.reduce((array, athlete) => array.concat(athlete.runs), []);
    const allLanes = this.swimmersData.reduce((array, athlete) => array.concat(athlete.lanes), []);
    const allEvents = [].concat(allRuns).concat(allLanes);
    const totalDistanceRun = allRuns.reduce(add, 0);
    const totalDistanceLanes = allLanes.reduce(add, 0);
    const totalDistanceEvents = allEvents.reduce(add, 0);

    const getRunningTeam = () => getTeam(this.runnersTeamNames);

    return {
      runningTeam: getRunningTeam(),
      runners: this.runnersData.map(runnerData),
      totalsRunners: {
        allRuns,
        totalDistanceRun
      },
      totalSwimmers: {
        allLanes,
        totalDistanceLanes
      },
      totalOverall: {
        allEvents,
        totalDistanceEvents
      }
    }
  }
};

function runnerData({id, name, runs} = {}) {
  return {
    id,
    name,
    runs,
    getAverageDistance() {
      return calculateAverageDistance.apply(null, this.runs);
    },
    getTotalRuns() {
      return this.runs.length;
    }
  }
}

function getTeamNames(team, athletes) {
  return team.map(member => getAthlete(athletes, member).name)
}

function getTeam(team) {
  const captain = team[0];
  const players = team.slice(1);
  return { captain, players }
}

function calculateAverageDistance() {
  const events = [].slice.call(arguments);
  const totalDistance = events.reduce(add, 0);
  const average = totalDistance / events.length;
  return Math.round(average * 100) / 100;
}

function getAthlete(athletes, id) {
  let athlete;

  for (let i = 0; i < athletes.length; i++) {
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
  const queryIds = (req.query.id) ? req.query.id : [];
  const [runnerAId, runnerBId] = queryIds;
  const { runners } = res.data;
  let runnerA, runnerB;

  if (!runnerAId || !runnerBId) {
    res.status(400).end('I need two id\'s');
    return;
  }

  for (let i = 0; i < runners.length; i++) {
    if (runners[i].id === parseInt(runnerAId, 10)) {
      runnerA = runners[i];
    }
  }
  if (!runnerA) {
    res.status(404).end('I could not find id ' + runnerAId);
    return;
  }

  for (let i = 0; i < runners.length; i++) {
    if (runners[i].id === parseInt(runnerBId, 10)) {
      runnerB = runners[i];
    }
  }
  if (!runnerB) {
    res.status(404).end('I could not find id ' + runnerBId);
    return;
  }

  res.data.compare = { runnerA, runnerB };

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

app.get('/', (req, res) => res.render('index.html', res.data));

app.use('/runner/:id', getRunnerMW);
app.get('/runner/:id', (req, res) => res.render('runner.html', res.data));

app.use('/compare', getCompareRunnersMW);
app.get('/compare', (req, res) => res.render('compare.html', res.data));

app.get('/totals', (req, res) => res.render('totals.html', res.data));

app.listen(3000, () => console.log('App listening on port 3000!'));
