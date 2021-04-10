<template>
  <v-container fluid class="pa-0 ma-0" fill-height>
    <v-layout class="pa-0 ma-0" fill-height>
      <v-flex xs12>
        <v-card class="fill-height pa-2" style="overflow-y: scroll">
          <v-layout wrap>
            <v-flex xs12>
              <v-card-title>
                {{ selectedDocument.title }}
              </v-card-title>
            </v-flex>
            <v-flex xs12>
              <quill-editor
                v-model="selectedDocument.text"
                ref="myQuillEditor"
                :options="editorOption"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @ready="onEditorReady($event)"
                @change="onEditorChange($event)"
              >
              </quill-editor>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import '../../../plugins/highlight';

import { quillEditor } from "vue-quill-editor";
import DBConnector from "../../../services/database/dbConnector";

export default {
  components: {
    quillEditor,
  },
  data() {
    return {
      //content: "<h2>I am Example</h2>",
      editorOption: {
        bounds: "#quill-editor",
        modules: {
          syntax: true,
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            [{ list: "ordered" }, { list: "bullet" }, { align: [] }],
            [{ color: [] }, { background: [] }],
            ["clean"],
            ["link", "image", "video"],
            [{ direction: "rtl" }],
          ],
          keyboard: {
            bindings: {
              "indent code-block": null,
              "outdent code-block": null,
            },
          },
          imageCompress: {
            quality: 0.7, // default
            maxWidth: 1000, // default
            maxHeight: 1000, // default
            imageType: "image/jpeg/png", // default
            debug: false, // default
          },
        },
        theme: "snow",
      },
      timeOut: null,
    };
  },
  methods: {
    onEditorBlur(quill) {
      // console.log("editor blur!", quill);
    },
    onEditorFocus(quill) {
      // console.log("editor focus!", quill);
    },
    onEditorReady(quill) {
      // console.log("editor ready!", quill);
    },
    onEditorChange({ quill, html, text }) {
      //console.log("editor change!", quill, html, text);
      //this.content = html;
      this.selectedDocument.text = html;

      clearTimeout(this.timeOut);
      this.timeOut = setTimeout(() => {
        DBConnector.documents.update(this.selectedDocument);
      }, 200);
    },
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
    selectedDocument() {
      //console.log('doc change')
      //this.editor.setContent(this.selectedDocument.text);
      // this.content = this.selectedDocument.text;
      return this.$store.state.documents.selectedDocument;
    },
  },
  mounted() {
    // console.log("this is current quill instance object", this.editor);
    // This prevents code-blocks to indent more than one line
    //this.content = this.selectedDocument.text;
  },
};
</script>

<style>
</style>