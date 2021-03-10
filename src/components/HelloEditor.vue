<template>
  <v-layout class="pa-4" wrap>
    <v-flex xs12>
      <v-layout>
        <v-flex xs6 layout wrap>
          <v-flex xs7>
            <v-text-field v-model="newClassTitle"></v-text-field>
          </v-flex>
          <v-flex xs5>
            <v-btn @click="createClass">Create class</v-btn>
          </v-flex>
          <v-flex xs12>
            <v-card>
              <v-card-title> Classes </v-card-title>
              <v-content>
                <v-list v-for="c in classes" :key="c.id">
                  <v-list-item @click="selectClass(c)">
                    <v-list-item-title>{{ c.title }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-content>
            </v-card>
          </v-flex>
        </v-flex>
        <v-flex xs6>
          <v-layout wrap v-if="selectedClass != null">
            <v-flex xs12>
              {{ selectedClass.title }}
            </v-flex>
            <v-flex xs12 layout>
              <v-flex xs4>
                <v-text-field v-model="newProperty"></v-text-field>
              </v-flex>
              <v-flex xs4>
                <v-text-field v-model="newPropertyType"></v-text-field>
              </v-flex>
              <v-flex xs4>
                <v-btn @click="createCroperty">Create property</v-btn>
              </v-flex>
            </v-flex>
            <v-flex xs12>
              <v-list
                v-for="(prop, index) in selectedClass.properties"
                :key="`${index}-prop`"
              >
                <v-list-item>
                  <v-list-item-content>
                    {{ prop.title }} - {{ prop.type }}
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex xs6>
      <v-textarea v-model="code"></v-textarea>
    </v-flex>
    <v-flex xs6>
      <v-img id="plantUml" :src="plantImg" contain />
    </v-flex>
  </v-layout>
</template>

<script>
import * as plantumlEncoder from "plantuml-encoder";

export default {
  data() {
    return {
      newClassTitle: "",
      newProperty: "",
      newPropertyType: "",
      ids: 1,
      code: "",
      plantImg: "",
      classes: [],
      selectedClass: null,
    };
  },
  methods: {
    createClass() {
      let clas = {
        id: this.ids++,
        title: this.newClassTitle,
        properties: [],
      };
      this.classes.push(clas);
      this.newClassTitle = "";
    },
    selectClass(clas) {
      this.selectedClass = clas;
    },
    createCroperty() {
      let prop = {
        title: this.newProperty,
        type: this.newPropertyType,
      };
      this.selectedClass.properties.push(prop);

      this.selectedClass = this.selectedClass;
      this.renderUml();
    },
    renderUml() {
      let code = "";
      for (let i = 0; i < this.classes.length; i++) {
        let clas = this.classes[i];
        let header = 'entity "' + clas.title + '" {\n';
        code += header;
        for (let j = 0; j < clas.properties.length; j++) {
          let prop = clas.properties[j];
          let t = "*" + prop.title + ":" + prop.type + "\n";
          code += t;
        }

        let footer = "}\n";
        code += footer;
      }
      this.code = code;
    },
  },
  watch: {
    code() {
      const encoded = plantumlEncoder.encode(this.code);
      console.log(encoded);
      this.plantImg = "http://www.plantuml.com/plantuml/png/" + encoded;
    },
  },
};
</script>

<style>
#plantUml {
  image-rendering: -moz-crisp-edges;
  image-rendering: -webkit-crisp-edges;
  image-rendering: pixelated;
  image-rendering: crisp-edges;
  width: 50%;
}
</style>