import React, { useRef } from "react";
import cn from "classnames";
import { useOutsideAlerter } from "../../lib/hooks";

export default function Launchpad({
  apps,
  children,
  focusByCharge,
  launchOpen,
}) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, () => launchOpen.set(!launchOpen.value));
  return (
    <div className="w-full h-full z-[1000] flex justify-center items-center transition-all">
      <div
        className={cn(
          "bg-[rgba(0,0,0,0.7)] shadow-md shadow-[rgba(0,0,0,0.1)] w-full h-full max-w-[1024px] max-h-[80vh] z-[1000] rounded-xl m-4 flex flex-col items-center justify-center backdrop-blur-sm transition-all ease-in-out p-6",
          { "opacity-0 fade-in": launchOpen.value === true }
        )}
        ref={wrapperRef}
      >
        {children}
        <div className="grow overflow-y-auto grid md:grid-cols-3 xl:grid-cols-4 gap-8">
          {Object.entries(apps?.charges || {})
            .sort((a, b) =>
              a[1].title.toLowerCase().localeCompare(b[1].title.toLowerCase())
            )
            .filter((e) => e[0] !== "garden")
            .map(([desk, charge]) => (
              <div key={desk} className="flex flex-col items-center justify-center text-white space-y-4">
                <div
                  className={cn(
                    "h-[125px] w-[125px] rounded-xl overflow-hidden mx-2 cursor-pointer",
                    {
                      "hover:brightness-110": !("install" in charge?.chad),
                      "opacity-25": Boolean("install" in charge?.chad),
                    }
                  )}
                  style={{ backgroundColor: charge.color }}
                  onClick={() => {
                    if (!("install" in charge?.chad)) {
                      focusByCharge(charge);
                      launchOpen.set(!launchOpen.value);
                    }
                  }}
                >
                  {charge?.image?.startsWith("http") && (
                    <img className="h-[125px] w-[125px]" src={charge.image} />
                  )}
                </div>
                <p>{charge.title}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
