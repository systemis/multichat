import React, { Component } from 'react';
import Navigation           from '../../Components/Navigation/navigation.js';
import ChatGroup            from '../../Components/Chat/chat.js';
import InfoGroup            from '../../Components/Info/info.js';

class HomePage extends Component {
    render() {
        return (
            <div className="home-page row">
                <Navigation Check={"dd"}/>
                <ChatGroup  />
                <InfoGroup  />
            </div>
        );
    }
}

export default HomePage;