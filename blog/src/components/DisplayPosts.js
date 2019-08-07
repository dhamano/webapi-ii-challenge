import React, { useState } from 'react';
import { updatePosts, deletePost } from '../services';

const DisplayPosts = post => {
  const [ isEditing, setIsEditing ] = useState(false);
  const [ formInfo, setFormInfo ] = useState({ title: post.title, id: post.id, contents: post.contents });

  let date = new Date(post.created_at);
  let dateUpdated = new Date(post.updated_at);
  let options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }

  const toggleIsEditing = () => {
    setIsEditing(!isEditing);
  }

  const handleSubmit = event => {
    event.preventDefault();
    post.handleSubmit(formInfo);
    toggleIsEditing();
  }

  const handleChange = event => {
    setFormInfo({
      ...formInfo,
      [event.target.name] : event.target.value
    })
  }
  
  const deleteThisPost = () => {
    post.deleteThisPost(post.id);
  }

  console.log('POSTS',post)

  return(
    <article>
      <span onClick={toggleIsEditing} className={isEditing ? 'cancel' : 'edit' }>{isEditing ? 'cancel' : 'edit' }</span>
      {isEditing ? (
        <>
          <span onClick={deleteThisPost} className="delete" title="delete">&times;</span>
          <form onSubmit={handleSubmit}>
            <input onChange={handleChange} type="text" name="title" placeholder="Post title" value={formInfo.title} />
            <div className="grouping">
              <textarea onChange={handleChange} name="contents" placeholder="Post content" value={formInfo.contents}></textarea>
              <button type="submit">Save</button>
            </div>
          </form>
        </>
      ) : (
        <>
          <h2>{post.title}</h2>
          <p>{post.contents}</p>
        </>
      )
      }
      <span className="created"><strong>Created on:</strong> {date.toLocaleDateString("en-US", options)}
      &nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;
      <strong>Last Updated:</strong> {dateUpdated.toLocaleDateString("en-US", options)}</span>
    </article>
  )
}

export default DisplayPosts;