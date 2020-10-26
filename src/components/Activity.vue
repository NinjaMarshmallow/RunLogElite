<template>
  <div class="activity">
    <LineItem class="header" :activity="headers" />
    <div v-for="act in activities" :key="act.ID">
      <LineItem :activity="addCalculatedData(act)" />
    </div>
  </div>
</template>

<script>
import { Component, Prop, Vue } from "vue-property-decorator";
import LineItem from "@/components/LineItem.vue";

@Component({
  name: "Activity",
  components: {
    LineItem
  }
})
export default class Activity extends Vue {
  data() {
    return {
      activities: [],
      headers: {
        type: "Activity",
        date: "Date",
        dateTime: "Time",
        distance: "Distance",
        time: "Duration",
        pace: "Avg Pace",
        fastDistance: "Fastest Mile",
        cadence: "Cadence"
      }
    };
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
        this.activities.forEach(
          act => (act.minutes = (act.time / 60).toFixed(2))
        );
        console.log(this.activities);
      });
  }
  timeFormat(seconds) {
    const hours = (seconds / 3600) | 0;
    let minutesMod = ((seconds / 60) | 0) % 60;
    let secondsMod = seconds % 60 | 0;
    if (secondsMod < 10) {
      secondsMod = "0" + secondsMod;
    }
    if (minutesMod < 10) {
      minutesMod = "0" + minutesMod;
    }
    let hourPortion = "";
    if (hours < 1) hourPortion = "";
    else hourPortion = hours + "h ";
    return hourPortion + minutesMod + "m " + secondsMod + "s";
  }

  paceFormat(seconds) {
    const minutes = ((seconds / 60) | 0) % 60;
    let secondsMod = seconds % 60 | 0;
    if (secondsMod < 10) {
      secondsMod = "0" + secondsMod;
    }
    return minutes + ":" + secondsMod;
  }

  addCalculatedData(activity) {
    const distanceConversion = 1.609;
    const timeStamp = new Date(activity.startTime.seconds * 1000);
    const result = {};

    result.type = activity.type;
    result.date = timeStamp.toDateString().slice(0, -5);
    result.dateTime = timeStamp
      .toLocaleTimeString("en-US")
      .replace(/:[0-9]. /g, "")
      .toLowerCase();
    result.distance = activity.distance;
    result.time = this.timeFormat(activity.time);
    result.pace = this.paceFormat(
      activity.time / (activity.distance / distanceConversion)
    );
    result.fastDistance = this.paceFormat(
      Math.min(
        ...activity.laps
          .filter(lap => lap.lapTrigger === "distance")
          .map(lap => lap.totalTime)
      ).toFixed(2)
    );
    result.cadence = activity.cadence;

    return result;
  }
}
</script>

<style lang="scss">
.header {
  display: flex;
  flex-direction: row;
  background-color: #ddd;
  font-weight: bold;
}
.activity {
  margin-bottom: 200px;
}
</style>
