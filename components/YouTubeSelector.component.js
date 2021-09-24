import React, { useState } from "react";
import Styles from "../styles/YoutubeSelector.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, InputGroup, FormControl, Button } from "react-bootstrap";
import { BsLink45Deg } from "react-icons/bs";
import { getYoutubeTitle } from "../backend/YoutubeHandler";

const YoutubeSelector = ({ icon, handleYoutube }) => {
    const [showModal, setShowModal] = useState(false);
    const [link, setLink] = useState("");
    const [showHint, setShowHint] = useState(false);
    const [youtubeData, setYoutubeData] = useState({
        title:"",
        channelName:'',
        thumbnailUrl:'',
        videoId:''
    })
    

    const handleClose = () => {
        setShowModal(false);
    };

    const handleOpen = () => {
        setShowModal(true);
    };

    const toggleHint = () => {
        setShowHint(state =>!state)
    }

    const handleUrl = async (event)=> {
        const url = event.target.value
        setLink(url);
        // https://youtu.be/JhfzXJ35wlw
        const params = url.split('/');
        if (params[3]){
            try{
                const youtubeData = await getYoutubeTitle(params[3]);
                const thumbnailUrl = `http://i3.ytimg.com/vi/${params[3]}/hqdefault.jpg`
                setYoutubeData({...youtubeData, thumbnailUrl, videoId: params[3]})
            }catch(err) {
                setYoutubeData({title:"",
                channelName:'',
                thumbnailUrl:'', 
                videoId:''})
            }
           
        }
    }

    
    const handleSubmit = () => {
        handleYoutube(youtubeData.videoId);
        handleClose();
    }

    return (
        <div>
            <div onClick={handleOpen}>{icon}</div>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Please enter video url</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Please select any image or upload existing and press submit
                    <InputGroup style={{marginTop:10}} className="mb-3">
                        <InputGroup.Text id="basic-addon1">
                            <BsLink45Deg size={20} color="#444" />
                        </InputGroup.Text>
                        <FormControl
                            placeholder="Enter YouTube URL"
                            aria-label="Enter Youtube URL"
                            aria-describedby="basic-addon1"
                            value={link}
                            onChange={handleUrl}
                        />
                    </InputGroup>

                    {
                        showHint
                        ?
                        <img className={Styles.hintImage} src="https://firebasestorage.googleapis.com/v0/b/thenewzkit.appspot.com/o/Hints%2Fyoutube.png?alt=media&token=7e36da69-90d8-43ea-9d53-3b1db622f017" />
                        :
                        null
                    }

                    {
                        youtubeData.title
                        ?
                        <div className={Styles.youtubeContainer}>
                            <img className={Styles.hintImage} src={youtubeData.thumbnailUrl} />
                            <span className={Styles.videoTitle} >{youtubeData.title}</span>
                            <span className={Styles.channelName}>{youtubeData.channelName}</span>
                        </div>
                        :
                        null
                    }

                    <div className={Styles.actionContainer} >
                        <span className={Styles.showHintLabel} onClick={toggleHint}>{!showHint?"Show Hint":"Hide Hint"}</span>
                        <Button onClick={handleSubmit} className={Styles.submitButton} variant="primary">Submit</Button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default YoutubeSelector;
