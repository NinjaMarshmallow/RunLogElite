<template>
  <div class="activities">
    <img alt="Vue logo" src="../assets/logo.png" />
    <Activity />
    <Stats />
  </div>
</template>

<script>
import Activity from "@/components/Activity.vue";
import Stats from "@/components/Stats.vue";

export default {
  name: "Activities",
  components: {
    Activity,
    Stats
  }
};
</script>
