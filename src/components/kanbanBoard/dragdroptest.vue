<template>
  <v-layout fill-height>
    <v-flex
      xs3
      v-for="zone in zones"
      :key="zone.id"
      :id="`drop-${zone.id}`"
      @drop="onDrop($event, zone)"
      class="dropZone"
      @dragover="allowDrop($event)"
      @dragenter="targetId = zone.id"
    >
      <!--
      <v-list>
          <v-slide-y-transition group>
            <v-list-item
            v-for="item in filteredItems(zone)" :key="item.id"
              draggable=""
              @dragstart="dragStart($event, item)"
              v-bind:class="{ ghost: item == dragItem }"
            >
              {{ item.id }} - {{ item.status }}
            </v-list-item>
          </v-slide-y-transition>

      </v-list>
      -->
      <v-slide-y-transition group>
        <v-card
          v-for="item in filteredItems(zone)"
          :key="item.id"
          draggable=""
          @dragstart="dragStart($event, item)"
          v-bind:class="{ ghost: item == dragItem }"
          class="pa-1"
        >
          {{ item.id }} - {{ item.status }}
        </v-card>
      </v-slide-y-transition>
    </v-flex>
  </v-layout>
</template>

<script>
import draggable from "vuedraggable";

export default {
  components: {
    draggable,
  },
  data() {
    return {
      zones: [{ id: 1 }, { id: 2 }, { id: 3 }],
      dragItem: null,
      targetId: null,
      items: [
        { id: 1, status: 1 },
        { id: 2, status: 1 },
        { id: 3, status: 1 },
        { id: 4, status: 1 },
      ],
    };
  },
  methods: {
    allowDrop(ev) {
      ev.preventDefault();
      ev.dataTransfer.dropEffect = "move";

      //console.log(ev.target.id)

      this.dragItem.status = this.targetId;
    },
    dragStart(ev, item) {
      ev.dataTransfer.setData("text", ev.target.id);
      ev.dataTransfer.effectAllowed = "move";
      this.dragItem = item;
    },
    onDrop(ev, zone) {
      var data = ev.dataTransfer.getData("text");
      this.dragItem.status = zone.id;
      this.dragItem = null;

      console.log("dropped");
    },
    filteredItems(zone) {
      return this.items.filter((i) => i.status == zone.id);
    },
  },
};
</script>

<style>
.dropZone {
  max-width: 100px;
  max-height: 100px;
  min-width: 100px;
  min-height: 100px;
  border: 1px solid black;
  background-color: rgb(53, 165, 70);
}

#dragger {
  min-width: 30px;
  min-height: 30px;
  max-width: 30px;
  max-height: 30px;
  border: 1px solid black;
  background-color: red;
}

.ghost {
  opacity: 1;
  background-color: rgb(240, 240, 240);
}
</style>