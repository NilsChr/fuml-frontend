import Vue from 'vue'
import VueQuillEditor from 'vue-quill-editor'
 
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import Quill from "quill";
import ImageCompress from "quill-image-compress";

Quill.register("modules/imageCompress", ImageCompress);


Vue.use(VueQuillEditor, /* { default global options } */)