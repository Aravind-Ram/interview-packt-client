<template>
    <div class="row g-5 justify-content-center">
        <div class="col-md-7 col-lg-8">
            <div class="card">
                <div class="card-header">
                    <h5 class="card-title">Create Book</h5>
                </div>
                <div class="card-body">
                    <BookForm ref="authorForm"/>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import BookForm from './BookForm.vue';
export default {
    name: "Create Book",
    components: {
        BookForm
    }    
}
</script>