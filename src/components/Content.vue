<template>
    <div v-show="modals.isOpen" class="modal">
        <div v-show="modals.group" class="modal_content">
            <input
                type="text"
                :placeholder="(modals.grpIdx != -1) ? '서브 그룹 이름' : '그룹 이름'"
                v-model="group.name"
            />
            <button v-if="modals.mode==0" @click="addGroup">추가</button>            
            <button v-else @click="updateGroup">수정</button>
            <button @click="togglePop('group')">닫기</button>
        </div>        
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
            <button @click="addToDo">추가</button>
            <button @click="togglePop('toDo')">닫기</button>
        </div>
        
    </div>
    <section class="verticalFlex">
        <div class="contentWrap horizontalFlex">
            <button @click="togglePop('group')">그룹 추가</button>
            <button @click="togglePop('toDo')">일정 추가</button>
        </div>
    </section>
    
    <section class="verticalFlex">
        <h2>그룹</h2>
        <div v-for="(value, index) in groupList" :key="index">
            <div class="horizontalFlex flexStart">
                <label for="">그룹 이름</label>
                <input type="text" :value="value.name">
                <button @click="togglePop('group',index)">서브 그룹 추가</button>
                <button @click="togglePop('toDo',index)">일정 추가</button>
                <button @click="mod('group',index)">수정</button>
                <button @click="del('group',index)">삭제</button>
            </div>
            <div v-for="(value, idx) in groupList[index].toDo" :key="idx" class="horizontalFlex flexStart">
                <label for="">ㄴ일정 날짜</label>
                <input type="date" :value="value.date">
                <label for="">일정 제목</label>
                <input type="text" :value="value.title">
                <button @click="mod('toDo',index, idx)">수정</button>
                <button @click="del('toDo',index, idx)">삭제</button>
            </div>
            <div v-for="(value, idx) in groupList[index].group" :key="idx" class="verticalFlex">
                <div class="horizontalFlex flexStart">
                    <label for="">ㄴ서브 그룹 이름</label>
                    <input type="text" :value="value.name">
                    <button @click="togglePop('toDo',index, idx)">일정 추가</button>
                    <button @click="mod('group',index, idx)">수정</button>
                    <button @click="del('group',index, idx)">삭제</button>
                </div>
                <div v-for="(value, idxx) in groupList[index].group[idx].toDo" :key="idxx" class="horizontalFlex flexStart">
                    <label for="">&nbsp;&nbsp;&nbsp;ㄴ서브 일정 날짜</label>
                    <input type="date" :value="value.date">
                    <label for="">일정 제목</label>
                    <input type="text" :value="value.title">
                    <button @click="mod('toDo',index, idx, idxx)">수정</button>
                    <button @click="del('toDo',index, idx, idxx)">삭제</button>
                </div>
            </div>
        </div>
    </section>
    <section class="verticalFlex">
        <h2>일정</h2>
        <div v-for="(value, index) in toDoList" :key="index" class="horizontalFlex flexStart">
            <label for="">일정 날짜</label>
            <input type="date" :value="value.date">
            <label for="">일정 제목</label>
            <input type="text" :value="value.title">
            <button @click="mod('toDo', index)">수정</button>
            <button @click="del('toDo', index)">삭제</button>
        </div>
    </section>
</template>

<script>

import { reactive, ref } from "vue";
export default {
    setup() {
        const groupList = reactive(
            []
        );
        
        const group = reactive({
            name:""
            , toDo: []
            , group: []
        });

        const toDoList = reactive(
            []
        );
        
        const toDo = reactive({
            date:"",
            title:""
        });

        const modals = reactive({
            isOpen: false
            , mode: 0 // 0: create, 1: update
            , group:false
            , toDo:false
            , subGroup: false
            , grpIdx: -1
            , subGrpIdx: -1
            , toDoIdx: -1
        });

        const togglePop = (type, grpIdx=-1, subGrpIdx=-1, toDoIdx=-1) => {
            modals.isOpen = !modals.isOpen;

            if(type=="group") 
            {
                if(modals.mode == 0) 
                {
                    modals.group = !modals.group;
            
                    if(grpIdx != -1) 
                    {
                        modals.subGroup = !modals.subGroup;
                    }
                } 
                else 
                {
                    
                }
                
            }
            else if(type=="toDo")
            {
                modals.toDo = !modals.toDo;
            }

            modals.grpIdx = grpIdx;
            modals.subGrpIdx = subGrpIdx;
        }


        const addGroup = () => {
            if(modals.grpIdx==-1) 
            {
                groupList.push({...group});
            }
            else {
                if(groupList[modals.grpIdx].group.length == 0)
                    groupList[modals.grpIdx].group.push({...group});
            }
            
            group.name = "";
            group.toDo = [];
            group.group = [];

            togglePop("group",modals.grpIdx);
            console.log(groupList);
        }

        
        const addToDo = () => {
            if(modals.grpIdx==-1 && modals.subGrpIdx==-1) 
            {
                toDoList.push({...toDo});
            }
            else if(modals.grpIdx!=-1 && modals.subGrpIdx == -1) 
            {
                groupList[modals.grpIdx].toDo.push({...toDo});
            }
            else 
            {
                groupList[modals.grpIdx].group[modals.subGrpIdx].toDo.push({...toDo});
            }

            toDo.title = "";
            toDo.date = "";
            togglePop('toDo');
        }

        const del = (type, grpIdx=-1, subGrpIdx=-1, toDoIdx=-1) => {
            let isSub = false;
            if(type=="group") 
            {
                let group;
                if(subGrpIdx != -1) 
                {
                    group = groupList[grpIdx].group[subGrpIdx];
                    isSub = true;
                } else 
                {
                    group = groupList[grpIdx];
                }
                if(confirm(`'${group.name}' 그룹을 삭제하시겠습니까?`)) 
                {
                    if(isSub) 
                        groupList[grpIdx].group.splice(subGrpIdx,1);
                    else    
                        groupList.splice(grpIdx,1);
                    
                }
            }
            else if(type=="toDo")
            {
                let level;
                let toDo;
                if(toDoIdx != -1 && subGrpIdx != -1 && grpIdx != -1) 
                {
                    toDo = groupList[grpIdx].group[subGrpIdx].toDo[toDoIdx];
                    level = 2;
                } 
                else if(grpIdx != -1 && subGrpIdx != -1)
                {
                    toDo = groupList[grpIdx].toDo[subGrpIdx];
                    level = 1;
                }
                else if(grpIdx != -1)
                {
                    toDo = toDoList[grpIdx];
                    level = 0;
                }
                if(confirm(`일정 '${toDo.title}'을 삭제하시겠습니까?`)) 
                {
                    if(level==2) 
                        groupList[grpIdx].group[subGrpIdx].toDo.splice(toDoIdx,1);
                    else if(level==1)    
                        groupList[grpIdx].toDo.splice(subGrpIdx,1);
                    else
                        toDoList.splice(grpIdx,1);
                }
            }
        }

        const mod = (type, grpIdx=-1, subGrpIdx=-1, toDoIdx=-1) => {
            let text;
            if(type=="group") 
            {
                let group;
                if(subGrpIdx != -1) 
                {
                    group = groupList[grpIdx].group[subGrpIdx];
                    isSub = true;
                } else 
                {
                    group = groupList[grpIdx];
                }
                if(text = prompt(`'${group.name}' 그룹 수정`)) 
                {
                    group.name = text;
                }
            }
            else if(type=="toDo")
            {
                let level;
                let toDo;
                if(toDoIdx != -1 && subGrpIdx != -1 && grpIdx != -1) 
                {
                    toDo = groupList[grpIdx].group[subGrpIdx].toDo[toDoIdx];
                    level = 2;
                } 
                else if(grpIdx != -1 && subGrpIdx != -1)
                {
                    toDo = groupList[grpIdx].toDo[subGrpIdx];
                    level = 1;
                }
                else if(grpIdx != -1)
                {
                    toDo = toDoList[grpIdx];
                    level = 0;
                }
                if(confirm(`일정 '${toDo.title}'을 삭제하시겠습니까?`)) 
                {
                    if(level==2) 
                        groupList[grpIdx].group[subGrpIdx].toDo.splice(toDoIdx,1);
                    else if(level==1)    
                        groupList[grpIdx].toDo.splice(subGrpIdx,1);
                    else
                        toDoList.splice(grpIdx,1);
                }
            }
        }

        return {
            modals
            , groupList
            , group
            , toDoList
            , toDo
            , addGroup
            , addToDo
            , togglePop
            , del
            , mod
        }
    },

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
            max-width: 320px;
            width: 100%;
            padding: 1.5rem;
        }
    }

    .flexStart {
        justify-content: flex-start;
    }

    

    
</style>