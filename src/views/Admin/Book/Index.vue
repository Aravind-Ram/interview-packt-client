<template>
    <div class="container">
        <div class="py-3 d-flex justify-content-between">
            <h2>Books Management</h2>
            <router-link :to="{ name: currentRouteName === 'book-list' ? 'book-create' : 'book-list' }" type="button"
                class="btn btn-info">
                <template v-if="currentRouteName === 'book-list'"><i class="bi bi-book-half"></i> New Book</template>
                <template v-if="currentRouteName !== 'book-list'"><i class="bi bi-book-half"></i> Book List</template>
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