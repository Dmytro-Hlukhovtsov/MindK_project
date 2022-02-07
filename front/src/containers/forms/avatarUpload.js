import { useFormik } from "formik";
import styled from "@emotion/styled";
import { Button } from "@mui/material";

const Input = styled("input")({
  display: "none",
});

const AvatarUpload = () => {
  const formik = useFormik({
    onSubmit: (values) => {
      console.log(values);
      // setAvatar({ userid }, values).then((r) => console.log(r));
    },
  });

  return (
    <form className="add-avatar-form" onSubmit={formik.handleSubmit}>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="avatarUpload">
        <Input id="avatarUpload" type="file" onChange={formik.handleChange} />
        <Button variant="contained" component="span">
          Выбрать
        </Button>
      </label>
      <Button type="submit">Изменить</Button>
    </form>
  );
};

export default AvatarUpload;
