
import FilterStruct from './filterStruct'

export default class FilterGroup {
    constructor( group ) {
        this.id = group.id
        this.filters = group.filters.map( filter => new FilterStruct( group.id, filter ) )
    }
}
