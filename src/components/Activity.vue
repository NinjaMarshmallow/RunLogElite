<template>
  <div class="activity">
    <p>Activity</p>
    <div v-for="act in testCollection" :key="act.time">
        <p>You traveled {{ act.distance }} miles in {{act.time / 60}} minutes</p>
    </div>
  </div>
</template>

<script>
import { Component, Prop, Vue } from "vue-property-decorator";
@Component
export default class Activity extends Vue {
  data() {
    return {
      testCollection: []
    };
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
        console.log(testCollection);
      });
  }
};
</script>
