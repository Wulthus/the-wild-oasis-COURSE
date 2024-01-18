/* eslint-disable */

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

import GlobalStyles from "./styles/globalStyles";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Account from "./pages/Account";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import Users from "./pages/Users";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import Booking from "./pages/Booking";
import Checkin from "./pages/Checkin";
import ProtectedRoute from "./ui/ProtectedRoute";
import { DarkModeProvider } from "./context/DarkModeContext.jsx";





const queryClient = new QueryClient(
  {
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  }
);

export default function App(){
  return (
      <QueryClientProvider client={queryClient}>
        <DarkModeProvider>
          <ReactQueryDevtools />
          <GlobalStyles />
          <BrowserRouter>
            <Routes>
              <Route element={
                <ProtectedRoute>
                  <AppLayout>
                  </AppLayout>
                </ProtectedRoute>}
              >
                <Route index element={<Navigate replace to='dashboard'></Navigate>}></Route>
                <Route path="dashboard"element={<Dashboard></Dashboard>}></Route>
                <Route path="bookings" element={<Bookings></Bookings>}></Route>
                <Route path="bookings/:bookingId" element={<Booking></Booking>}></Route>
                <Route path="checkin/:bookingId" element={<Checkin></Checkin>}></Route>
                <Route path="cabins" element={<Cabins></Cabins>}></Route>
                <Route path="account" element={<Account></Account>}></Route>
                <Route path="settings" element={<Settings></Settings>}></Route>
                <Route path="users" element={<Users></Users>}></Route>
              </Route>
              <Route path="login" element={<Login></Login>}></Route>
              <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
            </Routes>
          </BrowserRouter>
          <Toaster position="top-center" gutter={12} containerStyle={{margin: "8px"}} toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 12px",
              backgroundColor: "var(--color-gray-0)",
              textColor: "var(--color-gray-700)",
            }
          }} />
        </DarkModeProvider>
      </QueryClientProvider>
    
  )
  
}

/* eslint-enable */