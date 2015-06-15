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
        FilterTemplate: React.PropTypes.any,

        /**
         * Should show filter group ids/titles
         * @type <Boolean>
         */
        shouldShowFilterGroupIDs: React.PropTypes.bool,

        /**
         * Should show clear all filters button
         * @type <Boolean>
         */
        shouldShowClearButton: React.PropTypes.bool
    }

    /**
     * Default React properties
     * @static
     */
    static defaultProps = {
        FilterTemplate: FilterItem,
        shouldShowFilterGroupIDs: true,
        shouldShowClearButton: true
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
     * Clear filters
     */
    clearFilters = () => {
        this.props.onFilter( null )
    }

    /**
     * React render lifecycle method
     */
    render() {
        // Map filter groups to filter buttons
        let keypath = [ null, null ]
        let filters = this.props.filters.map( ( filterGroup, groupKey ) => {
            let title = this.props.shouldShowFilterGroupIDs
                ? <h2 className="DLR-List-FilterGroup-title">{{ groupKey }}</h2>
                : ''
            return (
                <div className="DLR-List-FilterGroup">
                    {{ title }}
                    <ul className="DLR-List-FilterGroup-list">
                        { filterGroup.map( ( value, filterKey ) => {
                            return this.renderFilterItem({
                                keypath: [ groupKey, filterKey ],
                                id: filterKey,
                                active: value
                            })
                        })}
                    </ul>
                </div>
            )
        })

        let clearButton = this.props.shouldShowClearButton
            ? <button onClick={ this.clearFilters }>Clear</button>
            : ''

        return (
            <div>
                <ul className="DLR-List-FilterList">
                    { filters }
                </ul>
                {{ clearButton }}
            </div>
        )
    }
}
