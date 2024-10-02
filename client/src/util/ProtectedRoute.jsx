// import PropTypes from 'prop-types';
import { Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ProtectedRoute = () => {
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      fetch('http://localhost:8000/api/protected', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(async(response) => {
          const res = await response.json()
          console.log("res",res)
          if (response.ok) {
            if(Object.prototype.hasOwnProperty.call(res,"sucess")){
              setIsValid(true);
            } else{
              setIsValid(false);
            }
            
          } else {
            setIsValid(false);
            localStorage.removeItem('token'); 
          }
        })
        .catch(() => {
          setIsValid(false);
          localStorage.removeItem('token');
        });
    } else {
      setIsValid(false); 
    }
  }, []);

  console.log('isValid',isValid)
  
  if (isValid === null) {
    return <div>Loading...</div>;
  }

  if (!isValid) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};


export default ProtectedRoute;
