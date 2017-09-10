'use strict'

const React = require('react');
const ObjectAssign = require('object-assign');

const style = {
  unselectable: {
    WebkitUserDrag: 'none',
    WebkitUserSelect: 'none'
  },

  div: {
    WebkitUserDrag: 'none',
    WebkitUserSelect: 'none'
  }
}

let SidebarItem = React.createClass({
  displayName: 'SidebarItem',

  getInitialState: function () {
    return {
    };
  },

  getDefaultProps: function () {
    return {
      enabled: true
    };
  },

  shouldComponentUpdate: function (nextProps, nextState) {
    return nextProps.enabled !== this.props.enabled
  },

  mouseClick: function () {
    if (this.props.onClick !== undefined) {
      this.props.onClick(this.props.action)
    }
  },

  render: function () {
    let inlineStyle = ObjectAssign(
      {},
      style.div,
      this.props.style.default,
      this.props.enabled ? this.props.style.normal : this.props.style.selected
    )
    let imageSource = this.props.enabled ? this.props.imgSelected : this.props.imgNormal

    return (
      <div style={inlineStyle}
          onClick={this.mouseClick} >
        <img style={style.unselectable}
          src={imageSource} />
      </div>
    )
  }
})

module.exports = SidebarItem
