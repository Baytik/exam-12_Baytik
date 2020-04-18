import React, {Component} from 'react';
import './UsersProfile.css';
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import {deleteGallery, fetchUsersGalleries} from "../../store/actions/GalleriesAction";
import {apiURL} from "../../apiURL";

class UsersProfile extends Component {

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.fetchUsersGalleries(id)
    }

    componentDidUpdate(prevProps) {
        const id = this.props.match.params.id;
        if (prevProps.match.params.id !== id) {
            this.props.fetchUsersGalleries(id)
        }
    }

    deleteGallery = async (id) => {
        await this.props.deleteGallery(id);
        await this.props.fetchUsersGalleries(this.props.match.params.id)
    };

    render() {
        return (
            <div className="users-profile">
                <div className="users-header">
                    <h1>{this.props.usersGalleries[0] ? this.props.usersGalleries[0].user.username + "'s gallery" : (
                        <div/>
                    )}</h1>
                    {this.props.user ? this.props.user._id === this.props.match.params.id && (
                        <NavLink to="/add/new/photo">Add new photo</NavLink>
                    ) : (
                        <div/>
                    )}
                </div>
                <div className="profile-galleries">
                    {this.props.usersGalleries.map(gallery => (
                        <div className="profile-gallery" key={gallery._id}>
                            <img src={apiURL + '/uploads/' + gallery.image} alt="gallery"/>
                            <p>{gallery.title}</p>
                            {this.props.user ? this.props.user._id === this.props.match.params.id && (
                                <button className="delete" onClick={() => this.deleteGallery(gallery._id)}>Delete</button>
                            ) : (
                                <div/>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user.user,
    usersGalleries: state.galleries.usersGalleries
});

const mapDispatchToProps = dispatch => ({
    fetchUsersGalleries: (id) => dispatch(fetchUsersGalleries(id)),
    deleteGallery: (id) => dispatch(deleteGallery(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersProfile);