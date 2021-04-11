<template>
  <v-flex xs1 class="pa-5 pt-0">
    <v-layout justify-start wrap>
      <v-flex xs12>
        <v-icon>question_answer</v-icon>
        <strong class="ml-5 pl-2">Comments</strong>
      </v-flex>

      <!-- NEW COMMENT -->
      <v-flex xs12>
        <v-layout justify-start class="pa-2">
          <v-flex xs1>
            <v-avatar size="40" style="border: 2px solid white">
              <v-img :src="currentUser.avatarUrl" />
            </v-avatar>
          </v-flex>
          <v-flex xs11>
            <v-card
              class="pl-2 pr-2 ml-2"
              v-bind:class="{ 'pb-2': newComment != '' }"
              key="1"
            >
              <v-text-field
                outlined
                dense
                hide-details
                placeholder="Write a comment..."
                v-model="newComment"
              ></v-text-field>
              <v-flex xs12 v-if="newComment != ''">
                <v-btn
                  depressed
                  color="success"
                  :disbabled="newComment == ''"
                  small
                  @click="save"
                  >Save</v-btn
                >
              </v-flex>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>

      <!-- COMMENTS -->
      <v-flex xs12>
        <v-layout
          v-for="(comment, i) in comments"
          :key="comment._id"
          class="pa-1 pb-2"
          v-bind:class="{ commentBorder: i > 0 }"
        >
          <v-flex xs1>
            <v-avatar size="30" style="border: 2px solid white">
              <v-img :src="comment.user.avatarUrl" />
            </v-avatar>
          </v-flex>
          <v-flex xs11>
            <v-layout wrap>
              <v-flex xs12>
                <label class="comment-name">{{ comment.user.nickName }}</label>
                <label class="comment-date">{{ comment.created | dateFormatLong }}</label>
              </v-flex>
              <v-flex xs11>
                <label class="comment-text">{{ comment.text }}</label>
              </v-flex>
              <v-flex xs1 v-if="comment.user._id == currentUser._id">
                <v-btn text x-small fab style="margin-top:-10px;" @click="deleteComment(comment)">
                  <v-icon size="20">mdi-delete</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-flex>
</template>

<script>
import storeActions from "../../../store/storeActions";
export default {
  data() {
    return {
      newComment: "",
    };
  },
  methods: {
    setData() {
      this.$store.dispatch(storeActions.kanbanCards.LOAD_COMMENTS);
    },
    async save() {
      this.$store.dispatch(
        storeActions.kanbanCards.CREATE_COMMENT,
        this.newComment
      );
      this.newComment = "";
    },
    async deleteComment(comment) {
        this.$store.dispatch(storeActions.kanbanCards.DELETE_COMMENT, comment);
    }
  },
  computed: {
    comments() {
      return this.$store.state.kanbanCards.selectedCardComments;
    },
    selectedCard() {
      return this.$store.state.kanbanCards.selectedCard;
    },
    currentUser() {
      return this.$store.state.user.currentUser;
    },
  },
  created() {
    this.setData();
  },
};
</script>

<style scoped>
.v-text-field--outlined >>> fieldset {
  border-color: transparent;
}
.border.v-text-field--outlined >>> fieldset {
  border-color: rgba(0, 0, 0, 0.475) !important;
  border-width: thin;
  background-color: white;
}
.commentBorder {
  border-top: 1px solid rgb(235, 235, 235);
}
.comment-name {
  font-weight: bold;
}
.comment-date {
  padding-left: 20px;

  font-size: 0.6rem;
}
.comment-text {
  font-size: 0.8rem;
  line-height: 15px;
  display: block;
}
</style>