import { BrowserRouter, Routes, Route } from "react-router-dom"
import AppLayout from "@layouts/AppLayout"
import Dashboard from "@views/Dashboard"
import CreateProject from "@views/projects/CreateProject"
import EditProject from "@views/projects/EditProject"
import ProjectDetails from "@views/projects/ProjectDetails"
import AuthLayout from "@layouts/AuthLayout"
import Login from "@views/auth/Login"
import Register from "@views/auth/Register"
import ConfirmAccount from "@views/auth/ConfirmAccount"
import RequestNewCode from "@views/auth/RequestNewCode"
import ForgotPassword from "@views/auth/ForgotPassword"
import NewPassword from "@views/auth/NewPassword"
import ProjectTeam from "@views/projects/ProjectTeam"
import ChangePassword from "@views/profile/ChangePassword"
import ProfileLayout from "@layouts/ProfileLayout"
import Profile from "@views/profile/Profile"
import NotFound from "@views/404/NotFound"

export default function Router() {

    return (

        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>  
                    <Route path="/" element={<Dashboard />} index />
                    <Route path="/projects/create" element={<CreateProject />} />
                    <Route path="/projects/:projectId" element={<ProjectDetails />} />
                    <Route path="/projects/:projectId/edit" element={<EditProject />} />
                    <Route path="/projects/:projectId/team" element={<ProjectTeam />} />

                    <Route element={<ProfileLayout />}>
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/profile/change-password" element={<ChangePassword />} />
                    </Route>
                </Route>

                <Route element={<AuthLayout />}>
                    <Route path="/auth/login" element={<Login />} />
                    <Route path="/auth/register" element={<Register />} />
                    <Route path="/auth/confirm-account" element={<ConfirmAccount />} />
                    <Route path="/auth/request-code" element={<RequestNewCode />} />
                    <Route path="/auth/forgot-password" element={<ForgotPassword />} />
                    <Route path="/auth/new-password" element={<NewPassword />} />
                </Route>

                <Route element={<AuthLayout />}>
                    <Route path='*' element={<NotFound />}  />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}