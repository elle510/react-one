var React = require('react');

module.exports = React.createClass({
    componentDidMount: function() {
        console.log('Test componentDidMount');
    },
    render : function() {
        console.log('Test render');
        return (
            <div>Test Component</div>
        );
    }
});