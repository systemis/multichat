import React, { Component } from 'react';
import $ from 'jquery';

class Search extends Component {
    render() {
        return (
            <div className="search-group">
                <span className="fa fa-search" />
                <input 
                    type="text" 
                    placeholder="Name" 
                    id="search-user-by-name"/>
            </div>
        );
    }

    componentDidMount() {
        const sefl = this;
        $(document).ready(() => {
            $("#search-user-by-name").keyup(function(){
                sefl.props.searchEvent($(this).val());
            })
        })
    }
}

export default Search;