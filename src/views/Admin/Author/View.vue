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
                <th scope="row">Author name</th>
                <td>{{ loading ? 'Loading...' : author.author_name || 'Nill' }}</td>
            </tr>
            <tr>
                <th scope="row">Email Address</th>
                <td>{{ loading ? 'Loading...' : author.email || 'Nill'}}</td>
            </tr>
            <tr>
                <th scope="row">Phone address</th>
                <td>{{ loading ? 'Loading...' : author.phone_number || 'Nill'}}</td>
            </tr>
            <tr>
                <th scope="row">Address</th>
                <td>{{loading ? 'Loading...' : author.address || 'NA'}}</td>
            </tr>
            <tr v-if="(!loading)">
                <td colspan="2">
                    <div class="d-flex justify-content-end">
                        <router-link :to="{ name: 'author-edit', params: {id: this.$route.params.id} }"
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
        author: {}
    }),
    mounted() {
        this.axios.get('author/' + this.$route.params.id)
            .then(response => {
                const responseData = response.data;
                if (responseData.status === "OK" && responseData.code === 200) {
                    this.author = responseData?.data;
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
    methods: {
        destroy() {
            this.loading = true;
            this.axios.delete('author/' + this.$route.params.id)
            .then(response => {
                const responseData = response.data;
                if (responseData.status === "OK" && responseData.code === 200) {
                    this.$router.push({ name: "author-list" });
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