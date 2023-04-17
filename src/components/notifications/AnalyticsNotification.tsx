import { useEffect, useState } from "react";

import { useNotificationStore } from "../../store";
import { ReactComponent as DeniedSvg } from "../../svg/denied.svg";

export default function AnalyticsNotification(): JSX.Element {
  const [opacity, setOpacity] = useState<string>("opacity-0");

  const { setIsAnalyticsNotificationShown, getIsAnalyticsNotificationShown } =
    useNotificationStore();

  const isAnalyticsNotificationAlreadyShown = getIsAnalyticsNotificationShown();

  useEffect(() => {
    !isAnalyticsNotificationAlreadyShown
      ? setOpacity("opacity-100")
      : setOpacity("opacity-0");
  }, [isAnalyticsNotificationAlreadyShown]);

  const _onClose = (): void => {
    setIsAnalyticsNotificationShown(true);
  };

  return (
    <div
      className={`bg-base-100 rounded-box absolute bottom-0 left-0 m-3 w-72 p-2 shadow transition${opacity}`}
    >
      <div className="flex flex-row">
        <p>🚨 We track everything you do here! 😈 😈 😈 😈</p>
        <button className="bg-transparent" onClick={_onClose}>
          <DeniedSvg width={25} height={25} />
        </button>
      </div>
    </div>
  );
}
