'use strict'

const React = require('react')
const ReactDOM = require('react-dom')
const SplitPane = require('react-split-pane')

const Container = require('./container')
const Header = require('./header')

const App = React.createClass({
  render: function () {
    return (
      <SplitPane split='horizontal' defaultSize={'auto'}>
        <Header />
        <Container />
      </SplitPane>
    )
  }
})

const appElement = document.getElementById('app')
ReactDOM.render(<App />, appElement)
