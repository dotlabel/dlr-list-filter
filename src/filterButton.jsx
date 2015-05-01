import React from 'react'

export default class DefaultFilterButton extends React.Component {
    constructor( props ) {
        super( props )
    }

    render() {
        var classes = classNames({
            'DLR-List-FilterItem': true,
            'active': this.props.active
        })

        return (
            <li key={ this.props.key } className={ classes }>
                <button onClick={ this.props.onClick }>
                    <span>{ this.props.name }</span>
                    <span>{ this.props.active ? '✔︎' : '✘' }</span>
                </button>
            </li>
        )
    }
}
