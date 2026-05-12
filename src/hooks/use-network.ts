import { useState, useEffect } from 'react';
import { Network, ConnectionStatus } from '@capacitor/network';

export function useNetwork() {
  const [isOnline, setIsOnline] = useState<boolean>(true);

  useEffect(() => {
    // Check initial status
    const initNetworkStatus = async () => {
      try {
        const status = await Network.getStatus();
        setIsOnline(status.connected);
      } catch (e) {
        console.error('Failed to get initial network status', e);
      }
    };
    
    initNetworkStatus();

    // Listen for status changes
    const listener = Network.addListener('networkStatusChange', (status: ConnectionStatus) => {
      console.log('Network status changed', status);
      setIsOnline(status.connected);
    });

    return () => {
      listener.then(l => l.remove());
    };
  }, []);

  return { isOnline };
}
