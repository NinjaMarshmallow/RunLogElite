<template>
  <div class="activity">
    <p>Activity</p>
    <div v-for="act in activities" :key="act.time">
      <p>
        You traveled {{ act.distance }} km in {{ timeFormat(act.time) }} minutes
      </p>
    </div>
  </div>
</template>

<script>
import { http } from "http";
import * as fs from "fs-web";
import { Component, Prop, Vue } from "vue-property-decorator";
import * as FitParserImport from "fit-file-parser/dist/fit-parser.js";
import firebase from "firebase";

@Component
export default class Activity extends Vue {
  data() {
    return {
      activities: []
    };
  }
  timeFormat(seconds) {
    const hours = seconds / 3600 | 0;
    const minutes = (seconds / 60 | 0) % 60 ;
    let secondsMod = seconds % 60 | 0;
    if (secondsMod < 10) {
      secondsMod = "0" + secondsMod;
    }
    let hourPortion = "";
    if(hours < 1) hourPortion = ""; else hourPortion = hours + "h ";
    return hourPortion + minutes + "m " + secondsMod + "s";
  }
  mounted() {
    const db = this.$firebase.firestore();
    db.collection("activity")
      .get()
      .then(snap => {
        const activities = [];
        snap.forEach(doc => {
          activities.push(doc.data());
        });
        this.activities = activities;
        this.activities.forEach(act => act.minutes = (act.time / 60).toFixed(2))
        console.log(this.activities);
      });
  }
}
</script>
