

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkXYe8_zZt25j9-Y3KBDqeW5J1VNbjCpo",
  authDomain: "mediqueue-1ff27.firebaseapp.com",
  projectId: "mediqueue-1ff27",
  storageBucket: "mediqueue-1ff27.firebasestorage.app",
  messagingSenderId: "327995599743",
  appId: "1:327995599743:web:91a7bef3150fde97ce484a"
};

// only these can access /admin.html
const ADMIN_EMAILS = [
  "admin@yourhospital.com",
  "maryamahmed2k26@gmail.com",
  "rumaisaelyas@gmail.com"       
];

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db   = firebase.firestore();

// Google Sign-In Provider
const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.addScope("profile");
googleProvider.addScope("email");