<template>
    <div class="wrap">
        <section id="unionInfo">
            <div>
                <h2>연합</h2>
                <label for="">연합 이름</label>
                <input 
                    type="text" 
                    placeholder="연합 이름" 
                    v-model="union.name"
                    @keyup.enter="enter(this, 1)"
                >
            </div>
            <div>
                <label for="">연합 주소</label>
                <input 
                    type="text" 
                    placeholder="연합 주소" 
                    v-model="union.address"
                >
            </div>
        </section>
        <section id="memberInfo">
            <div>
                <h2>멤버</h2>
                <select name="" id="memberLevel" v-model="member.level">
                    <option value="">계급 선택</option>
                    <option v-for="(value, key) in members" :key="value" v-bind:value="key">
                        {{key}}
                    </option>
                </select>
                <input id="memberName" type="text" v-model="member.name">
                <button @click="addMember(member.level,member.name)">추가</button>
            </div>
            <div>
                <h4>대장</h4>
                {{members.leader}}
                <button v-if="members.leader" @click="removeMember('leader', 0)">취소</button>
            </div>
            <div>
                <h4>부대장</h4>
                <ul>
                    <li v-for="(member, index) in members.commander" :key="index">
                        {{member}}
                        <button @click="removeMember('commander', index)">취소</button>
                    </li>
                </ul>
            </div>
            <div>
                <h4>말단</h4>
                <ul>
                    <li v-for="(member, index) in members.endUser" :key="index">
                        {{member}}
                        <button @click="removeMember('endUser', index)">취소</button>
                    </li>
                    
                </ul>
            </div>
        </section>
        <div v-show="modals.notice">
            <div v-show="modals.group">
                <input
                    type="text"
                    placeholder="그룹 입력"
                    v-model="group.name"
                />
                <button @click="addGroup">추가</button>
            </div>
            <div v-if="modals.toDo">
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
            </div>
            <section>
                <button @click="showGroupPop">그룹 추가</button>
                <button @click="showToDoPop">일정 추가</button>

            </section>
        </div>
        
        <button @click="showNoticePop">공지 입력</button>
    </div>
    <section>
        <div v-for="(value, index) in groups" :key="index">
            <label for="">그룹 이름</label>
            <input type="text" :value="value.name">
            <button>서브 그룹 추가</button>
            <button>일정 추가</button>
            <button>수정</button>
            <button>삭제</button>
        </div>
    </section>
</template>

<script>
import { reactive, ref } from "vue";
export default {
    setup() {
        const union = ref({
            name:""
            , address: ""
        });
        
        const members = reactive({
            leader:"",
            commander: [],
            endUser: []
        });

        const member = ref({
            name:"",
            level:""
        });

        const groups = reactive(
            []
        );
        
        const group = reactive({
            name:""
            , childs: []
        });
        
        
        const toDo = ref({
            date:"",
            title:""
        });
        const modals = reactive({
            notice:false
            , group:false
            , toDo:false
        });

        const showNoticePop = () => {
            modals.notice = !modals.notice;
        }

        const showGroupPop = () => {
            modals.group = !modals.group;
        }

        const showToDoPop = () => {
            modals.toDo = !modals.toDo;
        }
        
        const addMember = (level, name) => {
            console.log(level,name);

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
                if(members.leader.length < 1)    
                    members.leader = name;
            } 
            else if(level.trim()=="commander") 
            {
                if(members.commander.length < 7)
                    members.commander.push(name);
            }
            else 
            {
                members.endUser.push(name);
            }
        }

        const removeMember = (level, index) => {
            console.log(level, index);

            if(level.trim()=="leader") 
            {
                console.log("leader");
                members.leader = "";
            } 
            else if(level.trim()=="commander") 
            {
                members.commander.splice(index, 1);
            }
            else 
            {
                members.endUser.splice(index, 1);
            }
            
        }

        const addGroup = () => {
            groups.push(group);
            console.log(groups[0].name);
        }

        return {
            union
            , modals
            , members
            , member
            , groups
            , group
            , toDo
            , showNoticePop
            , showGroupPop
            , showToDoPop
            , addMember
            , removeMember
            , addGroup
        }
    }

}
</script>

<style lang="scss" scoped>

</style>