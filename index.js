var button = document.getElementById('start');
var output = document.getElementById('message');
var groceryList = [
  '400g spaghetti',
  '500g beef mince',
  '6 plum tomatoes',
  'olive oil',
  '75g Parmesan'
];

button.onclick = function() {
  getGroceries(groceryList)
    .then(groceries => makeDinner(groceries))
    .then(meal => dinnerIsReady(meal))
    .then(meal => haveDinner(meal))
    .then(mess => cleanUp(mess))
    .then(result => setMessage(result));
};

function setMessage(message) {
  output.innerHTML = output.innerHTML + '<br><br>' + message;
}

function getGroceries(list) {
  setMessage('Getting groceries: <br><br>' + list.join(',<br>'));
  return new Promise((resolve, reject) => {
    if (document.getElementById('outOfSpaghetti').checked) {
      reject('There\'s no of spaghetti!');
    }
    setTimeout(function(){
      resolve(list);
    }, 2500, list);
  });
}

function makeDinner(ingredients) {
  setMessage('Making dinner');
  return new Promise((resolve, reject) => {
    setTimeout(function(){
      resolve('Spaghetti Bolognese');
    }, 2500);
  });
}

function haveDinner(meal) {
  setMessage('Having dinner');
  return new Promise((resolve, reject) => {
    setTimeout(function(){
      resolve(['dirty plates', 'empty pan']);
    }, 2500);
  });
}

function cleanUp(mess) {
  setMessage('Cleaning mess: <br><br>' + mess.join(',<br>'));
  return new Promise((resolve, reject) => {
    setTimeout(function(){
      resolve('The table is clean.');
    }, 2500);
  });

}

function tellMom(problem) {
  setMessage('<strong style="color:red;"> MOM!!! ' + problem + '</strong>');
  return Promise.resolve([]);
}

function dinnerIsReady(meal) {
  setMessage('Dinner is ready: <strong>' + meal + '</strong>');
  return meal;
}
