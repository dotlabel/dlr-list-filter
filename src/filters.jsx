import React from 'react'


function _createFilter( filter ) {
    return {
        name: filter,
        active: false
    }
}


export default class Filters extends React.Component {
    static propTypes = {
        filters: React.PropTypes.array.isRequired,
        onFilter: React.PropTypes.func.isRequired
    }

    static defaultProps = {

    }


    constructor( props ) {
        super( props )
    }


    render() {
        var filterButtons = this.props.filters.map( filter => {
            var clickHandler = event => {
                this.props.onFilter( filter.name )
            }
            return (
                <li>
                    <button onClick={ clickHandler }>
                        <span>{ filter.name }</span>
                        <span>{ filter.active ? '✔︎' : '✘' }</span>
                    </button>
                </li>
            )
        })

        return (
            <ul>
                { filterButtons }
            </ul>
        )
    }
}
