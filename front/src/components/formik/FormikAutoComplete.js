import { Autocomplete, TextField } from "@mui/material";

const FormikAutoComplete = (props) => {
  const { name, onChange, options, optionNumber } = props;

  return (
    <Autocomplete
      name={name}
      options={options}
      onChange={(event, newValue) => {
        console.log(newValue);
        onChange(name, newValue.value);
      }}
      renderInput={(params) => <TextField {...params} label="Visible To:" />}
      defaultValue={options[optionNumber - 1] || null}
    />
  );
};

export default FormikAutoComplete;
