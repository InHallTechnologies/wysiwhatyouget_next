import React, { useState } from "react";
import Styles from "../styles/LinkModal.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";

import ImageSelector from "./ImageSelector.component";
import AdFormatSelector from "./AdsFormatSelector.component";

const ImageModal = ({ icon, handleImage }) => {
    const [showModal, setShowModal] = useState(false);
    const [link, setLink] = useState("");

    const handleClose = () => {
        setShowModal(false);
    };

    const handleOpen = () => {
        setShowModal(true);
    };

    

    return (
        <div>
            <div onClick={handleOpen}>{icon}</div>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Upload Image Ad</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                   
                    <AdFormatSelector handleImage={handleImage} handleClose={handleClose} />
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ImageModal;
