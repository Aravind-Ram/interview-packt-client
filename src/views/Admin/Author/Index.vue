<template>
    <div class="container">
        <div class="py-3 d-flex justify-content-between">
            <h2>Authors Management</h2>
            <router-link :to="{ name: currentRouteName === 'author-list' ? 'author-create' : 'author-list' }" type="button"
                class="btn btn-info">
                <template v-if="currentRouteName === 'author-list'"><i class="bi bi-book-half"></i> New Author</template>
                <template v-if="currentRouteName !== 'author-list'"><i class="bi bi-book-half"></i> Author List</template>
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