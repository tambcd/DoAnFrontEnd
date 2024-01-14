import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router/router';
import mitt from 'mitt';
import { requiredComponents } from './globalComponents'
import 'ant-design-vue/dist/antd.css';
import 'vue3-toastify/dist/index.css';
import "@grapecity/spread-sheets-vue";
import '@grapecity/spread-sheets-io';
import '@grapecity/spread-sheets-shapes';
import '@grapecity/spread-sheets-slicers';
import "@grapecity/spread-sheets-tablesheet";
import "@grapecity/spread-sheets-ganttsheet";
import '@grapecity/spread-sheets-pdf';
import 'chart.js';



// event bus
const emitter = mitt();
const app = createApp(App);
app.config.globalProperties.emitter = emitter;
app.use(router).mount('#app');
registerComponents(app);

//   nhung globalComponents
function registerComponents(app) {
  for (let component of requiredComponents) {
    app.component(component.componentName, component.component);
  }
}
