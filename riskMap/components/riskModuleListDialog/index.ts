import {ref} from 'vue'

const title = ref<string>('123TOP10');
const dialogTop = ref('50%');
const dialogLeft = ref('50%');
const dialogRight = ref('');
const dataList = ref([
  {
    name: '广东省',
    value: 8000,
    progress: 100,
  },
  {
    name: '江苏省',
    value: 7500,
    progress: 85,
  },
  {
    name: '浙江省',
    value: 7000,
    progress: 80,
  },
  {
    name: '湖北省',
    value: 6500,
    progress: 75,
  },
  {
    name: '湖南省',
    value: 6000,
    progress: 70,
  },
  {
    name: '江西省',
    value: 5500,
    progress: 65,
  },
  {
    name: '四川省',
    value: 5000,
    progress: 55,
  },
  {
    name: '贵州省',
    value: 4500,
    progress: 50,
  },
  {
    name: '河南省',
    value: 4000,
    progress: 45,
  },
  {
    name: '辽宁省',
    value: 3500,
    progress: 40,
  },
]);
const isShow = ref(false);

export {
  isShow,
  title,
  dialogTop,
  dialogLeft,
  dialogRight,
  dataList,
}
