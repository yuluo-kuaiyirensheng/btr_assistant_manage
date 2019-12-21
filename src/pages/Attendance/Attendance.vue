<template>
    <div>
      <BreadCrumb></BreadCrumb>
      <router-view></router-view>
    </div>
</template>

<script>
import BreadCrumb from '../../components/breadcrumb'
export default {
  name: "Attendance",
  components: {
    BreadCrumb,
  }
}
</script>

<style scoped>

</style>
