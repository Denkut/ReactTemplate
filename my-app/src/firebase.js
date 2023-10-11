import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import { getDatabase } from 'firebase/database';
const firebaseConfig = {
	apiKey: 'AIzaSyDA9aa6YNIIGY9TDvV3-OS9Nl5R9cR8044',
	authDomain: 'todo-list-d1612.firebaseapp.com',
	projectId: 'todo-list-d1612',
	storageBucket: 'todo-list-d1612.appspot.com',
	messagingSenderId: '1004819960931',
	appId: '1:1004819960931:web:ba77ce4472bb48a68f5456',
	measurementId: 'G-ZKW4H31RDW',
	databaseURL:
		'https://todo-list-d1612-default-rtdb.europe-west1.firebasedatabase.app/',
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = getDatabase(app);
