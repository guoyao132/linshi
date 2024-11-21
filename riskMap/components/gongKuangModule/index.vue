<template>
  <riskModule title="8+2 工况" height="37%">
    <div class="gongKuangModule" ref="mainCon">
      <div
        class="gongKuangModule-item gongKuangModule-item-8-2-1"
        v-for="(item, index) in  gongkuang8"
        :key="index + '-8-2-1'"
        :style="item.style"
      >
        <div>
          <div class="gongKuangModule-item-text">{{item.name}}</div>
          <div class="gongKuangModule-item-num">{{item.value}}</div>
        </div>
      </div>
      <div
        class="gongKuangModule-item gongKuangModule-item-8-2-2"
        v-for="(item, index) in  gongkuang2"
        :key="index + '-8-2-2'"
        :style="item.style"
      >
        <div>
          <div class="gongKuangModule-item-text">{{item.name}}</div>
          <div class="gongKuangModule-item-num">{{item.value}}</div>
        </div>
      </div>
    </div>
  </riskModule>
</template>

<script setup lang="ts">
import {onMounted, onBeforeUnmount, ref, inject, watch} from 'vue'
import { getTaskData} from "@/api/risMap";
const gongkuang8 = ref([
  {
    name: '超长抱杆',
    prop: 'ccbg',
    value: 0,
    style: {
      width: '0.42rem',
      height: '0.42rem',
      left: '0rem',
      top: '0.2rem',
      maxWidth: '71px',
      maxHeight: '71px',
    }
  },
  {
    name: '特殊地理环境',
    prop: 'tsdltj',
    value: 0,
    style: {
      width: '0.52rem',
      height: '0.52rem',
      left: '0rem',
      top: '0.88rem',
      maxWidth: '87px',
      maxHeight: '87px',
    }
  },
  {
    name: '深基坑',
    prop: 'sjk',
    value: 0,
    style: {
      width: '0.4rem',
      height: '0.4rem',
      left: '0.36rem',
      top: '0.53rem',
    }
  },
  {
    name: '索道',
    prop: 'sd',
    value: 0,
    style: {
      width: '0.4rem',
      height: '0.4rem',
      left: '0.8rem',
      top: '0.4rem',
    }
  },
  {
    name: '特殊气象环境',
    prop: 'tsqxhj',
    value: 0,
    style: {
      width: '0.52rem',
      height: '0.52rem',
      left: '0.63rem',
      top: '0.87rem',
    }
  },
  {
    name: '水上作业',
    prop: 'sszy',
    value: 0,
    style: {
      width: '0.4rem',
      height: '0.4rem',
      left: '1.26rem',
      top: '0.18rem',
    }
  },
  {
    name: '不停电作业',
    prop: 'btdzy',
    value: 0,
    style: {
      width: '0.52rem',
      height: '0.52rem',
      left: '1.2rem',
      top: '0.7rem',
    }
  },
  {
    name: '近电作业',
    prop: 'jdzy',
    value: 0,
    style: {
      width: '0.4rem',
      height: '0.4rem',
      left: "1.75rem",
      top: "0.99rem",
    }
  },
]);
const gongkuang2 = ref([
  {
    name: '拆除',
    prop: 'cc',
    value: 0,
    style: {
      width: '0.42rem',
      height: '0.42rem',
      left: '0.45rem',
      top: '0.06rem',
    }
  },
  {
    name: '反向拉线',
    prop: 'fxlx',
    value: 0,
    style: {
      width: '0.52rem',
      height: '0.52rem',
      left: '1.68rem',
      top: '0.35rem',
    }
  },
])

const provinceCode = inject("provinceCode");
const getData = () => {
  gongkuang8.value.forEach((item: any) => {
    item.value = 0;
  })
  gongkuang2.value.forEach((item: any) => {
    item.value = 0;
  })
  getTaskData({provinceCode: provinceCode.value}).then(res => {
    let result = res.resultValue ||  {}
    gongkuang8.value.forEach((item: any) => {
      item.value = result[item.prop] || 0;
    })
    gongkuang2.value.forEach((item: any) => {
      item.value = result[item.prop] || 0;
    })
  })
}
getData();
watch(provinceCode, () => {
  getData()
})


// 2.15rem 1.39rem
const mainCon = ref<HTMLElement>(null)
const formatScale = () => {
  if(mainCon.value){
    let h = mainCon.value.clientHeight;
    let htmlDom:HTMLCollectionOf<HTMLElementTagNameMap[string]> = document.getElementsByTagName('html')!;
    let fontsize = parseInt(htmlDom[0].style.fontSize);
    let conHei = 1.39 * fontsize;
    if(conHei > h){
      let scaleVal = h / conHei;
      mainCon.value.style.transform = `scale(${scaleVal})`;
    }
  }
}

onMounted(() => {
  formatScale();
  window.addEventListener('resize', formatScale);
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', formatScale);
})

</script>

<style lang='scss' scoped>
.gongKuangModule {
  height: 100%;
  position: relative;
  transform-origin: center top;


  .gongKuangModule-item{
    position: absolute;
    width: 77px;
    height: 77px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding-top: 15px;
    box-sizing: border-box;
  }
  .gongKuangModule-item-8-2-1{
    background: var(--risk-8-2-1) no-repeat center center / 100% 100%;
  }
  .gongKuangModule-item-8-2-2{
    background: var(--risk-8-2-2) no-repeat center center / 100% 100%;
  }

  .gongKuangModule-item-text{
    font-size: var(--risk-8-2-text-size);
    color: var(--risk-8-2-text-color);
  }
  .gongKuangModule-item-num{
    margin-top: 5px;
    font-weight: 800;
    font-size: var(--risk-8-2-num-size);
    color: var(--risk-8-2-num-color);
  }

}

</style>
