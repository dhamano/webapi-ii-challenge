import React, { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';

import { getPosts, deletePost, updatePosts } from './services/';

import DisplayPosts from './components/DisplayPosts';

function App() {
  const [ posts, setPosts ] = useState(null);

  useEffect( () => {
    getPosts().then( res => setPosts(res) );
  }, [])

  const updateState = res => {
    console.log("UPDATE", res);
    getPosts().then( res => setPosts(res) );
  }

  const handleSubmit = formInfo => {
    updatePosts(formInfo).then( res => updateState())
  }
  
  const deleteThisPost = id => {
    deletePost(id)
      .then( res => res && updateState() );
  }

  if(!posts) {
    return (
      <div className="loader">
        <Loader type="Grid" color="#0af" height={80} width={80} />
      </div>
    );
  }

  return (
    <section className="App">
      <main>
        <h1>The Blog</h1>
        {
          console.log('post map'),
          posts.map( (post, i) => {
            return <DisplayPosts {...post} handleSubmit={handleSubmit} deleteThisPost={deleteThisPost} updateState={updateState} key={`post-${i.toString().padStart(2,"0")}`} />
          })
        }
      </main>
    </section>
  );
}

export default App;
