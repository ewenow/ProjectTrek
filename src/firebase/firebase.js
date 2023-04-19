//import Firebase oraz modułów firestore i auth
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

// obiekt firebaseConfig(klucz API oraz dane konfiguracyjne dla projektu ProjectTrek)
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCXKGC0qR-T_mKmiD65Kw-MuICiqZ5YwA8",
    authDomain: "projecttrek-d9caa.firebaseapp.com",
    databaseURL: "https://projecttrek-d9caa-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "projecttrek-d9caa",
    storageBucket: "projecttrek-d9caa.appspot.com",
    messagingSenderId: "515533784142",
    appId: "1:515533784142:web:8fe8ce019a812c1fd86f1f",
    measurementId: "G-VL73NPFMSG"
};
//// Initialize Firebase
firebase.initializeApp(firebaseConfig)

// obiekty projectFirestore i projectAuth / dostęp do usług Firestore i autentykacji Firebase
//Storage Firebase - usługa do do pobierania i przesyłania plików w plików
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

/*obiekt timestamp - zwracanie dokumentów utworzonych w określonym przedziale czasowym
sortowanie dokumentów według daty utworzenia lub modyfikacji*/

const timestamp = firebase.firestore.Timestamp


//eksport projectFirestore, projectAuth i timestamp
export { projectFirestore, projectAuth, timestamp, projectStorage }
