<template>
  <div class="line-item">
    <div class="table-cell" v-for="key in Object.keys(activity)" :key="key">
      <p class="table-value">{{ activity[key] }}</p>
    </div>
  </div>
</template>

<script lang="js">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
    name: 'LineItem',
})
export default class LineItem extends Vue {
  @Prop() activity;
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
  justify-content: space-between;
  padding: 0px 20px;
  flex-grow: 1;
  .table-cell {
    width: 12.5%;
  }
}
</style>
