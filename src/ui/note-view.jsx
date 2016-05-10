'use strict'

const React = require('react')
const SplitPane = require('react-split-pane')
const dateFormat = require('dateformat')

const NoteEditor = require('./note-editor')
const TagStore = require('../store/tag-store')
const NoteStore = require('../store/note-store')
const NotebookStore = require('../store/notebook-store')
const TagLabel = require('./tag-label')
const TextInput = require('./text-input')
const AppAction = require('../action/app-action')

const style = {
  default: {
    background: '#fff',
    height: '100%',
    position: 'absolute',
    // borderLeft: '1px solid #e5e5e5',
    left: '20px',
    right: '20px',
  },

  line: {
    display: 'block',
    height: '1px',
    border: 0,
    borderTop: '1px solid #e5e5e5',
    margin: '1em 0',
    padding: 0,
    position: 'relative',
  },

  title: {
    fontSize: '17px',
    position: 'relative',
    textAlign: 'center',
    width: '100%',
    paddingBottom: '12px',
    color: '#626262'
  },

  header: {
    background: '#fff',
    height: '55px',
    width: '100%',
    position: 'relative',
  },

  noteInfo: {
    background: '#fff',
    height: 'auto',
    width: '100%',
    position: 'relative',
    borderBottom: '1px solid #e5e5e5',
    fontSize: '11px',
    color: '#707070',
    paddingBottom: '7px',
    WebkitUserDrag: 'none',
    WebkitUserSelect: 'none',
  },

  editor: {
    background: '#fff',
    height: 'auto',
    width: '100%',
    position: 'absolute',
  },

  notebookIcon: {
    background: '#fff',
    height: 'auto',
    fontSize: '11px',
    color: '#707070',
    position: 'relative',
    WebkitUserDrag: 'none',
    WebkitUserSelect: 'none',
    float: 'left',
    top: '12px',
    marginRight: '12px',
  },

  span: {
    float: 'left',
    display: 'inline-block',
    verticalAlign: 'middle',
    lineHeight: 'normal',
    position: 'relative',
    top: '3px',
  },

  image: {
    float: 'left',
    marginRight: '10px',
  },

  input: {
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
    width: '100%',
    WebkitUserDrag: 'none',
  },
}

const NoteView = React.createClass({
  displayName: 'NoteView',

  getInitialState: function () {
    return {
      note: {}
    }
  },

  componentDidMount: function () {
    NoteStore.addListener('select', this.handleChange)
  },

  componentWillUnmount: function () {
    NoteStore.removeListener('select', this.handleChange)
  },

  shouldComponentUpdate: function (nextProps, nextState) {
    return nextState.note.id !== this.state.note.id
  },

  handleChange: function () {
    let note = NoteStore.getCurrentNote()
    this.setState({note: note})
  },

  handleBlur: function (text) {
    if(text != '') {
      AppAction.addNewTag(
        { name: text },
        this.state.note.id)
      // this.state.tags[4]={ id: 4, name: text }
      // // this.state.tags.push({ id: this.state.tags.length, name: text })
      // this.setState({state: this.state.tags})
    }
  },

  dateFormatter: function (date) {
    if(date == undefined) return ''
    return dateFormat(new Date(date), "mmm dd, yyyy")
  },

  handleNoteChange: function(info) {
    // if(info.title !== undefined) {
      AppAction.alterNote(info)
    // }
  },

  render: function () {
    let notebook = NotebookStore.getNotebook(this.state.note.notebook)
    let notebookName = (notebook != undefined) ? notebook.title : ''

    // this.noteId = this.state.note.noteId
    let tagElements = null
    if(this.state.note.tags != undefined) {
      tagElements = this.state.note.tags.map(function (item, index) {
        let tag = TagStore.getTag(item)
        return <TagLabel key={tag.id} text={tag.name} />
      })
    }

    return (
      <div style={style.default} >
        <SplitPane split='horizontal' defaultSize={'auto'} >
          <div style={style.header}>
            <SplitPane split='vertical' defaultSize={'auto'} className='primary'>
              <div style={style.notebookIcon}>
                <img style={style.image} src='../../resources/notebook-icon.png' />
                <span style={style.span}>{notebookName}</span>
              </div>
              <div style={style.notebookIcon}>
                <img style={style.image} src='../../resources/tag-icon.png' />
                {tagElements}
                <TextInput  onBlur={this.handleBlur} />
              </div>
            </SplitPane>
          </div>
          <div>
            <div style={style.noteInfo}>
              <span>Created: {this.dateFormatter(this.state.note.created)} &nbsp;&nbsp;&nbsp; Updated: {this.dateFormatter(this.state.note.updated)}</span>
            </div>
            <div style={style.editor}>
              <NoteEditor
                title={this.state.note.title}
                content={this.state.note.content}
                id={this.state.note.id}
                onChange={this.handleNoteChange} />
            </div>
          </div>
        </SplitPane>
      </div>
    )
  }
})

module.exports = NoteView
