<!-- 연합 생성 페이지 컴포넌트 -->
<template>
    <!-- 모달 팝업 -->
    <Modal></Modal>

    <div class="wrap">
        <!-- 연합 기본 정보 입력 폼 -->
        <Union></Union>
        <!-- 연합 멤버 입력 폼 -->
        <Member></Member>
        <!-- 콘텐츠 -->
        <section class="verticalFlex contentWrap">
            <!-- 연합의 그룹 -->
            <div class="horizontalFlex">
                <span>그룹</span><button @click="unionStorage.togglePop('group')">그룹 추가</button>
            </div>
            <Group 
                :groupList="unionStorage.groupList"
                :childList="unionStorage.groupList">
            </Group>
            <!-- 연합의 일정 -->
            <div class="horizontalFlex">
                <span>일정</span><button @click="unionStorage.togglePop('toDo')">일정 추가</button>
            </div>
            <ToDo 
                :target="unionStorage.toDoList">
            </ToDo>
            <!-- 연합의 목표 -->
            <div class="horizontalFlex">
                <span>약탈</span><button @click="unionStorage.togglePop('loot')">약탈 추가</button>
            </div>
            <Loot
                :lootList="unionStorage.lootList"
                :childList="unionStorage.lootList">
            </Loot>
        </section>
        <div class="horizontalFlex">
            <button @click="unionStorage.saveData">생성하기</button>
        </div>
    </div>
</template>

<script>
import Modal from './Modals.vue';
import Union from './Union.vue';
import Member from './Member.vue';
import Group from './Group.vue';
import ToDo from './ToDo.vue';
import Loot from './Loot.vue';
import { useListStore } from "@/stores/union";
export default 
{
    components : 
    {
        Modal
        , Union
        , Member
        , Group
        , ToDo
        , Loot
    }
    , setup() 
    {
        const unionStorage = useListStore();
        
        return {
            unionStorage
        }
    }
}
</script>

<style lang="scss">
    @mixin memberItem 
    {
        padding: 5px 0;
        border-bottom: 2px solid #ccc;
    }

    /* 공통 스타일 시작 */

    input, select 
    {
        font-size: 18px;
        line-height: 18px;
    }

    button 
    {
        margin: 0 5px;
        padding: 5px 15px;
        color: #fff;
        font-weight: bold;
        line-height: 18px;
        background-color: dodgerblue;
        border: 1px solid #888;
        border-radius: 5px;
    }

    .del 
    {
        background-color: brown;
    }

    .upd 
    {
        background-color:mediumseagreen
    }
    
    .gray
    {
        background-color: gray;
    }

    .verticalFlex 
    {
        display:flex;
        flex-direction: column;
        justify-content: flex-start;
    };

    .horizontalFlex 
    {
        display:flex;
        flex-direction: row;
        justify-content: center;

        > div 
        {
            padding: 10px;
        }
    }

    .wrap 
    {
        max-width: 1200px;
        margin: 0 auto;
    }

    section 
    {
        margin: 30px 0;
        padding: 40px 0;
        border: 1px solid #ccc;
    }

    /* 공통 스타일 끝 */

    /* 연합 정보 영역 시작 */

    .unionWrap 
    {
        > div 
        {
            flex-grow: 1;
        }
    }

    /* 연합 정보 영역 끝 */

    /* 멤버 영역 시작 */

    .memberWrap 
    {
        max-height: 200px;

        h4 
        {
            padding: 10px 0;
            border-bottom: 3px solid #666;
        }

        > div:first-child > div 
        {
            @include memberItem();
        }

        > div 
        {
            max-height: inherit;
            flex-grow: 1;

            > ul 
            {
                max-height: 100px;
                overflow-y: scroll;

                > li 
                {
                    @include memberItem();
                } 
            }
        }

        .horizontalFlex 
        {
            justify-content: space-between;
        }
    }

    /* 멤버 영역 끝 */

    /* 일정 영역 시작 */

    .contentWrap 
    {
        padding: 20px;

        > div 
        {
            justify-content: space-between;
            padding: 10px 0;

            > span 
            {
                font-size: 24px;
                font-weight: bold;
            }
        }

        > div.horizontalFlex 
        {
            border-bottom: 2px solid #aaa;
        }

        .groupWrap > .groupWrap 
        {
            padding-left: 30px;
        }

        .lootWrap > .lootWrap 
        {
            padding-left: 30px;
        }

    }

    /* 일정 영역 끝 */


</style>