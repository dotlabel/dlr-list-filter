import React from 'react'

export default class List extends React.Component {
    static propTypes = {
        label: React.PropTypes.string
    }

    static defaultProps = {
        label: 'hello list'
    }

    state = {
        myStateProp: 'hello autobinding'
    }

    onClick = () => {
        this.setState({
            myStateProp: 1000
        })
    }


    constructor( props ) {
        super( props )

        function arg() {

        }

        arg()
    }

    render() {
        return (
            <div>
                <h1>{ this.props.label } <span>{ this.state.myStateProp }</span></h1>
                <button onClick={ this.onClick }>Click me</button>
            </div>
        )
    }
}
