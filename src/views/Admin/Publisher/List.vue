<template>
    <div class="input-group mb-3">
        <input type="text" class="form-control" v-model="query" v-on:keyup="searchInput"
            placeholder="Publisher's name, email, phone number" aria-label="Publisher's username"
            aria-describedby="basic-addon2">
        <span class="input-group-text" id="basic-addon2">Search</span>
    </div>
    <table class="table table-dark table-striped-columns">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Publisher name</th>
                <th scope="col">Email address</th>
                <th scope="col">Phone number</th>
                <th scope="col">Address</th>
                <th scope="col">Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-if="loading || publishers.length === 0">
                <td colspan="6" class="text-center" v-if="publishers.length === 0">
                    No results found.
                </td>
                <td colspan="6" class="text-center" v-else>
                    Items being fetched...
                </td>
            </tr>
            <tr v-for="(publisher, index) in publishers">
                <th scope="row">{{index + 1}}</th>
                <td>{{publisher.publisher_name}}</td>
                <td>{{publisher.email}}</td>
                <td>{{publisher.phone_number}}</td>
                <td>{{publisher.address}}</td>
                <td>
                    <router-link :to="{ name: 'publisher-view', params: {id: publisher.uuid} }" class="btn btn-info btn-sm">
                        <i class="bi bi-eye"></i>
                    </router-link> &nbsp;
                    <router-link :to="{ name: 'publisher-edit', params: {id: publisher.uuid} }"
                        class="btn btn-primary btn-sm">
                        <i class="bi bi-pencil-square"></i>
                    </router-link> &nbsp;
                    <button @click="destroy(publisher.uuid)" class="btn btn-danger btn-sm">
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
            publishers: [],
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
            this.axios.get(`publisher?q=${this.query}&page=${this.page}`)
                .then(response => {
                    const responseData = response.data;
                    if (responseData.status === "OK" && responseData.code === 200) {
                        this.publishers = responseData?.data;
                        this.meta = responseData?.meta;
                        toastr.success(responseData.message, 'Welldone!');
                    }
                })
                .catch(err => {
                    const response = err.response?.data;
                    if (response && err.response.status === 422 && response.code === 422) {
                        toastr.success(response.message, 'Something went Wrong!.');
                        console.log(this.formErrors.publisher_name);
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
            this.axios.delete('publisher/' + id)
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