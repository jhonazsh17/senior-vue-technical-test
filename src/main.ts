import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import './style.css'
import 'primevue/resources/themes/lara-light-green/theme.css'
import App from './App.vue';
import { store } from './store';

const app = createApp(App);
app.use(PrimeVue);
app.use(store);

app.mount('#app')
