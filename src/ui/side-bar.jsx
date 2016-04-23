
var React = require('react');
var IconeButton = require('./icone-button');

var sidebarStyle = {
    borderRight: "1px solid #ececec",
    float:"left",
    width: "73px",
    height:"100%",
    background: "#F8F8F8",
    padding: "12px 12px 24px 17px",
    zIndex: 200,
    boxSizing: "border-box"
};


var SideBar = React.createClass({
    displayName: 'SideBar',

    render() {
        return (
            <div style={sidebarStyle} >
                <div className="logo" >
                    <img src="../../resources/evernote-logo1.png" />
                </div>
                <div className="sidebar-icones1" >
                    <IconeButton imgNormal="../../resources/new-note-normal.png"
                        imgOver="../../resources/new-note-over.png"
                        action="NEW_NOTE_ACTION"/>
                    <IconeButton imgNormal="../../resources/search-normal.png"
                        imgOver="../../resources/search-over.png"
                        action="SEARCH_ACTION"/>
                    <IconeButton imgNormal="../../resources/work-chat-normal.png"
                        imgOver="../../resources/work-chat-over.png"
                        action="SHOW_WORK_CHAT_ACTION"/>
                </div>
                <div className="sidebar-icones2" >
                    <IconeButton imgNormal="../../resources/shorcut-normal.png"
                        imgOver="../../resources/shorcut-over.png"
                        action="SHOW_SHORCUTS_ACTION"/>
                    <IconeButton imgNormal="../../resources/note-normal.png"
                        imgOver="../../resources/note-over.png"
                        action="SHOW_NOTES_ACTION"/>
                    <IconeButton imgNormal="../../resources/notebook-normal.png"
                        imgOver="../../resources/notebook-over.png"
                        action="SHOW_NOTEBOOKS_ACTION"/>
                    <IconeButton imgNormal="../../resources/tag-normal.png"
                        imgOver="../../resources/tag-over.png"
                        action="SHOW_TAGS_ACTION"/>
                </div>
            </div>
        );
    }
});

module.exports = SideBar;
