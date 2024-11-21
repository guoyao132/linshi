<template>
  <div class="projectDetails">
    <searchTablePage
      :isBack="true"
      title="项目列表"
      :searchList="searchList"
      :tableHeader="tableHeader"
      :tableData="tableData"
      :tableTotal="tableTotal"
      @changeTableList="changeTableList"
    >
      <template #actionCol="{row}">
        <span class="risk-table-btn" @click="goDetails(row)">项目总览</span>
      </template>

      <template #singleProjectDetailsType="{row, prop}">
        {{ typeObject.single_project_details_type[row[prop]] }}
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
import {ref, onMounted} from "vue";
import {getDictByType, queryProject} from "@/api/risMap";
import {useRoute, useRouter} from 'vue-router'
const route = useRoute()
const router = useRouter()
const searchList: any = ref([
  {
    label: '项目名称',
    type: 'input',
    prop: 'singleProjectName',
    placeholder: '请输入',
    width: '30%',
    value: route.query.searchText || ''
  },
  {
    label: '项目编号',
    type: 'input',
    prop: 'singleProjectCode',
    placeholder: '请输入',
    width: '30%',
  },
  {
    label: '单项明细类型',
    type: 'select',
    prop: 'singleProjectDetailsType',
    placeholder: '请输入',
    width: '30%',
    options: []
  }
]);
const tableHeader:any = [
  {
    label: '单项工程名称',
    prop: 'singleProjectName',
  },
  {
    label: '单项工程编号',
    prop: 'singleProjectCode',
    bold: true,
  },
  {
    label: '单项明细类型',
    prop: 'singleProjectDetailsType',
    slot: 'singleProjectDetailsType',
  },
  {
    label: '项目规模',
    prop: 'projectSize',
  },
  {
    label: '线路长度',
    prop: 'constructionLineLength',
  },
  {
    label: '变电容量',
    prop: 'constrTransformerCapacity',
  },
  {
    label: '工程状态',
    prop: 'status',
    slot: "status",
  },
  {
    label: '是否在施',
    prop: 'constructionStatus',
  },
  {
    label: '操作',
    prop: 'action',
    width: 100
  }
]
const tableData = ref([]);
const tableTotal = ref(0);
onMounted(() => {
})
const statusArr = [
  '待建',
  '待建',
  '在施',
  '停工',
  '投产',
]
const changeTableList = (current:number, size:number, searchForm: any) => {
  tableData.value = [];
  queryProject({
    pageNum: current,
    pageSize: size,
    ...searchForm,
    actualStartDate: route.query.actualStartDate || null,
    buildUnit: route.query.buildUnit || null,
  }).then(res => {
    let resultValue = res.resultValue;
    tableData.value = (resultValue.list || []).map(v => {
      return {
        ...v,
        status: statusArr[Number(v.status)] || v.status,
        constructionStatus: Number(v.constructionStatus) === 0 ? '施工' : '暂停',
        projectSize: v.constructionLineLength || v.constrTransformerCapacity,
        constructionLineLength: v.constructionLineLength || '/',
        constrTransformerCapacity: v.constrTransformerCapacity || '/',
      }
    });
    tableTotal.value = resultValue.total || 0;
  })
}

let typeArr = [
  {
    type: 'single_project_details_type',
    index: 2,
  },
]
let typeObject = ref({
  single_project_details_type: {},
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

const goDetails = (row) => {
  router.push({
    path: '/team/teamProject',
    query: {
      singleProjectCode: row.singleProjectCode,
      provinceCode: row.provinceCode,
    }
  })
}
</script>

<style lang='scss' scoped>
.projectDetails {
  height: 100%;
}
</style>
