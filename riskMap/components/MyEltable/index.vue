<template>
  <div class="details-table el-table">
    <el-table
      :data="tableData"
      height="100%"
      border
      stripe
    >
    <el-table-column
      v-if="isIndex"
      align="center"
      type="index"
      label="序号"
      width="60" />
      <template
        v-for="(item, index) in tableHeader"
        :key="item.prop"
      >
        <el-table-column
          v-if="item.prop === 'action'"
          :property="item.prop"
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
        <table-column
          v-else
          :item="item"
        >
          <template v-if="item.slot" #[item.slot]="{row, prop}">
            <slot :name="item.slot"  :row="row" :prop="prop"></slot>
          </template>
        </table-column>
      </template>

      <template #empty>
        暂无数据
      </template>
    </el-table>
  </div>
</template>

<script setup lang="ts">
defineProps({
  isIndex: {
    type: Boolean,
    default: false
  },
  tableHeader: {
    type: Array,
    default: () => []
  },
  tableData: {
    type: Array,
    default: () => []
  },
})
</script>

<style lang='scss' scoped>

</style>
