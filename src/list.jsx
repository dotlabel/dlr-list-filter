/**
 * list.jsx
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
import ListItem from './item'
import Filters from './filters'


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
export default class List extends React.Component {
    /**
     * @static
     * React.PropType checking
     */
    static propTypes = {
        items: React.PropTypes.array.isRequired,
        filters: React.PropTypes.array.isRequired,
        ItemTemplate: React.PropTypes.instanceOf( ListItem )
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
        // Filter active filters
        var activeFilters = this.state.filters.filter( filter => {
            return filter.active
        })

        // Filter by items that pass filtering and create items from ListItem template
        var items = this.props.items.filter( item => {
            // Special case: no filtering actually means show all items
            if ( !activeFilters.length ) {
                return true
            }

            var active = false

            activeFilters.forEach( filter => {
                if ( item.hasOwnProperty( filter.name ) && item[ filter.name ] ) {
                    active = true
                }
            })

            return active
        }).map( item => {
            // Pass all object properties to the template component
            return <this.props.ItemTemplate {...item} />
        })

        return (
            <div>
                <Filters
                    onFilter={ this.onFilter }
                    filters={ this.state.filters }
                />
                <ul>
                    { items }
                </ul>
            </div>
        )
    }
}
