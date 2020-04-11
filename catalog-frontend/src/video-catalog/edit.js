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
            console.log(res.data);
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
        <DialogTitle id="about-movie-dialog">About movie</DialogTitle>
        <DialogContent>
            <TextField
                value={videoData.title || ''}
                onChange={({ target: { value } })  => {setVideoData(prev => ({...prev,title:value}));}}
                fullWidth
            />
            <TextField
                value={videoData.genre || ''}
                onChange={({ target: { value } })  => {setVideoData(prev => ({...prev,genre:value}));}}
                fullWidth
            />
            <TextField
                value={videoData.releaseDate || ''}
                onChange={({ target: { value } })  => {setVideoData(prev => ({...prev,releaseDate:value}));}}
                fullWidth
            />
            <TextField
                value={videoData.mainActors || ''}
                onChange={({ target: { value } })  => {setVideoData(prev => ({...prev,mainActors:value}));}}
                fullWidth
            />

            <TextField
                value={videoData.summarizedPlot || ''}
                onChange={({ target: { value } })  => {setVideoData(prev => ({...prev,summarizedPlot:value}));}}
                fullWidth
            />
             <TextField
                value={videoData.youtubeTrailer || ''}
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