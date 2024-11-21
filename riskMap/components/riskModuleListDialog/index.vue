<template>
  <div class="riskModuleListDialog" :style="dialogStyle">
    <div class="riskModuleListDialog-title riskMap-num">
      {{title}}
    </div>
    <div class="riskModuleListDialog-list">
      <div class="riskModuleListDialog-item" v-for="(item, index) in showDataList" :key="index">
        <div class="riskModuleListDialog-item-title riskMap-num">
          <div class="riskModuleListDialog-item-title-text">
            <span>NO.{{index + 1}}</span>
            {{item.name}}
          </div>
          <div class="riskModuleListDialog-item-title-num">
            {{item.value}}
          </div>
        </div>
        <div>
          <el-progress class="riskMap-progress" :percentage="item.progress" :show-text="false" :stroke-width="6"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {title, dialogLeft, dialogRight, dialogTop, dataList, isShow} from './index.ts'

const showDataList = computed(() => {
  return dataList.value.slice(0, 10).map(v => {
    return {
      name: v.provinceName || v.name,
      value: v.allproject || v.allrisk || v.allTask || v.allperson || v.value || 0,
      progress: v.riskRate || v.progress || 0,
    }
  })
})

const dialogStyle = computed(() => {
  let obj:Partial<CSSStyleDeclaration> = {}
  if (!isShow.value) {
    obj.display = 'none'
  }else{
    if(dialogRight.value) {
      obj.right = dialogRight.value
    }
    if(dialogLeft.value) {
      obj.left = dialogLeft.value
    }
    obj.top = dialogTop.value
  }
  return obj
})

</script>

<style lang='scss' scoped>
.riskModuleListDialog {
  position: absolute;
  width: 18%;
  background-color: #fff;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  box-shadow: 0 1px 16px 0 rgba(44, 72, 151, 0.2);
  border-bottom: 3px solid var(--risk-module-dialog-border-color);
  overflow: hidden;
  z-index: 10;

  .riskModuleListDialog-title{
    padding: 12px 20px;
    color: var(--risk-module-dialog-title-text);
    background: var(--risk-module-dialog-title-bg);
    font-size: 18px;
    box-sizing: border-box;
  }

  .riskModuleListDialog-list{
    flex: 1;
    box-sizing: border-box;
    padding: 25px;
  }

  .riskModuleListDialog-item{
    margin-top: 12px;
    &:first-child{
      margin-top: 0;
    }

  }

  .riskModuleListDialog-item-title{
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    font-size: 16px;
    margin-bottom: 10px;

    span{
      font-weight: bold;
      color: var(--risk-module-dialog-item-span-color);
      background: var(--risk-module-dialog-item-span-bg);
      border-radius: 15px;
      padding: 0 3px;
      font-size: 14px;
    }
  }

  .riskModuleListDialog-item-title-num{
    font-size: 20px;
    font-weight: bold;
  }

}

</style>
