<template>
  <div class="activity">
    <p>Activity</p>
    <div v-for="act in activities" :key="act.ID">
      <LineItem :data="addCalculatedData(act)" />
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
      activities: []
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

  addCalculatedData(activity) {
    const distanceConversion = 1.609;
    const result = activity;
    result.pace = (activity.time / (activity.distance / distanceConversion));
    const timeStamp = new Date(activity.startTime.seconds * 1000);
    result.date = timeStamp.toDateString();
    result.dateTime = timeStamp.toLocaleTimeString('en-US').replace(/:[0-9]. /g, '').toLowerCase();
    result.fastDistance = Math.min(
      ...result.laps
        .filter(lap => lap.lapTrigger === "distance")
        .map(lap => lap.totalTime)
    ).toFixed(2);

    return result;
  }
}
</script>
