import React, {Component} from 'react';
import {fetchGalleries} from "../../store/actions/GalleriesAction";
import './PhotoGallery.css';
import {connect} from "react-redux";
import {apiURL} from "../../apiURL";
import {NavLink} from "react-router-dom";
import Modal from "../../IU/Modal/Modal";

class PhotoGallery extends Component {

    state = {
        purchasing: false,
        image: null
    };

    componentDidMount() {
        this.props.fetchGalleries();
    }

    purchaseHandler = (image) => {
        this.setState({purchasing: true, image: image});
    };

    purchaseCancel = () => {
        this.setState({purchasing: false});
    };

    render() {
        return (
            <div className="photo-gallery">
                {this.props.galleries.map(gallery => (
                    <div key={gallery._id}>
                    <div className="flex-box">
                        <img src={apiURL + '/uploads/' + gallery.image}
                             alt="gallery"
                             className="image"
                             onClick={() => this.purchaseHandler(apiURL + '/uploads/' + gallery.image)}/>
                        <p onClick={() => this.purchaseHandler(apiURL + '/uploads/' + gallery.image)}>{gallery.title}</p>
                        <NavLink to={`/users/${gallery.user._id}`}><span>By:</span> {gallery.user.username}</NavLink>
                    </div>
                        <Modal show={this.state.purchasing} close={this.purchaseCancel}>
                            <img src={this.state.image} alt="gallery" className="modal-image"/>
                            <button onClick={this.purchaseCancel} className="close">close</button>
                        </Modal>
                    </div>
                ))}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user.user,
    galleries: state.galleries.galleries
});

const mapDispatchToProps = dispatch => ({
    fetchGalleries: () => dispatch(fetchGalleries())
});

export default connect(mapStateToProps, mapDispatchToProps)(PhotoGallery);