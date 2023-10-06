import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import About from "./pages/About.jsx";
import Header from "./components/Header.jsx";
import {useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider,} from '@tanstack/react-query';

const queryClient = new QueryClient();
export default function App() {
  return (
      <QueryClientProvider client={queryClient}>
          <BrowserRouter>
              <Header />
              <Routes>
                  <Route path={'/'} element={<Home />} />
                  <Route path={'/sign-in'} element={<SignIn />} />
                  <Route path={'/sign-up'} element={<SignUp />} />
                  <Route path={'/about'} element={<About />} />
                  <Route path={'/profile'} element={<Profile />} />
              </Routes>


          </BrowserRouter>
      </QueryClientProvider>
  )
}
