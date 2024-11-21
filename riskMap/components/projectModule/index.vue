<template>
  <riskModule
    title="工程信息"
    height="27%"
    @mouseenterFun="mouseenterFun"
    @mouseleaveFun="mouseleaveFun"
  >
    <div class="projectModule">
      <ModuleTotal :totalLeft="totalLeft" :totalRight="totalRight" @click="goProjectList"/>
      <div class="project-device-num">
        <div class="project-device-num-item">
          <div class="project-device-num-item-icon">
            变电站
          </div>
          <div class="project-device-num-item-num">
            <div class="project-device-num-item-num-title">总数</div>
            <span>{{ projectObj.bdproject || 0 }}</span>座
          </div>
        </div>
        <div class="project-device-num-item">
          <div class="project-device-num-item-icon">
            线路
          </div>
          <div class="project-device-num-item-num">
            <div class="project-device-num-item-num-title">总数</div>
            <span>{{ projectObj.xlproject || 0 }}</span>条
          </div>
        </div>
      </div>
    </div>
  </riskModule>
</template>

<script setup lang="ts">
import {title, dialogLeft, dialogRight, dialogTop, dataList, isShow} from '../riskModuleListDialog/index.ts'
import {ref, inject, watch} from "vue";
import {useRouter} from 'vue-router'
import {getRiskProject, getRiskProjectTc} from '@/api/risMap'
const router = useRouter()
const totalLeft = ref({
  title: '在施工程数量',
  num: 0,
})
const totalRight = ref({
  title: '较昨日增长',
  num: "+0%↑",
})

let topListArr = [];
const setDialogMsg = () => {
  title.value = '工程数量TOP10';
  dialogLeft.value = '25%';
  dialogRight.value = '';
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
setDialogMsg();

const goProjectList = () => {
  router.push('/riskMap/projectListPage');
}

const projectObj = ref({})

const provinceCode = inject("provinceCode");
const getData = () => {
  getRiskProject({
    provinceCode: provinceCode.value,
  }).then(res => {
    projectObj.value = res.resultValue || {};
    totalLeft.value.num = projectObj.value.allproject;
    totalRight.value.num = projectObj.value.riskRate;
  })
  getRiskProjectTc({
    provinceCode: provinceCode.value,
  }).then(res => {
    topListArr = res.resultValue || [];
  })
}
getData();
watch(provinceCode, () => {
  getData()
})
</script>

<style lang='scss' scoped>
.projectModule {
  padding-top: 10px;

  .project-device-num {
    display: flex;
    padding: 10px 20px;

    .project-device-num-item {
      flex: 1;
      display: flex;
      align-items: center;
    }

    .project-device-num-item-icon {
      width: 80px;
      height: 72px;
      line-height: 118px;
      text-align: center;
      background: var(--project-device-num-item-icon-bg) no-repeat center / 100% 100%;

      font-weight: 400;
      font-size: var(--project-device-num-item-icon-text-size);
      color: var(--project-device-num-item-num-title-bg);
    }

    .project-device-num-item-num {

      .project-device-num-item-num-title {
        background: var(--project-device-num-item-num-title-bg) no-repeat left center / 12px 12px;
        padding-left: 15px;
        font-weight: 400;
        font-size: var(--project-device-num-item-num-title-text-size);
        color: var(--project-device-num-item-num-title-text-color);
        margin-bottom: 10px;
      }

      span {
        margin-left: 15px;
        margin-right: 3px;
        font-weight: 800;
        font-size: var(--project-device-num-item-span-text-size);
        color: var(--project-device-num-item-span-text-color);
        font-family: var(--riskMap-num-family);
      }
    }
  }
}

</style>
