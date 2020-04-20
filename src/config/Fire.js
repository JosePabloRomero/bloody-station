import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyD04cUMfpyEvkb2TjGexg5UbnoHwok0EwM",
    authDomain: "bloody-station.firebaseapp.com",
    databaseURL: "https://bloody-station.firebaseio.com/",
    projectId: "bloody-station",
    storageBucket: "bloody-station.appspot.com",
    messagingSenderId: "167366094096",
    appId: "1:167366094096:web:726afaa9377d28a50ac995",
    measurementId: "G-C3HTC202FK"
}
const fire = firebase.initializeApp(config);
export default fire;