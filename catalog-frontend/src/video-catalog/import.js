import React, {useEffect, useState} from 'react';

import TextField from '@material-ui/core/TextField';
import { Button, Input, Card, Grid, CardContent, CardActionArea } from '@material-ui/core';
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
    const [selectedMovie, setSelectedMovie] = useState(false);
    

    async function searchVideo(e = null){
        e && e.preventDefault();
        
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
            setSelectedMovie(true);
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
                await api.put('videos/' + id, {...videoData});
            }catch(err){
                console.log(err);
            }
        }else{
            try{
                await api.post('videos', {...videoData});
            }catch(err){
                console.log(err);
            }
        }
        setOpenImportModal(false);
    }
    

    return (
        <Dialog open={openImportModal} aria-labelledby="about-movie-dialog" maxWidth="lg">
        <DialogTitle id="about-movie-dialog">Add movie</DialogTitle>
        <DialogContent>

        <Grid container>
            <Grid item md={4}>
            <form onSubmit={searchVideo}>
            <TextField
                label="Type title" value={search||''} onChange={e => setSearch(e.target.value)}
                fullWidth
            />
            <Button onClick={()=>searchVideo()}>Search</Button>
            </form>
        {videoList.map((el,index) => <Card key={index} onClick={()=> searchById(el.imdbID)}>
        <CardActionArea>
            <CardContent>
            {el.Title}
            </CardContent>
            </CardActionArea>
            </Card>)}
        </Grid>

        <Grid item md={8}>
        <Grid container>
            { selectedMovie && <Grid item md={8} s={2}>
                <TextField
                value={videoData.Title || ''}
                label="Title"
                onChange={({ target: { value } })  => {setVideoData(prev => ({...prev,title:value}));}}
                fullWidth
            />

            <TextField
                value={videoData.Genre || ''}
                label="Genre"
                onChange={({ target: { value } })  => {setVideoData(prev => ({...prev,Genre:value}));}}
                fullWidth
            />

            <TextField
                value={videoData.Released || ''}
                label="Release date"
                onChange={({ target: { value } })  => {setVideoData(prev => ({...prev,Released:value}));}}
                fullWidth
            />

            <TextField
                value={videoData.Actors || ''}
                label="Main actors"
                onChange={({ target: { value } })  => {setVideoData(prev => ({...prev,Actors:value}));}}
                fullWidth
            />

            <TextField
                value={videoData.Plot || ''}
                label="Summarized plot"
                onChange={({ target: { value } })  => {setVideoData(prev => ({...prev,Plot:value}));}}
                fullWidth
            />

             <TextField
                value={videoData.youtubeTrailer || ''}
                label="Youtube URL trailer"
                onChange={({ target: { value } })  => {setVideoData(prev => ({...prev,youtubeTrailer:value}));}}
                fullWidth
            />

            <TextField
                value={videoData.Poster || ''}
                label="Poster"
                onChange={({ target: { value } })  => {setVideoData(prev => ({...prev,Poster:value}));}}
                fullWidth
            />
            </Grid>}
            <Grid item md={4}>
                <img width="100%" src={videoData.Poster || 'https://via.placeholder.com/300x444?text=Poster'} />
            </Grid>
            </Grid>
        </Grid>
        </Grid>
         
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