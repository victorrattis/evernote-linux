'use strict';

const React = require('react');
const SidebarItem = require('./sidebar-item');
const AppActions = require('../action/app-action');
const AppStore = require('../store/app-store');

const items = [
  {
    name: 'Notes',
    actionType: 'show_notes',
    action: 'notes',
    imgs: {
      normal: '../../../res/note-normal-gray.png',
      selected: '../../../res/note-normal-white.png'
    }
  },
  {
    name: 'Notebooks',
    action: 'notebooks',
    imgs: {
      normal: '../../../res/notebook-normal-gray.png',
      selected: '../../../res/notebook-normal-white.png'
    }
  },
  {
    name: 'Tags',
    action: 'tags',
    imgs: {
      normal: '../../../res/tag-normal-gray.png',
      selected: '../../../res/tag-normal-white.png'
    }
  }
]

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

  handleActionClick: function (action) {
    if (action === undefined || action.length <= 0) {
      console.log('SiberItem Withou action.')
      return;
    }

    // AppActions.SideBar.itemSelected(action)
    // action - sidebar:notes
    // sidebar.show:notes?id=3482
    // sidebar.open:notes?id=3482
    // AppActions.sendAction({
    //   actionType: 'SIDEBAR_ACTION',
    //   itemAction: action,
    //   actor: 'sidebar-item'
    // })

    // TODO: Change to 'SidebarAction:notes'
    if (action === 'notes') {
      AppActions.showNotes('all-notes')

    } else if (action === 'notebooks') {
      AppActions.showNotebooks()

    } else if (action === 'tags') {
      AppActions.showTags()
    }

    console.log('OnClick: ' + action)
  },

  render: function () {
    return (
      <div style={style.sidebar}>
        { /*  Get sidebar items to render */
          items.map((item, index) => (
            <SidebarItem
                key={index}
                imgNormal={item.imgs.normal}
                imgSelected={item.imgs.selected}
                action={item.action}
                style={style.item}
                onClick={this.handleActionClick}
                enabled={this.state.selected === item.action} />
          ))
        }

        <div style={style.logo}>
          <img style={style.unselectable}
              src='../../../res/evernote-logo1.png' />
        </div>
      </div>
    );
  }
});

module.exports = SideBar;
