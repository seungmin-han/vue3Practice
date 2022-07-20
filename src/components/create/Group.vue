<template>
    <!-- 그룹 컴포넌트 -->

    <div
        v-for="(group, index) in childList"
        :key="index"
        class="verticalFlex groupWrap"
    >
        <div class="horizontalFlex">
            <div>
                <div class="box"></div>
                <label for="">그룹 이름</label>
                <input type="text" :value="group.name" disabled />
            </div>
            <div class="buttonWrap">
                <button
                    @click="
                        unionStorage.togglePop(
                            'subGroup',
                            group,
                            index,
                            'insert',
                        )
                    "
                >
                    서브 그룹 추가
                </button>
                <button
                    v-if="!isLoot"
                    @click="
                        unionStorage.togglePop('toDo', group, index, 'insert')
                    "
                >
                    일정 추가
                </button>
                <button
                    class="upd"
                    @click="
                        unionStorage.togglePop(
                            'group',
                            childList,
                            index,
                            'update',
                        )
                    "
                >
                    수정
                </button>
                <button
                    class="del"
                    @click="
                        unionStorage.togglePop(
                            'group',
                            childList,
                            index,
                            'delete',
                        )
                    "
                >
                    삭제
                </button>
            </div>
        </div>
        <div class="verticalFlex subWrap">
            <!-- 그룹 하위 일정 -->
            <ToDo :target="group.toDo"> </ToDo>
            <!-- 그룹 하위 그룹 -->
            <Group :groupList="group" :childList="group.group" :isLoot="isLoot">
            </Group>
        </div>
    </div>
</template>

<script>
import { useUnionStore } from "@/stores/union";
import ToDo from "./ToDo.vue";
export default {
    name: "Group",
    components: {
        ToDo,
    },
    props: ["groupList", "childList", "isLoot"],
    setup() {
        const unionStorage = useUnionStore();

        return {
            unionStorage,
        };
    },
};
</script>

<style lang="scss" scoped>
.horizontalFlex {
    justify-content: space-between;
}

.subWrap .groupWrap {
    margin-left: 20px;

    > .horizontalFlex,
    .toDoWrap {
        border-left: 2px solid #000;
    }
}

.groupWrap .groupWrap:not(:last-child),
.lootWrap .groupWrap:not(:last-child) {
    border-left: 2px solid #000;
    > .subWrap > .toDoWrap {
        border: none;
    }

    > .horizontalFlex {
        border-left: none;
    }
}
</style>
