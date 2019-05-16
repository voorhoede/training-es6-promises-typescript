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
    .then(meal => dinnerIsReady(meal));
};

function setMessage(message) {
  output.innerHTML = output.innerHTML + '<br><br>' + message;
}

function getGroceries(list) {
  setMessage('Getting groceries: <br><br>' + list.join(',<br>'));
  return new Promise((resolve, reject) => {
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

function dinnerIsReady(meal) {
  setMessage('Dinner is ready: <strong>' + meal + '</strong>');
}
