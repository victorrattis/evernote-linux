'use strict';

const React = require('react');
const SidebarItem = require('./sidebar-item');
const AppActions = require('../action/app-action');
const AppStore = require('../store/app-store');

let style = {
  sidebar: {
    borderRight: '1px solid #d4d4d4',
    background: '#484d44',
    float: 'left',
    width: '58px',
    height: '100%',
    zIndex: 200,
    boxSizing: 'border-box',
    overflow: 'hidden',
    WebkitUserDrag: 'none',
    WebkitUserSelect: 'none',
    cursor: 'default',
    textAlign: 'center'
  },

  logo: {
    position: 'absolute',
    bottom: '0px',
    paddingBottom: '20px',
    textAlign: 'center',
    width: '100%',
    WebkitUserDrag: 'none',
    WebkitUserSelect: 'none'
  },

  unselectable: {
    WebkitUserDrag: 'none',
    WebkitUserSelect: 'none'
  },

  item: {
    default: {
      cursor: 'pointer'
    },

    normal: {
      background: '#1a88df'
    },

    selected: {
      background: '#484d44'
    }
  }
};

let SideBar = React.createClass({
  displayName: 'SideBar',

  getInitialState: function () {
    return {
      selected: AppStore.getContentId()
    };
  },

  componentDidMount: function () {
    AppStore.addChangeListener(this.onChange);
  },

  componentWillUnmount: function () {
    AppStore.removeChangeListener(this.onChange);
  },

  onChange: function () {
    let selectedContent = AppStore.getContentId();

    if (this.state.selected !== selectedContent) {
      this.setState({selected: selectedContent});
    }
  },

  handleShowNotesClick: function () {
    AppActions.showNotes('all-notes');
  },

  handleShowNotebooksClick: function () {
    AppActions.showNotebooks();
  },

  handleShowTagsClick: function () {
    AppActions.showTags();
  },

  render: function () {
    return (
      <div style={style.sidebar}>
        <SidebarItem
          imgNormal='../../../res/note-normal-gray.png'
          imgSelected='../../../res/note-normal-white.png'
          style={style.item}
          onClick={this.handleShowNotesClick}
          enabled={this.state.selected === 'notes'} />

        <SidebarItem
          imgNormal='../../../res/notebook-normal-gray.png'
          imgSelected='../../../res/notebook-normal-white.png'
          style={style.item}
          onClick={this.handleShowNotebooksClick}
          enabled={this.state.selected === 'notebooks'} />

        <SidebarItem
          imgNormal='../../../res/tag-normal-gray.png'
          imgSelected='../../../res/tag-normal-white.png'
          style={style.item}
          onClick={this.handleShowTagsClick}
          enabled={this.state.selected === 'tags'} />

        <div style={style.logo}>
          <img
            style={style.unselectable}
            src='../../../res/evernote-logo1.png' />
        </div>
      </div>
    );
  }
});

module.exports = SideBar;