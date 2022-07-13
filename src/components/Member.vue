<template>
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
</template>

<script>
import { useListStore } from '@/stores/list'
import { computed, reactive } from "vue";
export default {
    name: "Member"
    , setup() {
        const unions = useListStore();
        const member = reactive({
            name:""
            , level:""
        });

        const createMember = () => {
            unions.createMember(member.level, member.name);
        }

        const deleteMember = (level, index) => {
            unions.deleteMember(level, index);
        }
        return {
            unions
            , member
            , createMember
            , deleteMember
            , memberList: computed(()=> unions.memberList)
        }
    }
}
</script>

<style>

</style>