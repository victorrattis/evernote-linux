const React = require('react')
const SplitPane = require('react-split-pane')

const Sidebar = require('./sidebar')
const Content = require('./content')

let Container = React.createClass({
  displayName: 'Container',

  render: function () {
    return (
      <SplitPane split='vertical' defaultSize={'auto'} className='primary'>
        <Sidebar />
        <Content />
      </SplitPane>
    )
  }
})

module.exports = Container
