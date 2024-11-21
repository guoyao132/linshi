<template>
  <div class="riskMap-weather-alarming-list">
    <div class="riskMap-weather-alarming" @click="goPage(item)" v-for="(item, index) in list" :key="index">
      <div class="riskMap-weather-alarming-icon">
        <div></div>
      </div>
      {{ item.label }}
    </div>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router"

defineProps({
  list: {
    type: Array,
    default: () => []
  },
});
const emit = defineEmits([
  'onClick'
])
const router = useRouter();

const goPage = (item: any) => {
  if (item.path) {
    router.push(item.path)
  } else {
    emit('onClick', item)
  }

}
</script>

<style lang='scss' scoped>


.riskMap-weather-alarming-list {
  position: absolute;
  left: 50%;
  bottom: 2%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;

  .riskMap-weather-alarming {
    position: relative;
    background: var(--risk-weather-alarming-bg);
    padding: 20px;
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-right: 2px;

    &:after {
      position: absolute;
      content: " ";
      right: -1px;
      top: 50%;
      transform: translateY(-50%);
      width: 2px;
      height: 50%;
      background: var(--risk-weather-alarming-split-bg);
    }

    &:last-child {
      margin-right: 0;

      &:after {
        display: none;
      }
    }

    .riskMap-weather-alarming-icon {
      width: 40px;
      height: 40px;
      border: 1px solid var(--risk-weather-alarming-icon-border);
      border-radius: 50%;
      margin-right: 10px;
      background: var(--risk-weather-alarming-icon-bg);
      overflow: hidden;
      padding: 7px;
      box-sizing: border-box;

      > div {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: var(--risk-weather-alarming-icon-border);
      }
    }
  }
}

</style>
