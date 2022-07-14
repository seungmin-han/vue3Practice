<template>
    <section id="unionInfo" class="verticalFlex">
        <h2>연합</h2>
        <div class="unionWrap horizontalFlex">
            <div>
            <label for="">연합 이름 </label>
            <input 
                type="text" 
                placeholder="연합 이름" 
                v-model="unionStorage.union.name"
            >
            </div>
            <div>
                <label for="">연합 주소 </label>
                <input 
                    type="text" 
                    placeholder="연합 주소" 
                    v-model="unionStorage.union.address"
                >
            </div>
        </div>
    </section>
</template>

<script>
import { useListStore } from '@/stores/union'
export default {
    name: "Union"
    , setup() {
        const unionStorage = useListStore();
        return {
            unionStorage
        }
    }
}
</script>

<style>

</style>