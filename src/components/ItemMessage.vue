<template>
  <div class="item-message">
    <div class="item_left">
      <div class="header-message">
      <div class="author-msg" v-if="isYou!=idaccount">{{authoMessage}}</div>
      <div class="author-msg" v-else>Bạn</div>
      <div class="date-msg">{{showTime(timeMessage)}}</div>
    </div>
    <button class="content-msg" :class="{'you-message':isYou==idaccount}">
     {{contentMessage}}
    </button>
    </div>
    
  </div>
</template>

<script>
export default {
  props:{
    isYou:{default:""},
    authoMessage:{default:""},
    timeMessage:{default:""},
    contentMessage:{default:""},

  },
  data() {
    return {
      idaccount:localStorage.getItem("userId"),
    }
  },
  methods: {
    showTime(dateTime) {
      const date = new Date(dateTime);
      return  `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth()+1).toString().padStart(2, '0')}-${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    },
  },
  
};
</script>

<style>

</style>