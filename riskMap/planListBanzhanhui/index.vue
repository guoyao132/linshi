<template>
  <div class="planListBanzhanhui">
    <searchTablePage
      :isBack="true"
      :isCustomize="true"
      title="11kV线路工程-5标段"
    >
      <template #search>
        <div class="planListBanzhanhui-search">
          <div class="planListBanzhanhui-search-item"><span>作业票名称：</span>施工作业B票</div>
          <div class="planListBanzhanhui-search-item"><span>作业票编号：</span>SGZYP-SCGSCDS09080001</div>
        </div>
      </template>
      <template #content>
        <div class="planListBanzhanhui-content">
          <div class="planListBanzhanhui-tabs-con risk-tabs">
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
          <div ref="planListMain" class="planListBanzhanhui-main" @scroll="handleScroll">
            <div id="planListBasic">
              <div class="details-title">基本信息</div>
              <div class="details-table el-table">
                <el-row>
                  <el-col :span="4" class="details-header">作业部位以及内容</el-col>
                  <el-col :span="4">2R008~2R009~2R010~2R011：金属索道架设及运输</el-col>
                  <el-col :span="4" class="details-header">施工日期</el-col>
                  <el-col :span="4">2024-09-08</el-col>
                  <el-col :span="4" class="details-header">班组负责人</el-col>
                  <el-col :span="4">杨增方</el-col>
                </el-row>
                <el-row class="details-row-more-con">
                  <el-col :span="2" class="details-header details-row-2">作业部位以及内容</el-col>
                  <el-row>
                    <el-row>
                      <el-col :offset="2" :span="2" class="details-header">工作内容</el-col>
                      <el-col :span="20">1、施工设备运输、现场施工索道架设;</el-col>
                    </el-row>
                    <el-row>
                      <el-col :offset="2" :span="2" class="details-header">作业面监护人</el-col>
                      <el-col :span="20">张三</el-col>
                    </el-row>
                  </el-row>
                </el-row>
                <el-row>
                  <el-col :span="4" class="details-header">当日作业人数</el-col>
                  <el-col :span="4">6</el-col>
                  <el-col :span="4" class="details-header">施工人数</el-col>
                  <el-col :span="4">12</el-col>
                  <el-col :span="4" class="details-header">当日风险等级</el-col>
                  <el-col :span="4">三级</el-col>
                </el-row>
                <el-row>
                  <el-col :span="4" class="details-header">当日施工状态</el-col>
                  <el-col :span="4">作业中</el-col>
                  <el-col :span="4" class="details-header">站班会位置</el-col>
                  <el-col :span="4">四川省成都市武侯区武侯大街十字交叉口（经度：100.1111111111；纬度：100.1111111111；）
                  </el-col>
                  <el-col :span="4" class="details-header">当前作业位置</el-col>
                  <el-col :span="4"></el-col>
                </el-row>
              </div>
            </div>
            <div id="planListCheck">
              <div class="details-title">三交三查</div>
              <div class="details-table el-table">
                <el-row>
                  <el-col class="details-col-hasRow" :span="12">
                    <el-row class="details-row-more-con">
                      <el-col :span="4" class="details-header details-row-2">三交</el-col>
                      <el-row>
                        <el-row>
                          <el-col :offset="4" :span="4" class="details-header">交任务</el-col>
                          <el-col :span="16">施工作业票所列工作已宣读清楚</el-col>
                        </el-row>
                        <el-row>
                          <el-col :offset="4" :span="4" class="details-header">交安全</el-col>
                          <el-col :span="16">
                            1、交安全措施已宣读清楚
                            <br>
                            2、补充安全措施已交代清楚
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :offset="4" :span="4" class="details-header">交技术</el-col>
                          <el-col :span="16">
                            1、施工作业票所列安全技术措施已宣读清楚
                            <br>
                            2、补充技术措施已交代清楚
                          </el-col>
                        </el-row>
                      </el-row>
                    </el-row>
                  </el-col>
                  <el-col class="details-col-hasRow" :span="12">
                    <el-row class="details-row-more-con" style="height: 100%">
                      <el-col :span="4" class="details-header details-row-2">检查内容</el-col>
                      <el-row>
                        <el-row>
                          <el-col :offset="4" :span="4" class="details-header">三查（查衣着、查三宝、查精神状态）、查作业必备件</el-col>
                          <el-col :span="16">
                            1.作业人员着装规范、精神状态良好，经安全培训。
                            <br>
                            2.施工机械、设备有合格证并经检测合格。
                            <br>
                            3.工器具经准入检查，完好，经检查合格有效。
                            <br>
                            4.安全文明施工设施符合要求，齐全、完好。
                            <br>
                            5.施工人员对工作分工清楚。
                            <br>
                            6.各工作岗位人员对施工中可能存在的风险及控制措施清楚。

                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :offset="4" :span="4" class="details-header">当日控制措施检查</el-col>
                          <el-col :span="16">
                            具体执行见作业过程风险控制措施。
                          </el-col>
                        </el-row>
                      </el-row>
                    </el-row>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="4" class="details-header">备注</el-col>
                  <el-col :span="20"></el-col>
                </el-row>
              </div>
            </div>
            <div id="planListPerson">
              <div class="details-title">参与施工人员签名</div>
              <div class="details-table el-table">
                <el-row>
                  <el-col :span="4" class="details-header">具体分工人员</el-col>
                  <el-col :span="20">
                    <div>
                      班组负责人：<span class="details-item-value">XXX</span>
                      <br>
                      <br>
                      班组技术员：<span class="details-item-value">XXX</span>
                      <br>
                      <br>
                      班组安全员：<span class="details-item-value">XXX</span>
                      <br>
                      <br>
                      新增人员：<span class="details-item-value">XXX</span>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
            <div id="planListSafe">
              <div class="details-title">作业过程风险管控措施</div>
              <div class="el-table">
                <el-checkbox-group  v-model="checkList">
                  <div class="details-line-row"><el-checkbox disabled value="a" />(6) 班组负责人和安全监护人检查作业人员正确使用安全工器具和个人安全 防护用品，检查高处作业人员全方位防冲击安全带规范穿戴及使用情况，高处 作业使用垂直攀登自锁器，水平移动使用速差保护器。特别是厂家人员高处作 业时，需严格遵守。</div>
                  <div class="details-line-row"><el-checkbox disabled value="a" />(7) 在验收过程中需要进行高处作业时，应使用竹梯、升降车等符合安全规定 的作业设备，作业人员必须用绳索上、下传递工器具。</div>
                  <div class="details-line-row"><el-checkbox disabled value="a" />(8) 地面配合人员和验收人员，应站在可能坠物的坠落半径以外。</div>
                  <div class="details-line-row"><el-checkbox disabled value="a" />(9) 严格执行《安规》中，与带电调试相关的规定，在二次调试中做好与运行 回路的隔离措施。</div>
                  <div class="details-line-row"><el-checkbox disabled value="a" />(10) 在相关设备上消缺时，应严格按该设备的使用说明书进行操作，执行该 设备的风险控制措施，严禁无措施作业，防止伤及人身和设备。必要时应有厂 家人员在场配合。</div>
                  <div class="details-line-row"><el-checkbox disabled value="a" />(11) 消缺人员应熟悉所在设备的运行、通电情况，现场作业应切断相关可能 带电的回路。需要对设备进行通电调试时，应经班组负责人同意，并做好防护 措施。</div>
                </el-checkbox-group>
                <div class="details-line-row-title">现场风险复核变化情况及补充控制措施</div>
                <div class="details-line-row">1.作业人员异常</div>
                <div class="details-line-row">作业班组骨干人员（班组负责人、班组安全员、班组技术员、作业面监护人、特殊工种）有同类作业经验，连续作业时间不超过8小时。</div>
                <div class="details-line-row">2.机械设备异常</div>
                <div class="details-line-row">机具设备工况良好，不超年限使用；起重机械起吊 荷载不超过额定起重量的90%。</div>
                <div class="details-line-row">3.周围环境</div>
                <div class="details-line-row">周边环境（含运输路况）未发生重大变化。</div>
                <div class="details-line-row">4.气候情况</div>
                <div class="details-line-row">无极端天气状况。</div>
                <div class="details-line-row">5.地质条件</div>
                <div class="details-line-row">地质条件无重大变化。</div>
                <div class="details-line-row">6.临近带电体作业</div>
                <div class="details-line-row">作业范围与带电体的距离满足《安规》要求。</div>
                <div class="details-line-row">7.交叉作业</div>
                <div class="details-line-row">交叉作业采取安全控制措施。</div>
                <div class="details-line-row">风险异常原因： 无</div>
                <div class="details-line-row">补充安全控制措施： 无</div>
              </div>
            </div>
            <div id="planListTo">
              <div class="details-title">到岗到位签到表</div>
              <MyEltable
                :tableData="tableData"
                :tableHeader="tableHeader"
              />
            </div>
            <div id="planListWork">
              <div class="details-title">工作记录</div>
              <div class="details-table el-table">
                <el-row>
                  <el-col :span="5" class="details-header">作业开始时间</el-col>
                  <el-col :span="7">2024-04-18 11:36:09</el-col>
                  <el-col :span="5" class="details-header">作业完成时间</el-col>
                  <el-col :span="7">2024-04-18 18:19:09</el-col>
                </el-row>
              </div>
            </div>
            <div id="planListPhoto">
              <div class="details-title">照片信息</div>
              <div class="photo-list">
                <div class="photo-list-item">
                  <div class="photo-list-item-title">班站会交底照片</div>
                  <el-image
                    src="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
                    :zoom-rate="1.2"
                    :max-scale="7"
                    :min-scale="0.2"
                    :preview-src-list="['https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg']"
                    :initial-index="4"
                    fit="cover"
                  />
                </div>
                <div class="photo-list-item">
                  <div class="photo-list-item-title">班站会交底照片</div>
                  <el-image
                    src="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
                    :zoom-rate="1.2"
                    :max-scale="7"
                    :min-scale="0.2"
                    :preview-src-list="['https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg']"
                    :initial-index="4"
                    fit="cover"
                  />
                </div>
              </div>
            </div>
            <div id="planListModify">
              <div class="details-title">修改记录</div>
              <div class="details-title-2">作业内容</div>
              <MyEltable
                :tableData="tableData1"
                :tableHeader="tableHeader1"
              />
              <div class="details-title-2">人员信息</div>
              <MyEltable
                :tableData="tableData2"
                :tableHeader="tableHeader2"
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
import {Download} from "@element-plus/icons-vue";
import {getCurrentHref, showViewById} from "@/utils/riskMap.ts";

const tabsActiveName = ref('planListBasic');
const planListMain = ref(null);

const tabsList = [
  {
    label: '基本信息',
    value: 'planListBasic',
  },
  {
    label: '三交三查',
    value: 'planListCheck',
  },
  {
    label: '作业人员',
    value: 'planListPerson',
  },
  {
    label: '安全措施',
    value: 'planListSafe',
  },
  {
    label: '到岗到位',
    value: 'planListTo',
  },
  {
    label: '工作记录',
    value: 'planListWork',
  },
  {
    label: '照片信息',
    value: 'planListPhoto',
  },
  {
    label: '修改记录',
    value: 'planListModify',
  },
]

const handleClick = () => {
  showViewById(tabsActiveName.value)
}
const handleScroll = () => {
  const currentHref = getCurrentHref(planListMain.value!, tabsList);
  if (currentHref !== tabsActiveName.value)
    tabsActiveName.value = currentHref || 'planListBasic';
}

const checkList = ['a'];
const tableHeader = [
  {
    label: '单位',
    prop: 'unit',
  },
  {
    label: '职位/岗位',
    prop: 'job',
  },
  {
    label: '姓名',
    prop: 'name',
  },
  {
    label: '备注',
    prop: 'remarks',
  },
];
const tableData = [
  {
    unit: '/',
    job: '/',
    name: '/',
    remarks: '/',
  },
  {
    unit: '/',
    job: '/',
    name: '/',
    remarks: '/',
  },
  {
    unit: '/',
    job: '/',
    name: '/',
    remarks: '/',
  },
  {
    unit: '/',
    job: '/',
    name: '/',
    remarks: '/',
  },
  {
    unit: '/',
    job: '/',
    name: '/',
    remarks: '/',
  },
  {
    unit: '/',
    job: '/',
    name: '/',
    remarks: '/',
  },
  {
    unit: '/',
    job: '/',
    name: '/',
    remarks: '/',
  },
];
const tableHeader1 = [
  {
    label: '修改时间',
    prop: 'prop1',
  },
  {
    label: '修改人',
    prop: 'prop2',
  },
  {
    label: '修改类型',
    prop: 'prop3',
  },
  {
    label: '原工序及作业部位',
    prop: 'prop4',
  },
  {
    label: '修改后工序及作业部位',
    prop: 'prop5',
  },
];
const tableData1 = [];
const tableHeader2 = [
  {
    label: '姓名',
    prop: 'prop1',
  },
  {
    label: '类型',
    prop: 'prop2',
  },
  {
    label: '岗位/工种',
    prop: 'prop3',
  },
  {
    label: '修改时间',
    prop: 'prop4',
  },
];
const tableData2 = [
  {
    prop1: '/',
    prop2: '/',
    prop3: '/',
    prop4: '/',
  },
  {
    prop1: '/',
    prop2: '/',
    prop3: '/',
    prop4: '/',
  },
  {
    prop1: '/',
    prop2: '/',
    prop3: '/',
    prop4: '/',
  },
  {
    prop1: '/',
    prop2: '/',
    prop3: '/',
    prop4: '/',
  },
  {
    prop1: '/',
    prop2: '/',
    prop3: '/',
    prop4: '/',
  },
  {
    prop1: '/',
    prop2: '/',
    prop3: '/',
    prop4: '/',
  },
  {
    prop1: '/',
    prop2: '/',
    prop3: '/',
    prop4: '/',
  },
];

</script>

<style lang='scss' scoped>
.planListBanzhanhui {
  height: 100%;

  .planListBanzhanhui-search{
    display: flex;

    .planListBanzhanhui-search-item{
      padding: 15px 15px 0;
      font-size: 16px;
      width: 30%;

      span{
        color: var(--risk-zhanbanhui-top-title-color);
      }
    }
  }

  .planListBanzhanhui-tabs-con {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .planListBanzhanhui-content {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .planListBanzhanhui-main {
    flex: 1;
    overflow-y: auto;
    padding: 20px 0;

    > div{
      margin-bottom: 20px;
    }
  }

  .photo-list{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-top: 20px;
  }

  .photo-list-item{
    margin-right: 30px;

    .photo-list-item-title{
      font-size: 20px;
      text-align: center;
      line-height: 30px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    .el-image{
      width: 200px;
      height: 200px;
    }
  }

}
</style>
