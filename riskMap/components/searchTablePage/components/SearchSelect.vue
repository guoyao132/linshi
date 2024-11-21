<template>
  <el-form-item
    :label="label"
    :label-width="labelWidth"
    :style="{width: width}"
    class="SearchSelect">
    <el-select
      v-model="formData[prop]"
      :placeholder="placeholder"
      v-bind="$attrs"
      @change="changeValue"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </el-form-item>
</template>

<script setup lang="ts">
defineProps({
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
  options: {
    type: Array,
    default: () => [],
  }
});
const emit = defineEmits([
  "changeValue",
]);
const changeValue = (val: any) => {
  emit("changeValue", val);
}
</script>

<style lang='scss' scoped>
.SearchSelect {
  margin-bottom: 0;
}

</style>
