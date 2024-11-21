<template>
  <el-form-item
    :label="label"
    :label-width="labelWidth"
    :style="{width: width}"
    class="SearchInput">
    <el-input
      :placeholder="placeholder"
      v-model="formData[prop]"
      @change="changeValue"
      @blur="onBlur"
      @focus="onFocus"
    ></el-input>
  </el-form-item>
</template>

<script setup lang="ts">
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
});
const emit = defineEmits([
  "changeValue",
  "onBlur",
  "onFocus",
]);
const changeValue = (val: any) => {
  emit("changeValue", val);
}
const onBlur = () => {
  props.formData[props.prop] = props.formData[props.prop].trim();
  emit("onBlur", props.formData[props.prop]);
}
const onFocus = () => {
  emit("onFocus", props.formData[props.prop]);
}
</script>

<style lang='scss' scoped>
.SearchInput {
  margin-bottom: 0;
}

</style>
