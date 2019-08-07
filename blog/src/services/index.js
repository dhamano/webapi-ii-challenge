import axios from 'axios';

const hostURL = "//localhost:8000/api/posts"

export const getPosts = () => {
  return axios.get(`${hostURL}`)
    .then( res => {
      return res.data;
    })
    .catch( err => {
      console.error(err);
    })
}

export const updatePosts = postContent => {
  return axios.put(`${hostURL}/${postContent.id}`, postContent)
    .then( res => {
      return res.data[0];
    })
    .catch( err => {
      console.error(err);
    })
}

export const deletePost = id => {
  return axios.delete(`${hostURL}/${id}`)
    .then( res => {
      return true;
    })
    .catch( err => {
      console.error(err);
    })
}