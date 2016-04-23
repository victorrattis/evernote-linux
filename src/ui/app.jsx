
var React = require('react');
var ReactDOM = require('react-dom');

var Header = require('./header');
var SideBar = require('./side-bar');
var Container = require('./container');

var App = React.createClass({
    render: function() {
        return (
            <div> 
                <SideBar />
                <Container />
            </div>
        );
    }
});

var appElement = document.getElementById('app');
ReactDOM.render(<App />, appElement);
