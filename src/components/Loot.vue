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
                    <button @click="togglePop('loot', loot, index, 0)">타겟 추가</button>
                    <button @click="togglePop('subGroup', loot, index, 0)">그룹 추가</button>
                    <button class="upd" @click="togglePop('loot', childList, index, 1)">수정</button>
                    <button class="del" @click="togglePop('loot', childList, index, 2)">삭제</button>
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

import { useListStore } from "@/stores/list";
import Group from './Group.vue';
export default {
    name: "Loot",
    components : {
        Group
    },
    props: ["lootList","childList"],
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