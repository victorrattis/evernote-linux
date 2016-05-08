'use strict'

const assign = require('object-assign')
const EventEmitter = require('events').EventEmitter
const dateFormat = require('dateformat')
const AppDispatcher = require('../app-dispatcher')
const Action = require('../action/action')
const TagStore = require('../store/tag-store')

let notes = [
  {
    id: 0,
    notebook: 0,
    title: 'Assinatura Mundo Estranho 2015',
    snippet: 'Assinatura revista Mundo Estranho - editora Abril - 27/08/2015 Data da contratação: 27 de julho de 2015 Valor pago na assinatura: 6000 ponto do super bônus Numero do protocolo de contratação:&nbsp;02418319...',
    thumbnail: '../../resources/snippet/6f8fd1fe-7341-4743-88e6-76264ea2dbd4.jpe',
    created: '02 22 2016',
    updated: '02 22 2016',
    tags: [0, 1, 2],
    content: {"entityMap":{},"blocks":[{"key":"dcoro","text":"Hello World","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}
  },
  {
    id: 1,
    notebook: 0,
    title: 'Fazer assinatura do Mundo Estranho 2015',
    snippet: 'Fazer assinatura do Mundo Estranho para 2015 usando os super bônus do cartão Santander.&nbsp; - Anuncio para&nbsp;Revista Mundo Estranho –Editora Abril assinatura anual. Ligar para central de atendimento do San...',
    created: '02 22 2016',
    updated: '02 22 2016',
    tags: [0, 1, 2]
  },
  {
    id: 2,
    notebook: 1,
    title: 'Assinatura Editora Abril - Mundo Estranho - 26/07/2014',
    snippet: 'Dia da inscrição da anuidade pelo Santander Internet Bank: 26/07/2014 Valor pago pela assinatura: 6000 ponto do Super Bônus Numero do protocolo de atendimento da assinatura: 159818297 Prazo para entre...',
    thumbnail: '../../resources/snippet/f5021ae3-d225-4c73-90a6-6ee5bf4c1a1c.jpe',
    created: '02 22 2016',
    updated: '02 22 2016',
    tags: [0, 1, 2],
    content: {"entityMap":{},"blocks":[{"key":"b10oq","text":"Title\ntask list:","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":5,"style":"BOLD"}],"entityRanges":[]},{"key":"crgk0","text":"task A","type":"unordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":6,"style":"ITALIC"}],"entityRanges":[]},{"key":"s0tr","text":"task B","type":"unordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":6,"style":"ITALIC"}],"entityRanges":[]}]}
  },
  {
    id: 3,
    notebook: 0,
    title: 'Assinatura Mundo Estranho 2015',
    snippet: 'Assinatura revista Mundo Estranho - editora Abril - 27/08/2015 Data da contratação: 27 de julho de 2015 Valor pago na assinatura: 6000 ponto do super bônus Numero do protocolo de contratação:&nbsp;02418319...',
    thumbnail: '../../resources/snippet/6f8fd1fe-7341-4743-88e6-76264ea2dbd4.jpe',
    created: '02 22 2016',
    updated: '02 22 2016',
    tags: [0, 1, 2]
  },
  {
    id: 4,
    notebook: 0,
    title: 'Fazer assinatura do Mundo Estranho 2015',
    snippet: 'Fazer assinatura do Mundo Estranho para 2015 usando os super bônus do cartão Santander.&nbsp; - Anuncio para&nbsp;Revista Mundo Estranho –Editora Abril assinatura anual. Ligar para central de atendimento do San...',
    created: '02 22 2016',
    updated: '02 22 2016',
    tags: [0, 1, 2]
  },
  {
    id: 5,
    notebook: 1,
    title: 'Assinatura Editora Abril - Mundo Estranho - 26/07/2014',
    snippet: 'Dia da inscrição da anuidade pelo Santander Internet Bank: 26/07/2014 Valor pago pela assinatura: 6000 ponto do Super Bônus Numero do protocolo de atendimento da assinatura: 159818297 Prazo para entre...',
    thumbnail: '../../resources/snippet/f5021ae3-d225-4c73-90a6-6ee5bf4c1a1c.jpe',
    created: '02 22 2016',
    updated: '02 22 2016',
    tags: [0, 1, 2]
  },
  {
    id: 6,
    notebook: 0,
    title: 'Assinatura Mundo Estranho 2015',
    snippet: 'Assinatura revista Mundo Estranho - editora Abril - 27/08/2015 Data da contratação: 27 de julho de 2015 Valor pago na assinatura: 6000 ponto do super bônus Numero do protocolo de contratação:&nbsp;02418319...',
    thumbnail: '../../resources/snippet/6f8fd1fe-7341-4743-88e6-76264ea2dbd4.jpe',
    created: '02 22 2016',
    updated: '02 22 2016',
    tags: [0, 1, 2]
  },
  {
    id: 7,
    notebook: 0,
    title: 'Fazer assinatura do Mundo Estranho 2015',
    snippet: 'Fazer assinatura do Mundo Estranho para 2015 usando os super bônus do cartão Santander.&nbsp; - Anuncio para&nbsp;Revista Mundo Estranho –Editora Abril assinatura anual. Ligar para central de atendimento do San...',
    created: '02 22 2016',
    updated: '02 22 2016',
    tags: [0, 1, 2]
  },
  {
    id: 8,
    notebook: 1,
    title: 'Assinatura Editora Abril - Mundo Estranho - 26/07/2014',
    snippet: 'Dia da inscrição da anuidade pelo Santander Internet Bank: 26/07/2014 Valor pago pela assinatura: 6000 ponto do Super Bônus Numero do protocolo de atendimento da assinatura: 159818297 Prazo para entre...',
    thumbnail: '../../resources/snippet/f5021ae3-d225-4c73-90a6-6ee5bf4c1a1c.jpe',
    created: '02 22 2016',
    updated: '02 22 2016',
    tags: [0, 1, 2]
  },
  {
    id: 9,
    notebook: 0,
    title: 'Assinatura Mundo Estranho 2015',
    snippet: 'Assinatura revista Mundo Estranho - editora Abril - 27/08/2015 Data da contratação: 27 de julho de 2015 Valor pago na assinatura: 6000 ponto do super bônus Numero do protocolo de contratação:&nbsp;02418319...',
    thumbnail: '../../resources/snippet/6f8fd1fe-7341-4743-88e6-76264ea2dbd4.jpe',
    created: '02 22 2016',
    updated: '02 22 2016',
    tags: [0, 1, 2]
  },
  {
    id: 10,
    notebook: 1,
    title: 'Fazer assinatura do Mundo Estranho 2015',
    snippet: 'Fazer assinatura do Mundo Estranho para 2015 usando os super bônus do cartão Santander.&nbsp; - Anuncio para&nbsp;Revista Mundo Estranho –Editora Abril assinatura anual. Ligar para central de atendimento do San...',
    created: '02 22 2016',
    updated: '02 22 2016',
    tags: [0, 1, 2]
  },
  {
    id: 11,
    notebook: 1,
    title: 'Assinatura Editora Abril - Mundo Estranho - 26/07/2014',
    snippet: 'Dia da inscrição da anuidade pelo Santander Internet Bank: 26/07/2014 Valor pago pela assinatura: 6000 ponto do Super Bônus Numero do protocolo de atendimento da assinatura: 159818297 Prazo para entre...',
    thumbnail: '../../resources/snippet/f5021ae3-d225-4c73-90a6-6ee5bf4c1a1c.jpe',
    created: '02 22 2016',
    updated: '02 22 2016',
    tags: [0, 1, 2]
  }
]

let currentNote = {
  title: 'Title',
  content: {"entityMap":{},"blocks":[{"key":"dcoro","text":"Hello World","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]},
}

let current = notes
let indexSelected;

const CHANGE_EVENT = 'change'
const SELECT_EVENT = 'select'

let NoteStore = assign({}, EventEmitter.prototype, {
  onUpdate: function (action) {
    switch (action.actionType) {
      case Action.SHOW_NOTE_CONTENT:
        if (action.filter === 'all-notes') {
          current = notes
        } else {
          current = notes.filter((value) => (value.notebook === action.filter))
        }
        NoteStore.emitChange()
        break
      case Action.SELECT_NOTE:
        indexSelected = action.noteId
        NoteStore.emitSelect()
        break
      case Action.ADD_TAG_NOTE:
        let newTagId = TagStore.getNewTag()
        notes[action.noteId].tags.push(newTagId)
        NoteStore.emitSelect()
        break
      case Action.ALTER_NOTE:
        let id = action.note.id
        if(id !== undefined) {
          if (action.note.title !== undefined)
            notes[id].title = action.note.title

          if (action.note.content !== undefined) {
            notes[id].content = action.note.content
          }

          notes[id].updated = dateFormat(new Date(), 'mm dd yyyy')
          NoteStore.emitChange()
        }
        break
      default:
    }
  },

  emitChange: function () {
    this.emit(CHANGE_EVENT)
  },

  emitSelect: function () {
    this.emit(SELECT_EVENT)
  },

  addListener: function (eventID, callback) {
    this.on(eventID, callback)
  },

  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback)
  },

  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback)
  },

  getNotes: function () {
    return current
  },

  getCurrentNote: function () {
    return notes[indexSelected]
  }
})

const NoteDispatcherToken = AppDispatcher.register(NoteStore.onUpdate)

module.exports = NoteStore
