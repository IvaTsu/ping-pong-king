import { useEffect, useState } from "react";
interface SuccessNotificationProps {
  isOpen: boolean;
}
export default function SuccessNotification({
  isOpen,
}: SuccessNotificationProps): JSX.Element {
  const [opacity, setOpacity] = useState<string>("opacity-0");
  useEffect(() => {
    isOpen ? setOpacity("opacity-100") : setOpacity("opacity-0");
  }, [isOpen]);
  return (
    <div
      className={`bg-base-100 rounded-box absolute top-0 right-0 mt-3 w-52 p-2 shadow transition${opacity}`}
    >
      The game was added successfully!
    </div>
  );
}
