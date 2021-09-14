import  React, { createRef, useState, useEffect } from 'react';
import Styles from '../styles/RichText.module.css';
import { BsTypeBold, BsTypeItalic, BsJustifyLeft, BsJustify, BsJustifyRight, BsTextCenter, BsCodeSlash, BsTypeUnderline } from 'react-icons/bs';
import { BiHeading } from 'react-icons/bi';
import { AiOutlineOrderedList, AiOutlineUnorderedList, AiOutlineLink } from 'react-icons/ai';

const RichTextEditor = () => {

    const focusRef = createRef();
    const showCode = createRef(false);


    useEffect(() => {
        focusRef.current.contentDocument.designMode = "On";
        const textBody = focusRef.current.contentDocument.querySelector('body');
        textBody.style.fontSize = "1.5rem"
        textBody.style.fontFamily =  'PT Sans'

        showCode.current = false;
    },[]);

    const handleClick = (command) => {
        focusRef.current.contentDocument.execCommand(command)
    }
    

    const toggleCode = () => {
        const textBody = focusRef.current.contentDocument.querySelector('body');
        if (showCode.current){
            textBody.innerHTML = textBody.textContent;
            showCode.current = true;  
        }else {
            textBody.textContent = textBody.innerHTML;
            showCode.current = false;
        }
    }



    return(
        <div className={Styles.container}>
            <div className={Styles.editorContainer}>
                <div className={Styles.editorControls}>
                    <BsTypeBold onClick={() => handleClick("bold")}  size={24} color='black' className={Styles.editorControl} />
                    <BsTypeItalic onClick={() => handleClick("italic")}  size={24} color='black' className={Styles.editorControl}  />
                    <BsTypeUnderline onClick={() => handleClick("underline")} size={24} color='black' className={Styles.editorControl}  />
                    <AiOutlineLink data-cmd="createLink" size={24} color='black' className={Styles.editorControl}  />

                    <hr />
                    
                    <BsJustifyLeft onClick={() => handleClick("justifyLeft")}  size={24} color='black' className={Styles.editorControl} />
                    <BsTextCenter onClick={() => handleClick("justifyCenter")}  size={24} color='black' className={Styles.editorControl} />
                    <BsJustify onClick={() => handleClick("justifyFull")}  size={24} color='black' className={Styles.editorControl} />
                    <BsJustifyRight onClick={() => handleClick("justifyRight")}  size={24} color='black' className={Styles.editorControl} />
                    
                    
                    <AiOutlineOrderedList onClick={() => handleClick("insertOrderedList")}  size={24} color='black' className={Styles.editorControl}  />
                    <AiOutlineUnorderedList onClick={() => handleClick("insertUnOrderedList")}  size={24} color='black' className={Styles.editorControl}  />

                    <BsCodeSlash onClick={toggleCode} size={24} color='black' className={Styles.editorControl}  />
                </div>
                
                <iframe spellCheck={false} id="output" style={{border:'none'}} width={"100%"} height={"100%"}  ref={focusRef} name="textField" />
            </div>
        </div>
    )
}

export default RichTextEditor;