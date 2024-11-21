<template>
  <div class="weatherListPage">
    <searchTablePage
      :isBack="true"
      title="气候预警统计"
      :searchList="searchList"
      :tableHeader="tableHeader"
      :tableData="tableData"
      :tableTotal="tableTotal"
      @changeTableList="changeTableList"
    >
      <template #actionCol="{row}">
        <span class="risk-table-btn" @click="goProjectList(row)">查看</span>
      </template>
      <template #earlyWarning="{row}">
        <template v-for="(item, index) in row.earlyWarning" :key="'w' + index">
          <img class="wearther-img" :src="getWeatherImgByName(item)" />
          {{ item }}
        </template>
      </template>
      <template #details="{row}">
        <template v-for="(item, index) in row.details" :key="'w' + index">
          <img class="wearther-img" :src="getWeather1ImgByName(item)" />
          {{ item }}
        </template>
      </template>
    </searchTablePage>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, computed, inject, watch} from "vue";
import {getWeatherImgByName} from "@/components/riskMap/components/weatherObj.ts";
import {getWeatherImgByName as getWeather1ImgByName} from "@/components/riskMap/components/weather1Obj.ts";
import {getWeatherWarningAGG} from "@/api/risMap";
import {formatTime} from '@/utils/riskMap'
import {useRouter} from 'vue-router'

const router = useRouter()
const searchList: any = ref([
  {
    label: '选择月份',
    type: 'date',
    prop: 'date',
    placeholder: '请选择月份',
    width: '25%',
    value: new Date('2024-05-27'),
  },
]);
const tableHeader:any = [
  {
    label: '省份',
    prop: 'province',
    bold: true,
    width: 150
  },
  {
    label: '预警类型',
    prop: 'vsignaltypeCn',
  },
  {
    label: '预警发布次数',
    prop: 'num',
  },
  {
    label: '预警详情',
    prop: 'vissuetitle',
  },
  {
    label: '受影响工程数量',
    prop: 'projectNum',
  },
  {
    label: '查看工程详情',
    prop: 'action',
    width: 200
  }
]
const tableData = ref([
  {
    province: '北京',
    earlyWarning: '暴雨,雷电',
    earlyWarningNum: '2',
    shijiNum: '2',
    accuracy: '100%',
    details: '大风,雷电',
    projectNum: '10',
  },
  {
    province: '天津',
    earlyWarning: '暴雨,高温',
    earlyWarningNum: '3',
    shijiNum: '2',
    accuracy: '67.67',
    details: '大风,高温',
    projectNum: '22',
  },
  {
    province: '河北',
    earlyWarning: '暴雨,雷电',
    earlyWarningNum: '2',
    shijiNum: '2',
    accuracy: '100%',
    details: '大风,雷电',
    projectNum: '20',
  },
  {
    province: '山东',
    earlyWarning: '暴雨,大风',
    earlyWarningNum: '4',
    shijiNum: '3',
    accuracy: '75%',
    details: '大风',
    projectNum: '22',
  },
  {
    province: '山西',
    earlyWarning: '暴雨,雷电',
    earlyWarningNum: '5',
    shijiNum: '4',
    accuracy: '80%',
    details: '暴雨',
    projectNum: '10',
  },
])
const tableTotal = ref(0)
let searchFormDate = '';
const changeTableList = (current:number, size:number, searchForm: any) => {
  tableData.value = [];
  searchFormDate = formatTime(searchForm.date, 'ymd');
  getWeatherWarningAGG({
    date: searchFormDate,
  }).then(res => {
    let resultValue = res.resultValue || {};
    tableData.value = (resultValue.list || []).map(v => {
      return {
        ...v,
      }
    });
    tableTotal.value = resultValue.total || 0;
  })
}

const goProjectList = (item) => {
  router.push({
    path: '/riskMap/projectListPage',
    query: {
      actualStartDate: searchFormDate,
      buildUnit: item.buildUnit,
    }
  })
}

</script>

<style lang='scss' scoped>
.weatherListPage {
  height: 100%;

  .wearther-img{
    margin: 0 5px;
  }
}
</style>
