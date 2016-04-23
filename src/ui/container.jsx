var React = require('react');

var Sidebar = require('./sidebar');
var Content = require('./content');

var style = {
    /*
     Container Inline Style
     */
    container: {
        width: "100%",
        height: '100%',
        overflow: 'hidden',
    },

    /*
     Sidebar Area Inline Style
     Defines the area where will insert the Sidebar Component.
     */
    sidebar: {
        height: '100%',
        float:"left",
        display: 'inline-block',
        overflow: 'hidden',
    },

    /*
     Content Area Inline Style
     Defines the area where will insert the Content Component.
     */
    content: {
        height: '100%',
        overflow: 'hidden',
    }
};

var Container = React.createClass({
    displayName: 'Container',

    render: function() {
        return (
            <div style={style.container} >
                <div style={style.sidebar}>
                    <Sidebar />
                </div>
                <div style={style.content}>
                    <Content />
                </div>
            </div>
        );
    }
});

module.exports = Container;