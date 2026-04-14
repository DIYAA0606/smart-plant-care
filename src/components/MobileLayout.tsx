import { ReactNode } from "react";

interface MobileLayoutProps {
  children: ReactNode;
  className?: string;
}

const MobileLayout = ({ children, className = "" }: MobileLayoutProps) => {
  return (
    <div className={`mobile-container bg-background overflow-x-hidden ${className}`}>
      {children}
    </div>
  );
};

export default MobileLayout;
