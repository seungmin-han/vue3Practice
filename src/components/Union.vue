<template>
    <section id="unionInfo" class="verticalFlex">
        <h2>연합</h2>
        <div class="unionWrap horizontalFlex">
            <div>
            <label for="">연합 이름 </label>
            <input 
                type="text" 
                placeholder="연합 이름" 
                v-model="unions.union.name"
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
</template>

<script>
import { useListStore } from '@/stores/list'
export default {
    name: "Union"
    , setup() {
        const unions = useListStore();
        return {
            unions
        }
    }
}
</script>

<style>

</style>