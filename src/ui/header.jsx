var React = require('react');

var style = {
    width: "100%",
    height: '73px',
    background: "#F8F8F8",
    borderBottom: "1px solid #ececec",
    margin: '0',
    position: 'relative',
    overflow: 'hidden',
};

var textStyle = {
    textAlign: 'center',
};

var Header = React.createClass({
    displayName: 'Header',

    render() {
        return (
            <div style={style}>
                <h1 style={textStyle}> Header </h1>
            </div>
        );
    }
});

module.exports = Header;