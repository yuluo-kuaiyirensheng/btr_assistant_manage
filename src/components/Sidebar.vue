<template>
    <div class="sidebar">
      <div class="bar_level_one">
        <router-link to="/dashboard/platform" tag="a">
          <div :class="selectedBar == 1 ? 'bar_item selectedBar' : 'bar_item'" @click="changeBar(1)">
            <i class="el-icon-menu"></i>
            <span>平台管理</span>
          </div>
        </router-link>

        <router-link to="/dashboard/teacher" tag="a">
          <div :class="selectedBar == 2 ? 'bar_item selectedBar' : 'bar_item'" @click="changeBar(2)">
            <i class="el-icon-menu"></i>
            <span>助教管理</span>
          </div>
        </router-link>

        <router-link to="/dashboard/class" tag="a">
          <div :class="selectedBar == 3 ? 'bar_item selectedBar' : 'bar_item'" @click="changeBar(3)">
            <i class="el-icon-menu"></i>
            <span>班级管理</span>
          </div>
        </router-link>

        <router-link to="/dashboard/student" tag="a">
          <div :class="selectedBar == 4 ? 'bar_item selectedBar' : 'bar_item'" @click="changeBar(4)">
            <i class="el-icon-menu"></i>
            <span>学生管理</span>
          </div>
        </router-link>

        <router-link to="/dashboard/attendance" tag="a">
          <div :class="selectedBar == 5 ? 'bar_item selectedBar' : 'bar_item'" @click="changeBar(5)">
            <i class="el-icon-menu"></i>
            <span>考勤管理</span>
          </div>
        </router-link>
      </div>

      <div class="bar_level_two">
        <router-link :to="item.path" tag="a" v-for="item in option_list[selectedBar-1]" :key="item.value">
          <div :class="selectedOpt == item.value ? 'opt_item selectedOpt' : 'opt_item'" @click="changeOpt(item.value)">
            <i class="el-icon-s-operation"></i>
            {{item.name}}
          </div>
        </router-link>
      </div>
    </div>
</template>

<script>
export default {
    name: "Sidebar",
  data() {
      return {
        selectedBar: 1,
        selectedOpt: 1,
        option_list: [
          [
            {
              name: '全部用户',
              value: 1,
              path: '/dashboard/platform/manager/list'
            },
            {
              name: '全部机构',
              value: 2,
              path: '/dashboard/platform/institution/list'
            },
            {
              name: '全部角色',
              value: 3,
              path: '/dashboard/platform/role/list'
            }
          ],
          [
            {
              name: '助教列表',
              value: 1,
              path: '/dashboard/teacher/list'
            }
          ],
          [
            {
              name: '班级列表',
              value: 1,
              path: '/dashboard/class/list'
            }
          ],
          [
            {
              name: '学生列表',
              value: 1,
              path: '/dashboard/student/list'
            }
          ],
          [
            {
              name: '全部考勤',
              value: 1,
              path: '/dashboard/attendance/list'
            },
            {
              name: '请假',
              value: 2,
              path: '/dashboard/attendance/leave/list'
            },
            {
              name: '旷课',
              value: 3,
              path: '/dashboard/attendance/truancy/list'
            }
          ]
        ],
      }
  },
  methods: {
    changeBar(index) {
      this.selectedBar = index;
    },
    changeOpt(index) {
      this.selectedOpt = index;
    }
  },
  created() {
    this.selectedOpt = this.$route.meta.selectedOpt
  },
  watch: {
    $route(to, from) {
      this.selectedOpt = this.$route.meta.selectedOpt
    }
  }
}
</script>

<style scoped lang="scss">
  .sidebar{
    width: 100%;
    height: 100%;
    background-color: #e9e9e9;
    display: flex;

    .bar_level_one{
      flex: 1;
      height: 100%;
      width: auto;
      min-width: 64px;
      background-color:  #393939;
      padding-right: 2px;
      .bar_item{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        padding: 10px 0;
        font: normal 500 14px/30px '微软雅黑';
        color: #9c9c9c;

        &:hover{
          background-color: #2e2e2e;
        }

        span {
          color: #fefefe;
        }
      }
    }

    .bar_level_two {
      flex: 3;
      min-width: 100px;
      .opt_item{
        cursor: pointer;
        display: flex;
        align-items: center;
        padding: 5px 10px 5px 0;
        font: normal 500 13px/34px '微软雅黑';

        i {
          margin: 0 10px;
        }

        &:hover{
          background-color: #d3d3d3;
        }
      }
    }
  }

  .selectedBar {
    background-color: #2e2e2e;

    i {
      color: #ffffff;
      box-shadow: 0px 0px 10px 2px #e2e2e2;
    }
  }

  .selectedOpt {
    color: #262626;
    font-weight: 700;
    background-image: linear-gradient(to right, #eeeeee , #d3d3d3);

    i {
      opacity: 0;
    }
  }
</style>
