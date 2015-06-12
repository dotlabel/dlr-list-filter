import React from 'react'

import FilterItem from './tmpl/filter'

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
        FilterTemplate: FilterItem
    }

    /**
     * @constructs
     * @param props <Object> React property initialiser
     */
    constructor( props: object ) {
        super( props )
    }

    /**
     * Render a single filter item
     */
    renderFilterItem = filter => {
        var clickHandler = event => {
            this.props.onFilter( filter.keypath )
        }
        return (
            <this.props.FilterTemplate
                key={ filter.keypath.join( '-' ) }
                onClick={ clickHandler }
                { ...filter }
            />
        )
    }

    /**
     * React render lifecycle method
     */
    render() {
        // Map filter groups to filter buttons
        let keypath = [ null, null ]
        let filters = this.props.filters.map( ( filterGroup, groupKey ) => {
            return (
                <ul className="DLR-List-FilterGroup">
                    { filterGroup.map( ( value, filterKey ) => {
                        return this.renderFilterItem({
                            keypath: [ groupKey, filterKey ],
                            id: filterKey,
                            active: value
                        })
                    })}
                </ul>
            )
        })

        return (
            <ul className="DLR-List-FilterList">
                { filters }
            </ul>
        )
    }
}
