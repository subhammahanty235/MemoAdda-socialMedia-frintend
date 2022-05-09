import React, { useState,useEffect } from "react";
import PostC from "./PostC";
import { useNavigate } from "react-router-dom";
import FileBase from 'react-file-base64'

//for posts
import { Grid, CircularProgress } from '@mui/material';
import { useContext } from "react";
import postContext from "../../context/postContext";

const Post = (props) => {
    const context = useContext(postContext)
    const navigate = useNavigate()
    const {Posts,getPosts,Addpost } = context;
    console.log(Posts)
   
    const [postData, setPostData] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: '' })
    const checkSigned = () => {
        if (!localStorage.getItem('memoapk_api_auth_token')) {
           
            navigate('/login')
            
        }
        else {
            
        }
    }
    // useEffect(() => {
    //     getPosts()
        
    //     console.log("liked")
    //    },[Posts.likecount] )
    useEffect(() => {
     getPosts()
     checkSigned()
     
    },[] )
    
    const handleSubmit = (e) => {
        e.preventDefault();
        Addpost(postData.creator , postData.title , postData.message ,postData.tags , postData.selectedFile)
        setPostData({creator: '', title: '', message: '', tags: '', selectedFile: ''})

    }
    // const onChange = (e)=>{
    //     setPostData({...postData , [e.target.name]:e.target.value})
    // }


    return (
        <div className="container">
            {/* modal to add post */}
            {/* <!-- Button trigger modal --> */}
            <button type="button" class="btn btn-outline-dark " data-bs-toggle="modal" data-bs-target="#exampleModal">
                Add a post
            </button>

            {/* <!-- Modal --> */}
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Post Your Memory</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div class="mb-3">
                                    <label for="inputcreator" class="form-label">Creator</label>
                                    <input type="text" class="form-control" id="inputcreator" name="creator" value={props.userName}  />

                                </div>
                                <div class="mb-3">
                                    <label for="inputtitle" class="form-label">Title</label>
                                    <input type="text" class="form-control" id="inputtitle" name="title" value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                                </div>
                                <div class="mb-3">
                                    <label for="inputmessage" class="form-label">Message</label>
                                    <input type="text" class="form-control" id="inputmessage" name="message" value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                                </div>
                                <div class="mb-3">
                                    <label for="inputtags" class="form-label">Tags</label>
                                    <input type="text" class="form-control" id="inputtags" name="tags" value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
                                </div>
                                <div class="mb-3">
                                    <label for="inputfile" class="form-label">Select a file</label>
                                    <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
                                </div>

                                <button type="submit" class="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <h1 className="text-center">POSTS</h1>
            {Posts.length===0 ? <CircularProgress /> : (
            <Grid  container alignItems="stretch" spacing={3}>
                {Posts.map((post) => (
                    <Grid key={post._id} item xs={12} sm={6} md={4}>
                        <PostC post={post} fromadmin={false} />
                    </Grid>
                ))}
            </Grid>
            )}
        </div>
    )
}
export default Post;