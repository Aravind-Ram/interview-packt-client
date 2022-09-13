import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import axios from 'axios';
import VueAxios from 'vue-axios';
import jQuery from "jquery";



// import "./assets/main.css";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'toastr/build/toastr.css';


const app = createApp(App);
window.$ = window.jQuery = jQuery;
app.use(createPinia());
app.use(router);

axios.defaults.baseURL = 'http://127.0.0.1:8000/api/v1/';

app.use(VueAxios, axios);
app.use(jQuery);


app.mount("#app");
