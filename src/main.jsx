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
import Immutable from 'immutable'
import Cursor from 'immutable/contrib/cursor'

import Filters from './filters'
import List from './list'

import FilterStruct from './util/filterStruct'
import FilterGroup from './util/filterGroup'
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
         * List of filter groups
         * @type <Immutable Map:Object>
         * @required
         */
        filters: React.PropTypes.object.isRequired,

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
        filterFunction: React.PropTypes.func,

        /**
         * Updates query string
         * @TODO currently unused
         * @type <boolean>
         */
        updateQuery: React.PropTypes.bool,

        /**
         * Adds a filter title to the list of filters
         * @type <String>
         */
        filterTitle: React.PropTypes.string,

        /**
         * Callback to trigger when a filter event occurs
         * Callback param is the filtered list of items
         * @type <Function>
         */
        onFilter: React.PropTypes.func
    }

    /**
     * Default React properties
     * @static
     */
    static defaultProps = {
        ItemTemplate: ListItem,
        FilterTemplate: FilterItem,
        filterFunction: null,
        updateQuery: false,
        filterTitle: null,
        onFilter: function() {}
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
         * @example [ [{ id: 'foo', active: false }], [{ id: 'bar', active: true }] ]
         */
        // filters: this.props.filters.map( group => new FilterGroup( group ) )
        // filters: Immutable.fromJS( this.props.filters.map( group => new FilterGroup( group ) ) )
        filters: Immutable.fromJS( this.props.filters )
    }

    /**
     * @constructs
     * @param props <Object> React property initialiser
     */
    constructor( props: object ) {
        super( props )
    }

    /**
     * Updates the query parameter in the URL without a refresh
     */
    updateQuery( filters ) {
        if ( !window.location.href || !this.props.updateQuery || !window.history ) {
            return
        }

        function generateFilterString() {
            if ( !filters ) {
                return ''
            }

            // Get active filter keys
            let it = filters
                .flatten()
                .filter( f => f )
                .keys()

            // Create array of keys
            let filter = it.next()
            let activeKeys = []
            while( !filter.done ) {
                activeKeys.push( filter.value )
                filter = it.next()
            }

            if ( !activeKeys.length ) {
                return ''
            }

            // Join, encode and return
            return '?filter=' + window.encodeURI( activeKeys.join( ',' ) )
        }

        function generateURL() {
            let href = window.location.href.match( /^.*(?=(\?))/ )

            return !href || !href.length
                ? window.location.href + generateFilterString()
                : href[0] + generateFilterString()
        }

        let URL = generateURL()
        window.history.pushState({
            path: URL
        }, '', URL )
    }

    /**
     * Called when a filter button is clicked
     * Triggers a `setState`
     * @binding Class
     * @param filter <FilterStruct> the filter to toggle
     */
    onFilter = ( filter: array ) => {

        // No filter returns filters to their original state
        if ( !filter ) {
            this.setState({
                filters: Immutable.fromJS( this.props.filters )
            })
            return
        }

        // @TODO sort out this toggle
        this.setState({
            filters: this.state.filters.setIn( filter, !this.state.filters.getIn( filter ) )
        })
    }

    /**
     * React render lifecycle method
     */
    render() {
        var listProps = {
            items: this.props.items,
            filters: this.state.filters,
            ItemTemplate: this.props.ItemTemplate,
            onFilter: this.props.onFilter
        }

        // Only add it if it exists
        if ( this.props.filterFunction ) {
            listProps.filterFunction = this.props.filterFunction
        }

        // Update query param on change
        this.updateQuery( this.state.filters )

        return (
            <div className="DLR-List">
                <Filters
                    onFilter={ this.onFilter }
                    filters={ this.state.filters }
                    FilterTemplate={ this.props.FilterTemplate }
                    shouldShowFilterGroupIDs={ this.props.shouldShowFilterGroupIDs }
                    shouldShowClearButton={ this.props.shouldShowClearButton }
                    filterTitle={ this.props.filterTitle }
                />
                <List {...listProps } />
            </div>
        )
    }
}
