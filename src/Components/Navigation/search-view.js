import React, { Component } from 'react';
import UserItem             from './user-item.js';

class SearchView extends Component {
    render() {
        return (
            <div className="show-search-result">
                {this.props.data.map((item, index) => {
                    return <UserItem key={index} data={item} />
                })}
            </div>
        );
    }
}

export default SearchView;