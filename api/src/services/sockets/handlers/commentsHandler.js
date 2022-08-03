const commentServices = require("../../store/comments.service");

module.exports = (io, socket) => {
  const getComments = async () => {
    const comments = await commentServices.getAllComments(socket.roomId);
    io.emit("comments", comments);
  };

  const addComment = async (data) => {
    console.log("room", data);
    await commentServices.addComment({
      text: data.text,
      post_id: socket.roomId,
      user_id: data.userId,
      parent: data.parent,
      created_time: new Date(),
    });

    getComments();
  };

  const editComment = async (data) => {
    await commentServices.updateComment(
      {
        text: data.text,
        post_id: socket.roomId,
        user_id: data.userId,
        parent: data.parent,
        changed: true,
      },
      data.commId
    );

    getComments();
  };

  const deleteComment = async (commId) => {
    await commentServices.deleteComment(commId);

    getComments();
  };

  socket.on("comments:get", getComments);
  socket.on("comments:add", addComment);
  socket.on("comments:update", editComment);
  socket.on("comments:delete", deleteComment);
};
