<template>
    <div class="row g-5 justify-content-center">
        <div class="col-md-7 col-lg-8">
            <div class="card">
                <div class="card-header">
                    <h5 class="card-title">Create Genre</h5>
                </div>
                <div class="card-body">
                    <GenreForm ref="publisherForm"/>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import GenreForm from './GenreForm.vue';
export default {
    name: "Create Publisher",
    components: {
        GenreForm
    }    
}
</script>