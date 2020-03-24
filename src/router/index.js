import Vue from 'vue'
import Router from 'vue-router'

import Login from '../pages/Manager/Login'
import DashBoard from '../pages/DashBoard/DashBoard'
import PlatForm from '../pages/PlatForm/PlatForm'
import ManagerList from '../pages/Manager/List'
import AddManager from '../pages/Manager/Add'

import InstitutionList from '../pages/Institution/List'
import AddInstitution from '../pages/Institution/Add'

import RoleList from '../pages/IdentifyType/List'

import Teacher from '../pages/Teacher/Teacher'
import TeacherList from '../pages/Teacher/List'
import AddTeacher from '../pages/Teacher/Add'

import Class from '../pages/Class/Class'
import ClassList from '../pages/Class/List'
import AddClass from '../pages/Class/Add'

import Student from '../pages/Student/Student'
import StudentList from '../pages/Student/List'
import AddStudent from '../pages/Student/Add'

import Attendance from '../pages/Attendance/Attendance'
import AttendanceList from '../pages/Attendance/List'
import Leave from '../pages/Attendance/Leave'
import Truancy from '../pages/Attendance/Truancy'
import AddAttendance from '../pages/Attendance/Add'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: '登录页',
      component: Login,
    },
    {
      path: '/dashboard',
      name: '后台管理',
      component: DashBoard,
      children: [
        {
          path: '',
          redirect: 'platform',
        },
        {
          path: 'platform',
          name: '平台管理',
          component: PlatForm,
          children: [
            {
              path: '',
              redirect: 'manager/list',
            },
            {
              path: 'manager/list',
              name: '全部用户',
              component: ManagerList,
              meta: {
                selectedOpt: 1
              }
            },
            {
              path: 'manager/add',
              name: '添加用户',
              component: AddManager,
              meta: {
                selectedOpt: 1
              }
            },
            {
              path: 'manager/edit',
              name: '修改用户',
              component: AddManager,
              meta: {
                selectedOpt: 1
              }
            },
            {
              path: 'manager/detail',
              name: '查看用户',
              component: AddManager,
              meta: {
                selectedOpt: 1
              }
            },
            {
              path: 'institution/list',
              name: '全部机构',
              component: InstitutionList,
              meta: {
                selectedOpt: 2
              }
            },
            {
              path: 'institution/add',
              name: '添加机构',
              component: AddInstitution,
              meta: {
                selectedOpt: 2
              }
            },
            {
              path: 'institution/edit',
              name: '修改机构',
              component: AddInstitution,
              meta: {
                selectedOpt: 2
              }
            },
            {
              path: 'institution/detail',
              name: '查看机构',
              component: AddInstitution,
              meta: {
                selectedOpt: 2
              }
            },
            {
              path: 'role/list',
              name: '全部角色',
              component: RoleList,
              meta: {
                selectedOpt: 3
              }
            }
          ]
        },
        {
          path: 'teacher',
          name: '助教管理',
          component: Teacher,
          children: [
            {
              path: '',
              redirect: 'list'
            },
            {
              path: 'list',
              name: '助教列表',
              component: TeacherList,
              meta: {
                selectedOpt: 1
              }
            },
            {
              path: 'add',
              name: '添加助教',
              component: AddTeacher,
              meta: {
                selectedOpt: 1
              }
            },
            {
              path: 'edit',
              name: '修改助教',
              component: AddTeacher,
              meta: {
                selectedOpt: 1
              }
            },
            {
              path: 'detail',
              name: '查看助教',
              component: AddTeacher,
              meta: {
                selectedOpt: 1
              }
            },
          ]
        },
        {
          path: 'class',
          name: '班级管理',
          component: Class,
          children: [
            {
              path: '',
              redirect: 'list'
            },
            {
              path: 'list',
              name: '班级列表',
              component: ClassList,
              meta: {
                selectedOpt: 1
              }
            },
            {
              path: 'add',
              name: '添加班级',
              component: AddClass,
              meta: {
                selectedOpt: 1
              }
            },
            {
              path: 'edit',
              name: '修改班级',
              component: AddClass,
              meta: {
                selectedOpt: 1
              }
            },
            {
              path: 'detail',
              name: '查看班级',
              component: AddClass,
              meta: {
                selectedOpt: 1
              }
            },
          ]
        },
        {
          path: 'student',
          name: '学生管理',
          component: Student,
          children: [
            {
              path: '',
              redirect: 'list'
            },
            {
              path: 'list',
              name: '学生列表',
              component: StudentList,
              meta: {
                selectedOpt: 1
              }
            },
            {
              path: 'add',
              name: '添加学生',
              component: AddStudent,
              meta: {
                selectedOpt: 1
              }
            },
            {
              path: 'edit',
              name: '修改学生',
              component: AddStudent,
              meta: {
                selectedOpt: 1
              }
            },
            {
              path: 'detail',
              name: '查看学生',
              component: AddStudent,
              meta: {
                selectedOpt: 1
              }
            },
          ]
        },
        {
          path: 'attendance',
          name: '考勤管理',
          component: Attendance,
          children: [
            {
              path: '',
              redirect: 'list'
            },
            {
              path: 'list',
              name: '全部考勤',
              component: AttendanceList,
              meta: {
                selectedOpt: 1,
                type: null,
              }
            },
            {
              path: 'edit',
              name: '修改考勤',
              component: AddAttendance,
              meta: {
                selectedOpt: 1,
              }
            },
            {
              path: 'detail',
              name: '查看考勤',
              component: AddAttendance,
              meta: {
                selectedOpt: 1,
              }
            },
            {
              path: 'leave/list',
              name: '请假',
              component: Leave,
              meta: {
                selectedOpt: 2,
                type: 'leave',
              }
            },
            {
              path: 'truancy/list',
              name: '旷课',
              component: Truancy,
              meta: {
                selectedOpt: 3,
                type: 'truancy',
              }
            },
          ]
        }
      ]
    }
  ]
})
