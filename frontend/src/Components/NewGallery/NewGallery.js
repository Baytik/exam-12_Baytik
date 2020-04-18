import React, {Component} from 'react';
import './NewGallery.css';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {postGallery} from "../../store/actions/GalleriesAction";

class NewGallery extends Component {

    state = {
        title: '',
        image: null
    };

    changeInputHandler = e => {
        this.setState({[e.target.name]: e.target.value})
    };
    fileChangeHandler = e => {
        this.setState({[e.target.name]: e.target.files[0]})
    };

    postNewGallery = async () => {
        if (this.state.title === '' || this.state.title === ' ') {
            alert('Напишите текст')
        }
        else if (this.state.image === null || this.state.image === undefined) {
            alert('Вставтье картину')
        } else {
            const Gallery = new FormData();
            Gallery.append('title', this.state.title);
            Gallery.append('image', this.state.image);
            await this.props.postGallery(Gallery);
        }
    };

    render() {
        if (!this.props.user) return <Redirect to="/login"/>;
        return (
            <div className="add-new-photo">
                <h1>Add new photo</h1>
                <div>
                    <span>Title</span>
                    <input type="text" name="title" className="input-1" onChange={this.changeInputHandler}/>
                </div>
                <div>
                    <span>Image</span>
                    <input type="file" name="image" className="input-2" onChange={this.fileChangeHandler}/>
                </div>
                <div>
                    <button onClick={this.postNewGallery}>Create photo</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user.user
});

const mapDispatchToProps = dispatch => ({
    postGallery: (gallery) => dispatch(postGallery(gallery))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewGallery);