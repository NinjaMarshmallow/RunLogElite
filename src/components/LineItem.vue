<template>
  <div class="line-item">
    <p>{{ data.type }}</p>
    <p>{{ data.date }}</p>
    <p>{{ data.dateTime }}</p>
    <p>{{ data.distance }}</p>
    <p>{{ timeFormat(data.time) }}</p>
    <p>{{ paceFormat(data.pace) }}</p>
    <p>{{ paceFormat(data.fastDistance) }}</p>
    <p>{{ data.cadence }}</p>
  </div>
</template>

<script lang="js">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class LineItem extends Vue {
  @Prop() data;

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

  paceFormat(seconds) {
    const minutes = (seconds / 60 | 0) % 60 ;
    let secondsMod = seconds % 60 | 0;
    if (secondsMod < 10) {
      secondsMod = "0" + secondsMod;
    }
    return minutes + ":" + secondsMod;
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.line-item {
  border-radius: 15px;
  box-shadow: 1px 1px 2px;
  margin: 3px 0px;
  display: flex;
  text-align: center;
  justify-content: space-around;
  p {
    padding: 20px;
  }
}
</style>
