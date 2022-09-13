<template>
    <div class="container">
        <div class="py-3 d-flex justify-content-between">
            <h2>Genre Management</h2>
            <router-link :to="{ name: currentRouteName === 'genre-list' ? 'genre-create' : 'genre-list' }" type="button"
                class="btn btn-info">
                <template v-if="currentRouteName === 'genre-list'"><i class="bi bi-book-half"></i> New Genre</template>
                <template v-if="currentRouteName !== 'genre-list'"><i class="bi bi-book-half"></i> Genre List</template>
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