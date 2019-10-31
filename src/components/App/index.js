import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    minHeight: '90vh',
    margin: '0',
    padding: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',

  },
}))

export default function Home() {
  const classes = useStyles();
  return (
    <div className={classes.container}>Home Page Here!</div>
  );
}
