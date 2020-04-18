import React, {Component} from 'react';
import './UsersProfile.css';
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import {deleteGallery, fetchUsersGalleries} from "../../store/actions/GalleriesAction";
import {apiURL} from "../../apiURL";
import Modal from "../../IU/Modal/Modal";

class UsersProfile extends Component {

    state = {
        purchasing: false,
        image: null
    };

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

    purchaseHandler = (image) => {
        this.setState({purchasing: true, image: image});
    };

    purchaseCancel = () => {
        this.setState({purchasing: false});
    };

    render() {
        return (
            <div className="users-profile">
                <div className="users-header">
                    <h1>{this.props.usersGalleries[0] ? this.props.usersGalleries[0].user.username + "'s gallery" : (
                       this.props.user ? this.props.user.username + "'s Gallery" : ''
                    )}</h1>
                    {this.props.user ? this.props.user._id === this.props.match.params.id && (
                        <NavLink to="/add/new/photo">Add new photo</NavLink>
                    ) : (
                        <div/>
                    )}
                </div>
                <div className="profile-galleries">
                    {this.props.usersGalleries.map(gallery => (
                        <div key={gallery._id}>
                        <div className="profile-gallery">
                            <img src={apiURL + '/uploads/' + gallery.image}
                                 alt="gallery"
                                 onClick={() => this.purchaseHandler(apiURL + '/uploads/' + gallery.image)}
                            />
                            <p onClick={() => this.purchaseHandler(apiURL + '/uploads/' + gallery.image)}>{gallery.title}</p>
                            {this.props.user ? this.props.user._id === this.props.match.params.id && (
                                <button className="delete" onClick={() => this.deleteGallery(gallery._id)}>Delete</button>
                            ) : (
                                <div/>
                            )}
                        </div>
                            <Modal show={this.state.purchasing} close={this.purchaseCancel}>
                                <img src={this.state.image} alt="gallery" className="modal-image"/>
                                <button onClick={this.purchaseCancel} className="close">close</button>
                            </Modal>
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