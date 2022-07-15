<template>
    <teleport to="#teleportArea">
    <div v-show="unionStorage.modals.isOpen" class="modal">
        <!-- 그룹 모달 -->

        <div v-show="unionStorage.modals.type=='group' || unionStorage.modals.type=='subGroup'" class="modal_content">
            <!-- 삭제 클릭 시 -->
            <div v-if="unionStorage.modals.mode=='delete'">
                <h2>정말 삭제하시겠습니까?</h2>
                <button class="del" @click="unionStorage.deleteGroup">삭제</button>
                <button class="gray" @click="unionStorage.togglePop('group', unionStorage.modals.target)">닫기</button>
            </div>
            <!-- 생성,수정 클릭 시 -->
            <div v-else>
                <input
                    type="text"
                    v-model="unionStorage.group.name"
                    :placeholder="unionStorage.modals.text"
                />
                <button v-if="unionStorage.modals.mode=='insert'" @click="unionStorage.insertGroup">추가</button>            
                <button class="upd" v-else @click="unionStorage.updateGroup">수정</button>
                <button class="gray" @click="unionStorage.togglePop('group', unionStorage.modals.target)">닫기</button>
            </div>
        </div>        

        <!-- 일정 모달 -->
        <div v-show="unionStorage.modals.type=='toDo'" class="modal_content">
            <!-- 삭제 클릭 시 -->
            <div v-if="unionStorage.modals.mode=='delete'">
                <h2>정말 삭제하시겠습니까?</h2>
                <button class="del" @click="unionStorage.deleteToDo">삭제</button>
                <button class="gray" @click="unionStorage.togglePop('toDo')">닫기</button>
            </div>
            <!-- 생성,수정 클릭 시 -->
            <div v-else>
                <input 
                type="date" 
                placeholder="날짜입력" 
                v-model="unionStorage.toDo.date"/>
                <input
                    type="text"
                    placeholder="일정 제목"
                    v-model="unionStorage.toDo.title"/>
                <button v-if="unionStorage.modals.mode=='insert'" @click="unionStorage.insertToDo">추가</button>
                <button class="upd" v-else @click="unionStorage.updateToDo">수정</button>

                <button class="gray" @click="unionStorage.togglePop('toDo')">닫기</button>
            </div>
        </div>

        <!-- 약탈 모달 -->
        <div v-show="unionStorage.modals.type=='loot'" class="modal_content">
            <!-- 삭제 클릭 시 -->
            <div v-if="unionStorage.modals.mode=='delete'">
                <h2>정말 삭제하시겠습니까?</h2>
                <button class="del" @click="unionStorage.deleteLoot">삭제</button>
            <button class="gray" @click="unionStorage.togglePop('loot')">닫기</button>
            </div>
            <!-- 생성,수정 클릭 시 -->
            <div v-else>
                <select placeholder="학년" v-model="unionStorage.loot.grade">
                    <option value="-1" selected>학년 선택</option>
                    <option v-for="(grade, index) in unionStorage.lootInfo.grade" :key="index" :value="grade">
                        {{grade}}
                    </option>
                </select>
                <select placeholder="반" v-model="unionStorage.loot.classroom">
                    <option value="-1" selected>반 선택</option>
                    <option v-for="(classroom, index) in unionStorage.lootInfo.classroom" :key="index" :value="classroom">
                        {{classroom}}
                    </option>
                </select>
                <button v-if="unionStorage.modals.mode=='insert'" @click="unionStorage.insertLoot">추가</button>
                <button class="upd" v-else @click="unionStorage.updateLoot">수정</button>

                <button class="gray" @click="unionStorage.togglePop('loot')">닫기</button>
            </div>
        </div>
    </div>
    </teleport>
</template>
<script>
import { useUnionStore } from "@/stores/union"
export default 
{
    setup() 
    {
        const unionStorage = useUnionStore();

        return {
            unionStorage
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