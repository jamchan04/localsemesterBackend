import { createBrowserRouter } from "react-router-dom";
import { Home } from "../page/home/home";
import { Profile } from "../page/profile/profile";
import { PostDetail } from "../page/post/postDetail";
import Login from "../page/login/login";
import { CreateAccount } from "../page/createAccount/create_Account";
import DefaultLayout from "../components/laytout/defaultLayout";
import { PostList } from "../page/post/postList";
import Member from "../page/member/member";
import { ErrorPage } from "../page/error/error";
import { profileLoader } from "./api/profileLoader";
import { Account } from "../page/account/account";
import { editAccountLoader } from "./api/editAccount";
import { UpdatePost } from "../components/form/postForm/updatePost";
import { LocalSemesterMain } from "../page/localSemester/page/main";
import { LocalSemesterCreatePost } from "../page/localSemester/page/createPost";
import { LocalSemesterPost } from "../page/localSemester/page/post";
import { localSemesterLoader } from "./api/localsemesterLoader";
import { memberLoader } from "./api/memberLoader";
import { PostCreate } from "../page/post/postCreate";

export const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile/:id",
        element: <Profile />,
        loader: profileLoader,
      },
      {
        // 무한스크롤 구현할 부분 리스트 페이지 구분없이 스크롤로 구현 예정
        path: "/post",
        element: <PostList />,
      },
      {
        path: "/post/:id",
        element: <PostDetail />,
      },
      {
        path: "/postCreate",
        element: <PostCreate />,
      },
      {
        path: "/postEdit/:id",
        element: <UpdatePost url={"/post"} />,
      },
      {
        path: "/member",
        element: <Member />,
        loader: memberLoader,
      },
      {
        path: "/localSemester",
        element: <LocalSemesterMain />,
      },
      {
        path: "/localSemesterCreate",
        element: <LocalSemesterCreatePost />,
        loader: localSemesterLoader,
      },
      {
        path: "/localSemesterPost/:id",
        element: <LocalSemesterPost />,
      },
      {
        path: "/localSemesterEdit/:id",
        element: <UpdatePost url={"/semester"} />,
      },
      {
        path: "/account/:id",
        element: <Account />,
        loader: editAccountLoader,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/createAccount",
    element: <CreateAccount />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
