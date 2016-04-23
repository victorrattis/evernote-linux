'use strict';
var React = require('react');

var divStyle = {
    height: 48
};

var IconeButton = React.createClass({
    displayName: 'IconeButton',

    getInitialState: function() {
        return {
            hover: this.props.imgNormal
        };
    },

    mouseOver: function() {
        this.setState({ hover: this.props.imgOver });
    },

    mouseOut: function() {
        this.setState({ hover: this.props.imgNormal });
    },

    mouseClick: function() {
        console.log("action: " + this.props.action);
    },

    render: function() {
        return (
            <div style={divStyle} draggable="false" >
                <img src={this.state.hover}
                    onMouseOver={this.mouseOver}
                    onMouseOut={this.mouseOut}
                    onClick={this.mouseClick}
                    />
            </div>
        );
    }
});

module.exports = IconeButton;
