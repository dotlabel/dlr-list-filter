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
                    shouldShowFilterGroupIDs={ this.props.shouldShowFilterGroupIDs }
                    shouldShowClearButton={ this.props.shouldShowClearButton }
                />
                <List {...listProps } />
            </div>
        )
    }
}
