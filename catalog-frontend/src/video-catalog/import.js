import React, {useEffect, useState} from 'react';

import TextField from '@material-ui/core/TextField';
import { Button, Input, Card } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import api from 'services/api';

function VideoImport({id, openImportModal, setOpenImportModal}){

    const [search, setSearch] = useState('');
    const [videoList, setVideoList] = useState([]);
    const [videoData, setVideoData] = useState([]);
    const [searching, setSearching] = useState(false);

    async function searchVideo(){
        setSearching(true);
        try{
            let res = await api.get(`http://www.omdbapi.com/?i=tt3896198&apikey=149aa91b&s=${search}`);
            if(res.data.Search)
             setVideoList(res.data.Search);
        }catch(err){
            console.log(err);
        }finally{
            setSearching(false);
        }
    }

    async function searchById(imdbID){
        setSearching(true);
        try{
            let res = await api.get(`http://www.omdbapi.com/?apikey=149aa91b&i=${imdbID}`);
            if(res.data)
            setVideoData(res.data);
        }catch(err){
            console.log(err);
        }finally{
            setSearching(false);
        }
    }
    // imdbID


    async function loadDetail(){
        try{
            let res = await api.get('videos/'+id);
            setVideoData(res.data);
        }catch(err){
            
        }
    }

    async function addVideo(){
        /*
            title: req.body.title,
            genre: req.body.genre,
            releaseDate:req.body.releaseDate,
            mainActors: req.body.mainActors,
            summarizedPlot: req.body.summarizedPlot,
            youtubeTrailer: req.body.youtubeTrailer
        */
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
        setOpenImportModal(false);
    }
    

    return (
        <Dialog open={openImportModal} aria-labelledby="about-movie-dialog">
        <DialogTitle id="about-movie-dialog">Add movie</DialogTitle>



        <DialogContent>


        <Input  value={search||''} onChange={e => setSearch(e.target.value)}/><Button onClick={()=>searchVideo()}>Search</Button>

        {videoList.map((el,index) => <Card key={index}>
            <div onClick={()=> searchById(el.imdbID)}>Detalhes</div>
            {el.Title}
        </Card>)}
            

            <TextField
                value={videoData.Title || ''}
                onChange={({ target: { value } })  => {setVideoData(prev => ({...prev,title:value}));}}
                fullWidth
            />
            <TextField
                value={videoData.Genre || ''}
                onChange={({ target: { value } })  => {setVideoData(prev => ({...prev,genre:value}));}}
                fullWidth
            />
            <TextField
                value={videoData.ReleaseDate || ''}
                onChange={({ target: { value } })  => {setVideoData(prev => ({...prev,releaseDate:value}));}}
                fullWidth
            />
            <TextField
                value={videoData.MainActors || ''}
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
          <Button color="primary" onClick={() =>setOpenImportModal(false)}>
            Cancel
          </Button>
          <Button color="primary" onClick={()=>saveDetail()}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    )
}

export default VideoImport;