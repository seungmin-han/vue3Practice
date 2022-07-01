<template>
  <div v-show="modals.isOpen" class="modal">

        <!-- 그룹 모달 -->
        <div v-show="modals.group" class="modal_content">
            <input
                type="text"
                v-model="group.name"
                :placeholder="modals.text"
            />
            <button v-if="modals.mode==0" @click="$emit('createGroup')">추가</button>            
            <button class="upd" v-else-if="modals.mode==1" @click="$emit('updateGroup')">수정</button>
            <button class="del" v-else @click="$emit('deleteGroup')">삭제</button>
            <button class="gray" @click="$emit('togglePop',{type:'group', target:modals.target})">닫기</button>            
        </div>        

        <!-- 일정 모달 -->
        <div v-show="modals.toDo" class="modal_content">
            <input 
                type="date" 
                placeholder="날짜입력" 
                v-model="toDo.date"
            >
            <input
                type="text"
                placeholder="일정 제목"
                v-model="toDo.title"
            />
            <button v-if="modals.mode==0" @click="$emit('createToDo')">추가</button>
            <button class="upd" v-else-if="modals.mode==1" @click="$emit('updateToDo')">수정</button>
            <button class="del" v-else @click="$emit('deleteToDo')">삭제</button>
            <button class="gray" @click="$emit('togglePop',{type:'toDo'})">닫기</button>
        </div>
    </div>
</template>
<script>
import { ref } from '@vue/reactivity'
export default {
    name: "Modal"
    , props: ["modals", "toDo", "group"]
    , emits: [
        "togglePop"
        ,"createGroup"
        ,"updateGroup"
        , "deleteGroup"
        , "createToDo"
        , "deleteToDo"
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