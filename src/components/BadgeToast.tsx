import { useEffect, useState } from "react";
import type { Badge } from "../hooks/useBadges";

interface BadgeToastProps {
  badge: Badge | null;
  onClose: () => void;
}

export function BadgeToast({ badge, onClose }: BadgeToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (badge) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(onClose, 500);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [badge, onClose]);

  if (!badge || !visible) return null;

  return (
    <div className="badge-toast">
      <div className="badge-toast-content">
        <div className="badge-toast-icon">{badge.icon}</div>
        <div className="badge-toast-info">
          <div className="badge-toast-title">🏅 New Badge Unlocked!</div>
          <div className="badge-toast-name">{badge.name}</div>
          <div className="badge-toast-desc">{badge.description}</div>
        </div>
      </div>
    </div>
  );
}
