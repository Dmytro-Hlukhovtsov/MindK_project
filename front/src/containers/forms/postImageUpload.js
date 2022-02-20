import React, { useState } from "react";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Cropper from "react-cropper";
import Image from "mui-image";

const PostImageUpload = ({ handlePostImage }) => {
  const [image, setImage] = useState();
  const [croppedImage, setCroppedImage] = useState();
  const [cropper, setCropper] = useState();

  const handleChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];

    if (file.type.match("image.*") && file.size < 10000000) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      console.error("Wrong file format or size!");
    }
  };

  const cropImage = () => {
    if (typeof cropper !== "undefined") {
      setCroppedImage(cropper.getCroppedCanvas().toDataURL());
      cropper.getCroppedCanvas().toBlob((blob) => {
        handlePostImage(blob);
      });
      setImage(null);
    }
  };

  const deleteImage = () => {
    setImage(null);
  };

  return (
    <Box margin={5}>
      {croppedImage && <Image src={croppedImage} alt="post" width={300} />}
      {!image && (
        <Button variant="contained" component="label">
          Картинка для поста
          <input type="file" hidden onChange={handleChange} />
        </Button>
      )}
      {image && (
        <Button variant="contained" onClick={deleteImage}>
          Удалить картинку
        </Button>
      )}
      {image && (
        <Cropper
          src={image}
          onInitialized={(instance) => setCropper(instance)}
          rotatable={false}
          viewMode={1}
        />
      )}
      {image && (
        <Button variant="contained" onClick={cropImage}>
          Crop
        </Button>
      )}
    </Box>
  );
};

export default PostImageUpload;
