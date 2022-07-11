<template>
  <div v-show="unions.modals.isOpen" class="modal">
        <!-- 그룹 모달 -->

        <div v-show="unions.modals.group" class="modal_content">
            <!-- 삭제 클릭 시 -->
            <div v-if="unions.modals.mode==2">
                <h2>정말 삭제하시겠습니까?</h2>
                <button class="del" @click="deleteGroup">삭제</button>
                <button class="gray" @click="togglePop('group', unions.modals.target)">닫기</button>
            </div>
            <!-- 생성,수정 클릭 시 -->
            <div v-else>
                <input
                    type="text"
                    v-model="unions.group.name"
                    :placeholder="unions.modals.text"
                />
                <button v-if="unions.modals.mode==0" @click="createGroup">추가</button>            
                <button class="upd" v-else @click="updateGroup">수정</button>
                <button class="gray" @click="togglePop('group', unions.modals.target)">닫기</button>
            </div>
            
                      
        </div>        

        <!-- 일정 모달 -->
        <div v-show="unions.modals.toDo" class="modal_content">
            <!-- 삭제 클릭 시 -->
            <div v-if="unions.modals.mode==2">
                <h2>정말 삭제하시겠습니까?</h2>
                <button class="del" @click="deleteToDo">삭제</button>
                <button class="gray" @click="togglePop('toDo')">닫기</button>
            </div>
            <!-- 생성,수정 클릭 시 -->
            <div v-else>
                <input 
                type="date" 
                placeholder="날짜입력" 
                v-model="unions.toDo.date"/>
                <input
                    type="text"
                    placeholder="일정 제목"
                    v-model="unions.toDo.title"/>
                <button v-if="unions.modals.mode==0" @click="createToDo">추가</button>
                <button class="upd" v-else @click="updateToDo">수정</button>

                <button class="gray" @click="togglePop('toDo')">닫기</button>
            </div>
        </div>

        <!-- 약탈 모달 -->
        <div v-show="unions.modals.loot" class="modal_content">
            <!-- 삭제 클릭 시 -->
            <div v-if="unions.modals.mode==2">
                <h2>정말 삭제하시겠습니까?</h2>
                <button class="del" @click="deleteLoot">삭제</button>
            <button class="gray" @click="togglePop('loot')">닫기</button>
            </div>
            <!-- 생성,수정 클릭 시 -->
            <div v-else>
                <select placeholder="학년" v-model="unions.loot.grade">
                    <option value="">학년 선택</option>
                    <option v-for="(grade, index) in unions.lootInfo.grade" :key="index" :value="grade">
                        {{grade}}
                    </option>
                </select>
                <select placeholder="반" v-model="unions.loot.classroom">
                    <option value="">반 선택</option>
                    <option v-for="(classroom, index) in unions.lootInfo.classroom" :key="index" :value="classroom">
                        {{classroom}}
                    </option>
                </select>
                <button v-if="unions.modals.mode==0" @click="createLoot">추가</button>
                <button class="upd" v-else @click="updateLoot">수정</button>

                <button class="gray" @click="togglePop('loot')">닫기</button>
            </div>
        </div>
    </div>
</template>
<script>
import { ref } from '@vue/reactivity'
import { useListStore } from "../stores/list"
export default {
    setup() {
        const unions = useListStore();

        const togglePop = (type, target = [], index, mode=0) => {
            
            unions.togglePop(type, target, index, mode);
        }

        const createGroup = () => {
            unions.createGroup();
        }

        const updateGroup = () => {
            unions.updateGroup();
        }

        const deleteGroup = () => {
            unions.deleteGroup();
        }

        const createToDo = () => {
            unions.createToDo();
        }

        const updateToDo = () => {
            unions.updateToDo();
        }

        const deleteToDo = () => {
            unions.deleteToDo();
        }

        const createLoot = () => {
            unions.createLoot();
        }

        const updateLoot = () => {
            unions.updateLoot();
        }

        const deleteLoot = () => {
            unions.deleteLoot();
        }

        return {
            unions
            , togglePop
            , createGroup
            , updateGroup
            , deleteGroup
            , createToDo
            , updateToDo
            , deleteToDo
            , createLoot
            , updateLoot
            , deleteLoot
        }
    }
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