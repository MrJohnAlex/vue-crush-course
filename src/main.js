import { createApp, defineAsyncComponent } from 'vue';
import router from './router.js';
import App from './App.vue';
import store from './store/index.js';
import TheHeader from './component/layout/TheHeader.vue';
import BaseBadge from './component/ui/BaseBadge.vue';
import BaseCard from './component/ui/BaseCard.vue';
import BaseButton from './component/ui/BaseButton.vue';
import BaseSpinner from './component/ui/BaseSpinner.vue';
// import BaseDialog from './component/ui/BaseDialog.vue';

const BaseDialog = defineAsyncComponent(() =>
  import('./component/ui/BaseDialog.vue')
);

const app = createApp(App);
app.component('the-header', TheHeader);
app.component('base-card', BaseCard);
app.component('base-badge', BaseBadge);
app.component('base-button', BaseButton);
app.component('base-spinner', BaseSpinner);
app.component('base-dialog', BaseDialog);
app.use(router);
app.use(store);
app.mount('#app');
