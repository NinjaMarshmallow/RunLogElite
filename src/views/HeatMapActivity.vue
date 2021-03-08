<template>
  <div class="heatmap">
    <h1> HeatMap </h1>
    <HeatMap />
  </div>
</template>

<script>
// @ is an alias to /src
import HeatMap from "@/components/HeatMap.vue";

export default {
  name: "HeatMapActivity",
  components: {
    HeatMap
  }
};
</script>
