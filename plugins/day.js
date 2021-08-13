import Vue from 'vue';
import dayjs from 'dayjs';

const dateFormat = (date, format) => {
  return date ? dayjs(date).format(format) : ""
}

const timePlugin = {
  install(Vue) {
    Vue.prototype.$dayjs = dateFormat;
  }
}

Vue.use(timePlugin)