import React from 'react';
import Styles from '../styles/ImageSelection.module.css';

const ImageSelectionPreview = ({ selectedImage, setSelectedImage }) => {

    const handleTextChange = (event) => {
        setSelectedImage({...selectedImage, title:event.target.value })
    }

    return(
        <div className={Styles.imagePreviewContainer}>
            <img className={Styles.imagePreview} src={selectedImage.url} alt={selectedImage.title} />
            <input className={Styles.imageTitleInput} placeholder="Enter image title" value={selectedImage.title} onChange={handleTextChange} />
        </div>
    )
}

export default ImageSelectionPreview;