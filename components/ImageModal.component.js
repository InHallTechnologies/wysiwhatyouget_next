import React, { useState } from "react";
import Styles from "../styles/LinkModal.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";

import ImageSelector from "./ImageSelector.component";

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
                    <Modal.Title>Select or Upload Image</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Please upload and submit image
                    <ImageSelector handleClose={handleClose} handleImage={handleImage} />
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ImageModal;
