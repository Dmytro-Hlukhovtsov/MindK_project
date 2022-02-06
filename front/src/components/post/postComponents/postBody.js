import { CardContent, Typography } from "@mui/material";
import { FormDate } from "../../../containers/post/postContainers/postData";

export function PostBody({ text = "Default Text", timestamp = "" }) {
  return (
    <CardContent>
      <Typography
        variant="body2"
        color="text.secondary"
        fontSize="14pt"
        textAlign="left"
        marginBottom="25px"
      >
        {text}
      </Typography>
      <FormDate timestamp={timestamp} />
    </CardContent>
  );
}
