import  React, { createRef, useState, useEffect } from 'react';
import Styles from '../styles/RichText.module.css';
import { BsTypeBold, BsTypeItalic, BsJustifyLeft, BsJustify, BsJustifyRight, BsTextCenter, BsCodeSlash, BsTypeUnderline } from 'react-icons/bs';
import { IoMdArrowBack } from 'react-icons/io';
import { AiOutlineOrderedList, AiOutlineUnorderedList, AiOutlineLink, AiOutlineYoutube } from 'react-icons/ai';
import { RiAdvertisementLine } from 'react-icons/ri';
import { BiImageAdd } from 'react-icons/bi';
import LinkModal from './LinkModal.component';
import ImageModal from './ImageModal.component';
import { Button } from 'react-bootstrap'
import YoutubeSelector from './YouTubeSelector.component';
import AdsSelector from './AdsSelector.component';


const RichTextEditor = () => {

    const focusRef = createRef();
    const showCode = createRef(false);


    useEffect(() => {
        focusRef.current.contentDocument.designMode = "On";
        const textBody = focusRef.current.contentDocument.querySelector('body');
        textBody.style.fontSize = "1.5rem"
        textBody.style.fontFamily =  'PT Sans'
        textBody.style.wordWrap = 'break-word';
        showCode.current = false;
        focusRef.current.focus();
        
        document.addEventListener('message', handleMessage)
    },[]);

    const handleMessage = (data) => {
        const textBody = document.getElementById('output')
    textBody.style.fontSize = "1.5rem"
    textBody.style.fontFamily =  'PT Sans'
    textBody.style.wordWrap = 'break-word';
    const smack = textBody.contentDocument.querySelector('body');
    setTimeout(function() { 
        smack.innerHTML = `${data.data}`;
    }, 1000);
    }



    const handleClick = (event, command) => {
        event.preventDefault()
        focusRef.current.contentDocument.execCommand(command)
    }

    const handleLink = (url) => {
        focusRef.current.contentDocument.execCommand("createLink",false, url)
    }

    const handleImage = (url, title) => {
        const textBody = focusRef.current.contentDocument.querySelector('body');
        textBody.innerHTML += `<img style="max-width: 100%;border-radius: 10px;display: block;" src="${url}" alt="${title}"  /><br/>`
    }


    
    

    // const toggleCode = () => {
    //     const textBody = focusRef.current.contentDocument.querySelector('body');
    //     if (showCode.current){
    //         textBody.innerHTML = textBody.textContent;
    //         showCode.current = true;  
    //     }else {
    //         textBody.textContent = textBody.innerHTML;
    //         showCode.current = false;
    //     }
    // }

    const handleSendData = () => {
        const textBody = focusRef.current.contentDocument.querySelector('body');
        window.ReactNativeWebView.postMessage(JSON.stringify({content:textBody.innerHTML}));
    }


    const handleBackPress = () => {
        const textBody = focusRef.current.contentDocument.querySelector('body');
        window.ReactNativeWebView.postMessage(JSON.stringify({action:"GoBack", content:textBody.innerHTML}));
    }

    const handleYoutube = (videoId) => {
        const textBody = focusRef.current.contentDocument.querySelector('body');
        textBody.innerHTML += `<iframe width="100%" height="315" src="https://www.youtube.com/embed/${videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
    }


    


    return(
        <div className={Styles.container}>
            <div className={Styles.topContainer}>
            <div className={Styles.actionBar}>
                <div className={Styles.actionContainer} onClick={handleBackPress} >
                    <div className={Styles.backIcon}>
                        <IoMdArrowBack size={24} color="black"  />
                    </div>
                    <p className={Styles.sectionTitle}>Story</p>
                </div>

                <Button variant='danger' className={Styles.primaryAction} onClick={handleSendData}>
                    Save Story
                </Button>
            </div>

            <div className={Styles.editorControls}>
                    <div className={Styles.topControl}>
                        <BsTypeBold onMouseDown={(event) => handleClick(event, "bold")}  size={24} color='#444' className={Styles.editorControl} />
                        <BsTypeItalic onMouseDown={(event) => handleClick(event,"italic")}  size={24} color='#444' className={Styles.editorControl}  />
                        <BsTypeUnderline onMouseDown={(event) => handleClick(event,"underline")} size={24} color='#444' className={Styles.editorControl}  />
                        <LinkModal handleLink={handleLink} icon={<AiOutlineLink data-cmd="createLink" size={24} color='#444' className={Styles.editorControl}  />} />
                        <ImageModal handleImage={handleImage}  icon={<BiImageAdd data-cmd="createLink" size={24} color='#444' className={Styles.editorControl}  />} />
                        <YoutubeSelector  handleYoutube={handleYoutube}  icon={<AiOutlineYoutube data-cmd="createLink" size={24} color='#444' className={Styles.editorControl}  />}/>
                        <AdsSelector handleImage={handleImage} icon={<RiAdvertisementLine data-cmd="createLink" size={24} color='#444' className={Styles.editorControl}  />}  />
                    </div>
                    <hr />
                    
                    <BsJustifyLeft onMouseDown={(event) => handleClick(event,"justifyLeft")}  size={24} color='#444' className={Styles.editorControl} />
                    <BsTextCenter onMouseDown={(event) => handleClick(event,"justifyCenter")}  size={24} color='#444' className={Styles.editorControl} />
                    {/* <BsJustify onMouseDown={(event) => handleClick(event,"justifyFull")}  size={24} color='#444' className={Styles.editorControl} /> */}
                    <BsJustifyRight onMouseDown={(event) => handleClick(event,"justifyRight")}  size={24} color='#444' className={Styles.editorControl} />
                    
                    
                    <AiOutlineOrderedList onMouseDown={(event) => handleClick(event,"insertOrderedList")}  size={24} color='#444' className={Styles.editorControl}  />
                    <AiOutlineUnorderedList onMouseDown={(event) => handleClick(event,"insertUnOrderedList")}  size={24} color='#444' className={Styles.editorControl}  />


                    {/* <BsCodeSlash onClick={toggleCode} size={24} color='#444' className={Styles.editorControl}  /> */}
            </div>
            </div>
            <div className={Styles.editorContainer}> 
                <iframe spellCheck={false} id="output" style={{border:'none', marginTop:'10px'}} width={"100%"} height={"100%"}  ref={focusRef} name="textField" />
            </div>
        </div>
    )
}

export default RichTextEditor;