import React, { useState } from 'react';
import Styles from '../styles/AdFormatSelector.module.css';
import { Button } from 'react-bootstrap'
import { firebaseDatabase, firebaseStorage } from '../backend/firebase-handler';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { ref as databaseRef, push } from 'firebase/database'

const AdFormatSelector = ({ handleImage, handleClose }) => {
    const [selectedImage, setSelectedImage] = useState({url:"", title:''});
    const [uploading, setUploading] = useState(false);
    const [uploadedPercentage, setUploadedPercentage] = useState("0");


    const handleRemove = () => {
        setSelectedImage(_ => ({url:'', title:''}))
    }

    const handleAdUpload = () => {
        const input = document.createElement('input');
        input.setAttribute('type',"file");
        input.setAttribute('accept', "image/*");
        input.onchange = () =>{
            if (input.files && input.files[0]){
                let reader = new FileReader();
                reader.onload = (e) => {
                    var img = new Image;
                    img.width
                    img.onload = function() {
                        if (img.width > 600 || img.height>600){
                            alert("Max Width: 600px and Max Height: 600px");
                            return;
                        }
                        uploadImage(input.files[0])
                    };
                    img.src = reader.result;
                }
                reader.readAsDataURL(input.files[0]);
            }
            
            

        } 
        
        input.click();
    }

    const uploadImage = (file) => {
        const keyRef = databaseRef(firebaseDatabase, "USER_POST_IMAGE")
        const key = push(keyRef).key
        const storageReference = ref(firebaseStorage, `USER_ADS/${key}`);
        const uploadTask = uploadBytesResumable(storageReference, file, {contentType:'image/*'});
        uploadTask.on('state_changed', (snapshot) => {
            setUploading(true);
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadedPercentage(progress.toFixed(2).toString());
        }, err => {throw(err)}, async () => {
           
            const url = await getDownloadURL(uploadTask.snapshot.ref); 
            setSelectedImage({url, title:'Ads'});
            setUploading(false)
        })
    }

    return(
        <div className={Styles.container}>
            
            {
                uploading
                ?
                <div className={Styles.uploadedPercentage}>
                    <span>{uploadedPercentage}% Uploaded</span>
                </div>
                :
                !selectedImage.url
                ?
                <div>
                    <span>Click on image to upload your ad</span>
                    <img onClick={handleAdUpload} className={Styles.adPlaceHolder} src='/billboard.png' alt="Upload Ad" />
                    <span className={Styles.adsHint}>max-height: 600px, max-width: 600px</span>
                </div>
                :
                <div className={Styles.adContainer}>
                    <img className={Styles.adPlaceHolder} src={selectedImage.url} alt="Uploaded Ad" />
                    <span onClick={handleRemove} className={Styles.removeImageLabel}>Remove Image</span>
                </div>


            }
            
            <Button onClick={() => {handleImage(selectedImage.url, selectedImage.title);handleClose();}} style={{backgroundColor:'#E80202', color:"white", width:'100%', marginTop:20}} variant="Primary">Submit</Button>
        </div>
    )
}

export default AdFormatSelector;