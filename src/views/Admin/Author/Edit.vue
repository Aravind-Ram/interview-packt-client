<template>
    <div class="row g-5 justify-content-center">
        <div class="col-md-7 col-lg-8">
            <div class="card">
                <div class="card-header">
                    <h5 class="card-title">Edit Author</h5>
                </div>
                <div class="card-body">
                    <AuthorForm ref="authorForm"/>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import AuthorForm from './AuthorForm.vue';
export default {
    name: "Edit Author",
    components: {
        AuthorForm
    }
}
</script>