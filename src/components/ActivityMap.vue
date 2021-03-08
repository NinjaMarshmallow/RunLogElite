<template>
  <div class="activity-component">
    <select v-model="selected" @change="drawSelectedRoute">
      <option disabled value="">Please select one</option>
      <option v-for="option in activities" :key="option.ID" :value="option">{{ option.ID }}</option>
    </select>
    <span>Selected: {{ selected ? selected.ID : "" }} with {{ this.numCoordinates(selected) }} GPS Coordinates</span>
    <div id="map"></div>
  </div>
</template>

<script lang="js">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
    name: 'ActivityMap',
})
export default class HeatMap extends Vue {
    data() {
        return {
            selected: undefined,
            activities: []
        }
    }
    numCoordinates(activity) {
        if(!activity) return 0;
        if(!activity.coordinates) return 0;
        return activity.coordinates.length;
    }
    drawSelectedRoute() {
        if(!this.selected || !this.selected.coordinates) return;
        const latlngs = this.selected.coordinates.map(coord => [coord.latitude, coord.longitude])
        const polyline = this.$L.polyline(latlngs, {color: 'red'}).addTo(this.map);
        this.map.fitBounds(polyline.getBounds())

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
            this.activities.forEach(act => {
                act.minutes = (act.time / 60).toFixed(2)
            });
            console.log(this.activities);
        });
        const map = this.$L.map('map').setView([51.505, -0.09], 13);
        this.$L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
            {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 18,
                id: 'mapbox/streets-v11',
                tileSize: 512,
                zoomOffset: -1,
                accessToken: 'pk.eyJ1IjoiamtsYWFzc2VuIiwiYSI6ImNrbTEzaDVrMDA0YzQyb212azR0dDNtcDEifQ.uWdd50Oeb0hPpkD_rv1qYA'
            }
        ).addTo(map);
        this.map = map;
    }
}
</script>
<style lang="scss" scoped>
#map {
  height: 500px;
}
</style>
