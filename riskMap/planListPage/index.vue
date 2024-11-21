<template>
  <div class="projectDetails">
    <searchTablePage
      :isBack="true"
      title="日计划一本账"
      :searchList="searchList"
      :tableHeader="tableHeader"
      :tableData="tableData"
      :tabsList="tabsList"
      :tableTotal="tableTotal"
      :defaultTabsActive="defaultTabsActive"
      @changeTabs="changeTabs"
      @changeTableList="changeTableList"
    >
      <template #actionCol="{row, index}">
        <span class="risk-table-btn" @click="showDetailsFun('/riskMap/zypDetails')">作业票</span>
        <span class="risk-table-btn" @click="showDetailsFun('/riskMap/planListBanzhanhui')">站班会</span>
      </template>
      <template #reAssessmentRiskLevelt="{row, prop}">
        {{ typeObject.re_assessment_risk_level[row[prop]] }}
      </template>
      <template #status="{row, prop}">
        <span
          :class="['risk-table-status', {'risk-table-status-err': row[prop] === '未执行'}]">
          {{row[prop]}}
        </span>
      </template>
    </searchTablePage>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, computed} from "vue";
import {useRouter, useRoute} from 'vue-router'
import {getTaskPage, getDictByType} from "@/api/risMap";
const router = useRouter();
const route = useRoute()
const searchList: any = ref([
  {
    label: '省公司',
    type: 'select',
    prop: 'provinceCode',
    placeholder: '请选择省公司',
    width: '23%',
    options: []
  },
  // {
  //   label: '建管单位',
  //   type: 'select',
  //   prop: 'buildUnitCode',
  //   placeholder: '请选择',
  //   width: '23%',
  //   options: []
  // },
  {
    label: '项目名称',
    type: 'input',
    prop: 'singleProjectName',
    placeholder: '请输入标段',
    width: '23%',
    value: route.query.searchText || ''
  },
  {
    label: '选择计划时间',
    type: 'date',
    prop: 'plannedStartDate',
    placeholder: '请选择',
    valueFormat: 'YYYY-MM-DD',
    width: '23%',
    options: []
  },
  {
    label: '风险复测等级',
    type: 'select',
    prop: 'reAssessmentRiskLevelt',
    placeholder: '请选择',
    width: '23%',
    options: []
  },
]);
const tableHeader:any = [
  {
    label: '省公司',
    prop: 'provinceName',
  },
  {
    label: '单项工程名称',
    prop: 'singleProjectName',
  },
  {
    label: '标段名称',
    prop: 'biddingSectionName',
  },
  {
    label: '班组',
    prop: 'workingTeamName',
  },
  // {
  //   label: '建设管理',
  //   prop: 'buildUnitName',
  // },
  {
    label: '工序',
    prop: 'workProcedure',
  },
  {
    label: '作业部门',
    prop: 'workSiteName',
  },
  {
    label: '风险等级',
    prop: 'reAssessmentRiskLevelt',
    slot: "reAssessmentRiskLevelt"
  },
  {
    label: '跨天计划',
    prop: 'workOvernightFlag',
  },
  {
    label: '执行状态',
    prop: 'exec_status',
    slot: "status"
  },
  {
    label: '操作',
    prop: 'action',
    width: 200
  }
]
const tableData = ref([])
const tableTotal = ref(0)
onMounted(() => {
})

const showDetailsFun = (path:string) => {
  router.push(path)
}

const tabsList = [
  {
    label: '常规',
    value: '0',
  },
  {
    label: '特高压',
    value: '1',
  },
]
const changeTabs = (activeName: string) => {
  tableTotal.value = 0;
  tabsActiveName.value = activeName;
}
const defaultTabsActive = '0';
const tabsActiveName = ref(defaultTabsActive);
const changeTableList = (current:number, size:number, searchForm: any) => {
  tableData.value = [];
  getTaskPage({
    pageNum: current,
    pageSize: size,
    ...searchForm,
    huvFlag: tabsActiveName.value
  }).then(res => {
    let resultValue = res.resultValue;
    tableData.value = (resultValue.list || []).map(v => {
      return {
       ...v,
        exec_status: Number(v.exec_status) === 0 ? '未执行' : Number(v.exec_status) === 1 ? '已执行' : '已取消',
        workOvernightFlag: Number(v.workOvernightFlag) === 0 ? '否' : '是',
      }
    });
    tableTotal.value = resultValue.total || 0;
  })
}

let typeArr = [
  {
    type: 'province_code',
    index: 0,
  },
  {
    type: 're_assessment_risk_level',
    index: 3,
  },
]
let typeObject = ref({
  province_code: {},
  re_assessment_risk_level: {},
})
typeArr.forEach(item => {
  getDictByType({
    type: item.type,
  }).then(res => {
    let arr = res.resultValue || [];
    searchList.value[item.index].options = arr;
    let obj = {};
    arr.forEach(item => {
      obj[item.value] = item.label;
    })
    typeObject.value[item.type] = obj;
  })
})
</script>

<style lang='scss' scoped>
.projectDetails {
  height: 100%;
}
</style>
