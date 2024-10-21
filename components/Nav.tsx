"use client";

import { useLayoutEffect, useState } from "react";
import HumeLogo from "./logos/Hume";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
// import Github from "./logos/GitHub";
// import pkg from "@/package.json";

export const Nav = () => {
  const [isLightMode, setIsLightMode] = useState(false);

  useLayoutEffect(() => {
    const el = document.documentElement;
    const userPreferredTheme = window.matchMedia(
      "(prefers-color-scheme: light)"
    );

    // Apply correct type annotation to the event parameter
    const applyUserThemePreference = (e: MediaQueryListEvent) => {
      if (e.matches) {
        el.classList.add("light");
        setIsLightMode(true);
      } else {
        el.classList.remove("light");
        setIsLightMode(false);
      }
    };

    // TODO: come back to the below - quick fix for successful deployment

    applyUserThemePreference(userPreferredTheme as any);

    // if (userPreferredTheme.matches) {
    //   applyUserThemePreference({ matches: true } as MediaQueryListEvent);
    // } else {
    //   applyUserThemePreference({ matches: false } as MediaQueryListEvent);
    // }

    userPreferredTheme.addEventListener("change", applyUserThemePreference);

    return () => {
      userPreferredTheme.removeEventListener(
        "change",
        applyUserThemePreference
      );
    };
  }, []);

  const toggleLightMode = () => {
    const el = document.documentElement;
    el.classList.toggle("light");
    setIsLightMode((prev) => !prev);
  };

  return (
    <div
      className={
        "px-4 py-2 flex items-center h-14 z-50 bg-card border-b border-border"
      }
    >
      <div>
        <HumeLogo className={"h-5 w-auto"} />
      </div>
      <div className={"ml-auto flex items-center gap-1"}>
        {/* <Button
          onClick={() => {
            window.open(
              pkg.homepage,
              "_blank",
              "noopener noreferrer"
            );
          }}
          variant={"ghost"}
          className={"ml-auto flex items-center gap-1.5"}
        >
          <span>
            <Github className={"size-4"} />
          </span>
          <span>Star on GitHub</span>
        </Button> */}
        <Button
          onClick={toggleLightMode}
          variant={"ghost"}
          className={"ml-auto flex items-center gap-1.5"}
        >
          <span>
            {isLightMode ? (
              <Moon className={"size-4"} />
            ) : (
              <Sun className={"size-4"} />
            )}
          </span>
          <span>{isLightMode ? "Dark" : "Light"} Mode</span>
        </Button>
      </div>
    </div>
  );
};
