<template>
  <div
    class="dialog-model"
    ref="dialog-model"
    tabindex="0"
    @keyup.esc="btnCancel()"
    @keydown.ctrl.s.prevent="saveAsset()"
  >
    <div
      class="dialog-content"
      :style="{
        height: heightDialog,
      }"
    >
      <div
        class="dialog-main"
        :style="{
          background: bgMain,
        }"
      >
        <div class="dialog-header">
          <div class="dialog-header-tilte weight700">{{ contentForm }}</div>
          <BaseTooltip position="down" tooltipText="Đóng (ESC)">
            <div
              class="dialog-header-close icon24 backgrsvg"
              @click="btnCancel()"
            ></div>
          </BaseTooltip>
        </div>
        <div class="dialog-body">
          <slot></slot>
        </div>

        <div class="dialog__footer" ref="dialog__footer">
          <BaseTooltip position="up" tooltipText="Lưu (Ctrl + S)">
            <TheButton
              @click="saveAsset()"
              :btnName="nameBtnAcrep"
              class="btnWarn-Yes btn-save"
              btnType="2"
            />
          </BaseTooltip>
          <BaseTooltip position="up" tooltipText="Hủy (ESC)">
            <TheButton
              :btnName="nameBtnHCancel"
              class="btnWarn-close"
              btnType="1"
              @click="btnCancel()"
            />
          </BaseTooltip>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>