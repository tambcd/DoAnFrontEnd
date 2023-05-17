<template>
  <div class="score">
    <div class="score-top">
      <div class="score-filter">
        <div class="search">
          <label>
            <input type="text" placeholder="Tìm kiếm theo tên, mã sinh viên" />
            <ion-icon name="search-outline"></ion-icon>
          </label>
        </div>
        <div class="filter-elr">
          <BaseCombobox/>
        </div>
      </div>
      <div class="score-action"></div>
    </div>
  </div>
</template>

<script>
import BaseCombobox from '@/components/combobox/BaseCombobox.vue';
export default {
  components: { BaseCombobox },
  name: "TheScore",
};
</script>

<style>
</style>