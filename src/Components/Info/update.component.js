import React, { Component } from 'react';
import userMG               from '../../js/user.js';

class UpdateComponent extends Component {
    update_handler(){
        const nameUpdated     = document.getElementById('update-user-name-field').value;
        const andressUpdated  = document.getElementById('update-user-andress-field').value;
        const phoneUpdated    = document.getElementById('update-user-phone-field').value;
        const birtdayUpdated  = document.getElementById('update-user-birtday-field').value;
        const genderUpdated   = document.getElementById('update-user-gender-field').value;
        const languageUpdated = document.getElementById('update-user-language-field').value;

        if(nameUpdated){
            const updateInfo = {
                name: nameUpdated, 
                andress: andressUpdated,
                phone: phoneUpdated,
                birtday: birtdayUpdated,
                gender: genderUpdated,
                language: languageUpdated
            };

            userMG.updateClientInfo(updateInfo, result => {
                console.log(result);
            })
        }else{
            alert(`Mot so thong tin con thieu`);
        }
    }

    render() {
        return (
            <div className='update-user-info-group row'>
                <input 
                    type="text"
                    className="update-info-field"
                    id="update-user-name-field"
                    placeholder="Type user name here"
                    value={this.props.data.name}/>
                <br />
                <input 
                    type="text"
                    className="update-info-field"
                    id="update-user-andress-field"
                    placeholder="Type user andress here"
                    value={this.props.data.andress}/>
                <br />
                <input 
                    type="number"
                    className="update-info-field"
                    id="update-user-phone-field"
                    placeholder="Type user phone here"
                    value={this.props.data.phone}/>
                <br />
                <input 
                    type="text"
                    className="update-info-field"
                    id="update-user-birtday-field"
                    placeholder="Type user birthday here"
                    value={this.props.data.birthday}/>
                <br />
                <select 
                    name="update-info-gender-field" 
                    id="update-user-gender-field">
                        <option value="Male" >Male</option>    
                        <option value="Female">Female</option>    
                </select>
                <br />
                <input 
                    type="text"
                    className="update-info-field"
                    id="update-user-language-field"
                    placeholder="Type user name here"
                    value={this.props.data.language}/>
                <input 
                    type="button" 
                    className="btn btn-danger"
                    value="Update"
                    onClick={() => this.update_handler()}/>
                <input 
                    type="button"
                    className="btn btn-primary"
                    value="Cancel"
                    onClick={() => this.props.backIndexScreen()}/>
            </div>
        );
    }
}

export default UpdateComponent;