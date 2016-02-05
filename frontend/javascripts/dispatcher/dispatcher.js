var Dispatcher = require('flux').Dispatcher;

// var Dispatchers = {
//   QuestionDispatcher: new Dispatcher(),
//   UsersDispatcher: new Dispatcher(),
//   CurrentUserDispatcher: new Dispatcher(),
// };

var AppDispatcher = new Dispatcher();

// module.exports = new Dispatcher();

module.exports = AppDispatcher;
