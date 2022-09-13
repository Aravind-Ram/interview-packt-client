<template>
    <div class="col-md-3">
        <div class="card mb-4 rounded-3 shadow-sm">
            <div class="card-header py-3">
                <h4 class="my-0 fw-normal">Filters</h4>
            </div>
            <div class="card-body">
                <form role="search">
                    <div class="form-group py-2">
                        <label for="author_id" class="form-label">Book Title or ISBN</label>
                        <input class="form-control me-2" type="search" v-model="search.q" v-on:keyup="searchInput"
                            placeholder="Book title or ISBN">
                    </div>
                    <div class="form-group py-2">
                        <label for="author_id" class="form-label">Author</label>
                        <select class="form-select" v-model="search.author_id" @change="loadBooks()">
                            <option v-for="(item) in authors" :value="item.uuid">{{item.author_name}}
                            </option>
                        </select>
                    </div>

                    <div class="form-group py-2">
                        <label for="genre_id" class="form-label">Genra</label>
                        <select class="form-select" v-model="search.genre_id" @change="loadBooks()">
                            <option v-for="(item) in genres" :value="item.uuid">{{item.genre_name}}
                            </option>
                        </select>
                    </div>

                    <div class="form-group py-3">
                        <label for="publisher_id" class="form-label">Publisher</label>
                        <select class="form-select" v-model="search.publisher_id" @change="loadBooks()">
                            <option v-for="(item) in publishers" :value="item.uuid">
                                {{item.publisher_name}}</option>
                        </select>
                    </div>
                </form>
                <button type="button" @click="clearFilter()" class="w-100 btn btn-lg btn-outline-primary">Clear
                    All</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        search: Object,
        clearFilter: { type: Function },
        loadBooks: { type: Function },
        searchInput: { type: Function },
        genres: Array,
        authors: Array,
        publishers: Array,
    }
}
</script>