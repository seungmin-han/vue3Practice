<template>
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
                    <button @click="$emit('togglePop',{type:'loot', target:loot, index:index, mode:0})">타겟 추가</button>
                    <button @click="$emit('togglePop',{type:'subGroup', target:loot, index:index, mode:0})">그룹 추가</button>
                    <button class="upd" @click="$emit('togglePop',{type:'loot', target:childList, index:index, mode:1})">수정</button>
                    <button class="del" @click="$emit('togglePop',{type:'loot', target:childList, index:index, mode:2})">삭제</button>
                </div>
            </div>
            <div class="verticalFlex">
                <Group
                    :groupList="loot"
                    :childList="loot.group"
                    :isLoot="true"
                    @togglePop="$emit('togglePop',$event)">
                </Group>
                <Loot
                    class="lootWrap"
                    :lootList="loot" 
                    :childList="loot.loot"
                    @togglePop="$emit('togglePop',$event)">
                </Loot>

            </div>
        </div>
    </div>
</template>

<script>

import Group from './Group.vue';
export default {
    name: "Loot",
    components : {
        Group
    },
    props: ["lootList","childList"],
    emits: ["togglePop"],
    setup(props, { emit }) {
        
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