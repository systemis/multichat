import React, { Component } from 'react';
import UserItem             from './user-item.js';

class SearchView extends Component {
    layout(){
        if(this.props.data.length > 0){
            this.props.data.map((item, index) => {
                return <UserItem key={index} data={item} />
            })
        }else{
            return <h3 style={{textAlign: 'center'}}> Khong co du lieu </h3>
        }
    }

    render() {
        return (
            <div className="show-search-result">
                Show search result 
                {this.layout()}
            </div>
        );
    }
}

export default SearchView;