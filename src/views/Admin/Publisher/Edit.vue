<template>
    <div class="row g-5 justify-content-center">
        <div class="col-md-7 col-lg-8">
            <div class="card">
                <div class="card-header">
                    <h5 class="card-title">Edit Publisher</h5>
                </div>
                <div class="card-body">
                    <PublisherForm ref="publisherForm"/>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import PublisherForm from './PublisherForm.vue';
export default {
    name: "Edit Author",
    components: {
        PublisherForm    
    }
}
</script>