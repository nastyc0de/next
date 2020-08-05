import app from 'firebase/app';
import 'firebase/auth';

import firebaseConfig from './config';

class Firebase {
    constructor(){
        if (!app.apps.length) {
            app.initializeApp(firebaseConfig)
        }
        this.auth = app.auth();
    }
    // registra un usuario
    async register(nombre, email, password){
        const newUser = await this.auth.createUserWithEmailAndPassword(email, password);

        return await newUser.user.updateProfile({
            displayName:nombre
        })
    }
}

const firebase = new Firebase();
export default firebase;