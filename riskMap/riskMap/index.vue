<template>
  <div class="riskMap riskMapFullCon">
    <riskMapLeft/>
    <riskMapCon
      :provinceCode="provinceCode"
      @update:provinceCode="provinceCode = $event"
      :weatherObj="mapWeatherObj"
      @update:weatherObj="mapWeatherObj = $event"
    />
    <riskMapRight/>
    <div class="riskMap-legend">
      <div class="riskMap-legend-item" v-for="(item, index) in showWeatherObj" :key="'legend-' + index"
           @click="showMapWeather(item)">
        <img :src="item.img"  class="riskMap-weather-icon"/>
        {{ item.name }}
      </div>
    </div>
    <weatherAlarmingList :list="list"/>
    <riskModuleListDialog/>
    <div class="riskMap-search-con">
      <el-input
        v-model="searchText"
        style="width: 240px"
        placeholder="请输入搜索关键词"
        @input="searchTextFun"
        :suffix-icon="Search"
      />
      <div class="riskMap-search-con-list" v-show="searchText">
        <div class="riskMap-search-con-item-header" @click="goRouter('/riskMap/projectListPage')">
          <div>工程</div>
          <div><span>{{ searchResultObj.projectNum }}</span></div>
        </div>
        <div class="riskMap-search-con-item-header" @click="goRouter('/riskMap/riskListPage')">
          <div>风险</div>
          <div><span>{{ searchResultObj.precautionNum }}</span></div>
        </div>
        <div class="riskMap-search-con-item-header" @click="goRouter('/riskMap/planListPage')">
          <div>作业</div>
          <div><span>{{ searchResultObj.taskNum }}</span></div>
        </div>
        <div class="riskMap-search-con-item-header">
          <div>人员</div>
          <div><span>{{ searchResultObj.personNum }}</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import {ref, provide } from "vue"
import weatherObj from '../components/weatherObj.ts'
import { Search } from '@element-plus/icons-vue'
import {useRouter} from 'vue-router'
import {getAllDate, getWeatherTypeWarning} from '@/api/risMap'
import axios from "axios";
const router = useRouter()

const showWeatherObj = weatherObj.slice(0, 8);
const provinceCode = ref('')
provide('provinceCode', provinceCode)
const list = [
  {
    label: '气候预警',
    path: '/riskMap/weatherMap'
  }
];
const mapWeatherObj = ref<any>([])
let showMapWeatherType = '';
const showMapWeather = (item: any) => {
  if (showMapWeatherType !== item.type) {
    getWeatherTypeWarning({
      weatherType: item.type,
      provinceCode: provinceCode.value || null,
    }).then((res: any) => {
      let result = res.resultValue || []
      mapWeatherObj.value = result.map(item1 => {
        return {
          city: item1,
          img: item.img,
          name: item.name
        }
      })
    })
  } else {
    mapWeatherObj.value = [];
  }
}

const searchText = ref('')
const searchResultObj = ref({})
let timer: any = null;
let searchRequest = null;
const searchTextFun = (val) => {
  if(timer){
    clearTimeout(timer)
    timer = null;
  }
  timer = setTimeout(() => {
    if(searchRequest){
      searchRequest.cancel('中断请求');
      searchRequest = null;
    }
    searchRequest = axios.CancelToken.source();
    getAllDate({
      message: val,
      provinceCode: provinceCode.value || null,
      noLoading: true,
    }, {
      cancelToken: searchRequest.token,
    }).then(res => {
      searchResultObj.value = res.resultValue || {};
    })
  }, 500)
}

const goRouter = (path) => {
  router.push({
    path: path,
    query: {
      searchText: searchText.value,
    }
  })
}
</script>

<style lang='scss' scoped>
.riskMap {
  position: relative;

  .riskMapModuleCon {
    position: absolute;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 0 0 24%;
    width: 24%;
    height: 98%;
    z-index: 1;
    padding-top: 15px;
    box-sizing: border-box;

    .riskModule:not(:last-child) {
      margin-bottom: 24px;
    }
  }

  .riskMapRight {
    right: 0;
    padding-right: 12px;
  }

  .riskMapLeft {
    left: 0;
    padding-left: 12px;
  }

  .riskMap-legend {
    position: absolute;
    bottom: 2%;
    right: 25%;
    width: 360px;
    display: flex;
    flex-wrap: wrap;
    font-weight: 400;
    font-size: 15px;
    color: #576475;
    line-height: 40px;
    padding: 20px;
    background: #fff;
    border-radius: 6px;
    box-shadow: 0 1px 16px 0 rgba(44, 72, 151, 0.2);
    box-sizing: border-box;
    user-select: none;
  }

  .riskMap-legend-item {
    margin-right: 20px;
    cursor: pointer;

    img {
      vertical-align: middle;
      margin-right: 5px;
    }

    &:nth-child(4n) {
      margin-right: 0;
    }
  }

  .riskMap-search-con{
    position: absolute;
    left: 25%;
    top: 15px;

    &:hover{
      .riskMap-search-con-list{
        display: block;
      }
    }
  }

  .riskMap-search-con-list{
    margin-top: 5px;
    background: #fff;
    display: none;
  }

  .riskMap-search-con-item-header{
    padding: 10px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;

    > :first-child{
      font-weight: bold;
    }

    &:hover{
      span{
        color: #0e70ea;
      }
    }
  }
}
</style>
