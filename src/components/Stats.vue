<template>
  <div v-if="!debug" class="stats">
    <p>Stats</p>
    <LineItem data="totals" />
  </div>
</template>

<script>
import { Component, Prop, Vue } from "vue-property-decorator";
import LineItem from "@/components/LineItem.vue";
@Component({
  name: "Stats",
  components: {
    LineItem
  }
})
export default class Stats extends Vue {
  data() {
    return {
      testCollection: [],
      totals: {},
      debug: true
    };
  }
  timeFormat(seconds) {
    const hours = (seconds / 3600) | 0;
    const minutes = ((seconds / 60) | 0) % 60;
    let secondsMod = seconds % 60 | 0;
    if (secondsMod < 10) {
      secondsMod = "0" + secondsMod;
    }
    return hours + "h " + minutes + "m " + secondsMod + "s";
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
          return {
            distance: parseFloat(result.distance) + parseFloat(item.distance),
            time: parseFloat(result.time) + parseFloat(item.time)
          };
        });
        console.log("Stat Totals");
        console.log(this.totals);
      });
  }
}
</script>
