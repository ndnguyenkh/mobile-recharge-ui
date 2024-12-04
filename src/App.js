
// libraries
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// Files
import { AuthProvider, useAuth } from './config/AuthProvider';
import { PublicRoutes, PrivateRoutes } from '~/routes/index'; 
import { HomeLayout } from './layouts';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          {PublicRoutes.map((route, index) => {
            let Layout = HomeLayout;

            if(route.layout){
              Layout = route.layout;
            } else if(route.layout === null){
              Layout = Fragment;
            }

            const Page = route.component;

            return (
              <Route 
                key={index} 
                path={route.path} 
                element={
                  <Layout>
                    <Page />
                  </Layout>
                } 
              />
            );
          })}
          {/* Private Routes */}
          {PrivateRoutes.map((route, index) => {
            let Layout = HomeLayout;

            if(route.layout){
              Layout = route.layout;
            } else if(route.layout === null){
              Layout = Fragment;
            }

            const Page = route.component;

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <PrivateRoute>
                    <Layout>
                      <Page />
                    </Layout>
                  </PrivateRoute>
                }
              />
            );
          })}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

// Function Private Route
function PrivateRoute({ children }) {
  const { auth } = useAuth();
  if (!auth) {
    return <Navigate to="/error" />;
  }

  return children;
}

export default App;
