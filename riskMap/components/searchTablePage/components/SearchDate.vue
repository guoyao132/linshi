<template>
  <el-form-item
    :label="label"
    :label-width="labelWidth"
    :style="{width: width}"
    :class="['SearchDate', {'SearchDate-input-full': isInputFull}]">
    <el-date-picker
      v-model="formData[prop]"
      :placeholder="placeholder"
      :type="type"
      @change="changeValue"
      v-bind="$attrs"
    />
  </el-form-item>
</template>

<script setup lang="ts">
import {computed} from "vue";
const props = defineProps({
  label: {
    type: String,
    default: "label",
  },
  placeholder: {
    type: String,
    default: "请输入",
  },
  labelWidth: {
    type: String,
    default: "auto",
  },
  formData: {
    type: Object,
    default: () => {},
  },
  prop: {
    type: String,
    default: "prop",
  },
  width: {
    type: String,
    default: "auto",
  },
  type: {
    type: String,
    default: "date",
  },
});
const emit = defineEmits([
  "changeValue",
]);
const changeValue = (val: any) => {
  emit("changeValue", val);
}
const FULLTYPEARR = [
  "year",
  "month",
  "date",
  "datetime",
  "week",
]
const isInputFull = computed(() => {
  return FULLTYPEARR.includes(props.type)
})
</script>

<style lang='scss' scoped>
.SearchDate {
  margin-bottom: 0;
  &.SearchDate-input-full{
   :deep(.el-input){
      width: 100%;
    }
  }
}

</style>
