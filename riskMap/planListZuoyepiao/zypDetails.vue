<template>
  <div class="zypDetails">
    <searchTablePage
      :isBack="true"
      :isCustomize="true"
      title="11kV线路工程-5标段"
    >
      <template #search>
        <div class="zypDetails-search">
          <div class="zypDetails-search-item"><span>作业票名称：</span>施工作业B票</div>
          <div class="zypDetails-search-item"><span>作业票编号：</span>SGZYP-SCGSCDS09080001</div>
        </div>
      </template>
      <template #content>
        <div class="zypDetails-content">
          <div class="zypDetails-tabs-con risk-tabs">
            <el-tabs v-model="tabsActiveName" class="demo-tabs" @tab-change="handleClick">
              <el-tab-pane
                v-for="item in tabsList"
                :key="'tabs' + item.value"
                :label="item.label"
                :name="item.value">
              </el-tab-pane>
            </el-tabs>
            <div>
              <el-button
                :icon="Download"
              >
                导出
              </el-button>
            </div>
          </div>
          <div ref="zypDetailsMain" class="zypDetails-main" @scroll="handleScroll">
            <div id="zypDetailsBasic">
              <div class="details-title">基本信息</div>
              <div class="tabs-con-1 details-table el-table">
                <el-row>
                  <el-col :span="4" class="details-header">建设单位</el-col>
                  <el-col :span="4">北京城区</el-col>
                  <el-col :span="4" class="details-header">建立单位</el-col>
                  <el-col :span="4">北京吉北电力工程咨询有限公司</el-col>
                  <el-col :span="4" class="details-header">施工单位</el-col>
                  <el-col :span="4">北京京电电网维护有限公司</el-col>
                </el-row>
                <el-row>
                  <el-col :span="4" class="details-header">施工班组</el-col>
                  <el-col :span="4">变电电气一次-变电电气二次-XXX2班</el-col>
                  <el-col :span="4" class="details-header">初勘风险等级</el-col>
                  <el-col :span="4">四级</el-col>
                  <el-col :span="4" class="details-header">复测后风险等级</el-col>
                  <el-col :span="4">四级</el-col>
                </el-row>
                <el-row>
                  <el-col :span="4" class="details-header">工序及作业部位</el-col>
                  <el-col :span="20">投产送电-变电验收</el-col>
                </el-row>
                <el-row>
                  <el-col :span="4" class="details-header">地理位置</el-col>
                  <el-col :span="20">北京</el-col>
                </el-row>
                <el-row>
                  <el-col :span="4" class="details-header">作业部位</el-col>
                  <el-col :span="4">主控室</el-col>
                  <el-col :span="4" class="details-header">施工人数</el-col>
                  <el-col :span="4">14</el-col>
                  <el-col :span="4" class="details-header">计划开始时间</el-col>
                  <el-col :span="4">2024.04.15</el-col>
                </el-row>
                <el-row>
                  <el-col :span="4" class="details-header">计划结束时间</el-col>
                  <el-col :span="4">2024.4.20</el-col>
                  <el-col :span="4" class="details-header">实际开始时间</el-col>
                  <el-col :span="4">2024.04.15 14:32</el-col>
                  <el-col :span="4" class="details-header">实际结束时间</el-col>
                  <el-col :span="4">2024.04.18 18:20</el-col>
                </el-row>
                <el-row>
                  <el-col :span="4" class="details-header">具体人员分工</el-col>
                  <el-col :span="20">
                    <div class="divisionOfLabor">
                      <div class="divisionOfLabor-row">
                        <div><span>班组负责人:</span>XXX</div>
                        <div><span>班组安全员:</span>XXX</div>
                      </div>
                      <div class="divisionOfLabor-row">
                        <div><span>班组技术员:</span>XXX</div>
                        <div class="divisionOfLabor-row divisionOfLabor-row-2">
                          <span>施工人员:</span>
                          <div class="divisionOfLabor-row-2-con">
                            <div>XX(一般作业人员)、</div>
                            <div>XX(一般作业人员)、</div>
                            <div>XX(一般作业人员)、</div>
                            <div>XX(一般作业人员)、</div>
                            <div>XX(一般作业人员)、</div>
                            <div>XX(一般作业人员)、</div>
                            <div>XX(一般作业人员)、</div>
                            <div>XX(一般作业人员)、</div>
                            <div>XX(一般作业人员)</div>
                          </div>
                        </div>
                      </div>
                      <div class="divisionOfLabor-row">
                        <div><span>新增人员:</span>XXX</div>
                      </div>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="4" class="details-header">主要风险</el-col>
                  <el-col :span="20">触电、物体打击、高处坠落、其他伤害</el-col>
                </el-row>
              </div>
            </div>
            <div id="zypDetailsCondition">
              <div class="details-title">作业必备条件</div>
              <div class="el-table tabs-con-1">
                <div class="details-line-row">1.特种作业人员持证上岗。</div>
                <div class="details-line-row">2.作业人员无妨碍工作的职业禁忌。</div>
                <div class="details-line-row">3.无超龄或年龄不足人员参与作业。</div>
                <div class="details-line-row">4.配备个人安全防护用品，并经检验合格，齐全、完好。</div>
                <div class="details-line-row">5.结构性材料有合格证。</div>
                <div class="details-line-row">6.按规定需送检的材料送检并符合要求。</div>
                <div class="details-line-row">7.编制安全技术措施，安全技术方案制定并经审批或专家论证。</div>
                <div class="details-line-row">8.施工人员经安全教育培训，并参加过本工程技术安全措施交底。</div>
                <div class="details-line-row">9.确保高原医疗保障系统运转正常，施工人员经防疫知识培训、习服合格，施工点必须配备足够的应急药品和吸氧设备，尽量避免在恶劣气象条件下工作。（仅高海拔地区施工需做此项检查）</div>
                <div class="details-line-row">10.施工机械、设备有合格证并经检测合格。</div>
                <div class="details-line-row">11.工器具经准入检查，完好，经检查合格有效。</div>
                <div class="details-line-row">12.安全文明施工设施配置符合要求，齐全、完好。</div>
                <div class="details-line-row">13.各工作岗位人员对施工中可能存在的风险控制措施清楚。</div>
              </div>
            </div>
            <div id="zypDetailsControl" style="margin-bottom: 20px">
              <div class="details-title">过程控制措施</div>
              <div class="el-table">
                <el-checkbox-group  v-model="checkList">
                  <div class="details-line-row-title">变电站验收、消缺作业</div>
                  <div class="details-line-row"><el-checkbox disabled value="a" />(1) 在进行一次设备试验验收前，必须规范设置硬质安全隔离区域，向外悬挂 “止步，高压危险!” 的警示牌。设专人监护，严禁非作业人员进入。</div>
                  <div class="details-line-row"><el-checkbox disabled value="a" />(2) 试验设备和被试设备必须可靠接地，设备通电过程中，试验人员不得中途 离开。</div>
                  <div class="details-line-row"><el-checkbox disabled value="a" />(3) 试验结束后及时将试验电源断开，并对容性被试设备进行充分的放电后， 方可拆除试验接线。</div>
                  <div class="details-line-row"><el-checkbox disabled value="a" />(4) 在验收过程中需要触碰一次设备连线等部位时，必须确认被验设备与高压 出线有明显的断开点，或已可靠接地。</div>
                  <div class="details-line-row"><el-checkbox disabled value="a" />(5) 在高压出线处验收时，要严格落实防静电措施，作业人员穿屏蔽服作业。</div>
                  <div class="details-line-row"><el-checkbox disabled value="a" />(6) 班组负责人和安全监护人检查作业人员正确使用安全工器具和个人安全 防护用品，检查高处作业人员全方位防冲击安全带规范穿戴及使用情况，高处 作业使用垂直攀登自锁器，水平移动使用速差保护器。特别是厂家人员高处作 业时，需严格遵守。</div>
                  <div class="details-line-row"><el-checkbox disabled value="a" />(7) 在验收过程中需要进行高处作业时，应使用竹梯、升降车等符合安全规定 的作业设备，作业人员必须用绳索上、下传递工器具。</div>
                  <div class="details-line-row"><el-checkbox disabled value="a" />(8) 地面配合人员和验收人员，应站在可能坠物的坠落半径以外。</div>
                  <div class="details-line-row"><el-checkbox disabled value="a" />(9) 严格执行《安规》中，与带电调试相关的规定，在二次调试中做好与运行 回路的隔离措施。</div>
                  <div class="details-line-row"><el-checkbox disabled value="a" />(10) 在相关设备上消缺时，应严格按该设备的使用说明书进行操作，执行该 设备的风险控制措施，严禁无措施作业，防止伤及人身和设备。必要时应有厂 家人员在场配合。</div>
                  <div class="details-line-row"><el-checkbox disabled value="a" />(11) 消缺人员应熟悉所在设备的运行、通电情况，现场作业应切断相关可能 带电的回路。需要对设备进行通电调试时，应经班组负责人同意，并做好防护 措施。</div>
                  <div class="details-line-row-title">变电站验收、消缺作业</div>
                  <div class="details-line-row"><el-checkbox disabled value="a" />(1) 在进行一次设备试验验收前，必须规范设置硬质安全隔离区域，向外悬挂 “止步，高压危险!” 的警示牌。设专人监护，严禁非作业人员进入。</div>
                  <div class="details-line-row"><el-checkbox disabled value="a" />(2) 试验设备和被试设备必须可靠接地，设备通电过程中，试验人员不得中途 离开。</div>
                  <div class="details-line-row"><el-checkbox disabled value="a" />(3) 试验结束后及时将试验电源断开，并对容性被试设备进行充分的放电后， 方可拆除试验接线。</div>
                  <div class="details-line-row"><el-checkbox disabled value="a" />(4) 在验收过程中需要触碰一次设备连线等部位时，必须确认被验设备与高压 出线有明显的断开点，或已可靠接地。</div>
                  <div class="details-line-row"><el-checkbox disabled value="a" />(5) 在高压出线处验收时，要严格落实防静电措施，作业人员穿屏蔽服作业。</div>
                  <div class="details-line-row"><el-checkbox disabled value="a" />(6) 班组负责人和安全监护人检查作业人员正确使用安全工器具和个人安全 防护用品，检查高处作业人员全方位防冲击安全带规范穿戴及使用情况，高处 作业使用垂直攀登自锁器，水平移动使用速差保护器。特别是厂家人员高处作 业时，需严格遵守。</div>
                  <div class="details-line-row"><el-checkbox disabled value="a" />(7) 在验收过程中需要进行高处作业时，应使用竹梯、升降车等符合安全规定 的作业设备，作业人员必须用绳索上、下传递工器具。</div>
                  <div class="details-line-row"><el-checkbox disabled value="a" />(8) 地面配合人员和验收人员，应站在可能坠物的坠落半径以外。</div>
                  <div class="details-line-row"><el-checkbox disabled value="a" />(9) 严格执行《安规》中，与带电调试相关的规定，在二次调试中做好与运行 回路的隔离措施。</div>
                  <div class="details-line-row"><el-checkbox disabled value="a" />(10) 在相关设备上消缺时，应严格按该设备的使用说明书进行操作，执行该 设备的风险控制措施，严禁无措施作业，防止伤及人身和设备。必要时应有厂 家人员在场配合。</div>
                  <div class="details-line-row"><el-checkbox disabled value="a" />(11) 消缺人员应熟悉所在设备的运行、通电情况，现场作业应切断相关可能 带电的回路。需要对设备进行通电调试时，应经班组负责人同意，并做好防护 措施。</div>
                  <div class="details-line-row-title">变电站验收、消缺作业</div>
                  <div class="details-line-row"><el-checkbox disabled value="a" />(1) 在进行一次设备试验验收前，必须规范设置硬质安全隔离区域，向外悬挂 “止步，高压危险!” 的警示牌。设专人监护，严禁非作业人员进入。</div>
                  <div class="details-line-row"><el-checkbox disabled value="a" />(2) 试验设备和被试设备必须可靠接地，设备通电过程中，试验人员不得中途 离开。</div>
                  <div class="details-line-row"><el-checkbox disabled value="a" />(3) 试验结束后及时将试验电源断开，并对容性被试设备进行充分的放电后， 方可拆除试验接线。</div>
                  <div class="details-line-row"><el-checkbox disabled value="a" />(4) 在验收过程中需要触碰一次设备连线等部位时，必须确认被验设备与高压 出线有明显的断开点，或已可靠接地。</div>
                  <div class="details-line-row"><el-checkbox disabled value="a" />(5) 在高压出线处验收时，要严格落实防静电措施，作业人员穿屏蔽服作业。</div>
                  <div class="details-line-row"><el-checkbox disabled value="a" />(6) 班组负责人和安全监护人检查作业人员正确使用安全工器具和个人安全 防护用品，检查高处作业人员全方位防冲击安全带规范穿戴及使用情况，高处 作业使用垂直攀登自锁器，水平移动使用速差保护器。特别是厂家人员高处作 业时，需严格遵守。</div>
                  <div class="details-line-row"><el-checkbox disabled value="a" />(7) 在验收过程中需要进行高处作业时，应使用竹梯、升降车等符合安全规定 的作业设备，作业人员必须用绳索上、下传递工器具。</div>
                  <div class="details-line-row"><el-checkbox disabled value="a" />(8) 地面配合人员和验收人员，应站在可能坠物的坠落半径以外。</div>
                  <div class="details-line-row"><el-checkbox disabled value="a" />(9) 严格执行《安规》中，与带电调试相关的规定，在二次调试中做好与运行 回路的隔离措施。</div>
                  <div class="details-line-row"><el-checkbox disabled value="a" />(10) 在相关设备上消缺时，应严格按该设备的使用说明书进行操作，执行该 设备的风险控制措施，严禁无措施作业，防止伤及人身和设备。必要时应有厂 家人员在场配合。</div>
                  <div class="details-line-row"><el-checkbox disabled value="a" />(11) 消缺人员应熟悉所在设备的运行、通电情况，现场作业应切断相关可能 带电的回路。需要对设备进行通电调试时，应经班组负责人同意，并做好防护 措施。</div>
                  <div class="details-line-row-title">变电站验收、消缺作业</div>
                  <div class="details-line-row"><el-checkbox disabled value="a" />(1) 在进行一次设备试验验收前，必须规范设置硬质安全隔离区域，向外悬挂 “止步，高压危险!” 的警示牌。设专人监护，严禁非作业人员进入。</div>
                  <div class="details-line-row"><el-checkbox disabled value="a" />(2) 试验设备和被试设备必须可靠接地，设备通电过程中，试验人员不得中途 离开。</div>
                  <div class="details-line-row"><el-checkbox disabled value="a" />(3) 试验结束后及时将试验电源断开，并对容性被试设备进行充分的放电后， 方可拆除试验接线。</div>
                  <div class="details-line-row"><el-checkbox disabled value="a" />(4) 在验收过程中需要触碰一次设备连线等部位时，必须确认被验设备与高压 出线有明显的断开点，或已可靠接地。</div>
                  <div class="details-line-row"><el-checkbox disabled value="a" />(5) 在高压出线处验收时，要严格落实防静电措施，作业人员穿屏蔽服作业。</div>
                  <div class="details-line-row"><el-checkbox disabled value="a" />(6) 班组负责人和安全监护人检查作业人员正确使用安全工器具和个人安全 防护用品，检查高处作业人员全方位防冲击安全带规范穿戴及使用情况，高处 作业使用垂直攀登自锁器，水平移动使用速差保护器。特别是厂家人员高处作 业时，需严格遵守。</div>
                  <div class="details-line-row"><el-checkbox disabled value="a" />(7) 在验收过程中需要进行高处作业时，应使用竹梯、升降车等符合安全规定 的作业设备，作业人员必须用绳索上、下传递工器具。</div>
                  <div class="details-line-row"><el-checkbox disabled value="a" />(8) 地面配合人员和验收人员，应站在可能坠物的坠落半径以外。</div>
                  <div class="details-line-row"><el-checkbox disabled value="a" />(9) 严格执行《安规》中，与带电调试相关的规定，在二次调试中做好与运行 回路的隔离措施。</div>
                  <div class="details-line-row"><el-checkbox disabled value="a" />(10) 在相关设备上消缺时，应严格按该设备的使用说明书进行操作，执行该 设备的风险控制措施，严禁无措施作业，防止伤及人身和设备。必要时应有厂 家人员在场配合。</div>
                  <div class="details-line-row"><el-checkbox disabled value="a" /><(11) 消缺人员应熟悉所在设备的运行、通电情况，现场作业应切断相关可能 带电的回路。需要对设备进行通电调试时，应经班组负责人同意，并做好防护 措施。</div>
                </el-checkbox-group>
                <div class="details-line-row-title">现场风险复测变化情况及补充控制措施</div>
                <div class="details-line-row">1、变化情况</div>
                <el-input
                  :rows="3"
                  type="textarea"
                  disabled
                />
                <div class="details-line-row">2、控制措施</div>
                <el-input
                  :rows="3"
                  type="textarea"
                  disabled
                />
              </div>
            </div>
            <div id="zypDetailsApproval">
              <div class="details-title">审批信息</div>
              <div class="tabs-con-1 details-table el-table">
                <el-row>
                  <el-col :span="4" class="details-header">工作负责人</el-col>
                  <el-col :span="4">XXX</el-col>
                  <el-col :span="4" class="details-header">审核人(安全、技术专员)</el-col>
                  <el-col :span="4">XXX</el-col>
                  <el-col :span="4" class="details-header">安全监护人</el-col>
                  <el-col :span="4">XXX</el-col>
                </el-row>
                <el-row>
                  <el-col :span="4" class="details-header">签发人(项目经理/总工)</el-col>
                  <el-col :span="4">XXX</el-col>
                  <el-col :span="4" class="details-header">监理人员(三级及以上风险)</el-col>
                  <el-col :span="4">XXX</el-col>
                  <el-col :span="4" class="details-header">业主项目经理(二级风险</el-col>
                  <el-col :span="4">XXX</el-col>
                </el-row>
                <el-row>
                  <el-col :span="4" class="details-header">签发日期</el-col>
                  <el-col :span="20">XXX</el-col>
                </el-row>
              </div>
            </div>
            <div id="zypDetailsChange">
              <div class="details-title">变更记录</div>
              <MyEltable
                :tableData="tableData"
                :tableHeader="tableHeader"
              />
            </div>
          </div>
        </div>
      </template>
    </searchTablePage>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from "vue";
import {getCurrentHref, showViewById} from '@/utils/riskMap.ts'
import {Download} from "@element-plus/icons-vue";

const zypDetailsMain = ref(null);

const tabsActiveName = ref('zypDetailsBasic');
const tabsList = [
  {
    label: '基本信息',
    value: 'zypDetailsBasic',
  },
  {
    label: '作业必备条件',
    value: 'zypDetailsCondition',
  },
  {
    label: '过程控制措施',
    value: 'zypDetailsControl',
  },
  {
    label: '审批信息',
    value: 'zypDetailsApproval',
  },
  {
    label: '变更记录',
    value: 'zypDetailsChange',
  },
]
const handleClick = () => {
  showViewById(tabsActiveName.value)
}
const handleScroll = () => {
  const currentHref = getCurrentHref(zypDetailsMain.value!, tabsList);
  if (currentHref !== tabsActiveName.value)
    tabsActiveName.value = currentHref || 'zypDetailsBasic';
}


const checkList = ['a'];
const tableHeader = [
  {
    label: '变更岗位',
    prop: 'job',
  },
  {
    label: '变更前人员',
    prop: 'personnel',
  },
  {
    label: '变更后人员',
    prop: 'personnel1',
  },
  {
    label: '变更时间',
    prop: 'time',
  },
  {
    label: '变更人',
    prop: 'personne2',
  },
];
const tableData = [
  {
    job: '/',
    personnel: '/',
    personnel1: '/',
    time: '/',
    personne2: '/',
  },
  {
    job: '/',
    personnel: '/',
    personnel1: '/',
    time: '/',
    personne2: '/',
  },
  {
    job: '/',
    personnel: '/',
    personnel1: '/',
    time: '/',
    personne2: '/',
  },
  {
    job: '/',
    personnel: '/',
    personnel1: '/',
    time: '/',
    personne2: '/',
  },
  {
    job: '/',
    personnel: '/',
    personnel1: '/',
    time: '/',
    personne2: '/',
  },
  {
    job: '/',
    personnel: '/',
    personnel1: '/',
    time: '/',
    personne2: '/',
  },
];

</script>

<style lang='scss' scoped>
.zypDetails {
  height: 100%;

  .zypDetails-search {
    display: flex;

    .zypDetails-search-item {
      padding: 15px 15px 0;
      font-size: 16px;
      width: 30%;

      span {
        color: var(--risk-zhanbanhui-top-title-color);
      }
    }
  }

  .zypDetails-tabs-con {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .zypDetails-content {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .zypDetails-main {
    flex: 1;
    overflow-y: auto;
    padding: 20px 0;
  }

  .divisionOfLabor {
    width: 100%;
  }

  .divisionOfLabor-row {
    display: flex;
    color: #2cbab2;
    padding-bottom: 20px;

    > div {
      width: 50%;
    }

    span {
      width: 90px;
      display: inline-block;
      color: #000;
    }
  }

  .divisionOfLabor-row-2 {
    > div {
      flex: 1;
      box-sizing: border-box;
      padding-right: 20px;
    }
  }

  .divisionOfLabor-row-2-con {
    display: flex;
    flex-wrap: wrap;

    div {
      margin-bottom: 20px;
    }
  }
}
</style>
