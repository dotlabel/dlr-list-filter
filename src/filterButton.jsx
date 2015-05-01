import React from 'react'

export default class DefaultFilterButton extends React.Component {
    constructor( props ) {
        super( props )
    }

    render() {
        return (
            <li>
                <button onClick={ this.props.onClick }>
                    <span>{ this.props.name }</span>
                    <span>{ this.props.active ? '✔︎' : '✘' }</span>
                </button>
            </li>
        )
    }
}
