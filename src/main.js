import { createApp } from 'vue'
import App from './App.vue'
import {router} from './router/router';
import mitt from 'mitt';
import {requiredComponents} from './globalComponents'
import 'ant-design-vue/dist/antd.css';
import 'vue3-toastify/dist/index.css';


// event bus
const emitter = mitt();
const app = createApp(App);
app.config.globalProperties.emitter = emitter;
app.use(router).mount('#app');
registerComponents(app);

//   nhung globalComponents
function registerComponents(app) {
    for(let component of requiredComponents){
      app.component(component.componentName, component.component);
    }
}
