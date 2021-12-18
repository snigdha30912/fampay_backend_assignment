import React from "react";
import "./style.css";
import OutlinedCard from "./Card";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import axios from 'axios';
import Pagination  from "./Pagination";
import SortComponent from "./SortComponent";

const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: "40px",
    paddingRight: "40px"
  }
});
/*
this component fetches the sorted data from the REST Api created 
in the backed and displays the fetched query as cards.
*/
export default function SortedDateData() {

  const classes = useStyles();
  const [data, setData ] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [videosPerPage, setVideosPerPage] = useState(9);
  const apiUrl = "http://localhost:8000/searchapi/order/"+window.location.search;

  useEffect(() => {
    const fetchData = async () =>{
      setLoading(true);
      console.log(apiUrl);
      const response = await axios.get(apiUrl);
      console.log(response);
      setData(response.data.results);
      setLoading(false);
    }
    fetchData();

  }, []);

  // Get current videos
  const indexOfLastVideo = currentPage*videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = data.slice(indexOfFirstVideo, indexOfLastVideo);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  return (
    <>
    {!!data?(
    <>
    <div>
    <Pagination videosPerPage={videosPerPage} totalVideos={data} paginate={paginate}/>
    </div>
    <div style={{display:'flex'}}>
    <div style={{width:'100%'}}>
    <SortComponent />
    </div>
    
    </div>
    <Grid
      container
      spacing={4}
      className={classes.gridContainer}
      style={{margin:'30px'}}
    >
      {currentVideos.map(card=>(
        <Grid item xs={12} sm={6} md={4}>
        <OutlinedCard card = {card} loading={loading}/>
      </Grid>
      ))}
      
    
    </Grid>
    </>):(<div></div>)}
    
    </>

    
  );
}
