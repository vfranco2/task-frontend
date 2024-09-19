import { Toast } from "@tycholabs/armillary";
import React, { useState } from "react";
import Main from "./main/Main";

export default function Home() {
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const [toastText, setToastText] = useState<string>("Saved!");

  return (
    <>
      <Main />
      <Toast title={toastText} open={toastVisible} />
    </>
  );
}
