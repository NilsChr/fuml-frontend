<template>
  <v-card id="card-uml-image" class="pa-2" style="max-height: 100%">
    <v-layout fill-height column>
      <v-flex xs12 style="overflow: hidden">
        <div id="uml-img2" :style="imgTransform2"></div>
      </v-flex>
      <v-card dark id="card-uml-image-zoom" @click.stop="">
        <v-layout justify-space-around class="pt-1">
          <btn-uml-download />
          <v-btn fab small text @click="resetPosition">
            <v-icon dark>control_camera</v-icon></v-btn
          >

          <v-btn fab small text @click="zoomOut">
            <v-icon dark>remove</v-icon></v-btn
          >
          <v-slider
            class="pt-1"
            v-model="zoomLevel"
            min="25"
            max="200"
          ></v-slider>
          <v-btn fab small text @click="zoomIn">
            <v-icon dark>add</v-icon>
          </v-btn>
        </v-layout>
      </v-card>
    </v-layout>
  </v-card>
</template>

<script>
import BtnUmlDownload from "./BtnUmlDownload.vue";
export default {
  components: { BtnUmlDownload },
  data() {
    return {
      canvasCtx: null,
      zoomLevel: 100,
      draggin: false,
      clickedInsideZoom: false,
      panX: 0,
      panY: 0,
    };
  },
  methods: {
    zoomOut() {
      this.zoomLevel--;
    },
    zoomIn() {
      this.zoomLevel++;
    },
    resetPosition() {
      this.panX = 0;
      this.panY = 0;
    },
  },
  computed: {
    img() {
      return this.$store.state.uml.url;
    },
    imgTransform() {
      return `transform: translate(${this.panX}px, ${this.panY}px); width: ${this.zoomLevel}% !important;`;
    },
    imgTransform2() {
      let d = {
        color: "red",
        background: "url(" + this.img + ")",
        backgroundSize: `${this.zoomLevel}% auto`,
        backgroundPosition: `left ${this.panX}px top ${this.panY}px`,
      };
      return d;
    },
  },
  mounted() {
    const el = document.getElementById("card-uml-image");
    /* MOUSE EVENTS */
    el.addEventListener(
      "mousedown",
      function (e) {
        if (this.clickedInsideZoom) return;
        if (e.button == 0) {
          this.dragging = true;
        }
      }.bind(this)
    );

    el.addEventListener(
      "mouseup",
      function (e) {
        if (this.clickedInsideZoom) return;

        if (e.button == 0) {
          this.dragging = false;
        }
      }.bind(this)
    );

    el.addEventListener(
      "mouseleave",
      function (e) {
        if (this.clickedInsideZoom) return;

        this.dragging = false;
      }.bind(this)
    );

    el.addEventListener(
      "mousemove",
      function (e) {
        if (this.clickedInsideZoom) return;

        if (this.dragging) {
          let dx = e.movementX;
          let dy = e.movementY;
          this.panX += dx;
          this.panY += dy;
        }
      }.bind(this)
    );

    el.addEventListener(
      "wheel",
      function (e) {
        if (this.clickedInsideZoom) return;
        this.zoomLevel -= e.wheelDelta * -0.05;
      }.bind(this),
      { passive: true }
    );

    const el2 = document.getElementById("card-uml-image-zoom");
    el2.addEventListener(
      "mousedown",
      function (event) {
        this.clickedInsideZoom = true;
      }.bind(this)
    );
    el2.addEventListener(
      "mouseup",
      function (event) {
        this.clickedInsideZoom = false;
      }.bind(this)
    );
    el2.addEventListener(
      "mouseleave",
      function (event) {
        this.clickedInsideZoom = false;
      }.bind(this)
    );
  },
};
</script>

<style scoped>
#card-uml-image {
  height: 100%;
}

#uml-img {
  object-fit: cover;
  position: relative;
}

#uml-img2 {
  background-repeat: no-repeat !important;
  width: 100%;
  height: 100%;
}

#card-uml-image-zoom {
  position: absolute;
  width: 200px;
  height: 50px;
  bottom: 15px;
  right: 15px;
  opacity: 0.7;
}
</style>