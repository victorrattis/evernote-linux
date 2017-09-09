'use strict';

const React = require('react');
const draft = require('draft-js');
const Editor = draft.Editor;
const EditorState = draft.EditorState;
const RichUtils = draft.RichUtils;
// const Modifier = draft.Modifier;
// const convertToRaw = draft.convertToRaw;
const convertFromRaw = draft.convertFromRaw;
// const ContentState = draft.ContentState;
// const convertFromHTML = draft.convertFromHTML;

const style = {
  root: {
    fontFamily: '\'Georgia\', serif',
    fontuserSelectSize: 14,
    position: 'absolute',
    left: '15px',
    right: '15px',
    top: '14px',
    WebkitUserDrag: 'none',
  },

  title: {
    fontSize: '23px',
    fontFamily: 'Georgia, serif',
    position: 'relative',
    paddingBottom: '12px',
    color: '#000',
    background: 'none',
    border: 'none',
    outline: 'none',
    padding: 0,
    width: '100%',
    WebkitUserDrag: 'none',
  },

  editor: {
    cursor: 'text',
    fontSize: 16,
    marginTop: '26px',
    minHeight: '400px',
    WebkitUserDrag: 'none',
  }
};

const colorStyleMap = {
  red: {
    fontFamily: '\'Georgia\', serif',
    fontSize: 32,
    color: 'rgba(255, 0, 0, 1.0)',
  },
  orange: {
    color: 'rgba(255, 127, 0, 1.0)',
  },
  yellow: {
    color: 'rgba(180, 180, 0, 1.0)',
  },
  green: {
    color: 'rgba(0, 180, 0, 1.0)',
  },
  blue: {
    color: 'rgba(0, 0, 255, 1.0)',
  },
  indigo: {
    color: 'rgba(75, 0, 130, 1.0)',
  },
  violet: {
    color: 'rgba(127, 0, 255, 1.0)',
  }
};

const NoteEditor = React.createClass({
  displayName: 'NoteEditor',

  getInitialState: function () {
    let editorState;
    if(!this.props.content) {
      editorState = EditorState.createEmpty();
    } else {
      let contentState = convertFromRaw(JSON.parse(this.props.content));
      editorState = EditorState.createWithContent(contentState);
    }

    return {
      editorState: editorState,
      title: this.props.title,
    };
  },

  componentWillReceiveProps: function (nextProps) {
    let editorState;
    if(!nextProps.editorState) {
      if(!nextProps.content) {
        editorState = EditorState.createEmpty();
      } else {
        let contentState = convertFromRaw(JSON.parse(nextProps.content));
        editorState = EditorState.createWithContent(contentState);
      }
    }else {
      editorState = nextProps.editorState;
    }

    this.setState({
      title: nextProps.title,
      editorState: editorState
    });
  },

  shouldComponentUpdate: function (nextProps, nextState) {
    return nextState.editorState !== this.state.editorState;
  },

  onChange: function (editorState) {
    this.props.onChange({
      id: this.props.id,
      editorState: editorState
    });

    this.setState({ editorState: editorState });
  },

  handleChange: function (event) {
    this.props.onChange({
      id: this.props.id,
      title: event.target.value
    });
  },

  focus: function () {
    this.refs.editor.focus();
  },

  _handleKeyCommand: function (command) {
    const editorState = this.state.editorState;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  },

  render: function () {
    const editorState = this.state.editorState;
    return (
      <div style={style.root} onKeyUp={this.handleKeyUp} onKeyDown={this.handleKeyUp} >
        <input
          key={this.props.id}
          type='text'
          ref='title'
          style={style.title}
          defaultValue={this.state.title}
          onChange={this.handleChange} />
        <div
          style={style.editor}
          onClick={this.focus} >
          <Editor
            handleKeyCommand={this._handleKeyCommand}
            customStyleMap={colorStyleMap}
            editorState={editorState}
            onChange={this.onChange}
            placeholder="Drag Files hera or just start typing"
            ref="editor" />
        </div>
      </div>
    );
  }
});

module.exports = NoteEditor;
