import React, { useState } from "react";
import Styles from "../styles/LinkModal.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl';
import { Button } from "react-bootstrap";

const LinkModal = ({ icon, handleLink }) => {
    const [showModal, setShowModal] = useState(false);
    const [link, setLink] = useState("");

    const handleClose = () => {
        setShowModal(false);
    };

    const handleOpen = () => {
        setShowModal(true);
    };

    const handleSubmit = () => {
        handleClose();
        handleLink(link);
    }

    return (
        <div>
            <div onClick={handleOpen}>{icon}</div>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter the link</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Please enter the url for the link
                    <InputGroup className="mb-3" style={{marginTop:20}} >
                        <InputGroup.Text id="basic-addon1">
                            Link
                        </InputGroup.Text>
                        <FormControl
                            placeholder="Link"
                            aria-label="Link"
                            aria-describedby="basic-addon1"
                            onChange={event => setLink(event.target.value)}
                            value={link}
                        />
                    </InputGroup>

                    <Button onClick={handleSubmit} style={{backgroundColor:'#E80202', color:"white", width:'100%'}} variant="Primary">Submit</Button>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default LinkModal;
