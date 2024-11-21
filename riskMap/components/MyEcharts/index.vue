<template>
  <div class="Myecharts" ref="refEchartsCon"></div>
</template>

<script setup lang="ts">
import {inject, watch, ref, onBeforeUnmount, onMounted, PropType} from "vue";
import type {EChartsCoreOption} from "echarts/types/dist/echarts";

const props = defineProps({
  initEchartsOpt: {
    type: Object as PropType<EChartsCoreOption>,
    default: null,
  },
  echartsDataOpt: {
    type: Object as PropType<EChartsCoreOption>,
    default: null,
  },
  resize: {
    type: Boolean,
    default: true,
  }
})
const echarts = inject('echarts')
let echartsCon: any = null;
const refEchartsCon = ref<HTMLElement | null>(null);

watch(() => props.initEchartsOpt, () => {
  initEcharts()
})
watch(() => props.echartsDataOpt, (v) => {
  setEchartsOpt(v)
}, {
  deep: true,
})
const initEcharts = () => {
  if (echartsCon) {
    echartsCon.dispose && echartsCon.dispose()
  }
  echartsCon = echarts.init(refEchartsCon.value)
  setEchartsOpt(props.initEchartsOpt)
};
const setEchartsOpt = (opt: EChartsCoreOption) => {
  if (opt) {
    echartsCon && echartsCon.setOption(opt)
  }
};
let timer:number | null = null;
const resize = () => {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
  timer = window.setTimeout(() => {
    if (echartsCon && props.resize) {
      echartsCon.resize({animation: {duration: 300}});
    }
  }, 200);
}
onMounted(() => {
  initEcharts();
  window.addEventListener("resize", resize);
})
onBeforeUnmount(() => {
  if (echartsCon) {
    echartsCon.dispose && echartsCon.dispose();
    echartsCon = null;
    window.removeEventListener("resize", resize);
  }
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
})
</script>

<style lang='scss' scoped>
.Myecharts {
  width: 100%;
  height: 100%;
}

</style>
