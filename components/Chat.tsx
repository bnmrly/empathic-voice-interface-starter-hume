"use client";

import { VoiceProvider } from "@humeai/voice-react";
import Messages from "./Messages";
import Controls from "./Controls";
import StartCall from "./StartCall";
import { ComponentRef, useRef } from "react";

export default function ClientComponent({
  accessToken,
}: {
  accessToken: string;
}) {
  const timeout = useRef<number | null>(null);
  const ref = useRef<ComponentRef<typeof Messages> | null>(null);

  // optional: use configId from environment variable
  const configId = process.env["NEXT_PUBLIC_HUME_CONFIG_ID"];
  return (
    // <div
    //   className={
    //     "relative grow flex flex-col mx-auto w-full overflow-hidden h-[0px] border border-red-500 border-solid"
    //   }
    <div className={"chat-container"}>
      <VoiceProvider
        auth={{ type: "accessToken", value: accessToken }}
        onMessage={() => {
          if (timeout.current) {
            window.clearTimeout(timeout.current);
          }

          timeout.current = window.setTimeout(() => {
            if (ref.current) {
              const scrollHeight = ref.current.scrollHeight;

              ref.current.scrollTo({
                top: scrollHeight,
                behavior: "smooth",
              });
            }
          }, 200);
        }}
        clearMessagesOnDisconnect={false}
      >
        <StartCall />
        <Controls />
        <Messages ref={ref} />
      </VoiceProvider>
    </div>
  );
}
