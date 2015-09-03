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
         * @type <Immutable Map:FilterStruct>
         * @required
         */
        filters: React.PropTypes.object.isRequired,

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
        shouldShowClearButton: React.PropTypes.bool,

        /**
         * Adds a filter title to the list of filters
         * @type <String>
         */
        filterTitle: React.PropTypes.string,
        
        /**
         * Sets the label of the clear filters button
         * @type <String>
         */
        clearFilterButtonLabel: React.PropTypes.string
    }

    /**
     * Default React properties
     * @static
     */
    static defaultProps = {
        FilterTemplate: FilterItem,
        shouldShowFilterGroupIDs: true,
        shouldShowClearButton: true,
        filterTitle: null,
        clearFilterButtonLabel: 'Clear'
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
            ? <button className="DLR-List-FilterList-button" onClick={ this.clearFilters }>{ this.props.clearFilterButtonLabel }</button>
            : ''

        let filtersTitle = this.props.filterTitle
            ? <h3 className="DLR-List-FilterList-title">{ this.props.filterTitle }</h3>
            : ''

        return (
            <div className="DLR-List-FilterList">
                {{ filtersTitle }}
                <ul className="DLR-List-FilterList-list">
                    { filters }
                </ul>
                {{ clearButton }}
            </div>
        )
    }
}
