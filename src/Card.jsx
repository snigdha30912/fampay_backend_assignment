import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CCard, CRow, CCol, CCardImage, CCardBody, CCardTitle, CCardText,CCardFooter,CButton } from "@coreui/react";

const useStyles = makeStyles({
  root: {
    minWidth: 200
  },
  bullet: {
    display: "inline-block",
    margin: "2px 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

/*
Created the card component which displays the video title, 
description, thumbnail url and publishing date in the form of cards
*/

export default function OutlinedCard({ card , loading}) {

  if (loading) {
    return <h2>Loading...</h2>
  }

  return (
    <CCard style={{ width: '20rem' }}>
  <CCardImage orientation="top" src={card.thumbnail_url} />
  <CCardBody>
    <CCardTitle style={{textAlign:'justify', fontSize:'16px'}}>{card.video_title}</CCardTitle>
    <CCardText style={{textAlign:'justify', fontSize:'12px',color:"#DC143C"}}>
    {card.description}
    </CCardText>
  </CCardBody>
<CCardFooter>
      <small className="text-medium-emphasis" style={{color:"blue"}}>Published At : {card.publishing_date.substring(0,10)}</small>
    </CCardFooter>
</CCard>
  );
}
