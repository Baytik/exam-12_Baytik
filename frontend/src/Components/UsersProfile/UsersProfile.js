import React, {Component} from 'react';
import './UsersProfile.css';
import {connect} from "react-redux";

class UsersProfile extends Component {
    render() {
        console.log(this.props.user);
        return (
            <div className="users-profile">
                <div className="users-header">
                <h1>{this.props.match.params.name} gallery</h1>
                {this.props.user ? this.props.user.username === this.props.match.params.name && (
                    <button>Add new photo</button>
                ) : (
                    <div/>
                )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user.user
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(UsersProfile);