'use strict';
var React = require('react');

var divStyle = {
    height: 48,
    WebkitUserDrag: 'none',
    WebkitUserSelect: 'none'
};

var style = {
    unselectable: {
        WebkitUserDrag: 'none',
        WebkitUserSelect: 'none'
    }
};

var SidebarItem = React.createClass({
    displayName: 'SidebarItem',

    getInitialState: function() {
        return {
            isOver: false,
            isClicked: false
        };
    },

    unmarks: function() {
        this.setState({ isClicked: false });
    },

    mouseOver: function() {
        this.setState({ isOver: true });
    },

    mouseOut: function() {
        this.setState({ isOver: false });
    },

    mouseClick: function() {
        this.setState({ isClicked: true });

        if(this.props.onItemSelected != undefined) {
            this.props.onItemSelected(this);
        }
    },

    render: function() {
        // The over state overlaps the other states.
        var imageSource = this.state.isOver ? 
                            this.props.imgOver : 
                            (this.state.isClicked ? this.props.imgSelected : this.props.imgNormal);

        return (
            <div style={divStyle} draggable="false" >
                <img style={style.unselectable} src={imageSource}
                    onMouseOver={this.mouseOver}
                    onMouseOut={this.mouseOut}
                    onClick={this.mouseClick} />
            </div>
        );
    }
});

module.exports = SidebarItem;
