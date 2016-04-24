const AppDispatcher = require('./app-dispatcher')

let AppActions = {
  change: function () {
    AppDispatcher.dispatch({
      actionType: 'CHANGE_ACTION'
    })
  }
}

module.exports = AppActions
