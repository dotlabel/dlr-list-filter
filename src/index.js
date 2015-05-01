import _Main from './main'

import _List from './list'
import _ListFilter from './filters'

import _ListItem from './tmpl/item'
import _ListFilterItem from './tmpl/filter'

/**
 * Export Main List Component
 */
export const List = _Main

/**
 * Export List Component
 */
export const ListContainer = _List

/**
 * Export List ItemComponent
 */
export const ListItem = _ListItem

/**
 * Export List Filter Component
 */
export const ListFilter = _ListFilter

/**
 * Export List Filter Item Component
 */
export const ListFilterItem = _ListFilterItem


/**
 * Export object of components
 */
export default {
    List: _Main,
    ListContainer: _List,
    ListItem: _ListItem,
    ListFilter: _ListFilter,
    ListFilterItem: _ListFilterItem
}
