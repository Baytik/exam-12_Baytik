import React from 'react';
import FacebookLoginButton from 'react-facebook-login/dist/facebook-login-render-props';
import './FacebookLogin.css';
import {useDispatch} from "react-redux";
import icon from './facebook.png';
import {loginWithFacebook} from "../../store/actions/userLogAction";

const FacebookLogin = () => {
    const dispatch = useDispatch();

    const callback = (facebookData) => {
        if (facebookData.id) {
            dispatch(loginWithFacebook(facebookData));
        }
    };

    return (
        <FacebookLoginButton
            appId="3109373302426478"
            callback={callback}
            render={renderProps => (
                <button onClick={renderProps.onClick} className="facebook"><img src={icon} alt=""/></button>
            )}
        />
    );
};

export default FacebookLogin;