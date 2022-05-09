import React, { useEffect, useState } from "react";
import moment from "moment";
import { Grid, CircularProgress } from '@mui/material';
import PostC from "./Post/PostC";
const UserProfile = () => {
    // fetch post details , and user details user details use will fetched using props from app.js 
    
    //post details
    let userPosts = [];
    const [posts, setPosts] = useState([])
    const [user, setUser] = useState([])
    const userDetails = async (token) => {
        const responce = await fetch('http://localhost:5000/auth/api/getdetails', {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "auth-token": token
            }
        })
        const responcejson = await responce.json();
        setUser(responcejson)
        sessionStorage.userid = responcejson._id;
        // console.log(responcejson)
    }
    const PostDetails = async (token) => {
        const responce = await fetch('http://localhost:5000/posts', {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "auth-token": token
            }
        })
        const responcejson = await responce.json();
        for (let index = 0; index < responcejson.length; index++) {
           
               if(responcejson[index].user === sessionStorage.userid){
                   console.log(responcejson[index])
                   userPosts.push(responcejson[index])
               }

        }
        setPosts(userPosts)

    }

    //user details

    
    useEffect(() => {

        userDetails(localStorage.getItem('memoapk_api_auth_token'))
        PostDetails(localStorage.getItem('memoapk_api_auth_token'))


        // console.log("user id is " + user._id)
        posts.map((post) => {
            console.log(post)
        })
    }, [])
    return (
        <>
            <section class="h-100 gradient-custom-2">
                <div class="container py-5 h-100">
                    <div class="row d-flex justify-content-center align-items-center h-100">
                        <div class="col col-lg-9 col-xl-7">
                            <div class="card">
                                <div class="rounded-top text-white d-flex flex-row" style={{ backgroundColor: "#000", height: "200px" }}>
                                    <div class="ms-4 mt-5 d-flex flex-column" style={{ width: "150px" }}>
                                        <img src={user.profilepic}
                                            alt="Generic placeholder image" class="img-fluid img-thumbnail mt-4 mb-2"
                                            style={{ width: "150px", zIndex: "1" }} />

                                        <button type="button" class="btn btn-outline-dark" data-mdb-ripple-color="dark"
                                            style={{ zIndex: 1 }}>
                                            Edit profile
                                        </button>
                                    </div>
                                    <div class="ms-3" style={{ marginTop: "130px" }}>
                                        <h5>{user.name}</h5>
                                        <p>{posts.length === 0 ? 'no posts' : posts.length} Posts</p>
                                    </div>
                                </div>
                                <div class="p-4 text-black" style={{ backgroundColor: "#f8f9fa" }}>
                                    {/* <div class="d-flex justify-content-end text-center py-1">
                                        <div>
                                            <p class="mb-1 h5">253</p>
                                            <p class="small text-muted mb-0">Photos</p>
                                        </div>
                                        <div class="px-3">
                                            <p class="mb-1 h5">1026</p>
                                            <p class="small text-muted mb-0">Followers</p>
                                        </div>
                                        <div>
                                            <p class="mb-1 h5">478</p>
                                            <p class="small text-muted mb-0">Following</p>
                                        </div>
                                    </div> */}
                                </div>
                                <div class="card-body p-4 text-black">
                                    <div class="mb-5">
                                        <p class="lead fw-normal mb-1">About</p>
                                        <div class="p-4" style={{ backgroundColor: "#f8f9fa" }}>
                                            <p class="font-italic mb-1">email: {user.emailid}</p>
                                            <p class="font-italic mb-1">joined: {moment(user.joined).fromNow()}</p>
                                            <p class="font-italic mb-0">userid: {user._id}</p>
                                        </div>
                                    </div>
                                    <div class="d-flex justify-content-between align-items-center mb-4">
                                        <p class="lead fw-normal mb-0">Recent Posts</p>
                                        {/* <p class="mb-0"><a href="#!" class="text-muted">Show all</a></p> */}
                                    </div>


                                    {posts.length === 0 ? <p className="text-center">You haven't posted anything yet</p> : (
                                        <Grid container alignItems="stretch" spacing={3}>
                                            {posts.map((post) => (
                                                <Grid key={post._id} item xs={12} sm={6} md={6}>
                                                    <PostC post={post} fromadmin={true} />
                                                </Grid>
                                            ))}
                                        </Grid>
                                    )}




                                    {/* <div class="row g-2">
                                        <div class="col mb-2">
                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"
                                                alt="image 1" class="w-100 rounded-3"/>
                                        </div>
                                        <div class="col mb-2">
                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp"
                                                alt="image 1" class="w-100 rounded-3"/>
                                        </div>
                                    </div>
                                    <div class="row g-2">
                                        <div class="col">
                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp"
                                                alt="image 1" class="w-100 rounded-3"/>
                                        </div>
                                        <div class="col">
                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
                                                alt="image 1" class="w-100 rounded-3"/>
                                        </div>
                                    </div> */}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}
export default UserProfile;