import React from "react";
import Styles from '../styles/ImageList.module.css'

const ImageList = ({ imageList, setSelectedImage }) => {

   

    return (
        <div className={Styles.imageListContainer}>
            {imageList.map((item) => {
                return (
                    <div key={item.id} className={Styles.imageOptionContainer} onClick={() => setSelectedImage({url:item.imageUrl, title:item.imageTitle})} >
                        <img
                            className={Styles.imageOption}
                            src={item.imageUrl}
                            alt={item.imageTitle}
                        />
                        <span className={Styles.optionLabel}>
                            {item.imageTitle}
                        </span>
                    </div>
                );
            })}
        </div>
    );
};


export default ImageList;