import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root";
import UserSignUpPage from "./pages/UserSignUp";
import LogoutPage, { action as logoutAction } from "./pages/Logout";
import {
  loader as profileLoader,
  action as editingProfileAction,
} from "./pages/Profile";
import ProfilePage from "./pages/Profile";
import { tokenLoader } from "./utils/auth";
import HomePage, { loader as homePageLoader } from "./pages/Home";
import CompanyPage, {
  loader as companyLoader,
  action as creatingCompanyAction,
} from "./pages/Company";
import { action as enterCompanyAction } from "./pages/enterCompany";
import CreateCompanyToken, {
  loader as createCompanyTokenLoader,
} from "./pages/createCompanyToken";
import ProjectsPage from "./pages/Projects";
import { loader as projectsLoader } from "./pages/Projects";
import ProjectsCreatePage from "./pages/ProjectsCreate";
import { action as createProjectsAction } from "./pages/ProjectsCreate";
import ProjectsProjectPage from "./pages/ProjectsProject";
import { loader as projectsProjectLoader } from "./pages/ProjectsProject";
import ProjectsAddUserPage, {
  action as projectAddUserAction,
} from "./pages/ProjectsAddUser";
import { action as projectRemoveAction } from "./pages/ProjectsRemoveUser";
import TasksPage from "./pages/Tasks";
import ProjectsEditingPage, {
  loader as editingProjectLoader,
} from "./pages/ProjectsEditing";
import { action as editingProjectAction } from "./pages/ProjectsEditing";
import { loader as tasksLoader } from "./pages/Tasks";
import TasksCreatePage from "./pages/TasksCreate";
import { action as taskCreateAction } from "./pages/TasksCreate";
import TasksTaskPage from "./pages/TasksTask";
import { loader as tasksTaskLoader } from "./pages/TasksTask";
import TasksEditingPage from "./pages/TasksEditing";
import { action as editingTaskAction } from "./pages/TasksEditing";
import TasksAddCommentPage from "./pages/TasksAddComment";
import { action as addCommentAction } from "./pages/TasksAddComment";
import TasksEditCommentPage from "./pages/TasksEditComment";
import {
  loader as editingCommentLoader,
  action as editingCommentAction,
} from "./pages/TasksEditComment";
import TasksDonePage from "./pages/TasksDone";
import NotificationPage from "./pages/Notification";
import NotificationUpdatePage, {
  loader as notificationUpdateLoader,
} from "./pages/NotificationUpdate";
import ProjectsReportsPage from "./pages/ProjectsReports";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    id: "root-router",
    loader: homePageLoader,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: tokenLoader,
      },
      {
        path: "profile",
        element: <ProfilePage />,
        loader: profileLoader,
        action: editingProfileAction,
      },
      {
        path: "company",
        element: <CompanyPage />,
        loader: companyLoader,
        action: creatingCompanyAction,
      },
      {
        path: "enterCompany",
        action: enterCompanyAction,
      },
      {
        path: "createToken",
        loader: createCompanyTokenLoader,
        element: <CreateCompanyToken />,
        id: "CompanyToken",
      },
      {
        path: "projects",
        children: [
          {
            index: true,
            element: <ProjectsPage />,
            loader: projectsLoader,
          },
          {
            path: "addProject",
            element: <ProjectsCreatePage />,
            action: createProjectsAction,
          },

          {
            path: ":id",
            element: <ProjectsProjectPage />,
            loader: projectsProjectLoader,
          },
          {
            path: ":id/addUserToProject",
            element: <ProjectsAddUserPage />,
            action: projectAddUserAction,
          },
          {
            path: ":id/editing",
            element: <ProjectsEditingPage />,
            loader: editingProjectLoader,
            action: editingProjectAction,
          },
          {
            path: "removeUserFromProject",
            action: projectRemoveAction,
          },
          {
            path: "relatorio",
            element: <ProjectsReportsPage />,
            loader: projectsLoader,
          },
        ],
      },
      {
        path: "tasks",
        loader: tasksLoader,
        id: "root-tasks",
        children: [
          {
            index: true,
            element: <TasksPage />,
          },
          {
            path: "done",
            element: <TasksDonePage />,
          },
          {
            path: "addTasks",
            element: <TasksCreatePage />,
            action: taskCreateAction,
          },
          {
            path: ":id",
            id: "taskLoader",
            loader: tasksTaskLoader,
            children: [
              {
                index: true,
                element: <TasksTaskPage />,
              },
              {
                path: "editing",
                element: <TasksEditingPage />,
                action: editingTaskAction,
              },
              {
                path: "comentarioCreate",
                element: <TasksAddCommentPage />,
                action: addCommentAction,
              },
              {
                path: "comentario/:commentId/editing",
                element: <TasksEditCommentPage />,
                loader: editingCommentLoader,
                action: editingCommentAction,
              },
            ],
          },
        ],
      },
      {
        path: "notificacoes",
        element: <NotificationPage />,
        children: [
          {
            path: ":id",
            element: <NotificationUpdatePage />,
            loader: notificationUpdateLoader,
          },
        ],
      },
      {
        path: "signup",
        element: <UserSignUpPage />,
      },
      {
        path: "logout",
        element: <LogoutPage />,
        action: logoutAction,
        loader: logoutAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
