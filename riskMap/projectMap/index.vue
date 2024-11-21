<template>
  <div class="projectMap riskMapFullCon">
    <GySjmap
      :id="mapId"
      :mapOpt="mapOpt"
      :zoom="mapViewOpt.zoom"
      :center="mapViewOpt.center"
      :pitch="mapViewOpt.pitch"
      :bearing="mapViewOpt.bearing"
    >
      <!--      杆塔以及杆塔线路-->
      <GySjmap-html
        v-for="(item, index) in projectList"
        :key="index"
        :position="item.lngLat">
        <div class="sjmap-html-con projectMap-project-icon" style="color: #000" @click="showDetailsFun(item)">
          <img :src="getIconImgByName(item.icon)"/>
        </div>
      </GySjmap-html>
      <GySjmapLine
        :positionList="lineArr"
        :lineWidth="3"
        lineColor="#2fc1b5"
      />
      <!--      站-->
      <GySjmap-html
        v-for="(item, index) in projectList2"
        :key="index"
        :position="item.lngLat">
        <div class="sjmap-html-con projectMap-project-icon" style="color: #000" @click="showStationModel(item)">
          <img :src="getIconImgByName(item.icon)"/>
        </div>
      </GySjmap-html>
    </GySjmap>
    <div class="porject-details-back" @click="backProjectMap">
      返回
    </div>
    <!--    杆塔详情-->
    <Transition name="box-right">
      <div class="projectMap-details" v-if="showDetails">
        <div class="projectMap-details-header">
          <div class="projectMap-details-header-left">
            500kV变电站建设
            <span class="projectMap-details-status">作业中</span>
          </div>
          <div class="projectMap-details-header-right">
            <el-icon color="#000" :size="23" @click="showGantaModel">
              <More/>
            </el-icon>
            <el-icon color="#000" :size="23" @click="closeDetailsFun">
              <Close/>
            </el-icon>
          </div>
        </div>
        <div class="projectMap-details-con">
          <div class="projectMap-details-code">
            作业票编号：52-83-1315412100050201-0007
            <div class="projectMap-details-code-icon"></div>
            <div class="projectMap-details-code-icon"></div>
            <div class="projectMap-details-code-icon"></div>
            <div class="projectMap-details-code-icon"></div>
          </div>
          <div class="projectMap-details-list">
            <div :class="['projectMap-details-item', {'projectMap-details-item-row': item.row === 1}]"
                 v-for="(item, index) in detailsList"
                 :key="'a' + index">
              <div class="projectMap-details-name">
                {{ item.name }}:
              </div>
              <div class="projectMap-details-value">
                <template v-if="item.props !== 'props8'">
                  {{ detailsObj[item.props] }}
                </template>
                <template v-else>
                  <div class="projectMap-details-value-photo">
                    <el-image
                      src="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
                      :zoom-rate="1.2"
                      :max-scale="7"
                      :min-scale="0.2"
                      :preview-src-list="['https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg']"
                      :initial-index="0"
                      :preview-teleported="true"
                      fit="cover"
                    />
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
    <Transition name="box-right">
      <div class="riskMap-dialog-con station-details-con" v-show="showStationDetails">
        <div class="riskMap-dialog-header">
          <div>{{ stationDetailsObj.name }}</div>
        </div>
        <div class="station-details-main">
          <div class="projectMap-details-code">
            <div class="station-details-total-item">
              <div class="station-details-total-item-icon">
                <img src="@/assets/images/riskMap/station-z.png" alt="">
              </div>
              <div class="station-details-total-item-main">
                <div class="station-details-total-title">风险</div>
                <div class="station-details-total-value">128</div>
              </div>
              <div class="station-details-level-total-item-icon">
                <img src="@/assets/images/riskMap/fx-1j.png" alt="">
              </div>
              <div class="station-details-level-total-item-main">
                <div class="station-details-level-total-value">0</div>
                <div class="station-details-level-total-title">一级</div>
              </div>
              <div class="station-details-level-total-item-icon">
                <img src="@/assets/images/riskMap/fx-2j.png" alt="">
              </div>
              <div class="station-details-level-total-item-main">
                <div class="station-details-level-total-value">0</div>
                <div class="station-details-level-total-title">二级</div>
              </div>
              <div class="station-details-level-total-item-icon">
                <img src="@/assets/images/riskMap/fx-3j.png" alt="">
              </div>
              <div class="station-details-level-total-item-main">
                <div class="station-details-level-total-value">0</div>
                <div class="station-details-level-total-title">三级</div>
              </div>
              <div class="station-details-level-total-item-icon">
                <img src="@/assets/images/riskMap/fx-4j.png" alt="">
              </div>
              <div class="station-details-level-total-item-main">
                <div class="station-details-level-total-value">0</div>
                <div class="station-details-level-total-title">四级</div>
              </div>
              <div class="station-details-level-total-item-icon">
                <img src="@/assets/images/riskMap/fx-5j.png" alt="">
              </div>
              <div class="station-details-level-total-item-main">
                <div class="station-details-level-total-value">0</div>
                <div class="station-details-level-total-title">五级</div>
              </div>
            </div>
          </div>
          <div class="projectMap-details-code">
            <div class="station-details-total-item">
              <div class="station-details-total-item-icon">
                <img src="@/assets/images/riskMap/station-p.png" alt="">
              </div>
              <div class="station-details-total-item-main">
                <div class="station-details-total-title">人员</div>
                <div class="station-details-total-value">128</div>
              </div>
              <div class="station-details-level-total-item-icon">
                <img src="@/assets/images/riskMap/ry-cj.png" alt="">
              </div>
              <div class="station-details-level-total-item-main">
                <div class="station-details-level-total-value">122</div>
                <div class="station-details-level-total-title">参建人员</div>
              </div>
              <div class="station-details-level-total-item-icon">
                <img src="@/assets/images/riskMap/ry-fb.png" alt="">
              </div>
              <div class="station-details-level-total-item-main">
                <div class="station-details-level-total-value">122</div>
                <div class="station-details-level-total-title">分包人员</div>
              </div>
            </div>
          </div>
          <div class="station-details-table weatherModule-table risk-table">
            <el-table :data="tableData" stripe height="100%">
              <el-table-column
                label="工程信息"
                align="center"
                prop="project">
              </el-table-column>
              <el-table-column
                label="详情"
                align="center"
                prop="details">
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import {computed, ref, watch, markRaw} from "vue"
import {useRoute, useRouter} from "vue-router"
import type {Ref, UnwrapRef} from 'vue'
import {gySjMap, SGMap} from "gy-sjmap";
import type {gySjmapType} from 'gy-sjmap'
import {getIconImgByName} from '../components/mapProjectIcon';
import {Close, More} from '@element-plus/icons-vue';
import {THREE, ModelLoader} from 'gy-threejs';

const route = useRoute();
const router = useRouter();
const props = defineProps({});
const emit = defineEmits([]);
const mapOpt = {
  key: 'b7b4b226a65935d7962beb4076a16f39',
  sn: '4ecbe00d61a13986bf7a8e1f6c6217e4',
  // extent: [
  //   [116.39556991989343,39.88100558616222],
  //   [116.42038561406821,39.905489158225635],
  // ],
  minZoom: 4,
  maxZoom: 18,
  styleType: {
    "Building": {
      "visibility": "none"
    },
    "POI1": {
      "visibility": "none"
    },
    "POI2": {
      "visibility": "none"
    },
    "POI3": {
      "visibility": "none"
    },
    "POI4": {
      "visibility": "none"
    },
    "POI5": {
      "visibility": "none"
    },
    "POI6": {
      "visibility": "none"
    },
    "POI7": {
      "visibility": "none"
    },
  },
}
const center = route.query.center?.split(',')
const mapViewOpt = ref({
  center: center || [116.40803281576643, 39.893935171491535],
  zoom: 12.344813398163163,
  pitch: 33.206616172867015,
  bearing: 0,
})
const mapId = 'projectMap';
const gySjmapObj: Ref<UnwrapRef<gySjmapType>> | null = gySjMap(mapId); //mapId可不填， 当有多个地图是可以通过传入对应的ID，获取对应地图的实例。
const mapFinish: Ref<boolean> = computed(() => gySjmapObj.value && gySjmapObj.value.mapFinish);
let mapObj: any = null;
watch(mapFinish, n => {
  mapObj = markRaw(gySjmapObj.value.map);
})
let projectList = ref([
  {
    name: '项目名称',
    address: '项目地址',
    icon: 'gtSGZ',
    lngLat: [+center[0], +center[1]],
    props: '500kV变电站建设',
    props1: '王克林',
    props2: '陈州',
    props3: '15',
    props4: '23',
    props5: '2024-09-09 17:15:25',
    props6: '一般设备安装：互感器、耦合电容器、避雷器安装：户外GIS就位、安装、调试、验收：室外GIS就位、安装、调试、验收',
    props7: '湖北省武汉市江夏区',
    props8: [],
    props9: '丘陵',
    props10: '43.71米',
  },
  {
    name: '项目名称',
    address: '项目地址',
    icon: 'gtSGZ',
    lngLat: [+center[0] - 0.02, +center[1] - 0.002],
    props: '500kV变电站建设',
    props1: '张三',
    props2: '凌天',
    props3: '18',
    props4: '40',
    props5: '2024-09-20 17:15:25',
    props6: '一般设备安装：互感器、耦合电容器、避雷器安装：户外GIS就位、安装、调试、验收：室外GIS就位、安装、调试、验收',
    props7: '湖北省武汉市江夏区',
    props8: [],
    props9: '山地',
    props10: '43.71米',
  },
  {
    name: '项目名称',
    address: '项目地址',
    icon: 'gtSGZ',
    lngLat: [+center[0] - 0.04, +center[1] - 0.006],
    props: '500kV变电站建设',
    props1: '田林',
    props2: '曹州',
    props3: '20',
    props4: '26',
    props5: '2024-010-09 17:15:25',
    props6: '一般设备安装：互感器、耦合电容器、避雷器安装：户外GIS就位、安装、调试、验收：室外GIS就位、安装、调试、验收',
    props7: '湖北省武汉市江夏区',
    props8: [],
    props9: '山地',
    props10: '143.71米',
  },
  {
    name: '项目名称',
    address: '项目地址',
    icon: 'gtSGZ',
    lngLat: [+center[0] - 0.06, +center[1] - 0.009],
    props: '500kV变电站建设',
    props1: '王小林',
    props2: '赵鑫',
    props3: '14',
    props4: '20',
    props5: '2024-09-19 17:15:25',
    props6: '一般设备安装：互感器、耦合电容器、避雷器安装：户外GIS就位、安装、调试、验收：室外GIS就位、安装、调试、验收',
    props7: '湖北省武汉市江夏区',
    props8: [],
    props9: '沼泽',
    props10: '20.71米',
  },
  {
    name: '项目名称',
    address: '项目地址',
    icon: 'gtSGZ',
    lngLat: [+center[0] - 0.08, +center[1] + 0.001],
    props: '500kV变电站建设',
    props1: '王克林',
    props2: '陈州',
    props3: '15',
    props4: '23',
    props5: '2024-09-09 17:15:25',
    props6: '一般设备安装：互感器、耦合电容器、避雷器安装：户外GIS就位、安装、调试、验收：室外GIS就位、安装、调试、验收',
    props7: '湖北省武汉市江夏区',
    props8: [],
    props9: '丘陵',
    props10: '43.71米',
  },
  {
    name: '项目名称',
    address: '项目地址',
    icon: 'gtSGZ',
    lngLat: [+center[0] - 0.1, +center[1] + 0.011],
    props: '500kV变电站建设',
    props1: '张灵',
    props2: '汪新宇',
    props3: '12',
    props4: '15',
    props5: '2024-10-09 17:15:25',
    props6: '一般设备安装：互感器、耦合电容器、避雷器安装：户外GIS就位、安装、调试、验收：室外GIS就位、安装、调试、验收',
    props7: '湖北省武汉市江夏区',
    props8: [],
    props9: '平地',
    props10: '45.71米',
  },
])
const lineArr = ref(projectList.value.map((item: any) => item.lngLat));
let projectList2 = ref([
  {
    name: '项目名称',
    address: '项目地址',
    icon: 'bdzSGZ',
    lngLat: [+center[0] - 0.01, +center[1] - 0.025],
  },
  {
    name: '项目名称',
    address: '项目地址',
    icon: 'bdzWSG',
    lngLat: [+center[0] - 0.03, +center[1] - 0.023],
  },
])
// 线缆详情
let showDetails = ref(false);
const gantaDetailsObj = ref({})
const showDetailsFun = (item) => {
  showDetails.value = true;
  gantaDetailsObj.value = item;
  detailsObj.value = item;
}
const closeDetailsFun = () => {
  showDetails.value = false;
}
const detailsObj = ref({})
let detailsList = [
  {
    name: '作业部位',
    props: 'props',
  },
  {
    name: '班组安全员',
    props: 'props1',
  },
  {
    name: '班组负责人',
    props: 'props2',
  },
  {
    name: '当日工作人员',
    props: 'props3',
  },
  {
    name: '施工人数',
    props: 'props4',
  },
  {
    name: '作业开始时间',
    props: 'props5',
  },
  {
    name: '地形地貌',
    props: 'props9',
  },
  {
    name: '海拔',
    props: 'props10',
  },
  {
    row: 1,
    name: '工序',
    props: 'props6',
  },
  {
    row: 1,
    name: '当前作业位置',
    props: 'props7',
  },
  {
    row: 1,
    name: '照片信息',
    props: 'props8',
  },
]

let historyProjectObj = {
  projectList: [],
  projectList2: [],
  lineArr: [],
}
const clearMapOthers = () => {
  if (showDetails.value) {
    showDetails.value = false;
  }
  historyProjectObj = {
    projectList: projectList.value,
    projectList2: projectList2.value,
    lineArr: lineArr.value,
  }
  projectList.value = [];
  projectList2.value = [];
  lineArr.value = [];
}
const backProjectMap = () => {
  if(showStation.value){
    if (historyProjectObj.projectList.length) {
      projectList.value = historyProjectObj.projectList;
      projectList2.value = historyProjectObj.projectList2;
      lineArr.value = historyProjectObj.lineArr;
    }
    historyProjectObj = {
      projectList: [],
      projectList2: [],
      lineArr: [],
    };
    mapObj.removeLayer('3d-model')
    showStation.value = false;
    showStationDetails.value = false;

    mapViewOpt.value = {
      center: center || [116.40803281576643, 39.893935171491535],
      zoom: 12.344813398163163,
      pitch: 33.206616172867015,
      bearing: 0,
    }
  }else{
    router.go(-1)
  }
}
const addThreeModelToMap = (center, modelType = 'ganta') => {
  if (mapObj) {
    let modelOrigin = center;
    let modelAltitude = 15;
    let modelRotate = [0, 0, 0]; //Math.PI / 4
    let modelScale = 3.05843220338983e-6;

    let coordinate = SGMap.MercatorCoordinate.fromLngLat(
      modelOrigin,
      modelAltitude
    )

    let modelTransform = {
      translateX: coordinate.x,
      translateY: coordinate.y,
      translateZ: coordinate.z,
      rotateX: modelRotate[0],
      rotateY: modelRotate[1],
      rotateZ: modelRotate[2],
      scale: modelScale
    };

    let customLayer = {
      id: "3d-model",
      type: "custom",
      renderingMode: "3d",
      onAdd: function (map, gl) {
        this.camera = new THREE.Camera();
        this.scene = new THREE.Scene();

        let directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.position.set(0, -70, 100).normalize();
        this.scene.add(directionalLight);

        let directionalLight2 = new THREE.DirectionalLight(0xffffff);
        directionalLight2.position.set(0, 70, 100).normalize();
        this.scene.add(directionalLight2);

        //加载模型
        let modelUrl = 'ganta.fbx';
        if (modelType === 'ganta') {
          modelUrl = 'ganta.glb';
        } else if (modelType === 'bdz') {
          modelUrl = 'bdz.fbx';
        }
        let loader = new ModelLoader('./model', modelUrl);
        loader.init().then(() => {
          loader.load().then((data) => {
            let object = data.data
            object.scale.set(0.1, 0.1, 0.1);
            console.log(object);
            this.scene.add(object);
          })
        })

        this.map = mapObj;
        this.renderer = new THREE.WebGLRenderer({
          canvas: mapObj.getCanvas(),
          context: gl
        });

        this.renderer.autoClear = false;
      },
      render: function (gl, matrix) {
        let rotationX = new THREE.Matrix4().makeRotationAxis(
          new THREE.Vector3(1, 0, 0),
          modelTransform.rotateX
        );
        let rotationY = new THREE.Matrix4().makeRotationAxis(
          new THREE.Vector3(0, 1, 0),
          modelTransform.rotateY
        );
        let rotationZ = new THREE.Matrix4().makeRotationAxis(
          new THREE.Vector3(0, 0, 1),
          modelTransform.rotateZ
        );

        let m = new THREE.Matrix4().fromArray(matrix);
        let l = new THREE.Matrix4()
          .makeTranslation(
            modelTransform.translateX,
            modelTransform.translateY,
            modelTransform.translateZ
          )
          .scale(
            new THREE.Vector3(
              modelTransform.scale,
              -modelTransform.scale,
              modelTransform.scale
            )
          )
          .multiply(rotationX)
          .multiply(rotationY)
          .multiply(rotationZ);

        this.camera.projectionMatrix.elements = matrix;
        this.camera.projectionMatrix = m.multiply(l);
        this.renderer.state.reset();
        this.renderer.render(this.scene, this.camera);
      }
    };
    mapObj.addLayer(customLayer)
  }
}


const showStation = ref(false);
// 现实杆塔的模型
const showGantaModel = () => {
  showStation.value = true;
  showStationDetails.value = true;
  clearMapOthers();
  let center = gantaDetailsObj.value.lngLat;
  mapViewOpt.value.zoom = 16;
  mapViewOpt.value.center = center;
  addThreeModelToMap(center)
}

const showStationModel = (item) => {
  showStation.value = true;
  showStationDetails.value = true;
  clearMapOthers();
  let center = item.lngLat;
  mapViewOpt.value.zoom = 15;
  mapViewOpt.value.center = center;
  addThreeModelToMap(center, 'bdz')
}


const showStationDetails = ref(false);
const stationDetailsObj = ref({
  name: '南通孙窑—通兴110kV输变电架空线路工程',
})
const tableData = ref([
  {
    project: '网省公司',
    details: '江苏省电力公司',
  },
  {
    project: '建管单位',
    details: '南通供电公司',
  },
  {
    project: '电压等级',
    details: '110kV',
  },
  {
    project: '项目类型',
    details: '线路',
  },
  {
    project: '项目阶段',
    details: '开工',
  },
  {
    project: '建设时间',
    details: '2023年6月-2024年8月',
  },
])
</script>

<style lang='scss' scoped>
.projectMap {
  overflow: hidden;
  position: relative;
}

.projectMap-project-icon {
  img {
    width: 50px;
    position: relative;
    top: 7px;
  }
}

.projectMap-details {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 20px;
  width: 450px;
  background: #fff;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-bottom: 3px solid #477bee;
}

.projectMap-details-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--risk-module-dialog-title-bg);
  padding: 10px 20px;
  color: #fff;
  font-size: 18px;
}

.projectMap-details-header-left, .projectMap-details-header-right {
  display: flex;
  align-items: center;

  > i {
    margin-left: 10px;
    cursor: pointer;
  }
}

.projectMap-details-status {
  display: inline-block;
  margin-left: 7px;
  background: var(--risk-module-dialog-status-bg);
  border: 1px solid var(--risk-module-dialog-status-border);
  padding: 5px;
  font-size: 14px;
  border-radius: 5px;
  color: var(--risk-module-dialog-status-border);
  font-weight: bold;
}

.projectMap-details-close {
  color: #000;
}

.projectMap-details-con {
  padding: 10px;
}

.projectMap-details-code {
  background: var(--risk-module-total-bg) repeat-x left bottom/ auto 100%;
  height: 40px;
  display: flex;
  align-items: center;
  color: var(--projectMap-details-code-color);
  border: 1px solid var(--projectMap-details-code-border);
  padding: 0 10px;
  position: relative;
}

.projectMap-details-code-icon {
  position: absolute;
  width: 4px;
  height: 4px;
  background: #2261ee;

  &:first-child {
    top: -2px;
    left: -2px;
  }

  &:nth-child(2) {
    top: -2px;
    right: -2px;
  }

  &:nth-child(3) {
    bottom: -2px;
    left: -2px;
  }

  &:nth-child(4) {
    bottom: -2px;
    right: -2px;
  }
}

.projectMap-details-list {
  display: flex;
  flex-wrap: wrap;
  padding: 20px 10px;


}

.projectMap-details-item {
  display: flex;
  margin-top: 10px;
  line-height: 20px;

  &:nth-child(2n-1) {
    width: 40%;
  }

  &:nth-child(2n) {
    width: 60%;
  }

  &.projectMap-details-item-row {
    width: 100% !important;
  }


  .projectMap-details-name {
    min-width: max-content;
    margin-right: 10px;
  }

  .projectMap-details-value {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .projectMap-details-value-photo {
    width: 100px;
  }
}

.station-details-con {
  width: 620px;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
  padding-bottom: 20px;

  .projectMap-details-code {
    height: 60px;
    margin: 10px 0;
    border: none;
  }

  .station-details-main {
    padding: 0 20px;
  }
}


.station-details-total-item {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 55px;
}

.station-details-total-item-icon {
  min-width: 50px;
  width: 50px;

  img {
    width: 47px;
    height: auto;
  }
}

.station-details-level-total-item-icon {
  min-width: 25px;
  width: 25px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 35px;
    height: auto;
  }
}

.station-details-total-item-main {
  flex: 1;
  background: url(@/assets/images/riskMap/qxyj-bg.png) no-repeat center center/100% 100%;
  height: 40px;
  padding-left: 15px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  margin-right: 25px;
}


.station-details-total-value {
  font-size: 18px;
  color: #2b67ee;
  font-weight: bold;
}

.station-details-total-title {
  font-size: 15px;
  color: #606c7e;
  margin-right: 5px;
  margin-top: 2px;
}

.station-details-level-total-item-main {
  margin: 0 15px 0 10px;
}

.station-details-level-total-value {
  font-size: 16px;
  font-weight: bold;
  color: #000;
}

.station-details-level-total-title {
  font-size: 14px;
  color: #606c7e;
  margin-top: 4px;
}

.station-details-table {
  height: initial;
}

.porject-details-back{
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 2;
  width: 92px;
  height: 100px;
  background: url(@/assets/images/riskMap/detail-back.png) no-repeat center center/100% 100%;
  font-size: 18px;
  font-weight: bold;
  line-height: 135px;
  text-align: center;
  cursor: pointer;
}
</style>
