import React, {Component} from 'react';
import './App.css';
import {Route, Switch} from "react-router-dom";
import Header from "./Components/Header/Header";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import UsersProfile from "./Components/UsersProfile/UsersProfile";
import NewGallery from "./Components/NewGallery/NewGallery";
import PhotoGallery from "./Components/PhotoGallery/PhotoGallery";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Header/>
                <Switch>
                    <Route path="/" exact component={PhotoGallery}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/users/:id" component={UsersProfile}/>
                    <Route path="/add/new/photo" component={NewGallery}/>
                </Switch>
            </div>
        )
    }
}

export default App;
