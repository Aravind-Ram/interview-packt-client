<template>
    <div class="input-group mb-3">
        <input type="text" class="form-control" v-model="query" v-on:keyup="searchInput"
            placeholder="Book Title, Genre, Author, Publisher, ISBN" aria-describedby="basic-addon2">
        <span class="input-group-text" id="basic-addon2">Search</span>
    </div>
    <table class="table table-dark table-striped-columns">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Author</th>
                <th scope="col">Genre</th>
                <th scope="col">Publisher</th>
                <th scope="col">ISBN</th>
                <th scope="col">Published At</th>
                <th scope="col">Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-if="loading || books.length === 0">
                <td colspan="8" class="text-center" v-if="books.length === 0">
                    No results found.
                </td>
                <td colspan="8" class="text-center" v-else>
                    Items being fetched...
                </td>
            </tr>
            <tr v-for="(book, index) in books">
                <th scope="row">{{index + 1}}</th>
                <td>{{book.title}}</td>
                <td>{{book.author}}</td>
                <td>{{book.genre}}</td>
                <td>{{book.publisher}}</td>
                <td>{{book.isbn}}</td>
                <td>{{book.published_at}}</td>
                <td>
                    <router-link :to="{ name: 'book-view', params: {id: book.uuid} }" class="btn btn-info btn-sm">
                        <i class="bi bi-eye"></i>
                    </router-link> &nbsp;
                    <router-link :to="{ name: 'book-edit', params: {id: book.uuid} }" class="btn btn-primary btn-sm">
                        <i class="bi bi-pencil-square"></i>
                    </router-link> &nbsp;
                    <button @click="destroy(book.uuid)" class="btn btn-danger btn-sm">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
    <PaginationVue :meta="meta" :togglePage="togglePage" />
</template>
<script>
import _ from 'lodash'
import PaginationVue from '../../../components/Pagination.vue';
export default {
    data: () => {
        return {
            loading: true,
            books: [],
            meta: {},
            query: '',
            page: 1

        }
    },
    mounted() {
        this.init();
    },
    components: {PaginationVue},
    methods: {
        init() {
            this.axios.get(`book?q=${this.query}&page=${this.page}`)
                .then(response => {
                    const responseData = response.data;
                    if (responseData.status === "OK" && responseData.code === 200) {
                        this.books = responseData?.data;
                        this.meta = responseData?.meta;
                        toastr.success(responseData.message, 'Welldone!');
                    }
                })
                .catch(err => {
                    const response = err.response?.data;
                    if (response && err.response.status === 422 && response.code === 422) {
                        toastr.success(response.message, 'Something went Wrong!.');
                        console.log(this.formErrors.author_name);
                    }
                })
                .finally(() => this.loading = false)
        },
        searchInput: _.debounce(function (e) {
            this.$router.replace({ query: { q: this.query } })
            this.init();
        }, 500),
        togglePage(page) {
            this.page = page;
            this.$router.replace({ query: { page: page } });
            this.init();
        },
        destroy(id) {
            this.loading = true;
            this.axios.delete('book/' + id)
                .then(response => {
                    const responseData = response.data;
                    if (responseData.status === "OK" && responseData.code === 200) {
                        this.init();
                        toastr.success(responseData.message, 'Welldone!');
                    }
                })
                .catch(err => {
                    const response = err.response?.data;
                    if (response && err.response.status === 422 && response.code === 422) {
                        toastr.success(response.message, 'Something went Wrong!.');
                    }
                })
                .finally(() => this.loading = false)
        }
    }
}
</script>