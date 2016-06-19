'use strict';

const React = require('react');

const style = {
  default: {
    fontSize: '14px',
    fontFamily: 'Georgia, serif',
    position: 'relative',
    // paddingBottom: '12px',
    float: 'left',
    color: '#222',
    background: 'none',
    border: 'none',
    outline: 'none',
    padding: 0,
    width: 'auto',
    WebkitUserDrag: 'none',
  }
};

let TextInput = React.createClass({
  displayName: 'TextInput',

  handleBlur: function () {
    if(this.props.onBlur !== undefined) {
      this.props.onBlur(this.refs.input.value);
      this.refs.input.value= '';
    }
  },

  handleKeyPress: function (e) {
    if (e.key === 'Enter') {
      this.handleBlur();
    }
  },

  render: function () {
    return (
      <div style={style.default}>
        <input
          ref='input'
          type='text'
          style={style.default}
          onKeyPress = {this.handleKeyPress}
          onBlur={this.handleBlur} />
      </div>
    );
  }
});

module.exports = TextInput;
