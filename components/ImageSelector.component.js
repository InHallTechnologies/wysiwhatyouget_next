import React, { useEffect, useState } from "react";
import { firebaseDatabase, firebaseStorage } from "../backend/firebase-handler";
import { ref, get, push } from "firebase/database";
import Styles from "../styles/ImageSelector.module.css";
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import ImageList from "./ImageList.component";
import ImageSelectionPreview from "./ImageSelectionPreview.component";
import { Button } from "react-bootstrap";
import { BsViewList, BsUpload } from 'react-icons/bs';

 
const ImageSelector = ({ handleImage, handleClose }) => {
    const [loading, setLoading] = useState(true);
    const [imageList, setImageList] = useState([]);
    const [showImageList, setShowImageList] = useState(false);
    const [selectedImage, setSelectedImage] = useState({
        url: "",
        title: "",
    });
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState("0");

    useEffect(() => {
        const imageReference = ref(
            firebaseDatabase,
            "SEARCH_POST_IMAGE_SUGESSTION"
        );
        get(imageReference)
            .then((snapshot) => {
                const data = [];
                for (const key in snapshot.val()) {
                    const image = snapshot.child(key).val();
                    data.push(image);
                }
                setImageList(data);
                setLoading(false);
            })
            .catch((err) => {});
    }, []);

   

    const uploadImage = () => {
        const input = document.createElement('input');
        input.type = 'file';
        const keyRef = ref(firebaseDatabase,"USER_POST_IMAGE")
        const key = push(keyRef).key
       
        input.onchange = (event) => {
            const file = event.target.files[0];
            const reference = storageRef(firebaseStorage,`USER_POST_IMAGE/UPLOADED/testId/${key}`);
            const uploadTask = uploadBytesResumable(reference, file, { contentType:'image/*'});
            uploadTask.on('state_changed', (snapshot) => {
                setUploading(true);
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadProgress(progress.toFixed(2).toString());
            },(err) => {
                throw(err)
            }, async () => {
                const url = await getDownloadURL(uploadTask.snapshot.ref); 
                setUploading(false);
                setSelectedImage({url, title:''})
            });
        }
        input.accept = 'image/*';
        input.click();
    }

    const discardImage = () => {
        setSelectedImage({url:'', title:''});
    }

    return (
        <div className={Styles.container}>
            {
                selectedImage.url
                ?
                <ImageSelectionPreview selectedImage={selectedImage} setSelectedImage={setSelectedImage}  />
                :
                null

            }

            {/* {
                showImageList
                ?
                <ImageList imageList={imageList} setSelectedImage={setSelectedImage}  />
                :
                <div className={Styles.option} onClick={() => setShowImageList(true)} >
                    <BsViewList size={30} color="black"  />
                    <span className={Styles.optionLabel}>Show List</span>
                </div>
            } */}

            {
                uploading
                ?
                <span className={Styles.uploadImageLabel} >{`${uploadProgress}% Uploaded`}</span>
                :
                selectedImage.url
                ?
                <span className={Styles.uploadImageLabel} onClick={discardImage} >Discard Image</span>
                :
                <div className={Styles.option} onClick={uploadImage}>
                    <BsUpload size={30} color="black"  />
                    <span className={Styles.optionLabel}>Upload</span>
                </div>
               
            }   

            <Button onClick={() => {handleImage(selectedImage.url, selectedImage.title);handleClose();}} style={{backgroundColor:'#E80202', color:"white", width:'100%'}} variant="Primary">Submit</Button>

        </div>
    );
};

export default ImageSelector;


{/* <span className={Styles.uploadImageLabel} onClick={uploadImage} >+ Upload Image</span> */}