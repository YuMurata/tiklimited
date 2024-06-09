import * as React from "react";
import { Button } from "@mui/material";

const CreateDB = () => {
  const postEvent = async () => {
    const userData = {
      event: "gift",
      action: "test",
    };

    const url = "/db/actions/create"; // *にAPIエンドポイントを入れる
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    // レスポンスの確認
    if (!response.ok) {
      console.error("Error in user creation:", response);
      return;
    }
  };

  return (
    <div className="container fruitsList">
      <Button onClick={postEvent}>make</Button>
    </div>
  );
};

export default CreateDB;
