import React, { useState } from "react";
import { Formik, Form } from "formik";
import Button from "@mui/material/Button";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Box } from "@mui/material";
import { useMutation } from "react-query";
import { setAvatar } from "./api/formsApi";

const AvatarUpload = ({ user }) => {
  const avatarLoad = useMutation("avatarUpload", (values) => {
    setAvatar(user.user_id, values);
  });

  const [image, setImage] = useState();
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
      cropper.getCroppedCanvas().toBlob((blob) => {
        const formData = new FormData();

        formData.append("user-avatar", blob /* , 'example.png' */);
        if (user) formData.append("oldLink", user.avatar);
        avatarLoad.mutate(formData);
      });
      setImage(null);
    }
  };

  const deleteImage = () => {
    setImage(null);
  };

  return (
    <Formik>
      {() => (
        <Form>
          <Box margin={5}>
            {!image && (
              <Button variant="contained" component="label">
                Изменить аватар
                <input type="file" hidden onChange={handleChange} />
              </Button>
            )}
            {image && (
              <Button variant="contained" onClick={deleteImage}>
                Delete image
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
        </Form>
      )}
    </Formik>
  );
};

export default AvatarUpload;
