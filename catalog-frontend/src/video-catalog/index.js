import React, {useEffect, useState} from 'react';

import { Card, Button, Grid, CardActionArea } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

import VideoEdit from './edit';
import api from 'services/api';
import VideoImport from './import';
import Player from './player';

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
        <Player/>

        
        <Grid container>
            <Grid item xs={1}></Grid>
            {loading && <Skeleton animation="wave" />}
            <Grid item xs={10}>
            <Grid container style={{height:'120px'}}>
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
                
                <Grid container>
                    <Grid item xs={4}>
                        <Button onClick={()=>editModal()}>Add new</Button>
                        <Button onClick={()=>importModal()}>Import from IMDB API</Button>
                    </Grid>

                    <Grid item xs={8}>
                        <Grid container>
                    {!loading &&  videoList.map((el,index) =>
                        <Grid item xs={4} key={index} p={2} >
                        <Card style={{margin:'2px', height:'200px', backgroundImage: 'url('+el.Poster+')', backgroundSize:'cover', borderBottom:'3px solid '+'#'+Math.random().toString(16).substr(-6)}}>
                            
                        <CardActionArea>
                            {el.Title}
                            {el.Genre}

                            <div onClick={() => editModal(el._id)}>Editar</div>

                            </CardActionArea>
                        </Card> </Grid>)
                        }
                       </Grid>
                        
                    </Grid>

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