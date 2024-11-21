<template>
  <riskModule
    title="人员信息"
    height="33%"
    @mouseenterFun="mouseenterFun"
    @mouseleaveFun="mouseleaveFun"
  >
    <div class="riskMsgModule">
      <ModuleTotal :totalLeft="totalLeft" :totalRight="totalRight"/>
      <div class="riskMsgModule-echarts">
        <MyEcharts :initEchartsOpt="echartsOpt" :echartsDataOpt="echartsDataOpt"/>
      </div>
    </div>
  </riskModule>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import {inject, ref, watch} from "vue";
import {
  dataList,
  dialogLeft,
  dialogRight,
  dialogTop, isShow,
  title
} from "@/components/riskMap/components/riskModuleListDialog";
import {getTaskDaily, getWorkPerson, getWorkPersonTc} from "@/api/risMap";
const totalLeft = ref({
  title: '人员数量',
  num: 0,
})
const totalRight = ref({
  title: '较昨日增长',
  num: "0",
})
let xData = [];
let date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
let maxX =  new Date(year, month, 0).getDate();
for (let i = 0; i < maxX; i++) {
  xData.push(i + 1);
}
const echartsOpt = ref({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type:'shadow'
    }
  },
  color: [
    '#2261EE',
    '#F2A33D',
  ],
  legend: {
    right: '0%',
    icon: "path://M22.690000534057617,3.2799999713897705c-0.39999961853027344,-0.37999987602233887,-1.0300006866455078,-0.36999988555908203,-1.4099998474121094,0.029999971389770508C20.3799991607666,4.25,19.65999984741211,5,17.229999542236328,5c-0.37999916076660156,0,-0.8199996948242188,-0.1100001335144043,-1.2999992370605469,-0.2800002098083496C15.970000267028809,4.489999771118164,16,4.25,16,4c0,-2.2100000381469727,-1.7899999618530273,-4,-4,-4c-1.2200002670288086,0,-2.2899999618530273,0.550000011920929,-3.0299997329711914,1.409999966621399C8.220000267028809,1.159999966621399,7.460000038146973,1,6.730000019073486,1C3.059999942779541,1,0.4699999988079071,3.140000104904175,0.36000001430511475,3.2300000190734863c-0.42000001296401024,0.34999990463256836,-0.48000001162290573,0.9899997711181641,-0.12000001966953278,1.4099998474121094c0.34999997913837433,0.4200000762939453,0.9900000244379044,0.48000001907348633,1.4099999815225601,0.12000036239624023C1.659999966621399,4.75,3.7799999713897705,3,6.730000019073486,3C7.150000095367432,3,7.599999904632568,3.0899999141693115,8.079999923706055,3.2300000190734863C8.029999732971191,3.4800000190734863,8,3.740000009536743,8,4c0,2.2100000381469727,1.7899999618530273,4,4,4c1.239999771118164,0,2.3299999237060547,-0.5799999237060547,3.0699996948242188,-1.4600000381469727C15.8100004196167,6.820000171661377,16.540000915527344,7,17.229999542236328,7c3.2900009155273438,0,4.460000991821289,-1.2300000190734863,5.5,-2.309999942779541C23.100000381469727,4.289999961853027,23.09000015258789,3.6600000858306885,22.690000534057617,3.2799999713897705Z"
  },
  grid: {
    top: '20%',
    left: '3%',
    right: '4%',
    bottom: '5px',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: xData,
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
      name: '分包人员',
      data: [],
      smooth: true,
      showSymbol: false,
      type: 'line',
      lineStyle: {
        width: 3,
        color: '#2261EE'
      },
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgba(34,97,238,0.5)'
          },
          {
            offset: 1,
            color: 'rgba(34,97,238,0)'
          }
        ])
      },
    },
    {
      name: '自有人员',
      data: [],
      smooth: true,
      showSymbol: false,
      type: 'line',
      lineStyle: {
        width: 3,
        color: '#F2A33D'
      },
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgba(242,163,61,0.5)'
          },
          {
            offset: 1,
            color: 'rgba(242,163,61,0)'
          }
        ])
      },
    },
  ]
})
const echartsDataOpt = ref({});

let topListArr = [];
const setDialogMsg = () => {
  title.value = '人员数量TOP10';
  dialogLeft.value = '';
  dialogRight.value = '25%';
  dialogTop.value = 'calc(0.07813rem + 32%)';
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

const provinceCode = inject("provinceCode");
const getData = () => {
  getWorkPerson({provinceCode: provinceCode.value}).then(res => {
    let data1 = [];
    let data2 = [];
    let resultValue = res.resultValue || [];
    let lastData = resultValue[resultValue.length - 1];
    totalLeft.value.num = lastData.allperson;
    totalRight.value.num = lastData.personRate;
    resultValue.forEach(item => {
      data1.push(item.fenbaoyou);
      data2.push(item.ziyou);
    })
    echartsDataOpt.value = {
      series: [
        {
          data: data1
        },
        {
          data: data2
        },
      ]
    }
  })
  getWorkPersonTc({provinceCode: provinceCode.value}).then(res => {
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
