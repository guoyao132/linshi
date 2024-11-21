<template>
  <div class="riskModule" :style="{height: height}">
    <div
      class="riskModuleHeader"
      @mouseenter="mouseenterFun"
      @mouseleave="mouseleaveFun"
      @click="titleClick"
    >
      <div class="riskModuleHeader-text">
        {{title}}
      </div>
<!--      <div class="riskModule-line"></div>-->
<!--      <div class="riskModule-line-end"></div>-->
    </div>
    <div class="riskModule-main">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const props =  defineProps({
  title: {
    type: String,
    default: '标题'
  },
  height: {
    type: String,
    default: '30%'
  }
});
const emit = defineEmits([
  "mouseenterFun",
  "mouseleaveFun",
  "titleClick",
])
const mouseenterFun = () => {
  emit('mouseenterFun')
}
const mouseleaveFun = () => {
  emit('mouseleaveFun')
}
const titleClick = () => {
  emit('titleClick')
}
</script>

<style lang='scss' scoped>
.riskModule {
  padding: 15px 12px;
  background: var(--background-module);
  border:1px solid var(--risk-module-border);
  border-radius: 6px;
  box-shadow: 0 1px 16px 0 rgba(44, 72, 151, 0.2);
  box-sizing: border-box;
  overflow: hidden;


  .riskModuleHeader{
    //background: var(--risk-module-title-icon) no-repeat 5px 30% / 10px 10px;
    display: flex;
    align-items: flex-end;
  }

  .riskModuleHeader-text{
    padding: 5px 30px 15px 0;
    box-sizing: border-box;
    font-weight: var(--risk-module-title-weight);
    color: var(--risk-module-title-color);
    font-size: var(--risk-module-title-size);
    //border-bottom: 1px solid var(--risk-module-title-text-border);
  }

  .riskModule-line{
    flex: 1;
    border-bottom: 1px solid var(--risk-module-title-border);
  }
  .riskModule-line-end{
    width: 0;
    height: 0;
    border: 3px solid var(--risk-module-title-text-border);
    border-top-color: transparent;
    border-left-color: transparent;
    margin-left: 3px;
  }

  .riskModule-main{
    height: calc(100% - 40px);
  }

}
</style>
