/**
 * list.jsx
 * ---
 *
 * Implements the List container components
 */


import React from 'react'
import ListItem from './tmpl/item'


/**
 * List
 * ---
 * @class
 * @extend React.Component
 */
export default class List extends React.Component {
    /**
     * React.PropType checking
     * @static
     */
    static propTypes = {
        /**
         * Master list of items
         * @type <Array:Object>
         * @required
         */
        items: React.PropTypes.array.isRequired,

        /**
         * Active filters to include in the list.
         * Items that have the filter as a property pass the filtering algorithm.
         * @type <Immutable Map:String>
         * @required
         */
        filters: React.PropTypes.object.isRequired,

        /**
         * Custom component to use for list items
         * @type <ListItem>
         */
        ItemTemplate: React.PropTypes.any,

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

        /**
         * Handles the filtering
         * @type <function>
         * @param item <Object> called for each this.props.items
         */
        filterFunction: function( item ) {
            // Special case: no filtering actually means show all items
            if ( !this.props.filters.length ) {
                return true
            }

            var active = false

            this.props.filters[ 0 ].forEach( filter => {
                if ( item.hasOwnProperty( filter.id ) && item[ filter.id ] ) {
                    active = true
                }
            })

            return active
        }
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
        // Filter by items that pass filtering and create items from ListItem template
        var items = this.props.items
            .filter( this.props.filterFunction.bind( this ) )
            .map( ( item, index ) => {
                // Pass all object properties to the template component
                return <this.props.ItemTemplate key={ 'item' + index } {...item} />
            })

        return (
            <ul className="DLR-List-container">
                { items }
            </ul>
        )
    }
}
