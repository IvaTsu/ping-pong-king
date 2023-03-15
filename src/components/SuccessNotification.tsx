import { useEffect, useState } from "react";
interface SuccessNotificationProps {
  isOpen: boolean;
}
export default function SuccessNotification({
  isOpen,
}: SuccessNotificationProps): JSX.Element {
  console.log(isOpen);
  const [opacity, setOpacity] = useState<string>("opacity-0");
  useEffect(() => {
    isOpen ? setOpacity("opacity-100") : setOpacity("opacity-0");
    return () => {
      setTimeout(() => {
        setOpacity("opacity-0");
      }, 3000);
    };
  }, [isOpen]);

  return (
    <div
      className={`absolute top-0 right-0 mt-3 p-2 shadow bg-base-100 rounded-box w-52 transition transform ${opacity}`}
    >
      The game was added succesfully!
    </div>
  );
}
