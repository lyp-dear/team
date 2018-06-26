import Vue from 'vue'
import App from './App'
import { Button, Cell, Field, Picker, Popup, Navbar, TabItem, TabContainer, TabContainerItem } from 'mint-ui'
import router from './router'
Vue.config.productionTip = false
Vue.component(Button.name, Button)
Vue.component(Cell.name, Cell)
Vue.component(Field.name, Field);
Vue.component(Picker.name, Picker);
Vue.component(Popup.name, Popup);
Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	render: h => h(App)
})