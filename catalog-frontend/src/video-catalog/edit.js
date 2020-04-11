import React, {useEffect, useState} from 'react';

import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import api from 'services/api';

function VideoEdit({id, openModal, setOpenModal}){
    const [videoData, setVideoData] = useState([]);

    useEffect(()=>{
        if(id){
            loadDetail(id);
        }else{
            setVideoData([]);
        }
    },[openModal, id]);

    async function loadDetail(){
        try{
            let res = await api.get('videos/'+id);
            setVideoData(res.data);
        }catch(err){
            
        }
    }

    async function saveDetail(){
        if(id){
            try{
                await api.put('videos/' + id, videoData);
            }catch(err){
                console.log(err);
            }
        }else{
            try{
                await api.post('videos', videoData);
            }catch(err){
                console.log(err);
            }
        }
        setOpenModal(false);
    }
    

    return <>

        <Dialog open={openModal} aria-labelledby="about-movie-dialog">
        <DialogTitle id="about-movie-dialog">About movie <Button>Remove</Button></DialogTitle>
        <DialogContent>
            <TextField
                value={videoData.Title || ''}
                label="Title"
                onChange={({ target: { value } })  => {setVideoData(prev => ({...prev,Title:value}));}}
                fullWidth
            />
            <TextField
                value={videoData.genre || ''}
                label="Genre"
                onChange={({ target: { value } })  => {setVideoData(prev => ({...prev,Genre:value}));}}
                fullWidth
            />
            <TextField
                value={videoData.Released || ''}
                label="Released"
                onChange={({ target: { value } })  => {setVideoData(prev => ({...prev,Released:value}));}}
                fullWidth
            />
            <TextField
                value={videoData.Actors || ''}
                label="Actors"
                onChange={({ target: { value } })  => {setVideoData(prev => ({...prev,Actors:value}));}}
                fullWidth
            />

            <TextField
                value={videoData.Plot || ''}
                label="Plot"
                onChange={({ target: { value } })  => {setVideoData(prev => ({...prev,Plot:value}));}}
                fullWidth
            />
             <TextField
                value={videoData.youtubeTrailer || ''}
                label="Youtube Trailer"
                onChange={({ target: { value } })  => {setVideoData(prev => ({...prev,youtubeTrailer:value}));}}
                fullWidth
            />
          
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={() =>setOpenModal(false)}>
            Cancel
          </Button>
          <Button color="primary" onClick={()=>saveDetail()}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
}

export default VideoEdit;