import { Stack } from "expo-router";
import { userDetails } from './../loginct/userDetails';
import { useState } from "react";

export default function RootLayout() {

  const [userDetail, setUserDetail] = useState();

  return (
    <userDetails.Provider value={{userDetail, setUserDetail}}>
  <Stack screenOptions={{
    headerShown: false
  }}>
    </Stack>
    </userDetails.Provider>
  )
}
