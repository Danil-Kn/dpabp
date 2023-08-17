import { createApp } from 'vue'
import router from './router/index'
import App from './App.vue'
import Modals from './plugins/modals'

import './style.css'

createApp(App).use(router).use(Modals).mount('#app')