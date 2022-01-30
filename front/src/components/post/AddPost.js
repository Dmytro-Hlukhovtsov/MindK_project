function AddPost() {
  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="postText">
          Post Text:
          <textarea name="postText" id="postText" />
        </label>
      </div>
      <input type="submit" value="Створити" />
    </form>
  );
}

export default AddPost;
