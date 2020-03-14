import { useState } from 'react';

const useNotification = () => {
  const [severity, setSeverity] = useState(null);
  const [message, setMessage] = useState(null);
  const [open, setOpen] = useState(false);

  const showNotification = (msg, type) => {
    setMessage(msg);
    setSeverity(type);
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 6000);
  };

  const notificationProps = () => {
    return {
      message,
      severity,
      open
    };
  };

  return {
    showNotification,
    notificationProps
  };
};

export default useNotification;
