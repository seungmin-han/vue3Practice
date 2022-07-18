import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useModalStore = defineStore("modalState", function() {
    const isOpen = ref(false);
    const mode =  ref("insert");
    const type =  ref("group" );
    const target =  reactive([]);
    const index =  ref(0);
    const text =  ref("");
});