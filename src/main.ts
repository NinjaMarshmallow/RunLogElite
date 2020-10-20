import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import firebase from "firebase";
require('firebase/firestore');
import * as Dropzone from 'dropzone';
Vue.config.productionTip = false;


Vue.prototype.$firebase = firebase;
const firebaseConfig = {
  apiKey: "AIzaSyD33MuwlPruy2aYqziH1dqZRRMvtn4mjTY",
  authDomain: "runlogelite.firebaseapp.com",
  databaseURL: "https://runlogelite.firebaseio.com",
  projectId: "runlogelite",
  storageBucket: "runlogelite.appspot.com",
  messagingSenderId: "237480764422",
  appId: "1:237480764422:web:043a527e08d0eaa2df4f87",
  measurementId: "G-PBNGHB2JJM"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

Dropzone.options.gpsFile = {
  paramName: "file", // The name that will be used to transfer the file
  maxFilesize: 2, // MB
  accept: function(file, done) {
    done();
  }
};

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
