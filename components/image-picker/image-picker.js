'use client'
import Image from 'next/image'
import { useRef, useState } from 'react'
import classes from './image-picker.module.css'

const ImagePicker = ({ label, name }) => {
    const [image, setImage] = useState()
    const imageInput = useRef()

    const handlePickClick = () => {
        imageInput.current.click();
    }

    const handleImageChange = (event) => {
        console.log(event);
        const file = event.target.files[0];

        if (!file) {
            setImage(null);
            return;
        }

        const fileReader = new FileReader();
        fileReader.onload = () => {
            setImage(fileReader.result);
        }
        fileReader.readAsDataURL(file);
    }

    return (
        <div className={classes.picker}>
            {/* {image} */}
            <label htmlFor={name}>{label}</label>
            <div className={classes.controll}>
                <div className={classes.preview}>
                    {!image && <p>No image picked yet</p>}
                    {image && <Image 
                        alt='image' 
                        fill
                        src={image}
                    />}
                </div>
                <input 
                    className={classes.input} 
                    type="file" 
                    id={name} 
                    accept="image/png, image/jpeg" 
                    name={name}
                    ref={imageInput}
                    onChange={handleImageChange}
                    required

                />
                <button onClick={handlePickClick} className={classes.button} type='button'>Pick an image</button>
            </div>
        </div>
    )
}

export default ImagePicker