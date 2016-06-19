'use strict';

const React = require('react');

const style = {
  header: {
    width: '100%',
    height: '52px',
    position: 'relative',
    overflow: 'hidden',
    background: '#f4f2ef'
  },

  title: {
    fontSize: '17px',
    bottom: '0px',
    position: 'absolute',
    textAlign: 'center',
    width: '100%',
    paddingBottom: '12px',
    color: '#626262'
  },

  arrow: {
    paddingBottom: '2px',
    paddingLeft: '5px'
  },

  tag: {
    position: 'relative',
    height: '100%',
    width: '20px',
    float: 'right',
    paddingRight: '16px',
    paddingTop: '16px'
  }
};

const NoteHeader = React.createClass({
  displayName: 'NoteHeader',

  render: function () {
    let title = 'All Notes';

    return (
      <div style={style.header}>
        <div style={style.title}>
          {title}
          <img style={style.arrow} src='../../resources/arrow2.png' />
        </div>

        <div style={style.tag} >
          <img src='../../resources/new_tag_grey.png' />
        </div>
      </div>
    );
  }
});

module.exports = NoteHeader;
