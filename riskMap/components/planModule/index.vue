<template>
  <riskModule
    title="作业计划"
    height="31%"
    @mouseenterFun="mouseenterFun"
    @mouseleaveFun="mouseleaveFun"
  >
    <div class="planModule">
      <ModuleTotal
        :totalLeft="totalLeft"
        :totalRight="totalRight"
        @click="goPlanList"
      />
      <div class="planModule-echarts">
        <div class="planModule-echarts-bg"></div>
        <MyEcharts :initEchartsOpt="echartsOpt" :echartsDataOpt="echartsDataOpt"/>
      </div>
    </div>
  </riskModule>
</template>

<script setup lang="ts">
import {inject, ref, watch} from "vue";
import {useRouter} from 'vue-router'
import {
  dataList,
  dialogLeft,
  dialogRight,
  dialogTop,
  isShow,
  title
} from "@/components/riskMap/components/riskModuleListDialog";
import {getTaskDaily, getTaskDailyTc} from "@/api/risMap";

const router = useRouter()
const totalLeft = ref({
  title: '计划数量',
  num: 0,
})
const totalRight = null;
let colorLit = ['#2261ee', '#f1a23d', '#49be9f'];
let colorLit1 = ['#dfecfc', '#f8f4e9', '#ebf7f5'];

interface YDATA {
  value: number;
  name: string;
  itemStyle?: {
    color?: string;
  };
}

const formatData = (data: any) => {
  let nameArr = ['进行中', '已结束', '未开始']
  let yData: YDATA[] = [];
  let yData1: YDATA[] = [];
  data.forEach((item: any, index: number) => {
    let name = `${nameArr[index]}-${item}`;
    yData.push({
      value: item,
      name: name,
      itemStyle: {
        color: colorLit[index],
      }
    });
    yData1.push({
      value: item,
      name: name,
      itemStyle: {
        color: colorLit1[index],
      }
    })
  })
  return [yData, yData1];
}
let data = [0, 0, 0]
let [yData, yData1] = formatData(data);

const echartsOpt = ref({
  title: {
    text: '',
    color: [],
    subtext: '今日作业\n总数',
    itemGap: 2,
    textAlign: 'center',
    left: '28%',
    top: 'center',
    textStyle: {
      height: '1px',
      fontSize: '16px',
    },
    subtextStyle: {
      fontSize: '12px',
    }
  },
  legend: {
    top: 'center',
    right: '5%',
    orient: 'vertical',
    itemGap: 10,
    icon: "path://M512,384a128,128,0,1,0,0,256a128,128,0,0,0,0,-256Zm0,-128a256,256,0,1,1,0,512a256,256,0,0,1,0,-512Z",
    textStyle: {
      fontSize: '0.07rem',
      rich: {
        a: {
          color: '#576475',
          fontSize: '0.08rem',
          align: 'center',
          verticalAlign: 'bottom',
        },
        b: {
          color: '#262B41',
          fontWeight: 'bold',
          fontSize: '0.1rem',
          verticalAlign: 'bottom',
        },
      }
    },
    formatter: function (name: string) {
      let nameArr = name.split('-');
      return (`{a|${nameArr[0]}} {b|${nameArr[1]}}`);
    },
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['75%', '85%'],
      center: ['29%', '50%'],
      avoidLabelOverlap: false,
      padAngle: 5,
      startAngle: 220,
      itemStyle: {},
      label: {
        show: false,
      },
      emphasis: {
        disabled: 'none',
      },
      data: yData
    },
    {
      name: 'Access From',
      type: 'pie',
      radius: ['60%', '75%'],
      center: ['29%', '50%'],
      avoidLabelOverlap: false,
      padAngle: 5,
      startAngle: 220,
      itemStyle: {},
      label: {
        show: false,
      },
      emphasis: {
        disabled: 'none',
      },
      data: yData1
    },
  ]
})
const echartsDataOpt = ref({});


let topListArr = [];
const provinceCode = inject("provinceCode");
const getData = () => {
  getTaskDaily({provinceCode: provinceCode.value}).then(res => {
    let resultValue = res.resultValue || {};
    totalLeft.value.num = resultValue.dayTask;
    let data = [
      resultValue.jxzTask || 0,
      resultValue.wksTask || 0,
      resultValue.ywcTask || 0
    ]
    let [yData, yData1] = formatData(data);
    echartsDataOpt.value = {
      title: {
        text: resultValue.dayTask,
      },
      series: [
        {
          data: yData
        },
        {
          data: yData1
        }
      ]
    }
  })
  getTaskDailyTc({provinceCode: provinceCode.value}).then(res => {
    topListArr = res.resultValue || [];
  })
}
getData();
watch(provinceCode, () => {
  getData()
})

const setDialogMsg = () => {
  title.value = '作业数量TOP10'
  dialogLeft.value = ''
  dialogRight.value = '25%';
  dialogTop.value = '0.07813rem';
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

const goPlanList = () => {
  router.push('/riskMap/planListPage')
}
</script>

<style lang='scss' scoped>
.planModule {
  display: flex;
  flex-direction: column;
  height: 100%;

  .planModule-echarts {
    position: relative;
    margin-top: 5%;
    flex: 1;

    .planModule-echarts-bg {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      height: 100%;
      max-height: 160px;
      width: 58%;
      background: var(--risk-plan-bg) no-repeat center center / auto 100%;
    }

    &:before {
      content: " ";
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      background: var(--risk-plan-bg-1) no-repeat left center / auto 100%;
      height: 11px;
      width: 70%;
    }
  }
}

</style>
