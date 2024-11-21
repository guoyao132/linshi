<template>
  <div class="riskSjmap">
    <GySjmap
      :id="mapId"
      :mapOpt="mapOpt"
      :zoom="mapViewOpt.zoom"
      :center="mapViewOpt.center"
      :pitch="mapViewOpt.pitch"
      :bearing="mapViewOpt.bearing"
    >
      <slot></slot>
    </GySjmap>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive, computed, onBeforeMount} from 'vue'
import type {Ref, UnwrapRef} from 'vue'
import {gySjMap, SGMap} from "gy-sjmap";
import type {gySjmapType} from 'gy-sjmap'
import {watch} from "vue"
import {MapIndexDB} from '@/utils/riskMap.ts'
import Streets from './Streets.json'
const props = defineProps({});
const emit = defineEmits(['showCITYArea']);
const mapOpt = reactive({
  key: 'b7b4b226a65935d7962beb4076a16f39',
  sn: '4ecbe00d61a13986bf7a8e1f6c6217e4',
  // extent: [
  //   [116.39556991989343,39.88100558616222],
  //   [116.42038561406821,39.905489158225635],
  // ],
  minZoom: 4,
  maxZoom: 10,
  streets: Streets,
  styleType: {},
})
const mapViewOpt = {
  center: [104.58543675069018, 32.46851755181734],
  zoom: 4.000321017670717,
  pitch: 33.206616172867015,
  bearing: 0,
}

  const mapId = 'mapId';
  const gySjmapObj: Ref<UnwrapRef<gySjmapType>> | null = gySjMap(mapId); //mapId可不填， 当有多个地图是可以通过传入对应的ID，获取对应地图的实例。
  const mapFinish: Ref<boolean> = computed(() => gySjmapObj.value && gySjmapObj.value.mapFinish);
  let mapObj:any = null;
  watch(mapFinish, n => {
    mapObj = gySjmapObj.value.map;
    mapObj.doubleClickZoom.disable();
    mapObj.addControl(new SGMap.NavigationControl(), "bottom-right");
    mapObj.on('click', mapClickFun)
    console.log(mapObj);
    init();
  })
onBeforeMount(() => {
  mapObj?.off('click', mapClickFun)
})
const mapClickFun = () => {
  if(isCITY.value){
    changeMapStatus(false)
    emit('showCITYArea', []);
  }
}
const init = () => {
  let index = 0;

  SGMap.plugin("SGMap.DistrictTask").then(() => {
    index++;
    districtTask = new SGMap.DistrictTask();
    pluginFinish();
  })
  db.init().then(() => {
    index++;
    pluginFinish();
  })

  async function pluginFinish() {
    if (index >= 2) {
      let provinceArr = [
        "北京市",
        "天津市",
        "上海市",
        "重庆市",
        "河北省",
        "山西省",
        "辽宁省",
        "吉林省",
        "黑龙江省",
        "江苏省",
        "浙江省",
        "安徽省",
        "福建省",
        "江西省",
        "山东省",
        "河南省",
        "湖北省",
        "湖南省",
        "广东省",
        "海南省",
        "四川省",
        "贵州省",
        "云南省",
        "陕西省",
        "甘肃省",
        "青海省",
        "台湾省",
        "内蒙古自治区",
        "广西壮族自治区",
        "宁夏回族自治区",
        "新疆维吾尔自治区",
        "西藏自治区",
        "香港特别行政区",
        "澳门特别行政区",
      ]
      for (const name of provinceArr) {
        getPROVINCEData(name)
      }
    }
  }
}

const db = new MapIndexDB();
let districtTask: any = null;
// 获取省数据
const getPROVINCEData = (name: string) => {
  let municipalitiesArr = [
    '上海市',
    '北京市',
    '重庆市',
    '天津市',
  ];
  let isMunicipalitiesArr = municipalitiesArr.includes(name);
  db.getPROVINCE(name).then((res: any) => {
    if (!res) {
      districtTask.searchDistrict({
        keyword: name,
        subdistrict: isMunicipalitiesArr ? 2 : 1,
        extension: true,
        pageSize: 1000
      }).then(function (result: any) {
        let district = result.data.districts[0];
        let bbox = district.bbox;
        let subdistrict = district.sub_districts;
        delete district['sub_districts'];
        db.addDB(name, district);
        if(isMunicipalitiesArr){
          subdistrict = subdistrict.map((item:any) => item.sub_districts).flat();
        }
        db.addDB(name, {subdistrict, bbox}, 'CITY');
      })
    }
  })
}

const changeMapStatus = (isC:boolean, bboxStr?:string) => {
  isCITY.value = isC;
  if(isCITY && bboxStr){
    let bbox = bboxStr.split(',').map((item:string) => Number(item));
    let bboxArr = [[bbox[0],bbox[1]],[bbox[2],bbox[3]]];
      mapObj.fitBounds(bboxArr, {
      padding: 100
    })
    // mapObj.boxZoom.disable();
    // mapObj.scrollZoom.disable();
    // mapObj.dragPan.disable();
  }else{
    mapObj.flyTo({
      ...mapViewOpt,
      speed: 0.8,
    });
    mapObj.boxZoom.enable();
    mapObj.scrollZoom.enable();
    mapObj.dragPan.enable();
  }
}

const isCITY = ref(false)

const showCITYfun = (item: any) => {
  return new Promise(resolve => {
    let name = item && item.name;
    if(name){
      db.getCITY(item.name).then((res: any) => {
        changeMapStatus(true, res.data.bbox);
        let districts = res.data.subdistrict;
        for (const district of districts) {
          district.center = district.center.split(',').map((item:string) => Number(item));
          let name = district.name;
          if (name === "香港特别行政区") {
            name = '香港';
          } else if (name === '澳门特别行政区') {
            name = '澳门';
          }
          district.name = name;
        }
        emit('showCITYArea', districts);
      })
    } else {
      changeMapStatus(false);
      emit('showCITYArea', []);
    }
  })
}

defineExpose({
  isCITY,
  showCITYfun,
})
</script>

<style lang='scss' scoped>
.riskSjmap {
  width: 100%;
  height: 100%;
  overflow: hidden;

  :deep(.sgmap-map){
    height: 103%;
  }
}

</style>
