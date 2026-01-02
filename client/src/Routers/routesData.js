/* eslint-disable no-undef */
import { lazy } from 'react';

import ROUTE_CONSTANT from './routeConstants';

const LoginPageComponent = lazy(() => import('../pages/Login'));
const HomePage = lazy(() => import('../pages/Home'));
const AdminHome = lazy(() => import('../pages/Admin/Home/Home'));
const AdminUpload = lazy(() => import('../pages/Admin/AdminUpload'));
const CreatePollingStation = lazy(() =>
  import('../pages/Admin/PollingStations/CreatePollingStations')
);
const ViewvoterPage = lazy(() => import('../pages/Dashboard/ViewVoters1'));
const CreateUser = lazy(() => import('../pages/Admin/User/CreateUser'));
const ViewUser = lazy(() => import('../pages/Admin/User/ViewUser'));
const EditUser = lazy(() => import('../pages/Admin/User/EditUser'));
const Role = lazy(() => import('../pages/Admin/Roles/Roles'));
const EditRole = lazy(() => import('../pages/Admin/Roles/EditRoles'));
const AssignConstituency = lazy(() =>
  import('../pages/Admin/AssignConstituency/AssignConstituency')
);
const EditAssignConstituency = lazy(() =>
  import('../pages/Admin/AssignConstituency/EditAssignConstituency')
);
const ExtractVoterListPage = lazy(() =>
  import('../pages/Admin/ExtractVoterlist/ExtractVoterlist')
);

const routes = [
  {
    path: ROUTE_CONSTANT.LOGIN,
    exact: true,
    component: LoginPageComponent,
    isPublic: true,
  },
  // {
  //   path: ROUTE_CONSTANT.NOTIFICATION,
  //   exact: true,
  //   component: Notifications,
  //   depts: ['*'],
  //   roles: ['*'],
  // },
  {
    path: ROUTE_CONSTANT.HOME,
    exact: true,
    // component: HomePage,
    component: ViewvoterPage,
    // isPublic: false,
  },
  {
    path: ROUTE_CONSTANT.ADMIN_HOME,
    exact: true,
    component: AdminHome,
    // isPublic: false,
  },
  {
    path: ROUTE_CONSTANT.VOTER,
    exact: true,
    component: ViewvoterPage,
    // isPublic: false,
  },
  {
    path: ROUTE_CONSTANT.ADMIN_UPLOAD,
    exact: true,
    component: AdminUpload,
    // isPublic: false,
  },
  {
    path: ROUTE_CONSTANT.CREATE_POLLING_STATIONS,
    exact: true,
    component: CreatePollingStation,
    // isPublic: false,
  },
  {
    path: ROUTE_CONSTANT.CREATE_USER,
    exact: true,
    component: CreateUser,
    isPublic: false,
  },
  {
    path: ROUTE_CONSTANT.VIEW_USER,
    exact: true,
    component: ViewUser,
    isPublic: false,
  },
  {
    path: ROUTE_CONSTANT.EDIT_USER,
    exact: true,
    component: EditUser,
    isPublic: false,
  },
  {
    path: ROUTE_CONSTANT.ASSIGN_CONSTITUENCY,
    exact: true,
    component: AssignConstituency,
    isPublic: false,
  },
  {
    path: ROUTE_CONSTANT.EDIT_ASSIGN_CONSTITUENCY,
    exact: true,
    component: EditAssignConstituency,
  },
  {
    path: ROUTE_CONSTANT.ROLES,
    exact: true,
    component: Role,
    isPublic: false,
  },
  {
    path: ROUTE_CONSTANT.EDIT_ROLES,
    exact: true,
    component: EditRole,
    isPublic: false,
  },
  {
    path: ROUTE_CONSTANT.EXTRACT_VOTER_LIST,
    exact: true,
    component: ExtractVoterListPage,
    isPublic: false,
  },
];

export default routes;
