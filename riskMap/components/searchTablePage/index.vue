<template>
  <div class="searchTablePage">
    <div class="searchTablePage-top">
      <div class="searchTablePage-title">
        <div class="searchTablePage-title-btn" v-if="isBack" @click="goBack">
          <el-icon><Back /></el-icon>
        </div>
        <div class="searchTablePage-title-text">
          {{title}}
        </div>
      </div>
      <div class="searchTablePage-search">
        <template v-if="isCustomize">
          <slot name="search"></slot>
        </template>
        <template v-else>
          <component
            v-for="item in showSearchList"
            :key="item.prop"
            :is="componentsList[item.componentType]"
            :formData="searchForm"
            v-bind="item"
          />
          <div class="searchTablePage-search-btn">
            <el-button
              @click="resetFun"
              :icon="RefreshRight">
              重置
            </el-button>
            <el-button
              :icon="Search"
              color="#4abab2"
              @click="searchFun"
              class="risk-btn-text-fff">
              查询
            </el-button>
          </div>
        </template>
      </div>
    </div>
    <div class="searchTablePage-table">
      <template v-if="isCustomize">
        <slot name="content"></slot>
      </template>
      <template v-else>
        <div class="searchTablePage-table-tabs risk-tabs">
          <el-tabs v-model="tabsActiveName" class="demo-tabs" @tab-change="handleClick">
            <el-tab-pane
              v-for="item in tabsList"
              :key="'tabs' + item.value"
              :label="item.label"
              :name="item.value">
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="searchTablePage-table-menu">
          <div class="searchTablePage-table-title">
          </div>
          <div class="searchTablePage-table-menu-list">
<!--            <el-button-->
<!--              :icon="Download"-->
<!--            >-->
<!--              导出-->
<!--            </el-button>-->
<!--            <el-button-->
<!--              :icon="Sort"-->
<!--            />-->
<!--            <el-button-->
<!--              @click="tableFullScreen"-->
<!--              :icon="FullScreen"-->
<!--            />-->
          </div>
        </div>
        <el-table
          :data="tableData"
          ref="singleTableRef"
          height="100%"
          border
          stripe
        >
          <el-table-column
            align="center"
            type="index"
            label="序号"
            width="60" >
            <template #default="scope">
              {{scope.$index + 1 + (currentPage - 1) * pageSize}}
            </template>
          </el-table-column>
          <template
            v-for="(item, index) in tableHeader"
            :key="item.prop"
          >
            <el-table-column
              v-if="item.prop === 'action'"
              :label="item.label"
              :width="item.width || ''"
              fixed="right"
              :resizable="false"
              :align="item.align || 'center'"
            >
              <template #default="scope">
                <slot name="actionCol" :row="scope.row" :index="index"></slot>
              </template>
            </el-table-column>
            <rikMaptableColumn
              v-else
              :item="item"
            >
              <template v-if="item.slot" #[item.slot]="{row, prop}">
                <slot :name="item.slot"  :row="row" :prop="prop"></slot>
              </template>
            </rikMaptableColumn>
          </template>
        </el-table>
        <el-pagination
          class="searchTablePage-table-pagination risk-pagination"
          v-model:current-page="currentPage"
          :page-size="100"
          :pageSize="pageSize"
          :pageSizes="pageSizes"
          :background="true"
          layout="total,  prev, pager, next, sizes, jumper"
          :total="tableTotal"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import SearchInput from './components/SearchInput.vue'
import SearchSelect from './components/SearchSelect.vue'
import SearchDate from './components/SearchDate.vue'
import {ref, computed, onMounted} from "vue"
import {useRouter} from 'vue-router'
import {RefreshRight, Search, Download, Sort, FullScreen, Back} from '@element-plus/icons-vue'

const router = useRouter()

const props = defineProps({
  title: {
    type: String,
    default: '列表'
  },
  isBack: {
    type: Boolean,
    default: false
  },
  searchList: {
    type: Array,
    default: () => []
  },
  tableHeader: {
    type: Array,
    default: () => []
  },
  tableData: {
    type: Array,
    default: () => []
  },
  tableTotal: {
    type: Number,
    default: 1000,
  },
  goBackFun: {
    type: Function,
    default: null,
  },
  pageSizes: {
    type: Array,
    default: () => ([15, 30, 50, 100])
  },
  tabsList: {
    type: Array,
    default: () => ([])
  },
  defaultTabsActive: {
    type: String,
    default: '',
  },
  isCustomize:{
    type: Boolean,
    default: false
  }
})
const emit = defineEmits([
  'changeTableList',
  "changeTabs"
])
const componentsList:any = {
  SearchInput,
  SearchSelect,
  SearchDate,
}
const searchTypeObj: any = {
  'input': 'SearchInput',
  'select': 'SearchSelect',
  'year': 'SearchDate',
  'month': 'SearchDate',
  'date': 'SearchDate',
  'datetime': 'SearchDate',
  'week': 'SearchDate',
  'datetimerange': 'SearchDate',
  'daterange': 'SearchDate',
}
const showSearchList = computed(() => {
  return props.searchList.map((v: any) => {
    return {
      ...v,
      componentType: searchTypeObj[v.type] || v.type
    }
  });
})
const searchForm = ref({})
const searchFun = () => {
  handleCurrentChange(1)
}

const resetFun = () => {
  let obj = {};
  props.searchList.forEach((v: any) => {
    if (v.value) {
      obj[v.prop] = v.value;
    }
  })
  searchForm.value = obj;
}


const currentPage = ref(1);
const pageSize = ref(15);

const handleSizeChange = (val:number) => {
  currentPage.value = 1;
  pageSize.value = val;
  changeTableList();
}

const handleCurrentChange = (val:number) => {
  currentPage.value = val;
  changeTableList();
}

const changeTableList = () => {
  emit('changeTableList', currentPage.value, pageSize.value, searchForm.value);
}

onMounted(() => {
  resetFun();
  changeTableList();
})

const goBack = () => {
  if(props.goBackFun){
    props.goBackFun()
  }else{
    router.go(-1);
  }
}

const tabsActiveName = ref('');
tabsActiveName.value = props.defaultTabsActive;
const handleClick = (val) => {
  currentPage.value = 1;
  emit("changeTabs", val);
  changeTableList();
}
</script>

<style lang='scss' scoped>
.searchTablePage {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--background-main);

  .searchTablePage-top{
    padding: 20px;
    background-color: var(--risk-projectInfo-bg);
    border-radius: 6px;
  }

  .searchTablePage-title {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  .searchTablePage-title-btn{
    font-size: 20px;
    padding: 0 10px;
    border-right: 2px solid #000;
    margin-right: 10px;
    cursor: pointer;
  }

  .searchTablePage-title-text{
    font-size: 20px;
    font-weight: bold;
  }

  .searchTablePage-search {
    > div:not(.searchTablePage-search-btn) {
      padding: 10px 5% 5px 0;
      box-sizing: border-box;
      float: left;
    }

    .searchTablePage-search-btn{
      float: right;
    }
  }

  .searchTablePage-table {
    margin-top: 20px;
    padding: 20px;
    background: #fff;
    flex: 1;
    border-radius: 6px;
    overflow: hidden;
    height: 100%;
    display: flex;
    flex-direction: column;

  }

  .searchTablePage-table-menu{
    display: flex;
    padding-bottom: 20px;
    justify-content: space-between;
    align-items: center;
  }

  .searchTablePage-table-title{
    font-size: 20px;
    font-weight: bold;
  }
  .searchTablePage-table-pagination{
    margin-top: 10px;
    justify-content: flex-end;
  }
}

</style>
