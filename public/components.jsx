var isNode = typeof module !== 'undefined' && module.exports,
    React = isNode ? require('react') : window.React,
    ReactDOM = isNode ? require('react') : window.ReactDOM;

var HelloMessage = React.createClass({
    displayName: 'HelloMessage',

    getInitialState: function () {
        return {}
    },

    loadServerData: function() {
        $.get('/name', function(result) {
            if (this.isMounted()) {
                this.setState({name: result})
            }
        }.bind(this))
    },

    componentDidMount: function () {
        this.intervalID = setInterval(this.loadServerData, 3000)
    },

    componentWillUnmount: function() {
        clearInterval(this.intervalID)
    },

    handleClick: function () {
        alert('You clicked!')
    },

    render() {
        var name = this.state.name ? this.state.name : this.props.name;
        return (
            <div>
                <div>
                    Hello {name}
                </div>
                <input type="button" onClick={this.handleClick} value="Click" />
            </div>
        );
    }
});

if (isNode) {
    exports.HelloMessage = HelloMessage
} else {
    ReactDOM.render(<HelloMessage name="John" />, document.getElementById('react-root'));
}
