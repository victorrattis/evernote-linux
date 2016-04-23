var React = require('react');

var NoteSnippetView = React.createClass({
    displayName: 'NoteSnippetView',

    render() {
        var title = this.props.title;
        var date = this.props.date;
        var snippet = this.props.snippet;
        var thumbnail = undefined;

        var titleStyle = "note-title ";
        var snipperStyle = "note-body "

        if(this.props.thumbnail != undefined) {
            thumbnail = <img className="note-thumbnail" src={this.props.thumbnail}/>;
            titleStyle += "note-tile-smaller";
            snipperStyle += "note-body-smaller";
        }

        return (
            <div className="note">
                <div className="divider"></div>
                {thumbnail}
                <div className="note-test"></div>
                <div className="note-border"></div>
                <div className="note-view">
                    <div className={titleStyle}>{title}</div>
                    <div className="note-date">{date}</div>
                    <div className={snipperStyle}>{snippet}</div>
                </div>
            </div>
        );
    }
});

module.exports = NoteSnippetView;
