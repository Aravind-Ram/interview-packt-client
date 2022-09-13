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
                <th scope="row">Book Title</th>
                <td>{{ loading ? 'Loading...' : book.title || 'Nill' }}</td>
            </tr>
            <tr>
                <th scope="row">Book Image</th>
                <td><img :src="book.gallery" width="100"/></td>
            </tr>
            <tr>
                <th scope="row">ISBN</th>
                <td>{{ loading ? 'Loading...' : book.isbn || 'Nill'}}</td>
            </tr>
            <tr>
                <th scope="row">Author</th>
                <td>{{ loading ? 'Loading...' : book.author || 'Nill'}}</td>
            </tr>
            <tr>
                <th scope="row">Genre</th>
                <td>{{loading ? 'Loading...' : book.genre || 'NA'}}</td>
            </tr>
            <tr>
                <th scope="row">Publisher</th>
                <td>{{loading ? 'Loading...' : book.publisher || 'NA'}}</td>
            </tr>
            <tr>
                <th scope="row">Published At</th>
                <td>{{loading ? 'Loading...' : book.published_at || 'NA'}}</td>
            </tr>
            <tr v-if="(!loading)">
                <td colspan="2">
                    <div class="d-flex justify-content-end">
                        <router-link :to="{ name: 'book-edit', params: {id: this.$route.params.id} }"
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
        book: {}
    }),
    mounted() {
        this.axios.get('book/' + this.$route.params.id)
            .then(response => {
                const responseData = response.data;
                if (responseData.status === "OK" && responseData.code === 200) {
                    this.book = responseData?.data;
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
            this.axios.delete('book/' + this.$route.params.id)
            .then(response => {
                const responseData = response.data;
                if (responseData.status === "OK" && responseData.code === 200) {
                    this.$router.push({ name: "book-list" });
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