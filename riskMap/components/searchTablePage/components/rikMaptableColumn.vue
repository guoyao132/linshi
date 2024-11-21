<template>
  <el-table-column
    :key="item.prop"
    :align="item.align || 'center'"
    :prop="item.prop"
    :label="item.label"
    :width="item.width || ''"
  >
    <template v-if="hasChildren(item)">
      <table-column :item="item2"  v-for="item2 in item.children" :key="item.prop + '-' + item2.prop"/>
    </template>
    <template v-if="hasSlot(item)" #default="scope">
      <slot :name="item.slot" :row="scope.row" :prop="item.prop"></slot>
    </template>
    <template v-if="hasBold(item)" #default="scope">
      <span class="riskMap-text-bold">{{scope.row[item.prop]}}</span>
    </template>
  </el-table-column>
</template>

<script setup lang="ts">
const props = defineProps({
  item: {
    type: Object,
    default: () => ({})
  },
})
const hasChildren = (item:any) => {
  return item && item.children && item.children.length !== 0;
}
const hasSlot = (item:any) => {
  return item && !hasChildren(item) && item.slot;
}
const hasBold = (item:any) => {
  return item && !hasSlot() && item.bold;
}
</script>

<style lang='scss' scoped>
.tableColumn {
}

.riskMap-text-bold{
  font-weight: bold;
}
</style>
