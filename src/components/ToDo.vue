<template>
    <div class="verticalFlex">
        <div v-for="(toDo, index) in target" :key="index" class="horizontalFlex">
            <div>
                <label for="">일정 날짜</label>
                <input type="date" :value="toDo.date">
                <label for="">일정 제목</label>
                <input type="text" :value="toDo.title">
            </div>
            <div>
                <button class="upd" @click="$emit('togglePop',{type:'toDo', target:target, index:index, mode:1})">수정</button>
                <button class="del" @click="$emit('togglePop',{type:'toDo', target:target, index:index, mode:2})">삭제</button>
            </div>
        </div>
    </div>
    
</template>

<script>
import { reactive } from '@vue/reactivity'
export default {
    name: "ToDo",
    props: ["target"],
    emits: ["togglePop"],
    setup() {
        return {

        }
    }
}
</script>

<style lang="scss" scoped>
    .horizontalFlex {
        justify-content: space-between;
    }
</style>