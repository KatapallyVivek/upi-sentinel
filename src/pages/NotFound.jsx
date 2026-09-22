import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Home as HomeIcon } from 'lucide-react';
import PageHeader from '../components/layout/PageHeader';
import ScreenTransition from '../components/layout/ScreenTransition';
import Button from '../components/ui/Button';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <ScreenTransition>
      <PageHeader title="Not Found" subtitle="Page does not exist" showBack={true} />

      <div className="flex-1 px-4 py-12 flex flex-col justify-between space-y-6">
        <div className="space-y-4 text-center">
          <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center mx-auto text-[#94A3B8]">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-[#F3F4F6]">Unknown Route</h2>
          <p className="text-xs text-[#94A3B8] max-w-xs mx-auto leading-relaxed">
            The requested screen is not part of the UPI Sentinel checkpoint protocol.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          icon={HomeIcon}
          className="w-full"
          onClick={() => navigate('/')}
        >
          Return to Checkpoint
        </Button>
      </div>
    </ScreenTransition>
  );
}

export default NotFound;
