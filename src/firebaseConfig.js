import firebase from 'firebase'

// Configurações básicas fornecidas pelo site do firebase
import firebaseConfig from './fbconfig'

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);