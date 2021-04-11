<template>
  <v-container fluid class="pa-0 ma-0" fill-height>
    <v-layout class="pa-0 ma-0" fill-height>
      <v-flex xs12>
        <v-card id="text-card" class="fill-height pa-2">
          <v-layout fill-height style="overflow: hidden" column>
            <v-flex xs1 style="">
              <v-layout justify-start wrap>
                <v-flex xs1 class="pa-5">
                  <user-avatar :userId="selectedDocument.ownerId" :size="35" />
                </v-flex>
                <v-flex xs4>
                  <v-card-title v-if="editDocument">
                    <v-text-field
                      v-model="selectedDocument.title"
                      hide-details
                      outlined
                      dense
                      @change="_handleTitleChange"
                    >
                    </v-text-field>
                  </v-card-title>
                  <v-card-title v-if="!editDocument">
                    {{ selectedDocument.title }}
                  </v-card-title>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex xs2>
                  <v-subheader>
                    File size: {{ (currentSize - 186) | fileSize }}
                  </v-subheader>
                </v-flex>
                <v-flex xs1>
                  <v-layout justify-end>
                    <v-btn
                      depressed
                      class="mt-3"
                      color="grey lighten-2"
                      small
                      @click="editDocument = true"
                      v-if="!editDocument"
                    >
                      <v-icon size="15">edit</v-icon>
                    </v-btn>
                    <v-btn
                      depressed
                      class="mt-3"
                      color="warning"
                      small
                      @click="editDocument = false"
                      v-if="editDocument"
                    >
                      <v-icon>edit</v-icon>
                    </v-btn>
                  </v-layout>
                </v-flex>
                <v-flex xs12>
                  <v-progress-linear
                    :color="getProgressColor()"
                    :value="documentSizeNormalized"
                    class="ma-1"
                  ></v-progress-linear>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs11 style="position: relative" class="bordered">
              <div
                id="editorcontainer"
                style="
                  height: 10em;
                  min-height: 100%;
                  overflow-y: auto;
                  margin-top: 3em;
                "
              >
                <quill-editor
                  style="min-height: 100%; height: auto"
                  v-model="selectedDocument.text"
                  ref="myQuillEditor"
                  :options="editorOption"
                  @blur="onEditorBlur($event)"
                  @focus="onEditorFocus($event)"
                  @ready="onEditorReady($event)"
                  @change="onEditorChange($event)"
                >
                </quill-editor>
              </div>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>

    <v-snackbar v-model="messageFileToLarge" color="error" multi-line top>
      File to large, not saved.
      <v-btn text @click="messageFileToLarge = false" depressed> Close </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import "../../../plugins/highlight";

import { quillEditor } from "vue-quill-editor";
import DBConnector from "../../../services/database/dbConnector";
import memoryUtil from "../../../util/memory.util";
import UserAvatar from "../../common/userAvatar.vue";

export default {
  components: {
    quillEditor,
    UserAvatar,
  },
  data() {
    return {
      currentSize: 0,
      editDocument: false,
      messageFileToLarge: false,
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
    onEditorBlur(quill) {},
    onEditorFocus(quill) {},
    onEditorReady(quill) {},
    onEditorChange({ quill, html, text }) {
      this.selectedDocument.text = html;
      this.currentSize = memoryUtil.memorySizeOfInBytes(this.selectedDocument);

      clearTimeout(this.timeOut);
      this.timeOut = setTimeout(() => {
        if (this.documentSizeNormalized >= 100) {
          this.messageFileToLarge = true;
          return;
        }
        this.messageFileToLarge = false;
        DBConnector.documents.update(this.selectedDocument);
      }, 200);
    },
    _handleTitleChange() {
      DBConnector.documents.update(this.selectedDocument);
    },
    getProgressColor() {
      if (this.documentSizeNormalized < 75) return "secondary";
      if (
        this.documentSizeNormalized >= 75 &&
        this.documentSizeNormalized < 100
      )
        return "warning";
      return "error";
    },
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
    selectedDocument() {
      return this.$store.state.documents.selectedDocument;
    },
    documentSizeNormalized() {
      return (this.currentSize / 2500000) * 100;
    },
  },
  mounted() {
    let qel = document.getElementsByClassName("ql-toolbar")[0];
    qel.style.display = "none";
    this.editor.enable(false);
    this.currentSize = memoryUtil.memorySizeOfInBytes(this.selectedDocument);
  },
  watch: {
    selectedDocument() {
      this.currentSize = memoryUtil.memorySizeOfInBytes(this.selectedDocument);
    },
    editDocument() {
      let qel = document.getElementsByClassName("ql-toolbar")[0];

      if (!this.editDocument) {
        qel.style.display = "none";
        this.editor.enable(false);
      } else {
        qel.style.display = "block";
        this.editor.enable(true);
      }
    },
  },
};
</script>

<style>
.ql-container.ql-snow {
  border: none !important;
}
.ql-toolbar.ql-snow {
  border-left: none !important;
  border-right: none !important;
  border-top: none !important;
  border-bottom: 1px solid rgb(92, 92, 92);
}
.ql-container.ql-snow {
  height: 100%;
  overflow: hidden;
}
.ql-editor {
  overflow: hidden;
}

.ql-container.ql-snow.ql-disabled {
  overflow: auto;
}
.ql-toolbar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}
</style>