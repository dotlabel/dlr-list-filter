import React from 'react'


/**
 * FilterItem
 * ---
 * Individual item template component for filter buttons
 * @class
 * @extends React.Component
 */
export default class FilterItem extends React.Component {
    /**
     * @constructs
     * @param props <Object> React property init
     */
    constructor( props ) {
        super( props )
    }

    /**
     * React render lifecycle method
     */
    render() {
        var classes = classNames({
            'DLR-List-FilterItem': true,
            'active': this.props.active
        })

        return (
            <li key={ this.props.key } className={ classes }>
                <button onClick={ this.props.onClick }>
                    <span>{ this.props.name }</span>
                    <span>{ this.props.active ? '✔︎' : '✘' }</span>
                </button>
            </li>
        )
    }
}
