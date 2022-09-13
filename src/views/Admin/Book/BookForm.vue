<template>
    <form class="needs-validation" @submit.prevent="onSubmit">
        <div class="row g-3">
            <div class="col-sm-6">
                <label for="title" class="form-label">Book Title</label>
                <input type="text" class="form-control" :class="formErrors.title && 'is-invalid'" id="title"
                    placeholder="Book Title" v-model="formData.title">
                <div class="invalid-feedback">
                    {{formErrors.title}}
                </div>
            </div>

            <div class="col-sm-6">
                <label for="isbn" class="form-label">ISBN</label>
                <input type="text" class="form-control" :class="formErrors.isbn && 'is-invalid'" id="isbn"
                    placeholder="ISBN" v-model="formData.isbn">
                <div class="invalid-feedback">
                    {{formErrors.isbn}}
                </div>
            </div>

            <div class="col-sm-6">
                <label for="author_id" class="form-label">Author</label>
                <select class="form-select" v-model="formData.author_id" :class="formErrors.isbn && 'is-invalid'">
                    <option v-for="(item) in authors" :value="item.uuid">{{item.author_name}}</option>
                </select>
                <div class="invalid-feedback">
                    {{formErrors.author_id}}
                </div>
            </div>

            <div class="col-sm-6">
                <label for="genre_id" class="form-label">Genra</label>
                <select class="form-select" v-model="formData.genre_id" :class="formErrors.genre_id && 'is-invalid'">
                    <option v-for="(item) in genres" :value="item.uuid">{{item.genre_name}}</option>
                </select>
                <div class="invalid-feedback">
                    {{formErrors.genre_id}}
                </div>
            </div>

            <div class="col-sm-6">
                <label for="publisher_id" class="form-label">Publisher</label>
                <select class="form-select" v-model="formData.publisher_id"
                    :class="formErrors.publisher_id && 'is-invalid'">
                    <option v-for="(item) in publishers" :value="item.uuid">{{item.publisher_name}}</option>
                </select>
                <div class="invalid-feedback">
                    {{formErrors.publisher_id}}
                </div>
            </div>

            <div class="col-sm-6">
                <label for="publisher_id" class="form-label">Published At</label>
                <Datepicker v-model="formData.published_at" autoApply :closeOnAutoApply="true" :format="format" />
                <div class="invalid-feedback">
                    {{formErrors.publisher_id}}
                </div>
            </div>

            <div class="col-sm-6">
                <label for="gallery_id" class="form-label">Image</label>
                <input type="file" class="form-control" :class="formErrors.gallery_id && 'is-invalid'"
                    @change="onFileChanged($event)" accept="image/*" capture />
                <div class="invalid-feedback">
                    {{formErrors.gallery_id}}
                </div>
            </div>

            <div class="col-sm-6">
                <label for="description" class="form-label">Description</label>
                <textarea class="form-control" v-model="formData.description"
                    :class="formErrors.description && 'is-invalid'"></textarea>
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
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default {
    name: "BookForm",
    components: { Datepicker },
    data() {
        return {
            loading: false,
            authors: [],
            genres: [],
            publishers: [],
            formData: {
                title: '',
                author_id: '',
                genre_id: '',
                publisher_id: '',
                description: '',
                isbn: '',
                gallery_id: '',
                published_at: '',
            },
            formErrors: {
                title: '',
                author_id: '',
                genre_id: '',
                publisher_id: '',
                description: '',
                isbn: '',
                gallery_id: '',
                published_at: '',
            }
        }
    },
    mounted() {
        if (this.$route.params.id) {
            this.loading = true;
            this.axios.get('book/' + this.$route.params.id)
                .then(response => {
                    const responseData = response.data;
                    if (responseData.status === "OK" && responseData.code === 200) {  
                        let spreadData = {...responseData.data, published_at: new Date(responseData.data.published_date) };
                        this.formData = spreadData;
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
        this.loadAuthor();
        this.loadGenres();
        this.loadPublishers();
    },
    methods: {
        format(date) {
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            return `${day}-${month}-${year}`;
        },
        onFileChanged(e) {
            let formData = new FormData();
            formData.append('file_path', e.target.files[0]);
            formData.append('uuid', this.formData.gallery_id);
            this.axios.post('gallery', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(response => {
                    const responseData = response.data;
                    if (responseData.status === "OK" && responseData.code === 200) {
                        this.formData.gallery_id = responseData.data.uuid;
                    }
                })
                .catch(err => {
                    const response = err.response?.data;
                    if (response && err.response.status === 404 && response.code === 404) {
                        toastr.error(response.message, 'Something went Wrong!.');
                    }
                })
        },
        loadAuthor() {
            this.axios.get('author-options')
                .then(response => {
                    const responseData = response.data;
                    if (responseData.status === "OK" && responseData.code === 200) {
                        this.authors = responseData.data;
                    }
                })
                .catch(err => {
                    const response = err.response?.data;
                    if (response && err.response.status === 404 && response.code === 404) {
                        toastr.error(response.message, 'Something went Wrong!.');
                    }
                })
        },
        loadPublishers() {
            this.axios.get('publisher-options')
                .then(response => {
                    const responseData = response.data;
                    if (responseData.status === "OK" && responseData.code === 200) {
                        this.publishers = responseData.data;
                    }
                })
                .catch(err => {
                    const response = err.response?.data;
                    if (response && err.response.status === 404 && response.code === 404) {
                        toastr.error(response.message, 'Something went Wrong!.');
                    }
                })
        },
        loadGenres() {
            this.axios.get('genre-options')
                .then(response => {
                    const responseData = response.data;
                    if (responseData.status === "OK" && responseData.code === 200) {
                        this.genres = responseData.data;
                    }
                })
                .catch(err => {
                    const response = err.response?.data;
                    if (response && err.response.status === 404 && response.code === 404) {
                        toastr.error(response.message, 'Something went Wrong!.');
                    }
                })
        },
        onSubmit(e) {
            e.preventDefault()
            this.loading = true;
            if (this.$route.params.id) {
                var request = this.axios.put('book/' + this.$route.params.id, this.formData);
            } else {
                var request = this.axios.post('book', this.formData);
            }
            request.then(response => {
                const responseData = response.data;
                if (responseData.status === "OK" && responseData.code === 200) {
                    toastr.success(responseData.message, 'Welldone!');
                    this.$router.push({ name: 'book-list' });
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