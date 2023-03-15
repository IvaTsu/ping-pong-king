import { useEffect, useState } from "react";
interface SuccessNotificationProps {
  isOpen: boolean;
}
export default function SuccessNotification({
  isOpen,
}: SuccessNotificationProps): JSX.Element {
  const [opacity, setOpacity] = useState<number>(0);
  useEffect(() => {
    isOpen ? setOpacity(100) : setOpacity(0);
    return () => {
      setTimeout(() => {
        setOpacity(0);
      }, 3000);
    };
  }, [isOpen]);

  return (
    <div
      className={`absolute top-0 right-0 mt-3 p-2 shadow bg-base-100 rounded-box w-52 transition  transform opacity-${opacity}`}
    >
      The game was added succesfully!
    </div>
  );
}
