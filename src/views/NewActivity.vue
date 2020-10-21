<template>
  <v-container>
    <v-layout row>
      <v-flex class="text-center font-weight-black">
        <h1>Upload an Activity File</h1>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex md6 offset-sm3>
        <div>
          <div>
            <button @click="click1">Choose File</button>
            <input
              type="file"
              ref="input1"
              style="display: none"
              @change="previewFile"
            />
          </div>

          <div v-if="fitData != null">
            <p>{{fitData.name}} has been uploaded</p>
            <br />
          </div>
        </div>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex md6 offset-sm3 class="text-center">
        <v-text-field solo v-model="caption" label="Caption goes here">
        </v-text-field>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import firebase from "firebase";
import * as fs from "fs-web";
import * as FitParserImport from "fit-file-parser/dist/fit-parser.js";
export default {
  name: "NewActivity",
  data() {
    return {
      caption: "",
      fitUrl: "",
      fitData: null
    };
  },
  methods: {
    create() {
      const post = {
        caption: this.caption
      };
      firebase
        .database()
        .ref("FITFiles")
        .push(post)
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          console.log(err);
        });
    },
    click1() {
      this.$refs.input1.click();
    },
    previewFile(event) {
      this.uploadValue = 0;
      console.log(event);
      this.fitData = event.target.files[0];
      console.log(this.fitData);
      this.onUpload();
    },
    onUpload() {
      const db = firebase.firestore();
      const fitFileID = this.fitData.name;
      // TODO Check if it exists already before adding
      const storageRef = firebase
        .storage()
        .ref(`${this.fitData.name}`)
        .put(this.fitData);
      storageRef.on(
        `state_changed`,
        snapshot => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        error => {
          console.log(error.message);
        },
        () => {
          this.uploadValue = 100;
          storageRef.snapshot.ref.getDownloadURL().then(url => {
            this.fitUrl = url;
            console.log(this.fitUrl);

            fetch(url)
              .then(response => response.arrayBuffer())
              .then(buffer => {
                // Create a FitParser instance (options argument is optional)
                const FitParser = FitParserImport.default;
                const fitParser = new FitParser({
                  force: true,
                  speedUnit: "km/h",
                  lengthUnit: "km",
                  temperatureUnit: "kelvin",
                  elapsedRecordField: true,
                  mode: "cascade"
                });
                fitParser.parse(buffer, function(error, data) {
                  // Handle result of parse method
                  if (error) {
                    console.log(error);
                  } else {
                    console.log(data);
                    const databaseEntry = {};
                    const session = data.activity.sessions[0];
                    databaseEntry["ID"] = fitFileID;
                    databaseEntry["distance"] = session.total_distance.toFixed(2);
                    databaseEntry["time"] = session.total_timer_time.toFixed(2);
                    databaseEntry["cadence"] = session.avg_cadence * 2;
                    databaseEntry["fastMile"] = Math.min(
                      ...session.laps
                        .filter(lap => lap.total_distance > 1.609)
                        .map(lap => lap.total_timer_time)
                    ).toFixed(2);
                    console.log(databaseEntry);
                    db.collection("activity")
                      .get()
                      .then(snapshot => {
                        const docsWithThisID = snapshot.docs.some(doc => {
                          doc.data().ID == fitFileID;
                        });
                        console.log(docsWithThisID);
                        if (!docsWithThisID) {
                          db.collection("activity")
                            .add(databaseEntry)
                            .then(ref =>
                              console.log(
                                "FIT File Parsed and Saved with ID: ",
                                ref.id
                              )
                            );
                        } else {
                          console.log("Already Uploaded.");
                        }
                      });
                  }
                });
              });
          });
        }
      );
    }
  }
};
</script>