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
  console.log(isOpen);
  return (
    <div
      className={`absolute top-0 right-0 mt-3 p-2 shadow bg-base-100 rounded-box w-52 transition transform ${opacity}`}
    >
      The game was added succesfully!
    </div>
  );
}
