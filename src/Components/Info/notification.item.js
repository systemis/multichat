import React, { Component } from 'react'
export default (data) => {
    return (
        <div>
            <div className="row">
                <div className="col-md-3 col-sm-3 sol-xs-3 show-photo">
                    <img alt="Show pic" src={data.message.sendAvatar} />
                </div>
                <div className="col-md-3 col-sm-3 sol-xs-3 show-message">
                    <p> {data.message} </p>
                </div>                    
            </div>
        </div>
    )
}