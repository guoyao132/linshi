<template>
  <div class="riskListPage">
    <searchTablePage
      :class="{'riskListPage-table-first-tr-bold': currentRef === 1}"
      v-show="!showDetails"
      :isBack="true"
      title="风险作业统计"
      :searchList="searchList"
      :tableHeader="tableHeader"
      :tableData="tableData"
      @changeTableList="changeTableList"
    >
      <template #actionCol="{row}">
        <span class="risk-table-btn" @click="showDetailsFun(row)">查看</span>
      </template>
    </searchTablePage>
    <riskListQuyu
      v-show="showDetails"
      :detailsRow="detailsRow"
      @goBackFun="goBackFun"
    />
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from "vue";
const searchList: any = ref([
  // {
  //   label: '省公司',
  //   type: 'select',
  //   prop: 'unit',
  //   placeholder: '请输入',
  //   width: '25%',
  //   options: []
  // },
  {
    label: '选择日期',
    type: 'date',
    prop: 'name',
    placeholder: '请选择日期',
    width: '25%',
  },
  {
    label: '统计范围',
    type: 'select',
    prop: 'unit',
    placeholder: '请输入',
    width: '25%',
    options: [
      {
        label: '全部',
        value: '1',
      },
    ]
  },
]);
const tableHeader:any = [
  {
    label: '单位',
    prop: 'unit',
    bold: true,
    width: 150
  },
  {
    label: '风险计划总数',
    prop: 'num1',
  },
  {
    label: '执行中',
    prop: 'unit',
    children: [
      {
        label: '作业中',
        prop: 'num2',
      },
      {
        label: '作业暂停',
        prop: 'num3',
      },
      {
        label: '作业完工',
        prop: 'num4',
      },
    ]
  },
  {
    label: '未执行',
    prop: 'num5',
  },
  {
    label: '当日站班会数',
    prop: 'num6',
  },
  {
    label: '二级风险执行数',
    prop: 'num7',
  },
  {
    label: '二级到岗到位率',
    prop: 'num8',
  },
  {
    label: '三级风险执行数',
    prop: 'num9',
  },
  {
    label: '三级到岗到位率',
    prop: 'num10',
  },
  {
    label: '操作',
    prop: 'action',
    width: 100
  }
]
const tableData = ref([
  {
    "unit": "全部",
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
    "unit": "北京",
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
    "unit": "天津",
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
    "unit": "河北",
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
    "unit": "冀北",
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
    "unit": "山西",
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
    "unit": "山东",
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
    "unit": "上海",
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
})

const currentRef = ref(1);
const changeTableList = (current:number, size:number, searchForm: any) => {
  currentRef.value = current;
}

const showDetails = ref(false);
const detailsRow = ref({});
const showDetailsFun = (row:any) => {
  detailsRow.value = row;
  showDetails.value = true;
}
const goBackFun = () => {
  showDetails.value = false;
}
</script>

<style lang='scss' scoped>
.riskListPage {
  height: 100%;
}

.riskListPage-table-first-tr-bold{
  :deep(.el-table){
    .el-table__row:first-child{
      td:not(:last-child){
        font-weight: bold;
      }
    }
  }
}
</style>
