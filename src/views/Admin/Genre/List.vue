<template>
    <div class="input-group mb-3">
        <input type="text" class="form-control" v-model="query" v-on:keyup="searchInput"
            placeholder="Genre name, email, phone number" aria-label="Genre username"
            aria-describedby="basic-addon2">
        <span class="input-group-text" id="basic-addon2">Search</span>
    </div>
    <table class="table table-dark table-striped-columns">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Genre name</th>
                <th scope="col">Description</th>
                <th scope="col">Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-if="loading || genres.length === 0">
                <td colspan="6" class="text-center" v-if="genres.length === 0">
                    No results found.
                </td>
                <td colspan="6" class="text-center" v-else>
                    Items being fetched...
                </td>
            </tr>
            <tr v-for="(genre , index) in genres">
                <th scope="row">{{index + 1}}</th>
                <td>{{genre.genre_name}}</td>
                <td>{{genre.description}}</td>
                <td>
                    <router-link :to="{ name: 'genre-view', params: {id: genre.uuid} }" class="btn btn-info btn-sm">
                        <i class="bi bi-eye"></i>
                    </router-link> &nbsp;
                    <router-link :to="{ name: 'genre-edit', params: {id: genre.uuid} }"
                        class="btn btn-primary btn-sm">
                        <i class="bi bi-pencil-square"></i>
                    </router-link> &nbsp;
                    <button @click="destroy(genre.uuid)" class="btn btn-danger btn-sm">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
    <PaginationVue :meta="meta" :togglePage="togglePage" />
</template>
<script>
import _ from 'lodash';
import PaginationVue from '../../../components/Pagination.vue';
export default {
    data: () => {
        return {
            loading: true,
            genres: [],
            meta: {},
            query: '',
            page: 1
            
        }
    },
    components: {PaginationVue},
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.axios.get(`genre?q=${this.query}&page=${this.page}`)
                .then(response => {
                    const responseData = response.data;
                    if (responseData.status === "OK" && responseData.code === 200) {
                        this.genres = responseData?.data;
                        this.meta = responseData?.meta;
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
        },
        searchInput: _.debounce(function (e) {
            this.$router.replace({ query: { q: this.query }})
            this.init();
        }, 500),
        togglePage(page) {
            this.page = page;
            this.$router.replace({ query: { page: page }});
            this.init();
        },  
        destroy(id) {
            this.loading = true;
            this.axios.delete('genre/' + id)
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