'use strict'

const React = require('react')
const draft = require('draft-js')
const Editor = draft.Editor
const EditorState = draft.EditorState
const RichUtils = draft.RichUtils
const Modifier = draft.Modifier

const style = {
  root: {
    fontFamily: '\'Georgia\', serif',
    fontuserSelectSize: 14,
    position: 'relative',
    left: '20px',
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
    marginTop: 18,
    minHeight: 400,
    WebkitUserDrag: 'none',
  }
}

const NoteEditor = React.createClass({
  displayName: 'NoteEditor',

  getInitialState: function () {
    return {
      editorState: EditorState.createEmpty(),
      title: 'Title'
    }
  },

  _onChange: function (editorState) {
    // console.log(JSON.stringify(editorState.getCurrentContent()))
    this.setState({editorState})
  },

  handleChange: function (event) {
    this.setState({
      title: event.target.value
    });
  },

  focus: function () {
    this.refs.editor.focus();
  },

  render: function () {
    const editorState = this.state.editorState
    return (
      <div style={style.root}>
        <input value={this.state.title} type='text' style={style.title} onChange={this.handleChange} />
        <div style={style.editor} onClick={this.focus} >
          <Editor
            editorState={editorState}
            onChange={this._onChange}
            placeholder="Drag Files hera or just start typing"
            ref="editor" />
        </div>
      </div>
    )
  }
})

module.exports = NoteEditor