import React from "react";
import { Redirect } from "expo-router";
import useUser from "@/hooks/useUser";
import Loader from "@/components/loader";

const index = () => {
  const { user, isLoading } = useUser();

  return;
  <>
    {isLoading ? (
      <Loader />
    ) : (
      <Redirect href={!user ? "/(routes)/onboarding" : "/(tabs)"} />
    )}
  </>;
};

export default index;
