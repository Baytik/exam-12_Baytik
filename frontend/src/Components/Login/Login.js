import React, {Component} from 'react';
import './Login.css';
import {connect} from "react-redux";
import FacebookLogin from "../FacebookLogin/FacebookLogin";
import {loginUser} from "../../store/actions/userLogAction";
import {Redirect} from "react-router-dom";

class Login extends Component {

    state = {
        username: '',
        password: '',
    };

    changeInputHandler = e => {this.setState({[e.target.name]: e.target.value})};

    loginUserHandler = async () => {
        const User = {
            username: this.state.username,
            password: this.state.password
        };
        await this.props.loginUser(User);
    };

    render() {
        if (this.props.user) return <Redirect to="/"/>;
        return (
            <div className="login">
                <p>Login</p>
                <div>
                    <input type="text" placeholder="Enter your email" name="username" onChange={this.changeInputHandler}/>
                </div>
                <div>
                    <input type="password" placeholder="Enter your password" name="password" onChange={this.changeInputHandler}/>
                </div>
                <div>
                    <button onClick={this.loginUserHandler}>Login</button>
                </div>
                <div>
                    {this.props.loginError && (
                        <h5 className="error">{this.props.loginError.error}</h5>
                    )}
                </div>
                <FacebookLogin/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user.user,
    loginError: state.user.loginError
});

const mapDispatchToProps = dispatch => ({
    loginUser: (user) => dispatch(loginUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);