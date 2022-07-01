<template>
    <div>
        <div v-for="(group, index) in childList" :key="index" class="verticalFlex groupWrap">
            <div class="horizontalFlex">
                <div>
                    <label for="">그룹 이름</label>
                    <input type="text" :value="group.name" disabled>
                </div>
                <div class="buttonWrap">
                    <button @click="$emit('togglePop',{type:'subGroup', target:group, index:index, mode:0})">서브 그룹 추가</button>
                    <button v-if="!isLoot" @click="$emit('togglePop',{type:'toDo', target:group, index:index, mode:0})">일정 추가</button>
                    <button class="upd" @click="$emit('togglePop',{type:'group', target:childList, index:index, mode:1})">수정</button>
                    <button class="del" @click="$emit('togglePop',{type:'group', target:childList, index:index, mode:2})">삭제</button>
                </div>
            </div>
        <div class="verticalFlex">
            <ToDo
                :target="group.toDo"
                @togglePop="$emit('togglePop',$event)">
            </ToDo>
            <Group
                class="groupWrap"
                :groupList="group" 
                :childList="group.group"
                :isLoot="isLoot"
                @togglePop="$emit('togglePop',$event)">
            </Group>
            
        </div>
        </div>
    </div>
</template>

<script>

import ToDo from './ToDo.vue';
export default {
    name: "Group",
    components : {
        ToDo
    },

    props: ["groupList","childList","isLoot"],
    emits: ["togglePop"],
    setup(props, { emit }) {
        const showTarget = (target) => {
            console.log("showTarget:",target);
        }

        return {
            showTarget,
        }
    },
    mounted() {

    }
}
</script>

<style lang="scss" scoped>
    .horizontalFlex {
        justify-content: space-between;
    }    
</style>