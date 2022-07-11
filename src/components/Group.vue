<template>
    <!-- 그룹 컴포넌트 -->
    <div>
        <div v-for="(group, index) in childList" :key="index" class="verticalFlex groupWrap">
            <div class="horizontalFlex">
                <div>
                    <label for="">그룹 이름</label>
                    <input type="text" :value="group.name" disabled>
                </div>
                <div class="buttonWrap">
                    <button @click="togglePop('subGroup', group, index, 0)">서브 그룹 추가</button>
                    <button v-if="!isLoot" @click="togglePop('toDo',group, index, 0)">일정 추가</button>
                    <button class="upd" @click="togglePop('group', childList, index, 1)">수정</button>
                    <button class="del" @click="togglePop('group', childList, index, 2)">삭제</button>
                </div>
            </div>
        <div class="verticalFlex">
            <!-- 그룹 하위 일정 -->
            <ToDo
                :target="group.toDo">
            </ToDo>
            <!-- 그룹 하위 그룹 -->
            <Group
                class="groupWrap"
                :groupList="group" 
                :childList="group.group"
                :isLoot="isLoot">
            </Group>
            
        </div>
        </div>
    </div>
</template>

<script>
import { useListStore } from "@/stores/list";
import ToDo from './ToDo.vue';
export default {
    name: "Group",
    components : {
        ToDo
    },

    props: ["groupList","childList","isLoot"],
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