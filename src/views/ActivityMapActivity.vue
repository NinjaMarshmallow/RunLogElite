<template>
  <div class="activity-map">
    <h1> Activity Route </h1>
    <ActivityMap />
  </div>
</template>

<script>
// @ is an alias to /src
import ActivityMap from "@/components/ActivityMap.vue";

export default {
  name: "ActivityMapActivity",
  components: {
    ActivityMap
  }
};
</script>
