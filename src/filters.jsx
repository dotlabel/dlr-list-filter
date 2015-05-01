import React from 'react'


/**
 * Filters
 * ---
 * Filter component to house each filter
 * @class
 * @extend React.Component
 */
export default class Filters extends React.Component {
    /**
     * @static
     * React.PropType checking
     */
    static propTypes = {
        filters: React.PropTypes.array.isRequired,
        onFilter: React.PropTypes.func.isRequired
    }

    /**
     * @static
     * Default React properties
     */
    static defaultProps = {

    }

    /**
     * @constructs
     * @param props <Object> React property initialiser
     */
    constructor( props: object ) {
        super( props )
    }

    /**
     * React render lifecycle method
     */
    render() {
        // Create filter buttons and route click event
        var filterButtons = this.props.filters.map( filter => {
            var clickHandler = event => {
                this.props.onFilter( filter.name )
            }
            return (
                <li>
                    <button onClick={ clickHandler }>
                        <span>{ filter.name }</span>
                        <span>{ filter.active ? '✔︎' : '✘' }</span>
                    </button>
                </li>
            )
        })

        return (
            <ul>
                { filterButtons }
            </ul>
        )
    }
}
