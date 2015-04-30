import React from 'react'

export default class Filters extends React.Component {
    static propTypes = {
        text: React.PropTypes.string,
        onFilter: React.PropTypes.func.isRequired
    }

    static defaultProps = {
        text: 'Filter'
    }

    state = {
        active: false
    }

    constructor( props ) {
        super( props )
    }

    onClick = () => {
        this.setState({
            active: !this.state.active
        })
        this.props.onFilter( this.state.active )
    }

    render() {

        var active = this.state.active
            ? '✔︎'
            : '✘'

        return (
            <div>
                <button onClick={ this.onClick }>{ this.props.text } <span>{ active }</span></button>
            </div>
        )
    }
}
