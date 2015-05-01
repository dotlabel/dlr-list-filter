# dlr-list-filter

> Filterable and sortable list react component



Requires polyfills to work correctly, use either babel or corejs directly

```
npm i -S babel dlr-list-filter
```

```
import 'babel/polyfill'
import { List } from 'dlr-list-filter'

var items = [
  {
    name: 'foo',
    filterable: true
  },
  {
    name: 'bar',
    filterable: false
  }
]

var filters = [ 'filterable' ]

class App extends React.Component {
  constructor( props ) {
    super( props )
  }

  render() {
    return (
      <List
        items={ items }
        filters={ filters }
      />
    )
  }
}

React.render( <App />, document.body )
```
