<template>
    <form class="needs-validation" @submit.prevent="onSubmit">
        <div class="row g-3">
            <div class="col-sm-6">
                <label for="genre_name" class="form-label">Genre name</label>
                <input type="text" class="form-control" :class="formErrors.genre_name && 'is-invalid'" id="genre_name"
                    placeholder="Genre name" v-model="formData.genre_name">
                <div class="invalid-feedback">
                    {{formErrors.genre_name}}
                </div>
            </div>
                <div class="col-sm-6">
                <label for="description" class="form-label">Description</label>
                <textarea type="text" class="form-control" :class="formErrors.description && 'is-invalid'" id="description"
                    placeholder="Description" v-model="formData.description"></textarea>
                <div class="invalid-feedback">
                    {{formErrors.description}}
                </div>
            </div>
        </div>
        <hr class="my-4">
        <div class="row g-3">
            <div class="col-sm-6">
                <button class="btn btn-primary" type="submit" :disabled="loading">
                    <template v-if="loading">
                        <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                        Loading...
                    </template>
                    <template v-else>Save & Submit</template>
                </button>
            </div>
        </div>
    </form>
</template>
<script>
import toastr from "toastr";
export default {
    name: "Genre Form",
    data() {
        return {
            loading: false,
            formData: {
                genre_name: '',
                description: '',
            },
            formErrors: {
                genre_name: '',
                description: '',
            }
        }
    },
    mounted() {
        if (this.$route.params.id) {
            this.loading = true;
            this.axios.get('genre/' + this.$route.params.id)
                .then(response => {
                    const responseData = response.data;
                    if (responseData.status === "OK" && responseData.code === 200) {
                        this.formData = responseData.data;
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
    },
    methods: {
        onSubmit(e) {
            e.preventDefault()
            this.loading = true;
            let request = this.axios.post('genre', this.formData)
            if (this.$route.params.id) {
                request = this.axios.put('genre/' + this.$route.params.id, this.formData);
            }
            request.then(response => {
                const responseData = response.data;
                if (responseData.status === "OK" && responseData.code === 200) {
                    toastr.success(responseData.message, 'Welldone!');
                    this.$router.push({ name: 'genre-list' });
                }
            })
            .catch(err => {
                const response = err.response?.data;
                if (err.response.status === 422 && response.code === 422) {
                    this.formErrors = response.data;
                } else if (response && err.response.status === 404 && response.code === 404) {
                    toastr.error(response.message, 'Something went Wrong!.');
                }
            })
            .finally(() => this.loading = false)
        }
    }
}
</script>