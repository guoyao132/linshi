<template>
  <div class="riskMap riskMapFullCon">
    <router-view></router-view>
  </div>
</template>
<style lang='scss'>
//使用了el-form-item的组件，需要引入el-form的样式
@import "element-plus/theme-chalk/el-form.css";

[data-theme='default'] {
  //整体颜色
  --riskMap-bg: #fff;
  --riskMap-num-family: "DIN-Bold";
  --risk-table-btn-color: #84b8c1;

  //模块
  --risk-module-bg: #fff linear-gradient(to bottom, rgba(40, 190, 222, 0.2) 0%, #ffffff 60%);
  --risk-module-border: #fff;
  --risk-module-title-icon: url(@/assets/images/riskMap/title-icon.png);
  --risk-module-title-color: #2A3037;
  --risk-module-title-weight: 800;
  --risk-module-title-size: 18px;
  --risk-module-title-text-border: #5185f1;
  --risk-module-title-border: rgba(81, 133, 241, 0.5);

  //模块顶部统计
  --risk-module-total-bg: url(@/assets/images/riskMap/ModuleTotal-bg.png);
  --risk-module-total-text-size: 16px;
  --risk-module-total-text-color: #2E3F55;
  --risk-module-total-text-weight: 800;
  --risk-module-total-num-weight: 800;
  --risk-module-total-num-size: 26px;
  --risk-module-total-num-color: #2261EE;

  --risk-module-total-text1-size: 14px;
  --risk-module-total-text1-color: #576475;
  --risk-module-total-text1-weight: 800;
  --risk-module-total-num1-weight: 800;
  --risk-module-total-num1-size: 20px;
  --risk-module-total-num1-color: #19BFB3;

  //模块 dialog
  --risk-module-dialog-border-color: #4e81f1;
  --risk-module-dialog-title-bg: linear-gradient(to right, #4e81f1 0%, #dbe5fc 100%);
  --risk-module-dialog-status-bg: linear-gradient(to right, #abc4f9 0%, #bdd0fa 100%);
  --risk-module-dialog-status-border: #4e81f1;
  --risk-module-dialog-title-text: #fff;
  --risk-module-dialog-item-span-color: #4e81f1;
  --risk-module-dialog-item-span-bg: linear-gradient(to right, #dfe9fe 0%, #ffffff 100%);

  //地图省弹窗
  --risk-province-popup-color: #576475;
  --risk-province-popup-span-color: #262B41;


  //工程信息
  --project-device-num-item-icon-bg: url(@/assets/images/riskMap/gcxx-bdz.png);
  --project-device-num-item-icon-text-size: 16px;
  --project-device-num-item-icon-text-color: #3E4855;
  --project-device-num-item-num-title-bg: url(@/assets/images/riskMap/gcxx-zs2.png);
  --project-device-num-item-num-title-text-size: 14px;
  --project-device-num-item-num-title-text-color: #576475;
  --project-device-num-item-span-text-size: 20px;
  --project-device-num-item-span-text-color: #2E3F55;
  // 8 + 2 工况
  --risk-8-2-1: url(@/assets/images/riskMap/8+2-1.png);
  --risk-8-2-2: url(@/assets/images/riskMap/8+2-2.png);
  --risk-8-2-text-size: 14px;
  --risk-8-2-text-color: #576475;
  --risk-8-2-num-size: 18px;
  --risk-8-2-num-color: #262B41;
  //作业计划
  --risk-plan-bg: url(@/assets/images/riskMap/tjt-zsq.png);
  --risk-plan-bg-1: url(@/assets/images/riskMap/tjt-zs1.png);
  //气象预警
  --risk-earlyWarning-text-color: #fff;
  --risk-earlyWarning-bg: #4ABEA0;
  --risk-highTemperature-bg: #F2A33D;
  --risk-rainfall-bg: #3B72EC;
  --risk-wind-bg: #FF5E33;

  // 项目详情
  --risk-projectInfo-bg: #fff;

  //search table page
  --el-form-label-font-size: 14px;

  //计划详情
  --risk-plan-status-1: #62c400;
  --risk-plan-status-2: #f55300;

  //站班会
  --risk-zhanbanhui-top-title-color: #999;

  //气象预警
  --risk-weather-alarming-bg: rgba(255, 153, 0, 0.05);
  --risk-weather-alarming-icon-border: #ff9900;
  --risk-weather-alarming-icon-bg: #fff;
  --risk-weather-alarming-split-bg: #aaaaaa;

  //工程级
  --projectMap-details-code-color: #657181;
  --projectMap-details-code-border: #e7f0fe;

}

.riskMapFullCon {
  width: 100%;
  height: 100%;
  background: var(--riskMap-bg);
}

.riskMap {
  --el-button-text-color: #706f6c;

  img {
    vertical-align: middle;
  }

  .el-table {
    --el-fill-color-lighter: rgba(244, 245, 247, 1);
    --el-table-row-hover-bg-color: rgba(206, 231, 229, 1);
  }

  .el-table--border::after {
    right: 1px;
  }

  .el-table__inner-wrapper::before {
    bottom: 1px;
  }

  .risk-table {
    .el-table {
      --el-table-header-text-color: #576475;
      --el-table-header-bg-color: #e5effd;
      --el-table-text-color: #576475;
      --el-fill-color-lighter: rgba(69, 92, 255, 0.05);
      --el-table-row-hover-bg-color: rgba(69, 92, 255, 0.05);
      --el-table-border: transparent;
    }
  }

  .details-table {
    border: var(--el-table-border);
    color: var(--el-table-header-text-color);
    margin-bottom: 20px;

    > .el-row:last-child {
      .el-col {
        border-bottom: none;
      }
    }

    .el-col {
      display: flex;
      align-items: center;
      padding: 20px;
      border-right: var(--el-table-border);
      border-bottom: var(--el-table-border);
      word-break: break-all;
      line-height: 20px;

      &:last-child {
        border-right: none;
      }
    }

    .details-col-hasRow {
      padding: 0;
      border: none;
    }

    .details-table-more {
      padding: 0;
    }

    .details-row-more-con {
      display: flex;
      position: relative;

      .el-row {
        width: 100%;
      }

      .details-row-2 {
        position: absolute;
        top: 0;
        bottom: 0;
        z-index: 1;
        width: 100%;
      }
    }

    .details-item-value {
      color: #2cbab2;
    }

    .details-header {
      background: var(--el-table-header-bg-color);
      font-weight: bold;
    }
  }

  .details-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .details-title-2 {
    font-size: 20px;
    margin-bottom: 20px;
  }

  .details-line-row {
    border-top: 1px solid var(--el-table-header-bg-color);
    padding: 20px 0;
    font-size: 14px;
  }

  .details-line-row-title {
    font-size: 20px;
    line-height: 20px;
    margin-bottom: 20px;
  }

  .sjmap-html-con {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    min-width: max-content;
    text-align: center;
  }

  .sgmap-logo-wrap {
    display: none;
  }

  .sgmap-control-container {
    display: initial;
  }

  .risk-table-status {
    position: relative;

    &:before {
      position: absolute;
      content: " ";
      width: 6px;
      height: 6px;
      border-radius: 50%;
      top: 50%;
      transform: translateY(-50%);
      left: -20px;
      background: var(--risk-plan-status-1);
    }
  }

  .risk-table-status-err {
    &:before {
      background: var(--risk-plan-status-2);
    }
  }

  .box-right-enter-active {
    animation: box-right-in 0.3s;
  }

  .box-right-leave-active {
    animation: box-right-out 0.3s;
  }

  @keyframes box-right-in {
    0% {
      transform: translateX(100%) translateY(-50%);
    }
    100% {
      transform: translateX(0) translateY(-50%);
    }
  }

  @keyframes box-right-out {
    0% {
      transform: translateX(0) translateY(-50%);
    }
    100% {
      transform: translateX(100%) translateY(-50%);
    }
  }

  .box-bottom-enter-active {
    animation: box-bottom-in 0.3s;
  }

  .box-bottom-leave-active {
    animation: box-bottom-out 0.3s;
  }

  @keyframes box-bottom-in {
    0% {
      transform: translateY(100%);
      bottom: 0;
    }
    100% {
      transform: translateY(0);
    }
  }

  @keyframes box-bottom-out {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(100%);
      bottom: 0;
    }
  }

  .weatherModule-table {
    height: 100%;
    color: #fff;
    position: relative;

    &:before, &:after {
      content: ' ';
      position: absolute;
      width: 3px;
      height: 10px;
      background: #455cff;
      z-index: 5;
      top: 13px;
    }

    &:after {
      right: 0;
    }

    &:before {
      left: 0;
    }

    &.hidebox{
      &:before, &:after{
        display: none;
      }
    }
  }

  .riskMap-weather-icon {
    width: 16px;
  }


  .riskMap-dialog-con {
    position: absolute;
    background: #fff;
    z-index: 2;
    font-size: 14px;
  }

  .riskMap-dialog-header {
    display: flex;
    font-size: 16px;
    color: #fff;
    background: var(--risk-module-dialog-title-bg);
    padding: 0 10px;
    justify-content: space-between;
    height: 32px;
    line-height: 32px;
    box-sizing: border-box;

    span {
      display: inline-block;
      width: 16px;
      color: #000;
      cursor: pointer;
    }
  }

  .riskMap-dialog-main {
    height: calc(100% - 32px);
    padding-bottom: 10px;
    box-sizing: border-box;
  }
}

.riskMap-num {
  font-family: var(--riskMap-num-family);
}

.riskMap-progress {
  .el-progress-bar__outer {
    overflow: initial;
  }

  .el-progress-bar__inner:before {
    content: " ";
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 5px;
    height: 11px;
    background: #afc9fc;
  }
}

.risk-pagination {
  .btn-prev, .btn-next, .el-pager li {
    --el-pagination-button-bg-color: #fff;
    border: 1px solid #e8e8e8;
    border-radius: 3px;
  }
}

.risk-btn-text-fff {
  --el-button-text-color: #fff !important;
  --el-button-hover-text-color: #fff !important;
}

.risk-table-btn {
  color: var(--risk-table-btn-color);
  cursor: pointer;
  margin-left: 10px;

  &:first-child {
    margin-left: 0;
  }
}

.risk-tabs {
  --risk-tabs-acitve-color: #4abab2;

  .el-tabs__nav-wrap::after {
    background: transparent;
  }

  .el-tabs__item {
    font-size: 18px;

    &.is-active, &:hover {
      color: var(--risk-tabs-acitve-color);
    }
  }

  .el-tabs__active-bar {
    background: var(--risk-tabs-acitve-color);
  }
}


</style>
