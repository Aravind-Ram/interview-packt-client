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
                        <div class="card">
                            <div class="card-header">
                                <label for="author_id" class="card-title form-label">Author</label>
                            </div>
                            <div class="card-body">
                                <div class="form-check" v-for="(item) in authors">
                                    <input class="form-check-input" type="checkbox" v-model="search.authors"
                                        :value="item.slug" :id="item.slug" @change="loadBooks()">
                                    <label class="form-check-label" :for="item.slug">
                                        {{item.author_name}}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="form-group py-2">
                        <div class="card">
                            <div class="card-header">
                                <label for="genra_id" class="card-title form-label">Genra</label>
                            </div>
                            <div class="card-body">
                                <div class="form-check" v-for="(item) in genres">
                                    <input class="form-check-input" type="checkbox" v-model="search.genres"
                                        :value="item.slug" :id="item.slug" @change="loadBooks()">
                                    <label class="form-check-label" :for="item.slug">
                                        {{item.genre_name}}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="form-group py-3">
                        <div class="card">
                            <div class="card-header">
                                <label for="publisher_id" class="card-title form-label">Publisher</label>
                            </div>
                            <div class="card-body">
                                <div class="form-check" v-for="(item) in publishers">
                                    <input class="form-check-input" type="checkbox" v-model="search.publishers"
                                        :value="item.slug" :id="item.slug" @change="loadBooks()">
                                    <label class="form-check-label" :for="item.slug">
                                        {{item.publisher_name}}
                                    </label>
                                </div>
                            </div>
                        </div>
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
        multiFilter: { type: Function },
        genres: Array,
        authors: Array,
        publishers: Array,
    }
}
</script>