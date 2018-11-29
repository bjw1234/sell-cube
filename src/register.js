import Vue from 'vue';
import { createAPI } from 'cube-ui';
import HeaderDetail from 'components/header-detail/header-detail';

// 使用命令式的方式注册组件
createAPI(Vue, HeaderDetail);
