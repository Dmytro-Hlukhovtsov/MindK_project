import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import CommentHeader from "../../components/comment/commentHeader";

const Comments = ({ comments, onDelete, onReply, onEdit }) => (
  <List>
    {comments?.map((com) => (
      <>
        <ListItem key={com.comment_id} alignItems="flex-start">
          <ListItemAvatar>
            <Avatar
              sx={{ width: 35, height: 35 }}
              alt="avatar"
              src={com.avatar}
            />
          </ListItemAvatar>
          <ListItemText
            disableTypography
            primary={
              <CommentHeader
                comment={com}
                onDelete={onDelete}
                onReply={onReply}
                onEdit={onEdit}
              />
            }
            secondary={com.text}
          />
        </ListItem>
        <div className="comment-childs-wrapper">
          {com.children && (
            <Comments
              comments={com.children || null}
              onDelete={onDelete}
              onReply={onReply}
              onEdit={onEdit}
            />
          )}
        </div>
      </>
    ))}
  </List>
);

export default Comments;
