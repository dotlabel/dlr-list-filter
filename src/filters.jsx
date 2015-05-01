import React from 'react'

import FilterButton from './tmpl/filter'

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
        onFilter: React.PropTypes.func.isRequired,
        FilterTemplate: React.PropTypes.any
    }

    /**
     * @static
     * Default React properties
     */
    static defaultProps = {
        FilterTemplate: FilterButton
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
        var filterButtons = this.props.filters.map( ( filter, index ) => {
            var clickHandler = event => {
                this.props.onFilter( filter.name )
            }
            return (
                <this.props.FilterTemplate
                    key={ 'filterItem' + index }
                    onClick={ clickHandler }
                    { ...filter }
                />
            )
        })

        return (
            <ul className="DLR-List-FilterList">
                { filterButtons }
            </ul>
        )
    }
}
