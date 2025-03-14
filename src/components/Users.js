import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../redux/authentication/authActions";

const ProtectedComponent = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchProfile());
    }
  }, [dispatch, isAuthenticated]);

  return <div>{isAuthenticated ? "Welcome to your profile!" : "Access Denied"}</div>;
};

export default ProtectedComponent;
