/* eslint-disable */
import { NextPage } from "next";
import { useRouter } from "next/router";

const withAuth = (WrappedComponent: NextPage) => {

  return (props: any) => {
    if (typeof window !== "undefined") {
      const Router = useRouter();
      const accessToken = localStorage.getItem("user");
      if (!accessToken) {
        Router.replace("/");
        return null;
      }

      return <WrappedComponent {...props} />;
    }

    return null;
  
  };
};

export default withAuth;