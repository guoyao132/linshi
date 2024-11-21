<template>
  <div class="riskMapCon riskMapFullCon">
    <riskSjmap
      ref="riskSjmapRef"
      @showCITYArea="showCITYArea"
    >
      <GySjmap-html
        v-for="(item, index) in showProvinceCenter"
        :key="index"
        :position="item.center">
        <div class="sjmap-html-con map-province" style="color: #000" @click.stop="clickFun(item)">
          <div class="province-project-weather" v-if="item.img">
            <img :src="item.img"/>
          </div>
          <div>{{ item.showName }}</div>
          <div class="province-project-detail">
            <div class="province-project-detail-header">
              <div>
                <img src="@/assets/images/riskMap/tk-xtb.png"/>
                {{ item.showName }}
              </div>
              <img src="@/assets/images/riskMap/tk-tzs.png"/>
            </div>
            <div class="province-project-list">
              <div class="province-project-item">
                <span>工程数量</span>
                {{ item.allproject || '0' }}
              </div>
              <div class="province-project-item">
                <span>风险数量</span>
                {{ item.allrisk || '0' }}
              </div>
              <div class="province-project-item">
                <span>计划数量</span>
                {{ item.dayTask || '0' }}
              </div>
              <div class="province-project-item">
                <span>人员数量</span>
                {{ item.allperson || '0' }}
              </div>
            </div>
          </div>
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
      </template>
    </riskSjmap>
  </div>
</template>

<script setup lang="ts">
import {computed, ref, watch} from 'vue'
import {useRouter} from 'vue-router';
import provinceCenter from "@/components/riskMap/provinceCenter.ts";
import {getAllProvince} from "@/api/risMap";

const router = useRouter();
const props = defineProps({
  provinceCode: {
    type: String,
    default: ''
  },
  weatherObj: {
    type: Array,
    default: () => ([])
  }
})
const emit = defineEmits([
  'update:provinceCode',
  '@update:weatherObj',
]);

const riskSjmapRef = ref(null)
const provincePositionList: any = ref([]);
const isCITY = computed(() => {
  return riskSjmapRef.value?.isCITY || false;
})
watch(() => props.weatherObj, (val) => {
  getShowProvinceCenter();
})
const showProvinceCenter = ref([]);
let provinceDetailList: any = [];
const getShowProvinceCenter = () => {
  let sourceList = [];
  if (isCITY.value) {
    sourceList = provincePositionList.value || [];
  } else {
    sourceList = provinceCenter || [];
  }
  showProvinceCenter.value = sourceList.map((obj: any) => {
    let name = obj.alias || obj.name;
    obj.showName = name.replace('省', '').replace('市', '').replace('区', '').replace('县', '').replace('镇', '');
    let w: any = props.weatherObj.find((item1: any) => item1.city === obj.showName);
    if (w) {
      obj.img = w.img;
      obj.weatherName = w.name;
    } else {
      obj.img = '';
      obj.weatherName = '';
    }
    let details = provinceDetailList.find((d: any) => d.provinceName === obj.showName) || {};
    return {
      ...obj,
      ...details,
    };
  });
}
getShowProvinceCenter();
const clickFun = (item: any) => {
  if (isCITY.value) {
    showCITYDetail(item);
  } else {
    emit('update:provinceCode', item.provinceCode);
    riskSjmapRef.value?.showCITYfun(item)
  }
}
const showCITYArea = (list: any) => {
  provincePositionList.value = list;
  if (list.length === 0) {
    emit('update:provinceCode', '');
  }
  emit('update:weatherObj', []);
  getShowProvinceCenter();
}
const showCITYDetail = (item: any) => {
  router.push({
    path: '/riskMap/projectMap',
    query: {
      center: item.center.join(','),
    }
  })
}
const getAllProvinceFun = (params: any) => {
  getAllProvince({
    provinceCode: props.provinceCode,
  }).then((res: any) => {
    provinceDetailList = res.resultValue || [];
    getShowProvinceCenter();
  })
}
getAllProvinceFun();
watch(() => props.provinceCode, (val) => {
  getAllProvinceFun();
})

</script>

<style lang='scss' scoped>
.riskMapCon {

  :deep(.mapContainer) {
    height: 100%;
    border: none;

    .moduleTitle, .legend {
      display: none;
    }
  }

  .map-province {
    z-index: 1;
  }

  :deep {
    .sgmap-marker:hover {
      z-index: 1;
    }
  }

  .map-province:hover {
    .province-project-detail {
      display: block;
    }
  }

  .province-project-detail {
    display: none;
    position: absolute;
    top: 0;
    transform: translateY(-30%);
    left: 110%;
    width: max-content;
    text-align: left;
    background: #fff;
  }

  .province-project-detail-header {
    background: var(--risk-module-dialog-title-bg);
    color: var(--risk-module-dialog-title-text);
    height: 40px;
    line-height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;

    div img {
      width: 35px;
      height: 35px;
    }

    > img {
      margin-left: 30px;
    }
  }

  .province-project-list {
    padding: 10px;
  }

  .province-project-item {
    position: relative;
    padding: 3px 0 3px 15px;
    color: var(--risk-province-popup-span-color);
    font-size: 18px;

    &:before {
      position: absolute;
      content: '';
      width: 8px;
      height: 7px;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      background: url(@/assets/images/riskMap/tk-nrzs.png);
    }

    span {
      font-size: 14px;
      color: var(--risk-province-popup-color);
    }
  }

  :deep(.sgmap-ctrl-bottom-right) {
    bottom: 17%;
    right: 25%;
  }

  .province-project-weather {
    padding: 3px;
    border: 1px solid #f2f7fe;
    background: rgba(21, 49, 73, 0.4);
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

}

</style>
