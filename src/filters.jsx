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
        /**
         * List of properties to filter by.
         * Empty list denotes no filtering.
         * @type <Array:FilterStruct>
         * @required
         */
        filters: React.PropTypes.array.isRequired,

        /**
         * Fired when the filter is actioned
         * @type <Function>
         * @required
         */
        onFilter: React.PropTypes.func.isRequired,

        /**
         * Custom filter item template
         * @type <FilterItem>
         */
        FilterTemplate: React.PropTypes.any
    }

    /**
     * Default React properties
     * @static
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
                this.props.onFilter( filter.id )
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
