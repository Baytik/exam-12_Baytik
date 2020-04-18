import React, {Component} from 'react';
import {fetchGalleries} from "../../store/actions/GalleriesAction";
import './PhotoGallery.css';
import {connect} from "react-redux";
import {apiURL} from "../../apiURL";
import {NavLink} from "react-router-dom";

class PhotoGallery extends Component {

    componentDidMount() {
        this.props.fetchGalleries();
    }

    render() {
        return (
            <div className="photo-gallery">
                {this.props.galleries.map(gallery => (
                    <div className="flex-box" key={gallery._id}>
                        <img src={apiURL + '/uploads/' + gallery.image} alt="gallery"/>
                        <p>{gallery.title}</p>
                        <NavLink to={`/users/${gallery.user._id}`}><span>By:</span> {gallery.user.username}</NavLink>
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