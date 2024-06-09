import { useForm, SubmitHandler } from "react-hook-form";

type FormValues = {
  tiktokID: string;
};

export const useTiktokForm = () => {
  const { control, handleSubmit } = useForm<FormValues>({});

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
        return;
      }
    };
    post();
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
    };
    post();
  };

  const onConnect = handleSubmit(Connect);
  const onDisConnect = handleSubmit(DisConnect);

  return { control, onConnect, onDisConnect };
};
