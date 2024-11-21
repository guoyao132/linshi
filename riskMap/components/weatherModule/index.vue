<template>
  <riskModule class="weatherModule" title="气象预警" height="33%">
    <div class="weatherModule-table risk-table">
      <el-table :data="tableData" stripe height="100%">
        <el-table-column prop="area" label="地区"/>
        <el-table-column prop="weather" label="天气">
          <template #default="scope">
            <div v-for="(weather, index) in scope.row.weather" :key="index">
              <img :src="getWeatherImgByName(weather)" class="riskMap-weather-icon"/>
              {{ weather }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="temperature" label="温度"/>
        <el-table-column prop="earlyWarning" label="预警">
          <template #default="scope">
            <span  v-for="(weather, index) in scope.row.earlyWarning" :key="'a' + index" class="earlyWarning" :class="getEarlyWarningClassName(weather)">{{ weather }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </riskModule>
</template>

<script setup lang="ts">
import {inject, watch, ref} from 'vue'
import {getWeatherImgByName} from '../weatherObj.ts'
import {getMapWeatherWarning} from "@/api/risMap";
const earlyWarningObj = [
  {
    name: '高温',
    className: 'highTemperature',
  },
  {
    name: '降雨',
    className: 'rainfall',
  },
  {
    name: '大风',
    className: 'wind',
  },
]
const getEarlyWarningClassName = (earlyWarning: string):string => {
  let obj = earlyWarningObj.find((item) => item.name === earlyWarning);
  if (obj) {
    return obj.className;
  } else {
    return 'normal';
  }
}
const tableData = ref([])



const provinceCode = inject('provinceCode');
const getMapWeather = () => {
  tableData.value = [];
  getMapWeatherWarning({
    provinceCode: provinceCode.value || null,
  }).then(res => {
    let result = res.resultValue || [];
    tableData.value = result.map((v: any) => {
      return {
        area: v.area,
        weather: v.warning.split(','),
        temperature: v.tmin + '-' + v.tmax + '℃',
        earlyWarning: v.warning.split(','),
      }
    })
  })
}
watch(provinceCode, () => {
  getMapWeather();
})
getMapWeather();

</script>

<style lang='scss' scoped>
.weatherModule {

  .earlyWarning{
    background: var(--risk-earlyWarning-bg);
    border-radius: 2px;
    padding: 4px 9px;
    color: var(--risk-earlyWarning-text-color);
    display: inline-block;
    margin: 3px;

    &.highTemperature{
      background: var(--risk-highTemperature-bg);
    }

    &.rainfall{
      background: var(--risk-rainfall-bg);
    }

    &.wind{
      background: var(--risk-wind-bg);
    }
  }
}

</style>
