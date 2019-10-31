import React from 'react';
import {Redirect} from 'react-router-dom'
import firebase from 'firebase'

import ContactForm from './PerfilForms'

export default function User() {
  
  if(!firebase.auth().currentUser || null) return <Redirect to="/login" />
  // if(!firebase.auth().currentUser.uid || null) return <Redirect to="/login" />
   
  return (
      <ContactForm />
  );
}
