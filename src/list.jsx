import React from 'react'
import ListItem from './item'
import Filters from './filters'


function _createFilter( filter ) {
    return {
        name: filter,
        active: false
    }
}



export default class List extends React.Component {
    static propTypes = {
        items: React.PropTypes.array.isRequired,
        filters: React.PropTypes.array.isRequired
    }

    static defaultProps = {

    }

    state = {
        filters: this.props.filters.map( _createFilter )
    }

    constructor( props ) {
        super( props )
    }

    onFilter = ( toFilter ) => {
        this.setState({
            filters: this.state.filters.map( filter => {
                // Bail on other filters
                if ( filter.name !== toFilter ) {
                    return filter
                }

                // Toggle active state
                filter.active = !filter.active
                return filter
            })
        })
    }

    getFilter( key ) {
        return this.state.filters.filter( filter => {
            return filter.name === key
        })
    }

    render() {
        var items = this.props.items.filter( item => {
            // return item.active === this.getFilter( item.name )[ 0 ].active
            return true
        }).map( item => {
            return <ListItem {...item} />
        })

        return (
            <div>
                <Filters onFilter={ this.onFilter } filters={ this.state.filters } />
                <ul>
                    { items }
                </ul>
            </div>
        )
    }
}
