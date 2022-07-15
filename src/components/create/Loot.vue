<template>
    <!-- 약탈 컴포넌트 -->
    <div v-for="(loot, index) in childList" :key="index" class="verticalFlex lootWrap">
        <div class="horizontalFlex">
            <div class="lootForm">
                <div class="box"></div>
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
        <div class="verticalFlex subWrap">
            <!-- 타겟 하위 그룹 -->
            <Group
                :groupList="loot"
                :childList="loot.group"
                :isLoot="true">
            </Group>
            <!-- 타겟 하위 타겟 -->
            <Loot
                :lootList="loot" 
                :childList="loot.loot">
            </Loot>
        </div>
    </div>
</template>

<script>

import { useUnionStore } from "@/stores/union";
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
        const unionStorage = useUnionStore();

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

    .subWrap .lootWrap{
        margin-left:20px;
        
        > .horizontalFlex, .groupWrap 
        {
            border-left: 2px solid #000;
        }
    } 

    .lootWrap .lootWrap:not(:last-child)
    {
        border-left:2px solid #000;

         > .horizontalFlex 
        {
            border-left: none;
        }
    }

    

    
</style>