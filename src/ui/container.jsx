var React = require('react');

var SideBar = require('./side-bar');
var Content = require('./content');

var style = {
    width: "100%",
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
};

var style2= {
    background: "#868686",
    width: "100%",
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
};

var Container = React.createClass({
    displayName: 'Container',

    render() {
        return (
            <div style={style} >
                <div style={style2}>
                    <SideBar />
                    <Content />
                </div>
            </div>
        );
    }
});

 // <SideBar />
 // <Content />

module.exports = Container;