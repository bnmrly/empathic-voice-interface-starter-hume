"use client";
import { useState } from "react";
import { expressionColors, isExpressionColor } from "@/utils/expressionColors";
import { expressionLabels } from "@/utils/expressionLabels";
import { motion } from "framer-motion";
import { CSSProperties } from "react";
import * as R from "remeda";

export default function Expressions({
  values,
  sendAssistantInput,
  isUserMessage,
}: {
  values: any;
  sendAssistantInput: (text: string) => void;
  isUserMessage: boolean;
}) {
  const top3 = R.pipe(
    values,
    R.entries(),
    R.sortBy(R.pathOr([1], 0)),
    R.reverse(),
    R.take(3)
  );
  const strongestEmotion = top3[0]?.[0];

  const borderColor = isExpressionColor(strongestEmotion)
    ? expressionColors[strongestEmotion]
    : "var(--bg)";

  const angryUser = isUserMessage && strongestEmotion === "anger";

  const [isUserAngry, setIsUserAngry] = useState(angryUser);

  if (isUserAngry) {
    sendAssistantInput("DO ONE, MATE!");
    setIsUserAngry(false);
  }

  return (
    <div
      className={
        "text-xs p-3 w-full border-t rounded-b flex flex-col md:flex-row gap-3"
      }
      style={
        {
          border: `1px solid ${borderColor}`,
        } as CSSProperties
      }
    >
      {top3.map(([key, value], index) => {
        return (
          <div key={key} className={"w-full overflow-hidden"}>
            <div
              className={
                "flex items-center justify-between gap-1 font-mono pb-1"
              }
            >
              <div className={"font-medium truncate"}>
                {expressionLabels[key]}
              </div>
              <div className={"tabular-nums opacity-50"}>
                {value.toFixed(2)}
              </div>
            </div>
            <div
              className={"relative h-1"}
              style={
                {
                  "--bg": isExpressionColor(key)
                    ? expressionColors[key]
                    : "var(--bg)",
                } as CSSProperties
              }
            >
              <div
                className={
                  "absolute top-0 left-0 size-full rounded-full opacity-10 bg-[var(--bg)]"
                }
              />

              <motion.div
                className={
                  "absolute top-0 left-0 h-full bg-[var(--bg)] rounded-full"
                }
                initial={{ width: 0 }}
                animate={{
                  width: `${R.pipe(
                    value,
                    R.clamp({ min: 0, max: 1 }),
                    (value) => `${value * 100}%`
                  )}`,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
