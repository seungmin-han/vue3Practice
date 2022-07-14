<template>
    <!-- 약탈 컴포넌트 -->
    <div>
        <div v-for="(loot, index) in childList" :key="index" class="verticalFlex lootWrap">
            <div class="horizontalFlex">
                <div class="lootForm">
                    <input type="text" :value="loot.grade" maxlength="1" disabled>
                    <label for="">학년</label>
                    <input type="text" :value="loot.classroom" maxlength="1" disabled>
                    <label for="">반</label>
                </div>
                <div class="buttonWrap">
                    <button @click="unionStorage.togglePop('loot', loot, index, 'insert')">타겟 추가</button>
                    <button @click="unionStorage.togglePop('subGroup', loot, index, 'insert')">그룹 추가</button>
                    <button class="upd" @click="unionStorage.togglePop('loot', childList, index, 'update')">수정</button>
                    <button class="del" @click="unionStorage.togglePop('loot', childList, index, 'delete')">삭제</button>
                </div>
            </div>
            <div class="verticalFlex">
                <!-- 타겟 하위 그룹 -->
                <Group
                    :groupList="loot"
                    :childList="loot.group"
                    :isLoot="true">
                </Group>
                <!-- 타겟 하위 타겟 -->
                <Loot
                    class="lootWrap"
                    :lootList="loot" 
                    :childList="loot.loot">
                </Loot>

            </div>
        </div>
    </div>
</template>

<script>

import { useListStore } from "@/stores/union";
import Group from './Group.vue';
export default 
{
    name: "Loot"
    , components : 
    {
        Group
    }
    , props: ["lootList", "childList"]
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
    .horizontalFlex 
    {
        justify-content: space-between;
    }    
    
    .lootForm > input
    {
        width: 50px;
        text-align: right;
    }

    
</style>