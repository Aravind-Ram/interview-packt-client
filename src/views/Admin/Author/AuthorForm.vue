<template>
    <form class="needs-validation" @submit.prevent="onSubmit">
        <div class="row g-3">
            <div class="col-sm-6">
                <label for="author_name" class="form-label">Author name</label>
                <input type="text" class="form-control" :class="formErrors.author_name && 'is-invalid'" id="author_name"
                    placeholder="Author name" v-model="formData.author_name">
                <div class="invalid-feedback">
                    {{formErrors.author_name}}
                </div>
            </div>

            <div class="col-sm-6">
                <label for="email" class="form-label">Email address</label>
                <input type="email" class="form-control" :class="formErrors.email && 'is-invalid'" id="email"
                    placeholder="Email address" v-model="formData.email">
                <div class="invalid-feedback">
                    {{formErrors.email}}
                </div>
            </div>

            <div class="col-sm-6">
                <label for="phone_number" class="form-label">Phone Number</label>
                <input type="text" class="form-control" :class="formErrors.phone_number && 'is-invalid'"
                    id="phone_number" placeholder="Phone number" v-model="formData.phone_number">
                <div class="invalid-feedback">
                    {{formErrors.phone_number}}
                </div>
            </div>

            <div class="col-sm-6">
                <label for="address" class="form-label">Address</label>
                <textarea type="text" class="form-control" :class="formErrors.address && 'is-invalid'" id="address"
                    placeholder="Address" v-model="formData.address"></textarea>
                <div class="invalid-feedback">
                    {{formErrors.address}}
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
    name: "Author Form",
    data() {
        return {
            loading: false,
            formData: {
                author_name: '',
                email: '',
                phone_number: '',
                address: '',
            },
            formErrors: {
                author_name: '',
                email: '',
                phone_number: '',
                address: '',
            }
        }
    },
    mounted() {
        if (this.$route.params.id) {
            this.loading = true;
            this.axios.get('author/' + this.$route.params.id)
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
            let request = this.axios.post('author', this.formData)
            if (this.$route.params.id) {
                request = this.axios.put('author/' + this.$route.params.id, this.formData);
            }
            request.then(response => {
                const responseData = response.data;
                if (responseData.status === "OK" && responseData.code === 200) {
                    toastr.success(responseData.message, 'Welldone!');
                    this.$router.push({ name: 'author-list' });
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