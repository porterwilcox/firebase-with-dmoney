import firebase from 'firebase/app'
import 'firebase/firestore'
import config from './firebaseConfig'

const firebaseApp = firebase.initializeApp(config)
const firestore = firebaseApp.firestore()
//firestore is my applications db
export default firestore