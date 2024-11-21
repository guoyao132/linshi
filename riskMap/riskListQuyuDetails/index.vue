<template>
  <div class="riskListDetails">
    <searchTablePage
      :class="{'riskListDetails-table-first-tr-bold': currentRef === 1}"
      :isBack="true"
      :goBackFun="goBackFun"
      :title="title"
      :searchList="searchList"
      :tableHeader="tableHeader"
      :tableData="tableData"
      @changeTableList="changeTableList"
    >
      <template #actionCol>
        <span class="risk-table-btn">查看</span>
      </template>
    </searchTablePage>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, computed} from "vue";
const props = defineProps({
  detailsRow: {
    type: Object,
    default: () => {
      return {};
    }
  }
})
const title = computed(() => {
  return props.detailsRow.unit + '风险作业统计详情';
})
const emit = defineEmits(['goBackFun']);
const searchList: any = ref([
  {
    label: '单项工程名称',
    type: 'input',
    prop: 'unit',
    placeholder: '请输入单项工程名称',
    width: '25%',
  },
  {
    label: '选择日期',
    type: 'date',
    prop: 'name',
    placeholder: '请选择日期',
    width: '25%',
  },
]);
const tableHeader:any = [
  {
    label: '单项工程名称',
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
    "unit": "北京城区",
    "num1": 7,
    "num2": 5,
    "num3": 0,
    "num4": 0,
    "num5": 2,
    "num6": 2,
    "num7": 0,
    "num8": '-',
    "num9": 2,
    "num10": '50%',
  },
  {
    "unit": "国网北京城区供电公司赵登禹110千伏输变电工程送电工程",
    "num1": 7,
    "num2": 5,
    "num3": 0,
    "num4": 0,
    "num5": 2,
    "num6": 2,
    "num7": 0,
    "num8": "-",
    "num9": 2,
    "num10": '50%',
  },
])
onMounted(() => {
})
const currentRef = ref(1);
const changeTableList = (current:number, size:number, searchForm: any) => {
  currentRef.value = current;
}
const goBackFun = () => {
  emit('goBackFun');
}
</script>

<style lang='scss' scoped>
.riskListDetails {
  height: 100%;
}

.riskListDetails-table-first-tr-bold{
  :deep(.el-table){
    .el-table__row:first-child{
      td:not(:last-child){
        font-weight: bold;
      }
    }
  }
}
</style>
