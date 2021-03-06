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
        textBody.style.wordWrap = 'break-word';
        showCode.current = false;
        focusRef.current.focus();
        
        window.onmessage = handleMessage
        focusRef.current.contentDocument.body.addEventListener('paste', (e) => {
            e.preventDefault();
            const text = e.clipboardData.getData('text/plain');
            focusRef.current.contentDocument.execCommand("insertHTML", false, text);
        })

        focusRef.current.contentDocument.body.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                const caretIndex = getCaretIndex(textBody);
                console.log(caretIndex)
            }
          });
        
        document.addEventListener('message', handleMessage)
    },[]);

    const handleMessage = (data) => {
    const textBody = document.getElementById('output')
    textBody.style.wordWrap = 'break-word';
    const smack = textBody.contentDocument.querySelector('body');
    setTimeout(function() { 
        if (typeof(data.data) === 'string') {
            smack.innerHTML = `${data.data}`;
        }
        
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
        const caretIndex = getCaretIndex(textBody);
        console.log(caretIndex)
        const firstHalf = textBody.innerHTML.substring(0, caretIndex)
        const secondHalf = textBody.innerHTML.substring(caretIndex, textBody.innerHTML.length - 1)
        textBody.innerHTML = firstHalf + `<br/><img style="max-width: 100%;border-radius: 2px;display: block;" src="${url}" alt="${title}"  /><br/>` + secondHalf
    }

    function getCaretIndex(element) {

        var target = focusRef.current.contentDocument.createTextNode("\u0001");
        focusRef.current.contentDocument.getSelection().getRangeAt(0).insertNode(target);
        var position = focusRef.current.contentDocument.querySelector('body').innerHTML.indexOf("\u0001");
        target.parentNode.removeChild(target);
        return position
      }

     



    const handleSendData = () => {
        const textBody = focusRef.current.contentDocument.querySelector('body');
        if (window.ReactNativeWebView){
            window.ReactNativeWebView.postMessage(JSON.stringify({content:textBody.innerHTML}));
        }else {
            window.parent.postMessage({content:textBody.innerHTML, type:'data'}, '*')
        }
        
    }


    const handleBackPress = () => {
        const textBody = focusRef.current.contentDocument.querySelector('body');
        if (window.ReactNativeWebView){
            window.ReactNativeWebView.postMessage(JSON.stringify({action:"GoBack", content:textBody.innerHTML}));

        }else {
            window.parent.postMessage('hello', '*')
        }
    }

    const handleYoutube = (videoId) => {
        // const textBody = focusRef.current.contentDocument.querySelector('body');
        // textBody.innerHTML += `<iframe width="100%" height="315" src="https://www.youtube.com/embed/${videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><br/><br/><br/><br/><br/><br/>`
        const textBody = focusRef.current.contentDocument.querySelector('body');
        const caretIndex = getCaretIndex(textBody);
        console.log(caretIndex)
        const firstHalf = textBody.innerHTML.substring(0, caretIndex)
        const secondHalf = textBody.innerHTML.substring(caretIndex, textBody.innerHTML.length - 1)
        textBody.innerHTML = firstHalf + `<br/><div style="display: flex; justify-content: center; align-items: center;"><iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div><br/>` + secondHalf
    
        
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