import React, {useEffect, useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
// import Skeleton from '@material-ui/lab/Skeleton';

import api from 'services/api';

function VideoEdit(){

    const [videoData, setVideoData] = useState([]);

    let { id } = useParams();

    useEffect(()=>{
        if(id)
            loadDetail(id);
    },[]);

    async function loadDetail(){

    }

    async function saveDetail(){
        // id Save / Create


    }
    

    return <div>
        
        Title
        Genre
        Release date
        Main actors,
        Summarized plot
        Youtube trailer

        <button>Save</button>
    </div>
}

export default VideoEdit;