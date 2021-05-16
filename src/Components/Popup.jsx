import React from 'react'

const Popup = props=>{
    return (
        <div className="popup-box">
            
                <span className="close-icon" onClick={props.handleClose}></span>

                {props.content}
           
            
        </div>
    )
}
export default Popup;
