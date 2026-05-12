import { useNetwork } from '@/hooks/use-network';
import { WifiOff } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';

export const OfflineIndicator = () => {
  const { isOnline } = useNetwork();
  const { t } = useLanguage();

  if (isOnline) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-destructive/90 text-destructive-foreground px-4 py-2 flex items-center justify-center gap-2 text-sm font-medium animate-in slide-in-from-top-full shadow-md backdrop-blur-sm">
      <WifiOff size={16} />
      <span>{t('offline_warning') || 'You are offline. Viewing cached data.'}</span>
    </div>
  );
};
