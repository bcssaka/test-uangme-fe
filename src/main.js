import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';

const app = createApp(App);

// Set up Axios defaults using environment variable
axios.defaults.baseURL = process.env.VUE_APP_API_URL;
const token = localStorage.getItem('token');
if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

app.use(router);
app.mount('#app');
