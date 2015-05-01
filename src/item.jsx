import React from 'react'


/**
 * ListItem
 * ---
 * Individual item template component
 * @class
 * @extends React.Component
 */
export default class ListItem extends React.Component {
    /**
     * @constructs
     * @param props <Object> React property init
     */
    constructor( props: object ) {
        super( props )
    }

    /**
     * React render lifecycle method
     */
    render() {
        return (
            <li>{ this.props.name } <span>{ this.props.active ? '✔︎' : '✘' }</span></li>
        )
    }
}
