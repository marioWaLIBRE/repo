import { useRef } from "react";
import createPuzzle from "create-puzzle";
import SliderCaptcha from "rc-slider-captcha";

export function RCCaptcha({
  onVerify,
}) {
  const offsetXRef = useRef(0); // store the x offset of the puzzle

  return (
    <SliderCaptcha
      request={() =>
        createPuzzle("/puzzleImage.jpg").then((res) => {
          offsetXRef.current = res.x;
          return {
            bgUrl: res.bgUrl,
            puzzleUrl: res.puzzleUrl,
          };
        })
      }
      onVerify={async (data) => {
        if (
          data.x >= offsetXRef.current - 5 &&
          data.x < offsetXRef.current + 5
        ) {
          setTimeout(() => {
            if (onVerify) onVerify();
          }, 500);
          return Promise.resolve();
        }
        return Promise.reject();
      }}
      tipText={{
        default: "Drag to the right to complete the puzzle",
        loading: "Loading...",
      }}
      bgSize={{
        width: 360,
      }}
      loadingDelay={0}
    />
  );
}