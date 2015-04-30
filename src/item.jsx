import React from 'react'

export default class ListItem extends React.Component {
    constructor( props ) {
        super( props )
    }

    render() {
        return (
            <li>{ this.props.name } <span>{ this.props.active ? '✔︎' : '✘' }</span></li>
        )
    }
}
