<template>
  <div class="weatherMap riskMapFullCon">
    <riskSjmap
      ref="riskSjmapRef"
    >
      <GySjmap-html
        v-for="(item, index) in showProvinceCenter"
        :key="index"
        @click="showProvinceEarlyWarning(item)"
        :position="item.center">
        <div style="color: #000">
          {{ item.showName }}
        </div>
      </GySjmap-html>
      <template v-for="item in provincePositionList" :key="item.adcode">
        <GySjmapPolygon
          :positionList="item.shape"
          fillColor="#cedfee"
          fillOutlineColor="#fff"
          :fillOpacity="1"
          :positionIsGeometry="true"
          :is-click="true"
          @clickFun="clickFun(item)"
        />
        <GySjmap-html
          :position="item.center">
          <div style="color: #000" @click="clickFun">
            {{ item.name }}
          </div>
        </GySjmap-html>
      </template>
    </riskSjmap>
    <weatherAlarmingList :list="list" @onClick="onClick"/>
    <div class="weatherMap-tools">
      <div class="weatherMap-tools-warning" @click="showWarningListFun">
        <img src="@/assets/images/riskMap/warning-icon.png">
      </div>
    </div>
    <div
      class="weatherMap-warning-probability-btn"
      @click="showWarningProbabilityList = true"
      v-show="!showWarningProbabilityList">
      <img src="@/assets/images/riskMap/zhankai.png" alt="">
    </div>
    <!--   省气象预警-->
    <Transition name="box-right">
      <div class="riskMap-dialog-con warning-probability-con" v-show="showProvinceEarlyWarningList">
        <div class="riskMap-dialog-header">
          <div>{{ EarlyWarningObj.name }}</div>
          <div @click="showProvinceEarlyWarningList = false;"><span><Close></Close></span></div>
        </div>
        <div class="riskMap-dialog-main">
          <div class="warning-probability-month">
            <div class="warning-probability-month-prev" @click="prevMonthYj">
              <el-icon :size="25">
                <ArrowLeftBold/>
              </el-icon>
            </div>
            <div class="warning-probability-month-text">
              {{ provinceEarlyWarningDateStr }}
            </div>
            <div class="warning-probability-month-next" @click="nextMonthYj">
              <el-icon :size="25">
                <ArrowRightBold/>
              </el-icon>
            </div>
          </div>
          <div class="provinceEarly-warning-total">
            <div class="provinceEarly-warning-total-item">
              <div class="provinceEarly-warning-total-item-icon">
                <img src="@/assets/images/riskMap/qxyj-zyd.png" alt="">
              </div>
              <div class="provinceEarly-warning-total-item-main">
                <div class="provinceEarly-warning-total-value">128</div>
                <div class="provinceEarly-warning-total-title">气象预警作业点</div>
              </div>
            </div>
            <div class="provinceEarly-warning-total-item">
              <div class="provinceEarly-warning-total-item-icon">
                <img src="@/assets/images/riskMap/qxyj-gx.png" alt="">
              </div>
              <div class="provinceEarly-warning-total-item-main">
                <div class="provinceEarly-warning-total-value">152</div>
                <div class="provinceEarly-warning-total-title">气象预警工序</div>
              </div>
            </div>
          </div>
          <div class="provinceEarly-warning-table weatherModule-table hidebox risk-table">
            <el-table :data="tableData2" stripe height="100%">
              <el-table-column
                label="行政区"
                align="center"
                prop="province">
              </el-table-column>
              <el-table-column
                label="主要气象预警及概率"
                align="center"
                prop="probability">
              </el-table-column>
              <el-table-column
                label="涉及作业点"
                align="center"
                prop="zuoyedian">
              </el-table-column>
              <el-table-column
                label="涉及工序"
                align="center"
                prop="gongxu">
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </Transition>
    <!--    全国预警概率-->
    <Transition name="box-right">
      <div class="riskMap-dialog-con warning-probability-con" v-show="showWarningProbabilityList">
        <div class="riskMap-dialog-header">
          <div>全国</div>
          <div @click="showWarningProbabilityList = false;"><span><Close></Close></span></div>
        </div>
        <div class="riskMap-dialog-main">
          <div class="warning-probability-month">
            <div class="warning-probability-month-prev" @click="prevMonth">
              <el-icon :size="25">
                <ArrowLeftBold/>
              </el-icon>
            </div>
            <div class="warning-probability-month-text">
              {{ warningProbabilityDateStr }}
            </div>
            <div class="warning-probability-month-next" @click="nextMonth">
              <el-icon :size="25">
                <ArrowRightBold/>
              </el-icon>
            </div>
          </div>
          <div class="warning-probability-table weatherModule-table hidebox risk-table">
            <el-table :data="tableData1" stripe height="100%">
              <el-table-column
                label="省份"
                align="center"
                prop="province"
                width="120">
              </el-table-column>
              <el-table-column
                align="center"
                label="主要气候灾害及发生概率"
                prop="probability">
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </Transition>
    <!--    全国预警-->
    <Transition name="box-bottom">
      <div class="riskMap-dialog-con weatherMap-warning-list-con" v-show="showWarningList">
        <div class="riskMap-dialog-header">
          <div>全国</div>
          <div @click="showWarningList = false;"><span><Close></Close></span></div>
        </div>
        <div class="riskMap-dialog-main weatherMap-warning">
          <div class="weatherMap-warning-item">
            <div class="weatherMap-warning-item-name">
              时间
            </div>
            <div class="weatherMap-warning-item-value">
              2024年07月26日—2024年07月26日
            </div>
          </div>
          <div class="weatherMap-warning-item">
            <div class="weatherMap-warning-item-name">
              预警等级
            </div>
            <div class="weatherMap-warning-item-value">
              <el-radio-group v-model="warningLevel" size="small">
                <el-radio value="">全部</el-radio>
                <el-radio value="blue">蓝色</el-radio>
                <el-radio value="yellow">黄色</el-radio>
                <el-radio value="orange">橙色</el-radio>
                <el-radio value="red">红色</el-radio>
              </el-radio-group>
            </div>
          </div>
          <div class="weatherMap-warning-item">
            <div class="weatherMap-warning-item-name">
              预警类型
            </div>
            <div class="weatherMap-warning-item-value">
              <el-checkbox
                label="全选"
                v-model="checkAll"
                :indeterminate="isIndeterminate"
                @change="handleCheckAllChange"
                size="small"/>
              <el-checkbox-group v-model="warningType" size="small" @change="handleCheckedChange">
                <el-checkbox v-for="item in warningTypeArr" :label="item.label" :value="item.value" :key="item.value"/>
              </el-checkbox-group>
            </div>
          </div>
          <div class="weatherMap-warning-details-list">
            <div class="weatherMap-warning-details">
              <div class="weatherMap-warning-details-province weatherMap-warning-details-province-blue">
                江苏省
              </div>
              <div class="weatherMap-warning-details-con">
                <div class="weatherMap-warning-details-header">
                  江苏省气象前台发布台风蓝色预警
                  <span>14:32</span>
                </div>
                <div class="weatherMap-warning-details-text">
                  江苏省气象62024年07月26日09时17分继续发布台风益包预:更今年第3号号风“格美”影响，预计26日至28日日天，我首淮河以南大部分地区将有8级左右阵网，江河湖面阵风司达9-10级，其他地区将有6-7级阵风名风彩响期间，全百有分数性昨带或需雨，大部分地区雨量可达小到中等，其中本首西北部地区中到大局部暴雨，并可能伴有短的强降水等对流天气。
                </div>
              </div>
            </div>
            <div class="weatherMap-warning-details">
              <div class="weatherMap-warning-details-province weatherMap-warning-details-province-yellow">
                江苏省
              </div>
              <div class="weatherMap-warning-details-con">
                <div class="weatherMap-warning-details-header">
                  江苏省气象前台发布台黄色预警
                  <span>14:32</span>
                </div>
                <div class="weatherMap-warning-details-text">
                  江苏省气象62024年07月26日09时17分继续发布台风益包预:更今年第3号号风“格美”影响，预计26日至28日日天，我首淮河以南大部分地区将有8级左右阵网，江河湖面阵风司达9-10级，其他地区将有6-7级阵风名风彩响期间，全百有分数性昨带或需雨，大部分地区雨量可达小到中等，其中本首西北部地区中到大局部暴雨，并可能伴有短的强降水等对流天气。
                </div>
              </div>
            </div>
            <div class="weatherMap-warning-details">
              <div class="weatherMap-warning-details-province weatherMap-warning-details-province-red">
                江苏省
              </div>
              <div class="weatherMap-warning-details-con">
                <div class="weatherMap-warning-details-header">
                  江苏省气象前台发布台风红色预警
                  <span>14:32</span>
                </div>
                <div class="weatherMap-warning-details-text">
                  江苏省气象62024年07月26日09时17分继续发布台风益包预:更今年第3号号风“格美”影响，预计26日至28日日天，我首淮河以南大部分地区将有8级左右阵网，江河湖面阵风司达9-10级，其他地区将有6-7级阵风名风彩响期间，全百有分数性昨带或需雨，大部分地区雨量可达小到中等，其中本首西北部地区中到大局部暴雨，并可能伴有短的强降水等对流天气。
                </div>
              </div>
            </div>
            <div class="weatherMap-warning-details">
              <div class="weatherMap-warning-details-province weatherMap-warning-details-province-orange">
                江苏省
              </div>
              <div class="weatherMap-warning-details-con">
                <div class="weatherMap-warning-details-header">
                  江苏省气象前台发布台风橙色预警
                  <span>14:32</span>
                </div>
                <div class="weatherMap-warning-details-text">
                  江苏省气象62024年07月26日09时17分继续发布台风益包预:更今年第3号号风“格美”影响，预计26日至28日日天，我首淮河以南大部分地区将有8级左右阵网，江河湖面阵风司达9-10级，其他地区将有6-7级阵风名风彩响期间，全百有分数性昨带或需雨，大部分地区雨量可达小到中等，其中本首西北部地区中到大局部暴雨，并可能伴有短的强降水等对流天气。
                </div>
              </div>
            </div>
            <div class="weatherMap-warning-details">
              <div class="weatherMap-warning-details-province weatherMap-warning-details-province-blue">
                江苏省
              </div>
              <div class="weatherMap-warning-details-con">
                <div class="weatherMap-warning-details-header">
                  江苏省气象前台发布台风蓝色预警
                  <span>14:32</span>
                </div>
                <div class="weatherMap-warning-details-text">
                  江苏省气象62024年07月26日09时17分继续发布台风益包预:更今年第3号号风“格美”影响，预计26日至28日日天，我首淮河以南大部分地区将有8级左右阵网，江河湖面阵风司达9-10级，其他地区将有6-7级阵风名风彩响期间，全百有分数性昨带或需雨，大部分地区雨量可达小到中等，其中本首西北部地区中到大局部暴雨，并可能伴有短的强降水等对流天气。
                </div>
              </div>
            </div>
            <div class="weatherMap-warning-details">
              <div class="weatherMap-warning-details-province weatherMap-warning-details-province-blue">
                江苏省
              </div>
              <div class="weatherMap-warning-details-con">
                <div class="weatherMap-warning-details-header">
                  江苏省气象前台发布台风蓝色预警
                  <span>14:32</span>
                </div>
                <div class="weatherMap-warning-details-text">
                  江苏省气象62024年07月26日09时17分继续发布台风益包预:更今年第3号号风“格美”影响，预计26日至28日日天，我首淮河以南大部分地区将有8级左右阵网，江河湖面阵风司达9-10级，其他地区将有6-7级阵风名风彩响期间，全百有分数性昨带或需雨，大部分地区雨量可达小到中等，其中本首西北部地区中到大局部暴雨，并可能伴有短的强降水等对流天气。
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
    <!--    气候月历-->
    <Transition name="box-bottom">
      <div class="riskMap-dialog-con weather-month-table-con" v-show="showWatherMonthTable">
        <div class="riskMap-dialog-header">
          <div>气候预警月历</div>
          <div @click="showWatherMonthTable = false;"><span><Close></Close></span></div>
        </div>
        <div class="riskMap-dialog-main">
          <div class="weather-month-table-con-search">
            <div class="weather-month-table-con-search-left">
              <SearchDate
                :form-data="searchForm"
                label="预警时间"
                prop="date"
              />
            </div>
            <div class="weather-month-table-con-search-right">
              <el-button
                :icon="Search"
                color="#4abab2"
                class="risk-btn-text-fff">
                查询
              </el-button>
            </div>
          </div>
          <div class="weather-month-table-con-table-con">
            <div class="weather-month-table-con-table weatherModule-table risk-table">
              <el-table :data="tableData" stripe height="100%">
                <el-table-column
                  fixed="left"
                  label="气候类型"
                  width="120">
                  <template #default="scope">
                    <div style="padding: 4px 10px;">
                      <img :src="getWeatherImgByName(scope.row.weather)" class="riskMap-weather-icon"/>
                      {{ scope.row.weather }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  v-for="(item, index) in tableHeader"
                  :key="'t' + index"
                  :prop="item.prop"
                  width="60"
                  align="center"
                  :label="item.name">
                  <template #default="scope">
                    <div :class="['weather-province', {'hasValue': scope.row[item.prop]}]">
                      <Select/>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import {ref, computed} from 'vue'
import provinceCenter from "@/components/riskMap/provinceCenter.ts";
import SearchDate from '../components/searchTablePage/components/SearchDate.vue'
import {Search, Close, Select, ArrowLeftBold, ArrowRightBold} from "@element-plus/icons-vue";
import {getWeatherImgByName} from "@/components/riskMap/components/weatherObj";
import {formatTime} from '@/utils/riskMap'
import {getWeatherWarningCalendarMon} from "@/api/risMap";

const showProvinceCenter = computed(() => {
  let arr = provinceCenter.map((obj: any) => {
    let name = obj.alias || obj.name;
    obj.showName = name.replace('省', '').replace('市', '').replace('区', '').replace('县', '').replace('镇', '');
    return obj;
  });
  return arr;
})
const provincePositionList = ref<any>([]);
const riskSjmapRef = ref(null)

// 底部导航
const list = [
  {
    label: '气候预警',
    path: '/riskMap/weatherListPage'
  },
  {
    label: '气候月历',
  }
]
const onClick = (item: any) => {
  if (item.label === '气候月历' && !showWatherMonthTable.value) {
    showWatherMonthTable.value = true;
  }
}
// 气候月历
const showWatherMonthTable = ref(false);
const searchForm = ref({
  date: '',
});
const tableData = ref([
  {
    weather: '寒潮',
    beijing: 1,
  },
  {
    weather: '暴雪',
  },
  {
    weather: '暴雨',
  },
  {
    weather: '高温',
  },
  {
    weather: '雷电',
  },
  {
    weather: '台风',
  },
  {
    weather: '大风',
  },
  {
    weather: '沙尘暴',
  },
  {
    weather: '森林火灾',
  },
  {
    weather: '洪灾',
  },
  {
    weather: '泥石流',
  },
  {
    weather: '滑坡',
  },
  {
    weather: '地震',
  },
  {
    weather: '烟气中毒',
  },
  {
    weather: '强浓雾',
  },
])
const tableHeader = provinceCenter.map((item: any) => {
  let name = item.alias || item.name;
  name = name.replace('市', '').replace('省', '');
  return {
    name,
    prop: item.pinyin,
  }
})

// 全国预警
const showWarningList = ref(false);
const showWarningListFun = () => {
  showWarningList.value = true;
}
const warningLevel = ref('')
const warningType = ref([])
const warningTypeArr = [
  {
    label: '台风预警',
    value: 'taifeng',
  },
  {
    label: '暴雨预警',
    value: 'baoyu',
  },
  {
    label: '暴雪预警',
    value: 'baoxue',
  },
  {
    label: '寒潮预警',
    value: 'hanchao',
  },
  {
    label: '大风预警',
    value: 'dafeng',
  },
  {
    label: '沙尘暴预警',
    value: 'shachenbao',
  },
  {
    label: '高温预警',
    value: 'gaowen',
  },
  {
    label: '雷电预警',
    value: 'leidian',
  },
  {
    label: '冰雹预警',
    value: 'bingbao',
  },
  {
    label: '霜冻预警',
    value: 'shuangdong',
  },
  {
    label: '大雾预警',
    value: 'dawu',
  },
]
warningType.value = warningTypeArr.map((item: any) => item.value);
const checkAll = ref(true)
const isIndeterminate = ref(false)
const handleCheckAllChange = (val: boolean) => {
  if (val) {
    warningType.value = warningTypeArr.map((item: any) => item.value);
  } else {
    warningType.value = [];
  }
  isIndeterminate.value = false
}
const handleCheckedChange = (value: string[]) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === warningTypeArr.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < warningTypeArr.length
}

// 全国预警概率
const showWarningProbabilityList = ref(true);
let now = new Date();
const warningProbabilityDate = ref(new Date());
const warningProbabilityDateStr = ref(formatTime(warningProbabilityDate.value, null, 'y年m月'));
const tableData1 = ref([
  {
    province: '江苏省',
    probability: '暴雨 86%  大风 80%  雷电 66%',
  },
  {
    province: '河北省',
    probability: '雷电 82%  暴雨 80%  冰雹 62%',
  },
  {
    province: '北京市',
    probability: '大雾 80%  暴雨 76%  雷电 58%',
  },
  {
    province: '山西省',
    probability: '暴雨 80%  大风 74%  雷电 55%',
  },
  {
    province: '辽宁省',
    probability: '暴雨 76%  大风 66%  雷电 48%',
  },
  {
    province: '吉林省',
    probability: '暴雨 74%  大风 62%  雷电 58%',
  },
  {
    province: '内蒙古自治区',
    probability: '雷电 43%  暴雨 66%  冰雹 43%',
  },
  {
    province: '黑龙江省',
    probability: '大雪 62%  大风 55%  冰雹 40%',
  },
  {
    province: '上海市',
    probability: '暴雨 58%  大风 48%  雷电 43%',
  },
  {
    province: '浙江省',
    probability: '大风 55%  暴雨 43%  雷电 43%',
  },
  {
    province: '安徽省',
    probability: '冰香 48%  大风 43%  雷电 40%',
  },
  {
    province: '福建省',
    probability: '暴雨 43%  大风 40%  冰雹 28%',
  },
  {
    province: '江西省',
    probability: '',
  },
  {
    province: '山东省',
    probability: '',
  },
  {
    province: '河南省',
    probability: '',
  },
  {
    province: '湖北省',
    probability: '',
  },
  {
    province: '湖南省',
    probability: '',
  },
  {
    province: '广东省',
    probability: '',
  },
  {
    province: '广西壮族自治区',
    probability: '',
  },
  {
    province: '海南省',
    probability: '',
  },
  {
    province: '重庆市',
    probability: '',
  },
  {
    province: '四川省',
    probability: '',
  },
  {
    province: '贵州省',
    probability: '',
  },
  {
    province: '云南省',
    probability: '',
  },
  {
    province: '陕西省',
    probability: '',
  },
  {
    province: '甘肃省',
    probability: '',
  },
  {
    province: '青海省',
    probability: '',
  },
  {
    province: '宁夏回族自治区',
    probability: '',
  },
  {
    province: '新疆维吾尔自治区',
    probability: '',
  },
  {
    province: '西藏自治区',
    probability: '',
  },
])
let isGetWpList = false;
const prevMonth = () => {
  if (isGetWpList) {
    return
  }
  let d = warningProbabilityDate.value;
  d.setMonth(d.getMonth() - 1)
  warningProbabilityDate.value = d;
  setWarningProbabilityList();
}
const nextMonth = () => {
  if (isGetWpList) {
    return
  }
  let d = warningProbabilityDate.value;
  d.setMonth(d.getMonth() + 1)
  warningProbabilityDate.value = d;
  setWarningProbabilityList();
}
const setWarningProbabilityList = () => {
  isGetWpList = true;
  warningProbabilityDateStr.value = formatTime(warningProbabilityDate.value, null, 'y年m月');
  isGetWpList = false;
}

// 省预警
const showProvinceEarlyWarningList = ref(false);
const EarlyWarningObj = ref({})
const showProvinceEarlyWarning = (item) => {
  showProvinceEarlyWarningList.value = true;
  let obj = {};
  obj.name = item.showName;
  EarlyWarningObj.value = obj;
}
let now1 = new Date();
const provinceEarlyWarningDate = ref(new Date());
const provinceEarlyWarningDateStr = ref(formatTime(provinceEarlyWarningDate.value, null, 'y年m月'));
const tableData2 = ref([
  {
    province: '江苏省',
    probability: '暴雨 86%',
    zuoyedian: 20,
    gongxu: 26
  },
  {
    province: '河北省',
    probability: '雷电 82%',
    zuoyedian: 20,
    gongxu: 26
  },
  {
    province: '北京市',
    probability: '大雾 80%',
    zuoyedian: 18,
    gongxu: 20
  },
  {
    province: '山西省',
    probability: '暴雨 80%',
    zuoyedian: 17,
    gongxu: 17
  },
  {
    province: '辽宁省',
    probability: '暴雨 76%',
    zuoyedian: 15,
    gongxu: 15
  },
  {
    province: '吉林省',
    probability: '暴雨 74%',
    zuoyedian: 13,
    gongxu: 15
  },
  {
    province: '内蒙古自治区',
    probability: '雷电 43%',
    zuoyedian: 11,
    gongxu: 12
  },
  {
    province: '黑龙江省',
    probability: '大雪 62% ',
    zuoyedian: 8,
    gongxu: 13
  },
  {
    province: '上海市',
    probability: '暴雨 58%',
  },
  {
    province: '浙江省',
    probability: '大风 55%',
  },
  {
    province: '安徽省',
    probability: '冰香 48%',
  },
  {
    province: '福建省',
    probability: '暴雨 43%',
  },
  {
    province: '江西省',
    probability: '',
  },
  {
    province: '山东省',
    probability: '',
  },
  {
    province: '河南省',
    probability: '',
  },
  {
    province: '湖北省',
    probability: '',
  },
  {
    province: '湖南省',
    probability: '',
  },
  {
    province: '广东省',
    probability: '',
  },
  {
    province: '广西壮族自治区',
    probability: '',
  },
  {
    province: '海南省',
    probability: '',
  },
  {
    province: '重庆市',
    probability: '',
  },
  {
    province: '四川省',
    probability: '',
  },
  {
    province: '贵州省',
    probability: '',
  },
  {
    province: '云南省',
    probability: '',
  },
  {
    province: '陕西省',
    probability: '',
  },
  {
    province: '甘肃省',
    probability: '',
  },
  {
    province: '青海省',
    probability: '',
  },
  {
    province: '宁夏回族自治区',
    probability: '',
  },
  {
    province: '新疆维吾尔自治区',
    probability: '',
  },
  {
    province: '西藏自治区',
    probability: '',
  },
])
let isGetYjList = false;
const prevMonthYj = () => {
  if (isGetYjList) {
    return
  }
  let d = provinceEarlyWarningDate.value;
  d.setMonth(d.getMonth() - 1)
  provinceEarlyWarningDate.value = d;
  setProvinceEarlyWarning();
}
const nextMonthYj = () => {
  if (isGetYjList) {
    return
  }
  let d = provinceEarlyWarningDate.value;
  d.setMonth(d.getMonth() + 1)
  provinceEarlyWarningDate.value = d;
  setProvinceEarlyWarning();
}
const setProvinceEarlyWarning = () => {
  isGetYjList = true;
  provinceEarlyWarningDateStr.value = formatTime(provinceEarlyWarningDate.value, null, 'y年m月');
  isGetYjList = false;
}

// getWeatherWarningCalendarMon().then(res => {
//   let resultValue = res.resultVlaue;
//   console.log(resultValue);
// })

</script>

<style lang='scss' scoped>
.weatherMap {
  position: relative;
  overflow: hidden;

  .weather-month-table-con {
    width: 80%;
    border: 1px solid #ccc;
    left: 5%;
    bottom: 15%;
    height: 76%;
  }

  .weather-month-table-con-search {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 30px;
  }

  .riskMap-weather-icon {
    margin-right: 5px;
  }

  .weather-month-table-con-table-con {
    height: calc(100% - 70px);
    padding: 0 30px;
  }

  .weather-month-table-con-table {
    height: 100%;

    :deep(.el-table__body-wrapper) {
      td.el-table__cell {
        padding: 0;

        .cell {
          padding: 0;
        }
      }
    }
  }

  .weatherMap-tools {
    position: absolute;
    right: 20px;
    top: 10px;
    z-index: 100;

    .weatherMap-tools-warning {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  }

  .weatherMap-warning {
    display: flex;
    flex-direction: column;
  }

  .weatherMap-warning-details-list {
    flex: 1;
    overflow: auto;
  }

  .weatherMap-warning-list-con {
    right: 30px;
    bottom: 3%;
    width: 470px;
    height: 80%;
  }

  .weatherMap-warning-item {
    display: flex;
    padding: 0 10px;
    margin-top: 10px;
    line-height: 24px;
  }

  .weatherMap-warning-item-name {
    width: 80px;
    text-align: right;
    color: #88909b;
  }

  .weatherMap-warning-item-value {
    flex: 1;
    padding-left: 10px;
    box-sizing: border-box;
  }

  .weatherMap-warning-details {
    display: flex;
    background: #f4f7fa;
    border-radius: 3px;
    overflow: hidden;
    padding-right: 15px;
    margin: 10px auto 0;
    width: 90%;

  }

  .weatherMap-warning-details-province {
    width: 27px;
    min-width: 27px;
    padding: 0 5px;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    box-sizing: border-box;
    margin-right: 10px;
  }

  .weatherMap-warning-details-province-blue {
    background: linear-gradient(to bottom, #f4f7fa 0%, #b7cbf7 50%, #f4f7fa 100%);
  }

  .weatherMap-warning-details-province-orange {
    background: linear-gradient(to bottom, #f4f7fa 0%, #f7d2b5 50%, #f4f7fa 100%);
  }

  .weatherMap-warning-details-province-red {
    background: linear-gradient(to bottom, #f4f7fa 0%, #f3b9b7 50%, #f4f7fa 100%);
  }

  .weatherMap-warning-details-province-yellow {
    background: linear-gradient(to bottom, #f4f7fa 0%, #f4edc9 50%, #f4f7fa 100%);
  }

  .weatherMap-warning-details-header {
    padding: 8px 0;

    span {
      float: right;
      font-size: 12px;
      color: #919aa4;
    }
  }

  .weatherMap-warning-details-text {
    font-size: 12px;
    line-height: 20px;
    color: #919aa4;
    padding-bottom: 10px;
  }

  .weather-province {
    height: 31px;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 20px;
      display: none;
      color: #fff;
    }


    &.hasValue {
      background: #90b0f6;

      svg {
        display: block;
      }
    }

  }

  .warning-probability-month {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    padding: 0 5px;
    height: 40px;
    color: #81d3f8;
  }

  .warning-probability-month-prev, .warning-probability-month-next {
    cursor: pointer;
  }

  .warning-probability-month-text {
    color: #2baef1;
    user-select: none;
  }

  .warning-probability-table {
    height: calc(100% - 40px);
  }

  .provinceEarly-warning-table {
    height: calc(100% - 100px);
  }

  .warning-probability-con {
    width: 420px;
    right: 30px;
    height: 80%;
    top: 50%;
    transform: translateY(-50%);
  }

  .weatherMap-warning-probability-btn {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    width: 79px;
    height: 79px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .provinceEarly-warning-total {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 10px;
  }

  .provinceEarly-warning-total-item {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 55px;
  }
  .provinceEarly-warning-total-item-icon{
    min-width: 50px;
    width: 50px;
    img{
      width: 47px;
      height: 55px;
    }
  }

  .provinceEarly-warning-total-item-main{
    flex: 1;
    background: url(@/assets/images/riskMap/qxyj-bg.png) no-repeat center center/100% 100%;
    height: 55px;
    padding-top: 7px;
    padding-left: 15px;
  }


  .provinceEarly-warning-total-value{
    font-size: 18px;
    color: #2b67ee;
    font-weight: bold;
  }
  .provinceEarly-warning-total-title {
    font-size: 15px;
    margin-top: 10px;
    color: #606c7e;
  }
}

</style>
