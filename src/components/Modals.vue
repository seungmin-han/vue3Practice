<template>
  <div v-show="modals.isOpen" class="modal">
        <!-- 그룹 모달 -->
        <div v-show="modals.group" class="modal_content">
            <div v-if="modals.mode==2">
                <h2>정말 삭제하시겠습니까?</h2>
                <button class="del" @click="$emit('deleteGroup')">삭제</button>
                <button class="gray" @click="$emit('togglePop',{type:'group', target:modals.target})">닫기</button>
            </div>
            <div v-else>
                <input
                    type="text"
                    v-model="group.name"
                    :placeholder="modals.text"
                />
                <button v-if="modals.mode==0" @click="$emit('createGroup')">추가</button>            
                <button class="upd" v-else @click="$emit('updateGroup')">수정</button>
                <button class="gray" @click="$emit('togglePop',{type:'group', target:modals.target})">닫기</button>
            </div>
            
                      
        </div>        

        <!-- 일정 모달 -->
        <div v-show="modals.toDo" class="modal_content">
            <div v-if="modals.mode==2">
                <h2>정말 삭제하시겠습니까?</h2>
                <button class="del" @click="$emit('deleteToDo')">삭제</button>
            <button class="gray" @click="$emit('togglePop',{type:'toDo'})">닫기</button>
            </div>
            <div v-else>
                <input 
                type="date" 
                placeholder="날짜입력" 
                v-model="toDo.date"/>
                <input
                    type="text"
                    placeholder="일정 제목"
                    v-model="toDo.title"/>
                <button v-if="modals.mode==0" @click="$emit('createToDo')">추가</button>
                <button class="upd" v-else @click="$emit('updateToDo')">수정</button>

                <button class="gray" @click="$emit('togglePop',{type:'toDo'})">닫기</button>
            </div>
        </div>

        <!-- 약탈 모달 -->
        <div v-show="modals.loot" class="modal_content">
            <div v-if="modals.mode==2">
                <h2>정말 삭제하시겠습니까?</h2>
                <button class="del" @click="$emit('deleteLoot')">삭제</button>
            <button class="gray" @click="$emit('togglePop',{type:'loot'})">닫기</button>
            </div>
            <div v-else>
                <select placeholder="학년" v-model="loot.grade">
                    <option value="">학년 선택</option>
                    <option v-for="(grade, index) in lootInfo.grade" :key="index" :value="grade">
                        {{grade}}
                    </option>
                </select>
                <select placeholder="반" v-model="loot.classroom">
                    <option value="">반 선택</option>
                    <option v-for="(classroom, index) in lootInfo.classroom" :key="index" :value="classroom">
                        {{classroom}}
                    </option>
                </select>
                <button v-if="modals.mode==0" @click="$emit('createLoot')">추가</button>
                <button class="upd" v-else @click="$emit('updateLoot')">수정</button>

                <button class="gray" @click="$emit('togglePop',{type:'loot'})">닫기</button>
            </div>
        </div>
    </div>
</template>
<script>
import { ref } from '@vue/reactivity'
export default {
    name: "Modal"
    , props: ["modals", "toDo", "group", "loot", "lootInfo"]
    , emits: [
        "togglePop"
        ,"createGroup"
        ,"updateGroup"
        , "deleteGroup"
        , "createToDo"
        , "deleteToDo"
        , "createLoot"
        , "updateLoot"
        , "deleteLoot"
    ]
}
</script>

<style lang="scss" scoped>
    
    .modal {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.5);
        transition: opacity 0.3s ease;

        .modal_content {
            background: white;
            max-width: 50%;
            padding: 1.5rem;
            border-radius: 7px;
        }
        
    }
</style>