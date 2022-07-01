<template>
    <Modal 
        :modals="modals" 
        :toDo="toDo" 
        :group="group" 
        :loot="loot"
        :lootInfo="lootInfo"
        @togglePop="togglePop"
        @createGroup="createGroup" 
        @updateGroup="updateGroup" 
        @deleteGroup="deleteGroup" 
        @createToDo="createToDo"
        @updateToDo="updateToDo"
        @deleteToDo="deleteToDo"
        @createLoot="createLoot"
        @updateLoot="updateLoot"
        @deleteLoot="deleteLoot">

    </Modal>
    <div class="wrap">
        <section id="unionInfo" class="verticalFlex">
            <h2>연합</h2>
            <div class="unionWrap horizontalFlex">
                <div>
                <label for="">연합 이름 </label>
                <input 
                    type="text" 
                    placeholder="연합 이름" 
                    v-model="union.name"
                    @keyup.enter="enter(this, 1)"
                >
                </div>
                <div>
                    <label for="">연합 주소 </label>
                    <input 
                        type="text" 
                        placeholder="연합 주소" 
                        v-model="union.address"
                    >
                </div>
            </div>
        </section>
        <section id="memberInfo" class="verticalFlex">
            <h2>멤버</h2>
            <div>
                <select name="" id="memberLevel" v-model="member.level">
                    <option value="">계급 선택</option>
                    <option v-for="(value, key) in memberList" :key="value" v-bind:value="key">
                        {{key}}
                    </option>
                </select>
                <input id="memberName" type="text" v-model="member.name">
                <button @click="createMember(member.level,member.name)">추가</button>
            </div>
            <div class="memberWrap horizontalFlex">
                <div>
                    <h4>대장</h4>
                    <div class="horizontalFlex" v-if="memberList.leader">
                        <span>{{memberList.leader}}</span>
                        <button class="del" @click="deleteMember('leader', 0)">취소</button>
                    </div>
                </div>
                <div>
                    <h4>부대장</h4>
                    <ul>
                        <li v-for="(member, index) in memberList.commander" :key="index" class="horizontalFlex">
                            <span>{{member}}</span>
                            <button class="del" @click="deleteMember('commander', index)">취소</button>
                        </li>
                    </ul>
                </div>
                <div>
                    <h4>말단</h4>
                    <ul>
                        <li v-for="(member, index) in memberList.endUser" :key="index" class="horizontalFlex">
                            <span>{{member}}</span>
                            <button class="del" @click="deleteMember('endUser', index)">취소</button>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
        <section class="verticalFlex contentWrap">
            <div class="horizontalFlex">
                <span>그룹</span><button @click="togglePop({type:'group'})">그룹 추가</button>
            </div>
            <Group 
                :groupList="groupList"
                :childList="groupList"
                @togglePop="togglePop">
            </Group>
            <div class="horizontalFlex">
                <span>일정</span><button @click="togglePop({type:'toDo'})">일정 추가</button>
            </div>
            <ToDo 
                :target="toDoList"
                @togglePop="togglePop">
            </ToDo>
            <div class="horizontalFlex">
                <span>약탈</span><button @click="togglePop({type:'loot'})">약탈 추가</button>
            </div>
            <Loot
                :lootList="lootList"
                :childList="lootList"
                @togglePop="togglePop">
            </Loot>
        </section>
        <div class="horizontalFlex">
            <button @click="saveData">생성하기</button>
        </div>
    </div>
</template>

<script>
import Modal from './Modals.vue';
import Group from './Group.vue';
import ToDo from './ToDo.vue';
import Loot from './Loot.vue';
import { reactive, ref } from "vue";
export default {
    components : {
        Modal
        , Group
        , ToDo
        , Loot
    },

    setup() {

        let unions = new Array();

        const union = reactive({
            name:""
            , address: ""
        });
        
        const memberList = reactive({
            leader:""
            , commander: []
            , endUser: []
        });

        const member = ref({
            name:""
            , level:""
        });

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
            date:""
            , title:""
        });

        const lootList = reactive(
            []
        );

        const loot = reactive({
            grade: -1
            , classroom: -1
            , loot:[]
            , group:[]
        });

        const lootInfo = reactive({
            grade: [1,2,3,4,5,6]
            , classroom: [1,2,3,4,5,6,7,8,9]
        });

        const modals = reactive({
            isOpen: false
            , mode: 0 // 0: create, 1: update, 2:delete
            , group: false
            , toDo: false
            , subGroup: false
            , loot: false
            , target: []
            , index: 0
            , text: ""
        });
        
        const createMember = (level, name) => {
            if(level.trim()=="") {
                alert("계급을 선택해주세요.");
                return;
            }
            if(name.trim()=="") {
                alert("이름을 입력해주세요.");
                return;
            }
            if(level.trim()=="leader") 
            {
                if(memberList.leader.length < 1)    
                    memberList.leader = name;
            } 
            else if(level.trim()=="commander") 
            {
                if(memberList.commander.length < 7)
                    memberList.commander.push(name);
            }
            else 
            {
                memberList.endUser.push(name);
            }
        }

        const deleteMember = (level, index) => {
            if(level.trim()=="leader") 
            {
                memberList.leader = "";
            } 
            else if(level.trim()=="commander") 
            {
                memberList.commander.splice(index, 1);
            }
            else 
            {
                memberList.endUser.splice(index, 1);
            }
            
        }

        const togglePop = ({type, target = [], index, mode=0}) => {
            
            modals.isOpen = !modals.isOpen;
            modals.target = target;
            modals.index = index;
            modals.mode = mode;
            modals.text = type;
            
            if(type=="group") 
            {
                modals.group = !modals.group;
                group.name = (modals.mode!=0) ? target[modals.index].name : "";
                   
            }
            else if(type=="subGroup")
            {
                modals.group = !modals.group;
                modals.subGroup = !modals.subGroup;
            }
            else if(type=="toDo")
            {
                modals.toDo = !modals.toDo;    
                toDo.title = (modals.mode!=0) ? target[modals.index].title : "";
                toDo.date = (modals.mode!=0) ? target[modals.index].date : "";   
            }
            else if(type=="loot")
            {
                modals.loot = !modals.loot;
                loot.grade = (modals.mode!=0) ? target[modals.index].grade : "";
                loot.classroom = (modals.mode!=0) ? target[modals.index].classroom : "";

            }
        }

        const createGroup = () => {
            if(modals.target.length == 0)
            {
                groupList.push({...group});
            }
            else
            {
                modals.target.group.push({...group});
            }

            group.name = "";
            group.toDo = [];
            group.group = [];

            togglePop({type:"group"});
        }

        const updateGroup = () => {
            modals.target[modals.index].name=group.name;

            group.name = "";
            group.toDo = [];
            group.group = [];

            togglePop({type:"group"});
        }

        const deleteGroup = () => {
            modals.target.splice(modals.index, 1);

            group.name = "";
            group.toDo = [];
            group.group = [];

            togglePop({type:"group"});
        }

        const createToDo = () => {
            if(modals.target.length == 0) 
            {
                toDoList.push({...toDo});
            }
            else
            {
                modals.target.toDo.push({...toDo});
            }
                
            toDo.title = "";
            toDo.date = "";
            togglePop({type:'toDo'});
        }

        const updateToDo = () => {
            modals.target[modals.index].date=toDo.date;
            modals.target[modals.index].title=toDo.title;

            toDo.title = "";
            toDo.date = "";
            togglePop({type:'toDo'});
        }

        const deleteToDo = () => {
            modals.target.splice(modals.index, 1);

            toDo.title = "";
            toDo.date = "";
            togglePop({type:'toDo'});
        }

        const createLoot = () => {
            if(modals.target.length == 0)
            {
                lootList.push({...loot});
            }
            else
            {
                modals.target.loot.push({...loot});
            }

            loot.grade = -1;
            loot.classroom = -1;
            loot.group = [];
            loot.loot = [];
            

            togglePop({type:"loot"});
        }

        const updateLoot = () => {
            modals.target[modals.index].grade=loot.grade;
            modals.target[modals.index].classroom=loot.classroom;

            loot.grade = "";
            loot.classroom = "";
            togglePop({type:'loot'});
        }

        const deleteLoot = () => {
            modals.target.splice(modals.index, 1);

            loot.grade = "";
            loot.classroom = "";
            togglePop({type:'loot'});
        }

        const saveData = () => {
            let unions = [];

            const data = {
                "union": union
                , "memberList": memberList
                , "groupList": groupList
                , "toDoList": toDoList
                , "lootList": lootList
                , "lootInfo": lootInfo
            }
            if(localStorage.getItem("unions"))
                unions = JSON.parse(localStorage.getItem("unions"));
            unions.push(data);
            localStorage.setItem("unions", JSON.stringify(unions));
        }

        return {
            union
            , modals
            , togglePop
            , memberList
            , member
            , createMember
            , deleteMember
            , groupList
            , group
            , createGroup
            , updateGroup
            , deleteGroup
            , toDoList
            , toDo
            , createToDo
            , updateToDo
            , deleteToDo
            , lootList
            , loot
            , lootInfo
            , createLoot
            , updateLoot
            , deleteLoot
            , unions
            , saveData
        }
    }
}
</script>

<style lang="scss">
    @mixin memberItem {
        padding: 5px 0;
        border-bottom: 2px solid #ccc;
    }

    /* 공통 스타일 시작 */

    input, select {
        font-size: 18px;
        line-height: 18px;
    }

    button {
        margin: 0 5px;
        padding: 5px 15px;
        color: #fff;
        font-weight: bold;
        line-height: 18px;
        background-color: dodgerblue;
        border: 1px solid #888;
        border-radius: 5px;
    }

    .del {
        background-color: brown;
    }

    .upd {
        background-color:mediumseagreen
    }
    
    .gray{
        background-color: gray;
    }

    .verticalFlex {
        display:flex;
        flex-direction: column;
        justify-content: flex-start;
    };

    .horizontalFlex {
        display:flex;
        flex-direction: row;
        justify-content: center;
        > div {
            padding: 10px;
        }
    }

    .wrap {
        width: 1200px;
        margin: 0 auto;
    }

    section {
        margin: 30px 0;
        padding: 40px 0;
        border: 1px solid #ccc;
    }

    /* 공통 스타일 끝 */

    /* 연합 정보 영역 시작 */

    .unionWrap {
        > div {
            flex-grow: 1;
        }
    }

    /* 연합 정보 영역 끝 */

    /* 멤버 영역 시작 */

    .memberWrap {
        max-height: 200px;
        h4 {
            padding: 10px 0;
            border-bottom: 3px solid #666;
        }
        > div:first-child > div {
            @include memberItem();
        }
        > div {
            max-height: inherit;
            flex-grow: 1;
            > ul {
                max-height: 100px;
                overflow-y: scroll;
                > li {
                    @include memberItem();
                } 
            }
        }
        .horizontalFlex {
            justify-content: space-between;
        }
    }

    /* 멤버 영역 끝 */

    /* 일정 영역 시작 */

    .contentWrap {
        padding: 20px;
        > div {
            justify-content: space-between;
            padding: 10px 0;
            > span {
                font-size: 24px;
                font-weight: bold;
            }
        }
        > div.horizontalFlex {
            border-bottom: 2px solid #aaa;
        }
        .groupWrap > .groupWrap {
            padding-left: 30px;
        }

        .lootWrap > .lootWrap {
            padding-left: 30px;
        }

    }

    /* 일정 영역 끝 */


</style>