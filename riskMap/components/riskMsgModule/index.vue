<template>
  <riskModule
    title="风险信息"
    height="35%"
    @mouseenterFun="mouseenterFun"
    @mouseleaveFun="mouseleaveFun"
  >
    <div class="riskMsgModule">
      <ModuleTotal :totalLeft="totalLeft" :totalRight="totalRight" @click="goRiskList"/>
      <div class="riskMsgModule-echarts">
        <MyEcharts :initEchartsOpt="echartsOpt" :echartsDataOpt="echartsDataOpt"/>
      </div>
    </div>
  </riskModule>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import {inject, ref, watch} from "vue";
import {useRouter} from 'vue-router'
import {
  dialogLeft,
  dialogTop,
  isShow,
  title,
  dataList,
  dialogRight
} from "@/components/riskMap/components/riskModuleListDialog/index.ts";
import {getRiskProject, getRiskTc, getRiskTj} from "@/api/risMap";
const router = useRouter();
const totalLeft = ref({
  title: '风险数量',
  num: 0,
})
const totalRight = ref({
  title: '较上月增长',
  num: "0",
})
let colorList = [
  new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    { offset: 0, color: '#ff0000' },
    { offset: 1, color: '#c10000' }
  ]),
  new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    { offset: 0, color: '#f38700' },
    { offset: 1, color: '#c36d00' }
  ]),
  new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    { offset: 0, color: '#e8e802' },
    { offset: 1, color: '#a8a800' }
  ]),
  new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    { offset: 0, color: '#2424ff' },
    { offset: 1, color: '#1a1a9a' }
  ]),
];
let colorMaxList = [
  new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    { offset: 0, color: 'rgba(255,0,0,0.35)' },
    { offset: 1, color: 'rgba(193,0,0,0.15)' }
  ]),
  new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    { offset: 0, color: 'rgba(243,135,0,0.35)' },
    { offset: 1, color: 'rgba(195,109,0,0.15)' }
  ]),
  new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    { offset: 0, color: 'rgba(232,232,2,0.35)' },
    { offset: 1, color: 'rgba(168,168,0,0.15)' }
  ]),
  new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    { offset: 0, color: 'rgba(36,36,255,0.35)' },
    { offset: 1, color: 'rgba(26,26,154,0.15)' }
  ]),
];

const getEchartsData = (yData) => {
  let maxYData = Math.max(...yData);
  maxYData = maxYData * 1.2;
  let data = [];
  let dataMax = [];
  for (let i = 0; i < yData.length; i++) {
    data.push({
      value: yData[i],
      itemStyle: {
        color: colorList[i]
      },
    });
    dataMax.push({
      value: maxYData,
      itemStyle: {
        color: colorMaxList[i]
      },
    });
  }
  return [data, dataMax];
};
const echartsOpt = ref({
  tooltip: {
    trigger: 'axis',
    formatter: (params) => {
      let data = params[1];
      return `${data.axisValueLabel}<br>
      ${data.marker} ${data.value}`;
    }
  },
  grid: {
    top: '8%',
    left: '3%',
    right: '4%',
    bottom: '5px',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: ['2级', '3级', '4级', '5级'],
    axisTick: { show: false },
    axisLine: {
      lineStyle: {
        color: "#a6b1ff"
      }
    },
    axisLabel: {
      color: "#576475"
    }
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      color: "#576475"
    }
  },
  series: [
    {
      data: [],
      type: 'bar',
      barWidth: "40%",
      barGap: '-88%',
    },
    {
      data: [],
      type: 'bar',
      barWidth: "30%",
    },
  ]
})
const echartsDataOpt = ref({});


let topListArr = [];
const setDialogMsg = () => {
  title.value = '风险数量TOP10';
  dialogLeft.value = '25%';
  dialogRight.value = '';
  dialogTop.value = 'calc(0.07813rem + 28%)';
  dataList.value = topListArr;
}
setDialogMsg();
const mouseenterFun = () => {
  setDialogMsg();
  isShow.value = true;
}
const mouseleaveFun = () => {
  isShow.value = false;
}

const goRiskList = () => {
  router.push("/riskMap/riskListPage")
}

const provinceCode = inject("provinceCode");
const getData = () => {
  getRiskTj({provinceCode: provinceCode.value}).then(res => {
    let resultValue = res.resultValue || {};
    totalLeft.value.num = resultValue.allrisk;
    totalRight.value.num = resultValue.riskRate;
    let yData = [
      resultValue.erjrisk || 0,
      resultValue.sanjrisk || 0,
      resultValue.sijrisk || 0,
      resultValue.wjrisk || 0
    ];
    let seriesData = getEchartsData(yData);
    echartsDataOpt.value = {
      series: [
        {
          data: seriesData[1],
        },
        {
          data: seriesData[0],
        },
      ]
    }
  })
  getRiskTc({provinceCode: provinceCode.value}).then(res => {
    topListArr = res.resultValue || [];
  })
}
getData();
watch(provinceCode, () => {
  getData()
})
</script>

<style lang='scss' scoped>
.riskMsgModule{
  display: flex;
  flex-direction: column;
  height: 100%;

  .riskMsgModule-echarts{
    margin-top: 5%;
    flex: 1;
  }
}

</style>
