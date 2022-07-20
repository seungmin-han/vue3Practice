<template>
    <div class="verticalFlex toDoWrap">
        <div
            v-for="(toDo, index) in target"
            :key="index"
            class="horizontalFlex"
        >
            <div>
                <div class="box"></div>
                <label for="">일정 날짜</label>
                <input type="date" :value="toDo.date" disabled />
                <label for="">일정 제목</label>
                <input type="text" :value="toDo.title" disabled />
            </div>
            <div>
                <button
                    class="upd"
                    @click="
                        unionStorage.togglePop('toDo', target, index, 'update')
                    "
                >
                    수정
                </button>
                <button
                    class="del"
                    @click="
                        unionStorage.togglePop('toDo', target, index, 'delete')
                    "
                >
                    삭제
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { useUnionStore } from "@/stores/union";
export default {
    name: "ToDo",
    props: ["target"],
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
</style>
