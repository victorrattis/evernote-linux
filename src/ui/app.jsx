const React = require('react')
const ReactDOM = require('react-dom')

const Container = require('./container')
const Header = require('./header')

const style = {
  /*
   App Inline Style
   */
  app: {
    width: '100%',
    height: '100%',
    display: 'table',
    overflow: 'hidden'
  },

  /*
   Header Area Inline Style
   Defines the area where will insert the Header component.
   */
  header: {
    width: '100%',
    height: 'auto',
    position: 'relative',
    display: 'table-row',
    overflow: 'hidden'
  },

  /*
   Container Area Inline Style
   Defines the area where will insert the Container compoenent.
   */
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
    display: 'table-row',
    overflow: 'hidden'
  }
}

let App = React.createClass({
  render: function () {
    return (
      <div style={style.app}>
        <div style={style.header}>
          <Header />
        </div>
        <div style={style.container}>
          <Container />
        </div>
      </div>
    )
  }
})

let appElement = document.getElementById('app')
ReactDOM.render(<App />, appElement)
