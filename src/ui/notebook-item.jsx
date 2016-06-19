'use strict';

const React = require('react');

const style = {
  div: {
    border: '1px solid #dfdedd',
    background: '#fff',
    width: '250px',
    height: '40px',
    position: 'relative',
    marginBottom: '5px',
    borderRadius: '4px',
    WebkitUserDrag: 'none',
    WebkitUserSelect: 'none',
    cursor: 'pointer'
  },

  test2: {
    fontSize: '13px',
    float: 'left',
    position: 'absolute',
    color: '3c3c3c',
    paddingLeft: '10px',
    paddingTop: '12px',
    WebkitUserDrag: 'none',
    WebkitUserSelect: 'none'
  },

  test: {
    position: 'absolute',
    height: '100%',
    width: '45px',
    right: 0,
    borderLeft: '1px solid #dfdedd',
    WebkitUserDrag: 'none',
    WebkitUserSelect: 'none'
  },

  test3: {
    fontSize: '12px',
    height: '100%',
    width: '100%',
    position: 'absolute',
    color: '#aaaaaa',
    textAlign: 'center',
    paddingTop: '12px',
    WebkitUserDrag: 'none',
    WebkitUserSelect: 'none'
  }
};

let NotebookItem = React.createClass({
  displayName: 'NotebookItem',

  handleClick: function () {
    if (this.props.onClick !== undefined) {
      this.props.onClick();
    }
  },

  render: function () {
    return (
      <li style={style.div} onClick={this.handleClick}>
        <div style={style.test2}>
          {this.props.title}
        </div>
        <div style={style.test}>
          <div style={style.test3}>
            {this.props.number}
          </div>
        </div>
      </li>
    );
  }
});

module.exports = NotebookItem;
