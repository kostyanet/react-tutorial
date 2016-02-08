import React from 'react'
import { connect } from 'react-redux'
import Table from './Table'
import { loadBooks, changePage, toggleSortingAndLoadBooks } from '../actions'
import PagingPanel from './PagingPanel'
import BookSearchPanel from './BookSearchPanel'
import { Link } from 'react-router'
import { changeSearchAndLoadBooks } from '../actions'

class BookPanel extends React.Component {
    render() {
        let { dispatch } = this.props;
        let { rows, count, page, sorting, search } = this.props.books;

        const onSearchChanged = (query) => {
            dispatch(changeSearchAndLoadBooks(query))
        }
        
        const sort_method = key => () => {
            dispatch(toggleSortingAndLoadBooks(key))
        }

        const cols = [
        {
            key: 'id',
            label: 'ID',
            format: x=><Link to={`/book_update/${x.id}/`}>{x.id}</Link>,
            sorting: sort_method('id')
        },
        {key: 'title', label: 'Title', sorting: sort_method('title')},
        {key: 'category_name', label: 'Category', sorting: sort_method('subcategory__name')},
        {key: 'publish_date', label: 'Publish date', sorting: sort_method('publish_date')},
        {key: 'author_name', label: 'Author', sorting: sort_method('author__last_name')},
        ]

        return <div>
            <BookSearchPanel search={search} onSearchChanged={onSearchChanged} />
            <div className="row">
                <div className="twelve columns">
                    <h3>Book list <Link className='button button-primary' style={{fontSize:'1em'}} to="/book_create/">+</Link></h3>
                    <Table sorting={sorting} cols={cols} rows={rows} />
                </div>
            </div>
            <PagingPanel count={count} page={page} onNextPage={() => {
                dispatch(changePage(page+1));
                dispatch(loadBooks())
            }} onPreviousPage={ () => {
                dispatch(changePage(page-1));
                dispatch(loadBooks())
            }} />
        </div>
    }
}

var mapStateToProps = function(state) {
    return {
        books:state.books,
    }
};

export default connect(mapStateToProps)(BookPanel);