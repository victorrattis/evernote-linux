
var AppDispatcher = require('./app-dispatcher');

var AppActions = {

    change: function() {
        AppDispatcher.dispatch({
            actionType: "CHANGE_ACTION"
        });
    }

};

module.exports = AppActions;
