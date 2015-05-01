/**
 * main.jsx
 * ---
 *
 * Base List class implementation.
 * Creates the list of items from templates and adds an array of filters.
 * Filters operate on the item properties.
 *
 * @example
 * ```jsx
 * var items = [{ name: 'foo', filterable: true }, { name: 'bar', filterable: false }]
 * var filters = [ 'filterable' ]
 * class Foo extends React.Component {
 *   render() {
 *     return (
 *       <List items={ items } filters={ filters } />
 *     )
 *   }
 * }
 * ```
 */


import React from 'react'
import Filters from './filters'
import List from './list'

import FilterStruct from './util/filterStruct'
import ListItem from './tmpl/item'
import FilterItem from './tmpl/filter'




/**
 * Main List Component
 * ---
 * @class
 * @extend React.Component
 */
export default class Main extends React.Component {
    /**
     * React.PropType checking
     * @static
     */
    static propTypes = {
        /**
         * Master list of objects. Passed to <List />.
         * @type <Array:Object>
         * @required
         */
        items: React.PropTypes.array.isRequired,

        /**
         * Property names to filter by. Transformed into FilterObjects and
         * passed to <Filters />
         * @type <Array:String>
         * @required
         */
        filters: React.PropTypes.array.isRequired,

        /**
         * Custom item rendering component
         * @type <ListItem>
         */
        ItemTemplate: React.PropTypes.any,

        /**
         * Custom filter item rendering component
         * @type <FilterItem>
         */
        FilterTemplate: React.PropTypes.any,

        /**
         * Custom filtering function
         * @type <function>
         */
        filterFunction: React.PropTypes.func
    }

    /**
     * Default React properties
     * @static
     */
    static defaultProps = {
        ItemTemplate: ListItem,
        FilterTemplate: FilterItem,
        filterFunction: null
    }

    /**
     * Class state object
     * @property
     * @type <Object>
     */
    state = {
        /**
         * Mapped from filters property declaration
         * @type <Array:Object>
         * @example [{ id: 'foo', active: false }, { id: 'bar', active: true }]
         */
        filters: this.props.filters.map( filter => {
            return new FilterStruct( filter )
        })
    }

    /**
     * @constructs
     * @param props <Object> React property initialiser
     */
    constructor( props: object ) {
        super( props )
    }

    /**
     * Called when a filter button is clicked
     * Triggers a `setState`
     * @binding Class
     * @param id <String> the filter id to toggle
     */
    onFilter = ( id: string ) => {
        this.setState({
            filters: this.state.filters.map( filter => {
                // Bail on other filters
                if ( filter.id !== id ) {
                    return filter
                }

                // Toggle active state
                filter.active = !filter.active
                return filter
            })
        })
    }

    /**
     * React render lifecycle method
     */
    render() {
        // Grab only active filters
        var activeFilters = this.state.filters.filter( filter => {
            return filter.active
        })

        var listProps = {
            items: this.props.items,
            filters: activeFilters,
            ItemTemplate: this.props.ItemTemplate
        }

        // Only add it if it exists
        if ( this.props.filterFunction ) {
            listProps.filterFunction = this.props.filterFunction
        }

        return (
            <div className="DLR-List">
                <Filters
                    onFilter={ this.onFilter }
                    filters={ this.state.filters }
                    FilterTemplate={ this.props.FilterTemplate }
                />
                <List {...listProps } />
            </div>
        )
    }
}
