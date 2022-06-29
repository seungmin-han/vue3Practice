<template>
    <div class="wrap">
        <section id="unionInfo" class="verticalFlex">
            <h2>연합</h2>
            <div class="unionWrap horizontalFlex">
                <div>
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
                <button @click="addMember(member.level,member.name)">추가</button>
            </div>
            <div class="memberWrap horizontalFlex">
                <div>
                    <h4>대장</h4>
                    {{memberList.leader}}
                    <button v-if="memberList.leader" @click="removeMember('leader', 0)">취소</button>
                </div>
                <div>
                    <h4>부대장</h4>
                    <ul>
                        <li v-for="(member, index) in memberList.commander" :key="index">
                            {{member}}
                            <button @click="removeMember('commander', index)">취소</button>
                        </li>
                    </ul>
                </div>
                <div>
                    <h4>말단</h4>
                    <ul>
                        <li v-for="(member, index) in memberList.endUser" :key="index">
                            {{member}}
                            <button @click="removeMember('endUser', index)">취소</button>
                        </li>

                    </ul>
                </div>
            </div>
        </section>
        <Content></Content>
    </div>
</template>

<script>
import Content from './Content.vue';
import { reactive, ref } from "vue";
export default {
    components : {
        Content
    },

    setup() {
        const union = ref({
            name:""
            , address: ""
        });
        
        const memberList = reactive({
            leader:"",
            commander: [],
            endUser: []
        });

        const member = ref({
            name:"",
            level:""
        });

        
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

        const removeMember = (level, index) => {
            console.log(level, index);

            if(level.trim()=="leader") 
            {
                console.log("leader");
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

        return {
            union
            , memberList
            , member
            , addMember
            , removeMember
        }
    }

}
</script>

<style lang="scss">
    .wrap {
        width: 1200px;
        margin: 0 auto;
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

    

</style>