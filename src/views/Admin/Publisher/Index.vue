<template>
    <div class="container">
        <div class="py-3 d-flex justify-content-between">
            <h2>Publisher Management</h2>
            <router-link :to="{ name: currentRouteName === 'publisher-list' ? 'publisher-create' : 'publisher-list' }" type="button"
                class="btn btn-info">
                <template v-if="currentRouteName === 'publisher-list'"><i class="bi bi-book-half"></i> New Publisher</template>
                <template v-if="currentRouteName !== 'publisher-list'"><i class="bi bi-book-half"></i> Publisher List</template>
            </router-link>
        </div>
        <RouterView />
    </div>
</template>
<script>
export default {    
    computed: {
        currentRouteName() {
            return this.$route.name;
        }
    }
}

</script>