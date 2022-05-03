import { useState } from 'react';
import Post from './components/Post/Post';
import './App.css'
import memories from './Images/memories.jpg'

import { useEffect } from 'react';

import Poststate from './context/Poststate';

const App = () => {
  
  
  return (
    <>
      <Poststate>

        <div className="container">
          <nav id='navbar' className="nav align-items-center justify-content-center ">
            <h3>Memories</h3>
          </nav>
          <Post />
        </div>
      </Poststate>
    </>
  )
}
export default App;