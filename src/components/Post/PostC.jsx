import React from "react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from 'moment'
import postContext from "../../context/postContext";
import { useContext } from "react";

import './postc.css'

const PostC = ({ post ,setCurrentId}) => {
    const context = useContext(postContext)
    const { DeletePost } = context;

    return (
        <>
            <Card className="card">
                <CardMedia className="media" image={post.selectedFile ||'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title="post.title" />
                <div className="overlay">
                    <Typography variant="h6">{post.creator}</Typography>
                    <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
                </div>
                <div className="overlay2">
                    <Button style={{ color: 'white' }} size="small" ><MoreHorizIcon fontSize="default" /></Button>
                </div>
                <div className="details">
                    <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
                </div>
                <Typography className="title" gutterBottom variant="h5" component="h2">{post.title}</Typography>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
                </CardContent>
                <CardActions className="cardActions">
                    <Button size="small" color="primary" ><ThumbUpAltIcon fontSize="small" />Like {post.likeCount} </Button>
                    <Button size="small" color="primary" onClick={()=>{DeletePost(post._id)}} ><DeleteIcon fontSize="small"  /> Delete</Button>
                </CardActions>
            </Card>
        </>
    )
}
export default PostC;