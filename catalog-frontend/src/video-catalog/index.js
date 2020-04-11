import React, {useEffect, useState} from 'react';

import { Card, Button, Grid } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

import VideoEdit from './edit';
import api from 'services/api';
import VideoImport from './import';

function VideoCatalog(){
    const [videoList, setVideoList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openImportModal, setOpenImportModal] = useState(false);
    const [id, setId] = useState(null);

    useEffect(()=>{
        setLoading(true);
        listCatalog();
    },[]);

    async function listCatalog(){
        setLoading(true);
        try{
            let response = await api.get('videos');
            setVideoList(response.data.data);
        }catch(err){
            console.log(err);
        }finally{
            setLoading(false);
        }
    }

    function editModal(id = null){
        setId(id);
        setOpenModal(true);
    }

    function importModal(){
        setOpenImportModal(true);
    }

    return (<>

        <VideoEdit openModal={openModal} setOpenModal={setOpenModal} id={id} />
        <VideoImport openImportModal={openImportModal} setOpenImportModal={setOpenImportModal}/>

        <Grid container>
            <Grid item xs={1}></Grid>
            <Grid>{loading && <Skeleton animation="wave" />}
            <Grid item xs={10}>

        <Grid container>
            <Grid item md={1}>
                My Channel
            </Grid>
            <Grid item md={10}>
            Search your movie
            </Grid>
            <Grid item md={1}>
                My Channel
            </Grid>
        </Grid>
                
                {!loading &&  videoList.map((el,index) =>
                <Card key={index}>
                    {el.title}
                    {el.genre}
                    {el.poster && <img src={el.poster}/>}

                    <div onClick={() => editModal(el._id)}>Editar</div>
                </Card>)
                }
                <Button onClick={()=>editModal()}>Add new</Button>
                <Button onClick={()=>importModal()}>Import from IMDB API</Button>
                </Grid>
            </Grid>
            <Grid item xs={1}></Grid>
            </Grid>
            <Grid container>
                <Grid item xs={1}></Grid>
                <Grid item xs={10}>About</Grid>
                <Grid item xs={1}></Grid>
            </Grid>
    </>)

}
export default VideoCatalog;