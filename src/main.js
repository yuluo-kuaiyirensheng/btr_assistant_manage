// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import VueCookies from 'vue-cookies'
import AFTableColumn from 'af-table-column'

import {
  Icon,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Tooltip,
  Popover,
  Breadcrumb,
  BreadcrumbItem,
  Input,
  Button,
  Form,
  FormItem,
  Table,
  TableColumn,
  Link,
  Dialog,
  Select,
  Option,
  Pagination,
  DatePicker,
  Loading,
  Message,
  MessageBox,
} from 'element-ui';

Vue.use(Icon);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Tooltip);
Vue.use(Popover);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Input);
Vue.use(Button);
Vue.use(Form);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Link);
Vue.use(Dialog);
Vue.use(Select);
Vue.use(Option);
Vue.use(Pagination);
Vue.use(FormItem);
Vue.use(Loading);
Vue.use(DatePicker);

Vue.prototype.$message = Message;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;

Vue.use(VueCookies);

Vue.use(AFTableColumn);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
})
