import firebase from "firebase/app";
import "firebase/firebase-auth";
import * as firebaseui from "firebaseui";
import storeActions from "./store/storeActions";
import DBConnector from "./services/database/dbConnector";

import router from "./router";

const config = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: "bogsynth.firebaseapp.com",
  databaseURL: "https://bogsynth.firebaseio.com",
  projectId: "bogsynth",
  storageBucket: "bogsynth.appspot.com",
  messagingSenderId: "359303561397",
  appId: "1:359303561397:web:2d73a7613b08ebd2",
};

const auth = {
  context: null,
  uiConfig: null,
  ui: null,

  init(context) {
    this.context = context;

    firebase.initializeApp(config);
    this.uiConfig = {
      signInSuccessUrl: "dashboard",
      signInOptions: [
        //firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        //firebase.auth.EmailAuthProvider.PROVIDER_ID,
        {
          provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          customParameters: { prompt: "select_account" },
        },
      ],
    };
    this.ui = new firebaseui.auth.AuthUI(firebase.auth());

    firebase.auth().onAuthStateChanged(async (user) => {
      //console.log(user);
      try {
        if (!user) throw "Not logged in";
        //console.log(await user.getIdToken());
        let currentProfile = await DBConnector.getAccount();
        this.context.$store.commit(storeActions.user.SET_CURRENT_USER, currentProfile.user);
        this.context.$store.commit(storeActions.user.SET_CUSTOMER, currentProfile.customer);
        this.context.$store.dispatch("LOAD_PROJECTS");

      } catch (e) {
        console.log("No profile created", e);
        router.push('/').catch(e => {});
        return;
      }

      if(user) {
        router.push('/dashboard').catch(e => {});
      }

    });
  },
  authForm(container) {
    this.ui.start(container, this.uiConfig);
  },
  user() {
    return this.context ? firebase.auth().currentUser : null;
  },
  logout() {
    this.context.$store.commit(storeActions.user.SET_CURRENT_USER, null);

    firebase
      .auth()
      .signOut()
      .then(
        function() {
          // Sign-out successful.
          //console.log("Logout successful");
          router.push("/").catch(e => {});
        },
        function(error) {
          //console.log(error);

          // An error happened.
          router.push("/").catch(e => {});

        }
      );
  },
};

export default auth;
