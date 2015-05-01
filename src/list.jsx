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
     * @static
     * React.PropType checking
     */
    static propTypes = {
        /**
         * @type <Array:Object>
         * @required
         * Master list of items
         */
        items: React.PropTypes.array.isRequired,

        /**
         * @type <Array:String>
         * @required
         * Active filters to include in the list.
         * Items that have the filter as a property pass the filtering algorithm.
         */
        filters: React.PropTypes.array.isRequired,

        /**
         * @type <ListItem>
         * Custom component to use for list items
         */
        ItemTemplate: React.PropTypes.any
    }

    /**
     * @static
     * Default React properties
     */
    static defaultProps = {
        ItemTemplate: ListItem
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
        var items = this.props.items.filter( item => {
            // Special case: no filtering actually means show all items
            if ( !this.props.filters.length ) {
                return true
            }

            var active = false

            this.props.filters.forEach( filter => {
                if ( item.hasOwnProperty( filter.name ) && item[ filter.name ] ) {
                    active = true
                }
            })

            return active
        }).map( ( item, index ) => {
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
