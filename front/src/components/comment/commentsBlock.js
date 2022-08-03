import { Box, Divider, TextField, Typography } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import Button from "@mui/material/Button";
import Comments from "../../containers/comment/comments";
import authContext from "../../authContext";

const CommentsBlock = ({ id }) => {
  const nestComments = (comm) => {
    const commentMap = {};
    const comments = comm || [];

    // move all the comments into a map of id => comment
    // eslint-disable-next-line no-return-assign
    comments.forEach((comment) => (commentMap[comment.comment_id] = comment));

    // iterate over the comments again and correctly nest the children
    comments.forEach((comment) => {
      if (comment.parent !== null) {
        const parent = commentMap[comment.parent];
        (parent.children = parent.children || []).push(comment);
      }
    });

    // filter the list to return a list of correctly nested comments
    return comments.filter((comment) => comment.parent === null);
  };

  const ENDPOINT = "http://localhost:3001";

  const [comments, setComments] = useState(null);
  const [comment, setComment] = useState("");
  const socketRef = useRef(null);
  const { context } = useContext(authContext);
  useEffect(() => {
    socketRef.current = socketIOClient(ENDPOINT, {
      query: { id },
    });

    socketRef.current.on("comments", (data) => {
      setComments(nestComments(data));
    });
    socketRef.current.emit("comments:get", { id });
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  // eslint-disable-next-line consistent-return
  const handleClick = () => {
    if (comment === "") {
      return false;
    }

    socketRef.current.emit("comments:add", {
      text: comment,
      userId: context.user.user_id,
      parent: null,
    });
  };
  const handleTextChange = (e) => {
    setComment(e.target.value);
  };
  const handleDeleteComment = (commId) => {
    socketRef.current.emit("comments:delete", commId);
  };
  // eslint-disable-next-line consistent-return
  const handleReplyComment = (parent, text) => {
    if (text === "") {
      return false;
    }
    socketRef.current.emit("comments:add", {
      text,
      userId: context.user.user_id,
      parent,
    });
  };
  // eslint-disable-next-line consistent-return
  const handleEditComment = (commId, text, parent) => {
    if (text === "") {
      return false;
    }
    socketRef.current.emit("comments:update", {
      commId,
      text,
      userId: context.user.user_id,
      parent,
    });
  };

  return (
    <Box className="comments-wrapper">
      <Box className="comments-block-header">
        <Typography variant="button" display="block" gutterBottom>
          comments
        </Typography>
        <Divider />
      </Box>
      <div className="comment-add-block">
        <TextField
          id="outlined-multiline-static"
          multiline
          rows={2}
          defaultValue="Type your comment"
          onChange={handleTextChange}
        />
        <Button onClick={handleClick}>Add Comment</Button>
      </div>

      <Comments
        comments={comments || null}
        onDelete={handleDeleteComment}
        onReply={handleReplyComment}
        onEdit={handleEditComment}
      />
    </Box>
  );
};

export default CommentsBlock;
