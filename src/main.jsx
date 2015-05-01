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
import ListItem from './tmpl/item'
import Filters from './filters'
import List from './list'


/**
 * _createFilter
 * @private
 * @static
 * @param filter <string>
 */
function _createFilter( filter: string ) {
    return {
        name: filter,
        active: false
    }
}


/**
 * List
 * ---
 * @class
 * @extend React.Component
 */
export default class Main extends React.Component {
    /**
     * @static
     * React.PropType checking
     */
    static propTypes = {
        /**
         * @type <Array:Object>
         * @required
         * Master list of objects. Passed to <List />.
         */
        items: React.PropTypes.array.isRequired,

        /**
         * @type <Array:String>
         * @required
         * Property names to filter by. Transformed into FilterObjects and
         * passed to <Filters />
         */
        filters: React.PropTypes.array.isRequired,

        /**
         * @type <ListItem>
         * Custom item rendering component
         */
        ItemTemplate: React.PropTypes.any,

        /**
         * @type <FilterItem>
         * Custom filter item rendering component
         */
        FilterTemplate: React.PropTypes.any
    }

    /**
     * @static
     * Default React properties
     */
    static defaultProps = {
        ItemTemplate: ListItem
    }

    /**
     * @property
     * @type <Object>
     * Class state object
     *   ::`filters`
     *   Mapped from filters property declaration
     *   @type <Array:Object>
     *   @example [{ name: 'name', active: false }, { name: 'another', active: true }]
     */
    state = {
        filters: this.props.filters.map( _createFilter )
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
     * @param toggleFilter <String> the filter name to toggle
     */
    onFilter = ( toggleFilter: string ) => {
        this.setState({
            filters: this.state.filters.map( filter => {
                // Bail on other filters
                if ( filter.name !== toggleFilter ) {
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

        return (
            <div className="DLR-List">
                <Filters
                    onFilter={ this.onFilter }
                    filters={ this.state.filters }
                    FilterTemplate={ this.props.FilterTemplate }
                />
                <List
                    items={ this.props.items }
                    filters={ activeFilters }
                    ItemTemplate={ this.props.ItemTemplate }
                />
            </div>
        )
    }
}
