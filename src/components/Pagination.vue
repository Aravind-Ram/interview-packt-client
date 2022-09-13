<template>
    <div class="d-flex justify-content-end">
        <div style="margin-top: 0.3rem;">
            Showing {{meta.current_items}} of {{meta.total}} &nbsp;
        </div>
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item" :class="(meta.current_page <= 1) ? 'disabled' : ''">
                    <button class="page-link" @click="togglePage(1)" type="button">First</button>
                </li>
                <li class="page-item" v-for="index in meta.last_page"
                    :class="(meta.current_page === index) ? 'disabled' : ''" :key="index">
                    <button class="page-link" @click="togglePage(index)" type="button">{{index}}</button>
                </li>
                <li class="page-item" :class="(meta.current_page >= meta.last_page) ? 'disabled' : ''">
                    <button class="page-link" @click="togglePage(meta.last_page)" type="button">Last</button>
                </li>
            </ul>
        </nav>
    </div>
</template>
<script>
    export default{
        props: {
            meta: Object,
            togglePage: { type: Function }
        }
    }
</script>