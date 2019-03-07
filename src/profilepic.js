import React from "react";

export default function ProfilePic(props) {
    //({first, last, showUploader, image='/default.jpg'})
    const image = props.image || "./default.jpg";
    return (
        <div>
            <img
                src={image}
                alt={`${props.first} ${props.last}`}
                onClick={props.showUploader}
            />
        </div>
    );
}

//<label htmlFor="id"> <label>  JSX
//<label for="id"> <label> html
//<input type="file" id="file" .. ETC PIC ON IPHONE
