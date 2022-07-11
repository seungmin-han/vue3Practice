<template>
    <!-- 연합 생성 페이지 컴포넌트 -->

    <!-- 모달 팝업(연합 생성에서 emit을 통한 로직 처리) -->
    <Modal></Modal>

    <div class="wrap">
        <!-- 연합 기본 정보 입력 폼 -->
        <section id="unionInfo" class="verticalFlex">
            <h2>연합</h2>
            <div class="unionWrap horizontalFlex">
                <div>
                <label for="">연합 이름 </label>
                <input 
                    type="text" 
                    placeholder="연합 이름" 
                    v-model="unions.union.name"
                    @keyup.enter="enter(this, 1)"
                >
                </div>
                <div>
                    <label for="">연합 주소 </label>
                    <input 
                        type="text" 
                        placeholder="연합 주소" 
                        v-model="unions.union.address"
                    >
                </div>
            </div>
        </section>
        <!-- 연합 멤버 입력 폼 -->
        <section id="memberInfo" class="verticalFlex">
            <h2>멤버</h2>
            <div>
                <select name="" id="memberLevel" v-model="member.level">
                    <option value="">계급 선택</option>
                    <option v-for="(value, key) in memberList" :key="key" v-bind:value="key">
                        {{key}}
                    </option>
                </select>
                <input id="memberName" type="text" v-model="member.name">
                <button @click="createMember">추가</button>
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
                <span>그룹</span><button @click="togglePop('group')">그룹 추가</button>
            </div>
            <Group 
                :groupList="unions.groupList"
                :childList="unions.groupList">
            </Group>
            <div class="horizontalFlex">
                <span>일정</span><button @click="togglePop('toDo')">일정 추가</button>
            </div>
            <ToDo 
                :target="unions.toDoList">
            </ToDo>
            <div class="horizontalFlex">
                <span>약탈</span><button @click="togglePop('loot')">약탈 추가</button>
            </div>
            <Loot
                :lootList="unions.lootList"
                :childList="unions.lootList">
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
import { computed, reactive, ref } from "vue";
import { useListStore } from "../stores/list";
export default {
    components : {
        Modal
        , Group
        , ToDo
        , Loot
    },

    setup() {

        const unions = useListStore();

        const union = reactive({
            name: "",
            address: ""
        });

        const member = reactive({
            name:""
            , level:""
        });

        const group = reactive({
            name:""
            , toDo: []
            , group: []
        });

        const toDo = reactive({
            date:""
            , title:""
        });

        const loot = reactive({
            grade: -1
            , classroom: -1
            , loot:[]
            , group:[]
        });

        const createMember = () => {
            unions.createMember(member.level, member.name);
        }

        const deleteMember = (level, index) => {
            unions.deleteMember(level, index);
        }

        const togglePop = (type, target = [], index, mode=0) => {
            unions.setGroup(group);
            unions.setToDo(toDo);
            unions.setLoot(loot);

            unions.togglePop(type, target, index, mode);
        }

        const saveData = () => {
            unions.saveData();
        }

        return {
            union
            , member
            , group
            , toDo
            , loot
            , unions
            , createMember
            , deleteMember
            , togglePop
            , saveData
            , memberList: computed(()=> unions.memberList)
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