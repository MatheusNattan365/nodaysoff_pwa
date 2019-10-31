import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { Redirect, useParams } from 'react-router-dom'

import firebase from 'firebase'

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    // backgroundImage: `url(${evento.event_photo})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
  }
}));

export default function EventGames() {
  const classes = useStyles();
  
  const [evento, setEvento] = useState([]);

  // Pegar da Store
  const events = useSelector(state => state.events_store);

  let { name } = useParams();

  function condition(param) {
    return param.event_name === name
  }

  function eventFiltered() {
    let chosed_event = events.filter(condition)
    setEvento(chosed_event[0])
  }

  useEffect(() => {
    eventFiltered()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  // Lógica de RouteGuard
  if (!firebase.auth().currentUser) return <Redirect to="/login" />

  return (
    <Grid container 
          justify="center"
          component="main" 
          className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} sm={12} md={12} style={{backgroundImage:`url(${evento.event_photo})`}} className={classes.image} />
    </Grid>
  );
}
    // return (
    //     < Container className={classes.cardGrid} maxWidth="lg" >
    //         <Grid container spacing={4}>
    //             <Grid item key={evento.event_name} xs={12} sm={6} md={4}>
    //                 <Card className={classes.card}>
    //                     <CardMedia
    //                         className={classes.cardMedia}
    //                         image={evento.event_photo}
    //                         title="Image title"

    //                     >
    //                     </CardMedia>
    //                 </Card>
    //             </Grid>
    //         </Grid>
    //     </Container >
    // );
