import React, { useState } from "react";
import { addPost, removePost, updatePost } from "../features/postSlice";
import { useDispatch, useSelector } from "react-redux";
export default function Post() {
  const [title, setTitle] = useState("");
  const [decription, setDescription] = useState("");

  const [editTitle, setEditTitle] = useState("");
  const [editDecription, setEditDescription] = useState("");

  const [error, setError] = useState(false);
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState("");
  const post = useSelector((state) => state.posts.items);
  const dispatch = useDispatch();

  const handelClick = () => {
    setError(false);
    if (!title || !decription) {
      setError(true);
    } else {
      dispatch(addPost({ id: post.length + 1, title, decription }));
      setTitle("");
      setDescription("");
    }
  };

  // if (!editTitle || !editDecription) {
  //   eturn;r
  // }

  return (
    <div className="post">
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          className="input-first-from"
          type="text"
          name="title"
          id=""
          value={title}
          placeholder="Title..."
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="input-first-from"
          type="text"
          name="decription"
          id=""
          value={decription}
          placeholder="desc...."
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="btn" onClick={handelClick}>
          Add Post
        </button>
      </form>

      {post.length > 0 ? (
        post.map((pos) => {
          return (
            <div className="content" key={pos.id}>
              <h1>{pos.title}</h1>
              <p>{pos.decription}</p>
              <div className="buutons">
                <button onClick={() => dispatch(removePost({ id: pos.id }))}>
                  remove
                </button>
                <button
                  onClick={() => {
                    setEdit(!edit);
                    setId(pos.id);
                  }}
                >
                  edit
                </button>
              </div>

              {edit && id === pos.id && (
                <div className="edit">
                  <input
                    className="edit-input"
                    type="text"
                    placeholder="Title"
                    onChange={(e) => {
                      setEditTitle(e.target.value);
                    }}
                  />
                  <input
                    className="edit-input"
                    type="text"
                    placeholder="Desc"
                    onChange={(e) => {
                      setEditDescription(e.target.value);
                    }}
                  />
                  <button
                    onClick={() => {
                      if (!editTitle || !editDecription) return;

                      console.log("there is a user");
                      dispatch(
                        updatePost({
                          id: pos.id,
                          title: editTitle,
                          decription: editDecription,
                        })
                      );
                      setEditTitle("");
                      setEditDescription("");
                    }}
                  >
                    UPDATE
                  </button>
                </div>
              )}
            </div>
          );
        })
      ) : (
        <>
          <div className="no-posts">"THERE IS NO POSTS"</div>
          {error ? "please add all fildes" : ""}
        </>
      )}
    </div>
  );
}
