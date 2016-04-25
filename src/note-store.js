const assign = require('object-assign')
const EventEmitter = require('events').EventEmitter
const AppDispatcher = require('./app-dispatcher')

// Mock up to notes
let notes = [
  {
    title: 'Assinatura Mundo Estranho 2015',
    date: '22/02/16',
    snippet: 'Assinatura revista Mundo Estranho - editora Abril - 27/08/2015 Data da contratação: 27 de julho de 2015 Valor pago na assinatura: 6000 ponto do super bônus Numero do protocolo de contratação:&nbsp;02418319...',
    thumbnail: '../../resources/snippet/6f8fd1fe-7341-4743-88e6-76264ea2dbd4.jpe'
  },
  {
    title: 'Fazer assinatura do Mundo Estranho 2015',
    date: '22/02/16',
    snippet: 'Fazer assinatura do Mundo Estranho para 2015 usando os super bônus do cartão Santander.&nbsp; - Anuncio para&nbsp;Revista Mundo Estranho –Editora Abril assinatura anual. Ligar para central de atendimento do San...'
  },
  {
    title: 'Assinatura Editora Abril - Mundo Estranho - 26/07/2014',
    date: '22/02/16',
    snippet: 'Dia da inscrição da anuidade pelo Santander Internet Bank: 26/07/2014 Valor pago pela assinatura: 6000 ponto do Super Bônus Numero do protocolo de atendimento da assinatura: 159818297 Prazo para entre...',
    thumbnail: '../../resources/snippet/f5021ae3-d225-4c73-90a6-6ee5bf4c1a1c.jpe'
  },
  {
    title: 'Assinatura Mundo Estranho 2015',
    date: '22/02/16',
    snippet: 'Assinatura revista Mundo Estranho - editora Abril - 27/08/2015 Data da contratação: 27 de julho de 2015 Valor pago na assinatura: 6000 ponto do super bônus Numero do protocolo de contratação:&nbsp;02418319...',
    thumbnail: '../../resources/snippet/6f8fd1fe-7341-4743-88e6-76264ea2dbd4.jpe'
  },
  {
    title: 'Fazer assinatura do Mundo Estranho 2015',
    date: '22/02/16',
    snippet: 'Fazer assinatura do Mundo Estranho para 2015 usando os super bônus do cartão Santander.&nbsp; - Anuncio para&nbsp;Revista Mundo Estranho –Editora Abril assinatura anual. Ligar para central de atendimento do San...'
  },
  {
    title: 'Assinatura Editora Abril - Mundo Estranho - 26/07/2014',
    date: '22/02/16',
    snippet: 'Dia da inscrição da anuidade pelo Santander Internet Bank: 26/07/2014 Valor pago pela assinatura: 6000 ponto do Super Bônus Numero do protocolo de atendimento da assinatura: 159818297 Prazo para entre...',
    thumbnail: '../../resources/snippet/f5021ae3-d225-4c73-90a6-6ee5bf4c1a1c.jpe'
  },
  {
    title: 'Assinatura Mundo Estranho 2015',
    date: '22/02/16',
    snippet: 'Assinatura revista Mundo Estranho - editora Abril - 27/08/2015 Data da contratação: 27 de julho de 2015 Valor pago na assinatura: 6000 ponto do super bônus Numero do protocolo de contratação:&nbsp;02418319...',
    thumbnail: '../../resources/snippet/6f8fd1fe-7341-4743-88e6-76264ea2dbd4.jpe'
  },
  {
    title: 'Fazer assinatura do Mundo Estranho 2015',
    date: '22/02/16',
    snippet: 'Fazer assinatura do Mundo Estranho para 2015 usando os super bônus do cartão Santander.&nbsp; - Anuncio para&nbsp;Revista Mundo Estranho –Editora Abril assinatura anual. Ligar para central de atendimento do San...'
  },
  {
    title: 'Assinatura Editora Abril - Mundo Estranho - 26/07/2014',
    date: '22/02/16',
    snippet: 'Dia da inscrição da anuidade pelo Santander Internet Bank: 26/07/2014 Valor pago pela assinatura: 6000 ponto do Super Bônus Numero do protocolo de atendimento da assinatura: 159818297 Prazo para entre...',
    thumbnail: '../../resources/snippet/f5021ae3-d225-4c73-90a6-6ee5bf4c1a1c.jpe'
  },
  {
    title: 'Assinatura Mundo Estranho 2015',
    date: '22/02/16',
    snippet: 'Assinatura revista Mundo Estranho - editora Abril - 27/08/2015 Data da contratação: 27 de julho de 2015 Valor pago na assinatura: 6000 ponto do super bônus Numero do protocolo de contratação:&nbsp;02418319...',
    thumbnail: '../../resources/snippet/6f8fd1fe-7341-4743-88e6-76264ea2dbd4.jpe'
  },
  {
    title: 'Fazer assinatura do Mundo Estranho 2015',
    date: '22/02/16',
    snippet: 'Fazer assinatura do Mundo Estranho para 2015 usando os super bônus do cartão Santander.&nbsp; - Anuncio para&nbsp;Revista Mundo Estranho –Editora Abril assinatura anual. Ligar para central de atendimento do San...'
  },
  {
    title: 'Assinatura Editora Abril - Mundo Estranho - 26/07/2014',
    date: '22/02/16',
    snippet: 'Dia da inscrição da anuidade pelo Santander Internet Bank: 26/07/2014 Valor pago pela assinatura: 6000 ponto do Super Bônus Numero do protocolo de atendimento da assinatura: 159818297 Prazo para entre...',
    thumbnail: '../../resources/snippet/f5021ae3-d225-4c73-90a6-6ee5bf4c1a1c.jpe'
  }
]

const CHANGE_EVENT = 'change'

let NoteStore = assign({}, EventEmitter.prototype, {
  onUpdate: function (action) {
    switch (action.actionType) {
      case 'CHANGE_ACTION':
        NoteStore.emitChange()
        break
      default:
    }
  },

  emitChange: function () {
    this.emit(CHANGE_EVENT)
  },

  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback)
  },

  getNotes: function () {
    return notes
  }
})

AppDispatcher.register(NoteStore.onUpdate)

module.exports = NoteStore
