'use strict'

const React = require('react')
const draft = require('draft-js')
const Editor = draft.Editor
const EditorState = draft.EditorState
const RichUtils = draft.RichUtils
const Modifier = draft.Modifier
const convertToRaw = draft.convertToRaw
const convertFromRaw = draft.convertFromRaw
const ContentState = draft.ContentState

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
}

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
  },
}

let title = 'Title'
// let raw = {"entityMap":{},"blocks":[{"key":"dcoro","text":"Hello World","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}
// let raw = {"entityMap":{},"blocks":[{"key":"ac3rb","text":"Write Something on HTML","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":6,"length":10,"style":"red"},{"offset":16,"length":3,"style":"orange"},{"offset":19,"length":4,"style":"green"}],"entityRanges":[]}]}
let raw = {"entityMap":{},"blocks":[{"key":"b10oq","text":"Title\ntask list:","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":5,"style":"BOLD"}],"entityRanges":[]},{"key":"crgk0","text":"task A","type":"unordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":6,"style":"ITALIC"}],"entityRanges":[]},{"key":"s0tr","text":"task B","type":"unordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":6,"style":"ITALIC"}],"entityRanges":[]}]}

const NoteEditor = React.createClass({
  displayName: 'NoteEditor',

  getInitialState: function () {
    let editorState
    if(this.props.content === undefined) {
      editorState = EditorState.createEmpty()
    } else {
      let contentState = convertFromRaw(this.props.content)
      editorState = EditorState.createWithContent(contentState)
    }

    return {
      editorState: editorState,
      title: this.props.title,
    }
  },

  componentWillReceiveProps: function (nextProps) {
    let editorState
    if(nextProps.content === undefined) {
      editorState = EditorState.createEmpty()
    } else {
      let contentState = convertFromRaw(nextProps.content)
      editorState = EditorState.createWithContent(contentState)
    }
    this.setState({
      title: nextProps.title,
      editorState: editorState
    })
  },

  onChange: function (editorState) {
    let curenntCS = editorState.getCurrentContent()
    raw = convertToRaw(curenntCS)
    // console.log(JSON.stringify(raw));

    // console.log(JSON.stringify(editorState.getCurrentContent()))
    // let raw = convertToRaw(editorState.getCurrentContent())
    // let s = EditorState.createWithContent()

    // console.log(editorState)
    this.setState({ editorState: editorState })
    // if(this.props.onChange !== undefined) {
    //   this.props.onChange(this.state.note)
    // }

      // this.props.onChange({
      //   id: this.props.id,
      //   content: raw
      // })
  },

  handleChange: function (event) {
    // if(this.props.onChange != undefined) {
      this.props.onChange({id: this.props.id, title: event.target.value})
    // }
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

  handleBlur: function () {
    // event.target.value
    // let curenntCS = this.state.editorState.getCurrentContent()
    // raw = convertToRaw(curenntCS)
    // this.props.onChange({
    //   id: this.props.id,
    //   content: raw
    // })
  },

  render: function () {
    const editorState = this.state.editorState
    return (
      <div style={style.root}>
        <input
          key={this.props.id}
          type='text'
          style={style.title}
          defaultValue={this.state.title}
          onChange={this.handleChange}
          onBlur={this.handleBlur()} />
        <div
          style={style.editor}
          onClick={this.focus} >
          <Editor
            handleKeyCommand={this._handleKeyCommand}
            customStyleMap={colorStyleMap}
            editorState={editorState}
            onChange={this.onChange}
            placeholder="Drag Files hera or just start typing"
            ref="editor"
          />
        </div>
      </div>
    )
  }
})

module.exports = NoteEditor
