<template>
  <div
    :class="['ModuleTotal', {'ModuleTotal-click' : isClick}]"
  >
    <div class="project-num-left">
      {{totalLeft.title}}
      <span>{{totalLeft.num}}</span>
    </div>
    <div class="project-num-right" v-if="totalRight">
      {{totalRight.title}}
      <span>{{showRightNum}}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed} from 'vue'
const props = defineProps({
  totalLeft: {
    type: Object,
    default: () => ({
      title: '在施工程数量',
      num: 8682,
    })
  },
  totalRight: {
    type: Object,
    default: () => ({
      title: '较昨日增长',
      num: "+8%↑",
    })
  },
  isClick: {
    type: Boolean,
    default: true,
  }
});

const showRightNum = computed(() => {
  if (props.totalRight) {
    let num = Number(props.totalRight.num || 0);
    let str = '0';
    if(num > 0){
      str = `+${num}%↑`;
    }else if(num < 0){
      str = `${num}%↓`;
    }
    return `${str}`;
  }
  return '';
})
</script>

<style lang='scss' scoped>
.ModuleTotal {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 44px;
  padding: 0 16px;
  background: var(--risk-module-total-bg) repeat-x left bottom/ auto 90%;

  &.ModuleTotal-click{
    cursor: pointer;
  }

  > div{
    display: flex;
    align-items: center;
  }

  .project-num-left{
    font-weight: var(--risk-module-total-text-weight);
    font-size: var(--risk-module-total-text-size);
    color: var(--risk-module-total-text-color);

    span{
      font-weight: var(--risk-module-total-num-weight);
      font-size: var(--risk-module-total-num-size);
      color: var(--risk-module-total-num-color);
      margin-left: 12px;
      font-family: var(--riskMap-num-family);
    }
  }

  .project-num-right{

    font-weight: var(--risk-module-total-text1-weight);
    font-size: var(--risk-module-total-text1-size);
    color: var(--risk-module-total-text1-color);

    span{
      font-weight: var(--risk-module-total-num1-weight);
      font-size: var(--risk-module-total-num1-size);
      color: var(--risk-module-total-num1-color);
      margin-left: 12px;
      font-family: var(--riskMap-num-family);
    }
  }
}

</style>
