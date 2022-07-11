<template>
    <div class="verticalFlex">
        <div v-for="(toDo, index) in target" :key="index" class="horizontalFlex">
            <div>
                <label for="">일정 날짜</label>
                <input type="date" :value="toDo.date" disabled>
                <label for="">일정 제목</label>
                <input type="text" :value="toDo.title" disabled>
            </div>
            <div>
                <button class="upd" @click="togglePop('toDo', target, index, 1)">수정</button>
                <button class="del" @click="togglePop('toDo', target, index, 2)">삭제</button>
            </div>
        </div>
    </div>
    
</template>

<script>
import { useListStore } from "@/stores/list"
import { reactive } from '@vue/reactivity'
export default {
    name: "ToDo",
    props: ["target"],
    setup() {

        const unions = useListStore();
        const togglePop = (type, target = [], index, mode=0) => {
            
            unions.togglePop(type, target, index, mode);
        }

        return {
            unions
            , togglePop
        }
    }
}
</script>

<style lang="scss" scoped>
    .horizontalFlex {
        justify-content: space-between;
    }
</style>