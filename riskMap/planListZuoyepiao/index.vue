<template>
  <div class="planListZuoyepiao">
    <searchTablePage
      :isBack="true"
      :title="title"
      :searchList="searchList"
      :tableHeader="tableHeader"
      :tableData="tableData"
      @changeTableList="changeTableList"
    >
      <template #actionCol>
        <span class="risk-table-btn" @click="showDetailsFun('/riskMap/zypDetails')">查看</span>
        <span class="risk-table-btn"  @click="showDetailsFun('/riskMap/planListBanzhanhui')">站班会</span>
      </template>
    </searchTablePage>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from "vue";
import {useRouter} from 'vue-router'
const router = useRouter();
const emit = defineEmits(['goBackFun']);
const title = ref('施工作业票')
const searchList: any = ref([
  {
    label: '省公司',
    type: 'select',
    prop: 'unit',
    placeholder: '请输入',
    width: '25%',
    options: []
  },
  {
    label: '建管单位',
    type: 'select',
    prop: 'unit',
    placeholder: '请输入',
    width: '25%',
    options: []
  },
  {
    label: '项目名称',
    type: 'select',
    prop: 'unit',
    placeholder: '请输入',
    width: '25%',
    options: []
  },
]);
const tableHeader:any = [
  {
    label: '建设单位',
    prop: 'unit',
    bold: true,
    width: 150
  },
  {
    label: '建立单位',
    prop: 'num1',
  },
  {
    label: '施工单位',
    prop: 'num5',
  },
  {
    label: '单项工程名称',
    prop: 'num6',
  },
  {
    label: '作业票名称',
    prop: 'num7',
  },
  {
    label: '作业票状态',
    prop: 'num8',
  },
  {
    label: '是否暂停',
    prop: 'num9',
  },
  {
    label: '风险等级',
    prop: 'num10',
  },
  {
    label: '施工人数',
    prop: 'num10',
  },
  {
    label: '班组负责人',
    prop: 'num10',
  },
  {
    label: '操作',
    prop: 'action',
    width: 150
  }
]
const tableData = ref([
  {
    "unit": "北京",
    "num1": 21884,
    "num2": 13626,
    "num3": 5524,
    "num4": 936,
    "num5": 1798,
    "num6": 6189,
    "num7": 63,
    "num8": '89.95%',
    "num9": 2505,
    "num10": '91.45%',
  },
  {
    "unit": "北京城区",
    "num1": 313,
    "num2": 249,
    "num3": 42,
    "num4": 8,
    "num5": 14,
    "num6": 144,
    "num7": 0,
    "num8": "-",
    "num9": 52,
    "num10": '96.15%',
  },
  {
    "unit": "北京通州",
    "num1": 106,
    "num2": 96,
    "num3": 5,
    "num4": 1,
    "num5": 7,
    "num6": 37,
    "num7": 1,
    "num8": "100.00%",
    "num9": 3,
    "num10": '83.33%',
  },
  {
    "unit": "北京朝阳",
    "num1": 503,
    "num2": 440,
    "num3": 32,
    "num4": 8,
    "num5": 23,
    "num6": 129,
    "num7": 2,
    "num8": "100.00%",
    "num9": 22,
    "num10": '100.00%',
  },
  {
    "unit": "北京海淀",
    "num1": 80,
    "num2": 12,
    "num3": 47,
    "num4": 7,
    "num5": 14,
    "num6": 30,
    "num7": 1,
    "num8": '100.00%',
    "num9": 16,
    "num10": '93.75%',
  },
  {
    "unit": "北京丰台",
    "num1": 268,
    "num2": 121,
    "num3": 9,
    "num4": 10,
    "num5": 17,
    "num6": 76,
    "num7": 0,
    "num8": '-',
    "num9": 34,
    "num10": '95.59%',
  },
  {
    "unit": "北京石景山",
    "num1": 797,
    "num2": 678,
    "num3": 3,
    "num4": 90,
    "num5": 26,
    "num6": 216,
    "num7": 0,
    "num8": '-',
    "num9": 78,
    "num10": '82.69%',
  },
  {
    "unit": "北京亦庄",
    "num1": 327,
    "num2": 202,
    "num3": 20,
    "num4": 9,
    "num5": 6,
    "num6": 68,
    "num7": 0,
    "num8": '-',
    "num9": 2,
    "num10": '100.00%',
  },
])
onMounted(() => {
  searchList.value[0].options = [
    {
      label: '单位1',
      value: "1"
    },
    {
      label: '单位2',
      value: "2"
    },
    {
      label: '单位3',
      value: "3"
    },
  ]
})
const currentRef = ref(1);
const changeTableList = (current:number, size:number, searchForm: any) => {
  currentRef.value = current;
}

const showDetailsFun = (path:string) => {
  router.push(path)
}

</script>

<style lang='scss' scoped>
.planListZuoyepiao {
  height: 100%;
}
</style>
