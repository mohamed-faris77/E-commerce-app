import { Navigate } from 'react-router-dom';

// Protected route for authenticated users
export const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  if (!token || !userInfo) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Protected route for admin only
export const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  if (!token || !userInfo) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  if (userInfo.role !== 'admin') {
    // Redirect to home if not admin
    alert('Access Denied: Admin privileges required');
    return <Navigate to="/" replace />;
  }

  return children;
};

export default { ProtectedRoute, AdminRoute };
