<template>
    <table class="table table-dark table-striped-columns">
        <thead>
            <tr>
                <th scope="col">Field</th>
                <th scope="col">Values</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th scope="row">Genre name</th>
                <td>{{ loading ? 'Loading...' : genre.genre_name || 'Nill' }}</td>
            </tr>
            <tr>
                <th scope="row">Description</th>
                <td>{{loading ? 'Loading...' : genre.description || 'NA'}}</td>
            </tr>
            <tr v-if="(!loading)">
                <td colspan="2">
                    <div class="d-flex justify-content-end">
                        <router-link :to="{ name: 'genre-edit', params: {id: this.$route.params.id} }"
                            class="btn btn-primary btn-sm">
                            <i class="bi bi-pencil-square"></i> Edit
                        </router-link> &nbsp;
                        <button @click="destroy()" class="btn btn-danger btn-sm">
                            <i class="bi bi-pencil-square"></i> Delete
                        </button>
                    </div>
                </td>
            </tr>
            <tr v-else>
                <td colspan="2">
                    Loading...
                </td>
            </tr>
        </tbody>
    </table>
</template>
<script>
import toastr from "toastr";
export default {
    data: () => ({
        loading: true,
        genre: {}
    }),
    mounted() {
        this.axios.get('genre/' + this.$route.params.id)
            .then(response => {
                const responseData = response.data;
                if (responseData.status === "OK" && responseData.code === 200) {
                    this.genre = responseData?.data;
                    toastr.success(responseData.message, 'Welldone!');
                }
            })
            .catch(err => {
                const response = err.response?.data;
                if (response && err.response.status === 404 && response.code === 404) {
                    toastr.success(response.message, 'Something went Wrong!.');
                }
            })
            .finally(() => this.loading = false)
    },
    methods: {
        destroy() {
            this.loading = true;
            this.axios.delete('genre/' + this.$route.params.id)
            .then(response => {
                const responseData = response.data;
                if (responseData.status === "OK" && responseData.code === 200) {
                    this.$router.push({ name: "genre-list" });
                    toastr.success(responseData.message, 'Welldone!');
                }
            })
            .catch(err => {
                const response = err.response?.data;
                if (response && err.response.status === 404 && response.code === 404) {
                    toastr.error(response.message, 'Something went Wrong!.');
                }
            })
            .finally(() => this.loading = false)
        }
    }
}
</script>