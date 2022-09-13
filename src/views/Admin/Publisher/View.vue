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
                <th scope="row">Publisher name</th>
                <td>{{ loading ? 'Loading...' : publisher.publisher_name || 'Nill' }}</td>
            </tr>
            <tr>
                <th scope="row">Email Address</th>
                <td>{{ loading ? 'Loading...' : publisher.email || 'Nill'}}</td>
            </tr>
            <tr>
                <th scope="row">Phone address</th>
                <td>{{ loading ? 'Loading...' : publisher.phone_number || 'Nill'}}</td>
            </tr>
            <tr>
                <th scope="row">Address</th>
                <td>{{loading ? 'Loading...' : publisher.address || 'NA'}}</td>
            </tr>
            <tr v-if="(!loading)">
                <td colspan="2">
                    <div class="d-flex justify-content-end">
                        <router-link :to="{ name: 'publisher-edit', params: {id: this.$route.params.id} }"
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
        publisher: {}
    }),
    mounted() {
        this.axios.get('publisher/' + this.$route.params.id)
            .then(response => {
                const responseData = response.data;
                if (responseData.status === "OK" && responseData.code === 200) {
                    this.publisher = responseData?.data;
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
    },
    methods: {
        destroy() {
            this.loading = true;
            this.axios.delete('publisher/' + this.$route.params.id)
            .then(response => {
                const responseData = response.data;
                if (responseData.status === "OK" && responseData.code === 200) {
                    this.$router.push({ name: "publisher-list" });
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