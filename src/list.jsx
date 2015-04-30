import React from 'react'
import ListItem from './item'
import Filters from './filters'

export default class List extends React.Component {
    static propTypes = {
        // items: React.PropTypes.array.isRequired
    }

    static defaultProps = {

    }

    state = {
        filter: false
    }

    constructor( props ) {
        super( props )

        this.items = [
            {
                name: 'aaa',
                active: true
            },
            {
                name: 'bbb',
                active: true
            },
            {
                name: 'ccc',
                active: false
            },
            {
                name: 'ddd',
                active: true
            }
        ]
    }

    onFilter = ( active ) => {
        this.setState({
            filter: active
        })
    }

    render() {
        var items = this.items.filter( item => {
            return item.active === this.state.filter
        }).map( item => {
            return <ListItem {...item} />
        })

        return (
            <div>
                <Filters onFilter={ this.onFilter } />
                <ul>
                    { items }
                </ul>
            </div>
        )
    }
}
