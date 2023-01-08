import React from "react";
import Home from './pages/home'
import TopPicks from './pages/top-picks'
import './styles/style.css'
import {Router} from '@reach/router'

class App extends React.Component{
    render(){
        return (
            <Router>
                <Home path="/"/>
                <TopPicks path="/top-picks"/>
            </Router>
         
        )
    }
}

export default App