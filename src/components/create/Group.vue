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
                    <button @click="unionStorage.togglePop('subGroup', group, index, 'insert')">서브 그룹 추가</button>
                    <button v-if="!isLoot" @click="unionStorage.togglePop('toDo',group, index, 'insert')">일정 추가</button>
                    <button class="upd" @click="unionStorage.togglePop('group', childList, index, 'update')">수정</button>
                    <button class="del" @click="unionStorage.togglePop('group', childList, index, 'delete')">삭제</button>
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
import { useListStore } from "@/stores/union";
import ToDo from './ToDo.vue';
export default 
{
    name: "Group"
    , components : 
    {
        ToDo
    }
    , props: ["groupList", "childList", "isLoot"]
    , setup() 
    {
        const unionStorage = useListStore();

        return {
            unionStorage
        }
    }
}
</script>

<style lang="scss" scoped>
    .horizontalFlex {
        justify-content: space-between;
    }    
</style>