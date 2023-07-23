<template>
  <tr>
    <td>
      {{ itemRow.user_code }}
    </td>
    <td>
      {{ itemRow.full_name }}
    </td>
    <td>
      {{ itemRow.date_of_birth }}
    </td>
    <td>
      {{ itemRow.gender }}
    </td>
    <td>
      {{ itemRow.email }}
    </td>
    <td>
      {{ itemRow.phone_number }}
    </td>
    <td>
      {{ itemRow.status }}
    </td>
    <td>Xóa</td>
  </tr>
</template>

<script>
export default {
  props: { itemRow:{default:{}} },
};
</script>

<style>
</style>