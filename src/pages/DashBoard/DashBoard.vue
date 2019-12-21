<template>
    <div class="dashboard">
      <Header></Header>
      <div class="bcd">
        <div class="bottom clearfix">
          <div class="side">
            <Sidebar></Sidebar>
          </div>
          <div class="content">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
export default {
  name: "DashBoard",
  components: {
    Header,
    Sidebar,
  },
  watch: {
    $route(to, from) {
      this.$store.dispatch('setPriorPath', from['fullPath']);
      if (this.$store.getters['getStorage'] != null && this.$cookies.isKey('passport')) {

      } else {
        this.$store.dispatch('removeStorage');
        this.$cookies.remove('passport');
        this.$router.push('/login');
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .dashboard {
    /*min-width: 1230px;*/
    min-width: 760px;
  }

  .bcd{
    min-height: 9999px;
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .bottom{
    display: flex;
    min-height: 100%;
    .side{
      border-right: 2px solid rgb(231,231,231);
      flex: 1;
    }
  }

  .content{
    flex: 6;
    padding-bottom: 30px;
    background: #f7f7f7;
    /*min-width: 1230px;*/
    min-width: 590px;
    overflow: hidden;
  }

  .clearfix:after{
    content: "";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }

  .clearfix {
    zoom: 1;
  }
</style>
