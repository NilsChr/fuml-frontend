<template>
  <v-btn fab small text @click="downloadImage" :loading="loading">
    <v-icon dark>mdi-cloud-download</v-icon>
  </v-btn>
</template>

<script>
export default {
  data() {
    return {
      width: -1,
      height: -1,
      loading: false
    };
  },
  methods: {
    wait(ms) {
        return new Promise((resolve) => setTimeout(() => resolve(),ms));
    },
    download(url, filename) {
      return new Promise((resolve) => {
        fetch(url).then(function (t) {
          return resolve(t.blob());
        });
      });
    },
    async downloadImage() {
        this.loading = true;
        let that = this;
      console.log("download");
      let blob = await this.download(this.img, "test.svg");
      var reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = async function () {
        var base64data = reader.result;
        console.log(base64data);
        let svgNode = document.createElement("svg");
        let svgImg = document.createElement("img");
        svgImg.src = base64data;
        svgNode.appendChild(svgImg);
        await that.wait(100);
        // DRAW TO CANVAS
        const canvas = document.createElement("canvas");
        const scale = 2;

        canvas.width = svgImg.width * scale;
        canvas.height = svgImg.height * scale;;
        console.log(canvas);

        const ctx = canvas.getContext("2d");
        ctx.drawImage(svgImg, 0, 0, canvas.width, canvas.height);

        const png = canvas.toDataURL(); // default png
        that.triggerDownload(png, that.document.title + ".png");

        // Code to show svg
        //console.log(svgNode);
        //svgNode.style ="position:absolute; top: 200px; left: 200px; border: 2px solid black;";
        //document.body.appendChild(canvas); // adds the canvas to the body element
        //canvas.remove();
        //svgNode.remove();
        //svgImg.remove();
      };
      
    },
    triggerDownload(imgURI, fileName) {
      var a = document.createElement("a");
      a.setAttribute("download", fileName);
      a.setAttribute("href", imgURI);
      a.setAttribute("target", "_blank");
      a.click();
              this.loading = false;

      //a.remove();
    },
  },
  computed: {
    img() {
      return this.$store.state.uml.url;
    },
    document() {
      return this.$store.state.documents.selectedDocument;
    },
  },
};
</script>

<style>
</style>