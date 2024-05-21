import { createApp } from 'vue'
import App from './main/App.vue'
import router from './main/router'
import store from './main/store'
import './main/assets/main.css'


createApp(App)
.use(router)
.use(store)
.mount('#app')
