<template>
    <div class="row g-5 justify-content-center">
        <div class="col-md-7 col-lg-8">
            <div class="card">
                <div class="card-header">
                    <h5 class="card-title">Edit Genre</h5>
                </div>
                <div class="card-body">
                    <GenreForm ref="genreForm"/>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import GenreForm from './GenreForm.vue';
export default {
    name: "Edit Author",
    components: {
        GenreForm
    }
}
</script>