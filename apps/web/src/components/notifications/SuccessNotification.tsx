import { useEffect, useState } from "react";
interface SuccessNotificationProps {
  isOpen: boolean;
}
export default function SuccessNotification({
  isOpen,
}: SuccessNotificationProps): JSX.Element {
  const [opacity, setOpacity] = useState<string>("opacity-0");
  useEffect(() => {
    if (isOpen) {
      setOpacity("opacity-100");
    } else {
      setOpacity("opacity-0");
    }
  }, [isOpen]);
  return (
    <div
      className={`rounded-box absolute right-0 top-0 mt-3 w-52 bg-base-100 p-2 shadow transition ${opacity}`}
    >
      The game was added successfully!
    </div>
  );
}
