var React = require('react');

var NoteSnippetView = require('./note-snippet-view');

var notes = [
    {
        title : "Assinatura Mundo Estranho 2015",
        date : "22/02/16",
        snippet : "Assinatura revista Mundo Estranho - editora Abril - 27/08/2015 Data da contratação: 27 de julho de 2015 Valor pago na assinatura: 6000 ponto do super bônus Numero do protocolo de contratação:&nbsp;02418319...",
        thumbnail : "/home/vhra/Downloads/6f8fd1fe-7341-4743-88e6-76264ea2dbd4.jpe"
    },
    {
        title : "Fazer assinatura do Mundo Estranho 2015",
        date : "22/02/16",
        snippet : "Fazer assinatura do Mundo Estranho para 2015 usando os super bônus do cartão Santander.&nbsp; - Anuncio para&nbsp;Revista Mundo Estranho –Editora Abril assinatura anual. Ligar para central de atendimento do San..."
    },
    {
        title : "Assinatura Editora Abril - Mundo Estranho - 26/07/2014",
        date : "22/02/16",
        snippet : "Dia da inscrição da anuidade pelo Santander Internet Bank: 26/07/2014 Valor pago pela assinatura: 6000 ponto do Super Bônus Numero do protocolo de atendimento da assinatura: 159818297 Prazo para entre...",
        thumbnail : "/home/vhra/Downloads/f5021ae3-d225-4c73-90a6-6ee5bf4c1a1c.jpe"
    }
];

var Container = React.createClass({
    displayName: 'Container',

    render: function() {
        return (
            <div className='container' >
                {notes.map(createNoteItem)}
            </div>
        );
    }
});

var createNoteItem = function(item, index) {
    return (  
        <NoteSnippetView
            key={index}
            title={item.title}
            date={item.date}
            snippet={item.snippet}
            thumbnail={item.thumbnail}
            />
    );
};

module.exports = Container;