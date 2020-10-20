<template>
  <div class="activity">
    <p>Stats</p>
    <p >You have traveled {{totals.distance}} miles total in {{this.timeFormat(totals.time)}}.</p>
  </div>
</template>

<script>
import { Component, Prop, Vue } from "vue-property-decorator";
@Component
export default class Stats extends Vue {
  data() {
    return {
      testCollection: [],
      totals: {}

    };
  }
  timeFormat(seconds) {
    const hours = seconds / 3600 | 0;
    const minutes = (seconds / 60 | 0) % 60 ;
    let secondsMod = seconds % 60;
    if (secondsMod < 10) {
      secondsMod = "0" + secondsMod;
    }
    return hours + ":" + minutes + ":" + secondsMod;
  }


  mounted() {
    const db = this.$firebase.firestore();
    db.collection("activity")
      .get()
      .then(snap => {
        const testCollection = [];
        snap.forEach(doc => {
          testCollection.push(doc.data());
        });
        this.testCollection = testCollection;
        this.totals = this.testCollection.reduce((result, item) => {
          return { distance: result.distance + item.distance, time: result.time + item.time }
        });
        console.log(this.totals)
      });
  }
};
</script>
