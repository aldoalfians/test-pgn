import { Suspense } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const UserRoute = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return (
      <Suspense fallback={<></>}>
        <Navigate to={"/login"} />
      </Suspense>
    );
  }

  return <Outlet />;
};
