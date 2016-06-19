'use strict';

const React = require('react');

const style = {
  div: {
    borderRadius: '4px',
    position: 'relative',
    float: 'left',
    background: '#d3e6fa',
    paddingLeft: '15px',
    paddingTop: '1px',
    paddingBottom: '1px',
    paddingRight: '10px',
    marginRight: '10px',
    marginBottom: '4px',
  },

  text: {
    color: '#202424'
  }
};

let TagLabel = React.createClass({
  displayName: 'TagLabel',

  render: function () {
    return (
      <div style={style.div}>
        <span style={style.text}>{this.props.text}</span>
      </div>
    );
  }
});

module.exports = TagLabel;
