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
  getGroceries(groceryList, function(groceries) {
    makeDinner(groceries, function(meal) {
      dinnerIsReady(meal);
    });
  });
};

function setMessage(message) {
  output.innerHTML = output.innerHTML + '<br><br>' + message;
}

function getGroceries(list, callback) {
  setMessage('Getting groceries: <br><br>' + list.join(',<br>'));
  setTimeout(function(){
    callback(list);
  }, 2500, list);
}

function makeDinner(ingredients, callback) {
  setMessage('Making dinner');
  setTimeout(function(){
    callback('Spaghetti Bolognese');
  }, 2500);
}

function dinnerIsReady(meal) {
  setMessage('Dinner is ready: <strong>' + meal + '</strong>');
}
