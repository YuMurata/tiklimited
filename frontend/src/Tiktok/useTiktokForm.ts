import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type FormValues = {
  tiktokID: string;
};

type StatusValues = {
  isConnected: boolean;
  upgradedToWebsocket: boolean;
  roomId: string;
  roomInfo: any;
};

export const useTiktokForm = () => {
  const { control, handleSubmit } = useForm<FormValues>({});
  const [isConnected, setConnected] = useState<boolean>(false);
  const [isConnecting, setConnecting] = useState<boolean>(false);

  const Connect: SubmitHandler<FormValues> = (data) => {
    console.log(JSON.stringify(data));
    const post = async () => {
      const url = "/tiktok/connect";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // レスポンスの確認
      if (!response.ok) {
        console.error("Error in user creation:", response);
        setConnecting(false);
        return;
      }

      setConnected(true);
      setConnecting(false);
    };
    setConnected(false);
    setConnecting(true);
    post();
    console.log(`isConnected: ${isConnected}`);
  };

  const DisConnect: SubmitHandler<FormValues> = (data) => {
    console.log(JSON.stringify(data));
    const post = async () => {
      const url = "/tiktok/disconnect";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // レスポンスの確認
      if (!response.ok) {
        console.error("Error in user creation:", response);
        return;
      }

      setConnected(false);
    };
    post();
    console.log(`isConnected: ${isConnected}`);
  };

  const onConnect = handleSubmit(Connect);
  const onDisConnect = handleSubmit(DisConnect);

  return { control, onConnect, onDisConnect, isConnected, isConnecting };
};
