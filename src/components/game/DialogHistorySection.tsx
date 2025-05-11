
import React from 'react';
import { DialogueLine } from '@/types/game';
import DialogHistory from '@/components/DialogHistory';
import ExpandableMenu from '@/components/ExpandableMenu';

interface DialogHistorySectionProps {
  showHistory: boolean;
  setShowHistory: (show: boolean) => void;
  dialogHistory: DialogueLine[];
  activeView: 'game' | 'tester';
  handleGameClick: () => void;
  handleTesterClick: () => void;
  replayCurrentScene: () => void;
}

const DialogHistorySection: React.FC<DialogHistorySectionProps> = ({
  showHistory,
  setShowHistory,
  dialogHistory,
  activeView,
  handleGameClick,
  handleTesterClick,
  replayCurrentScene
}) => {
  return (
    <>
      {/* Dialog History Button */}
      <ExpandableMenu 
        onGameClick={handleGameClick}
        onTesterClick={handleTesterClick}
        activeView={activeView}
      />
      
      {/* Dialog History Overlay */}
      {showHistory && (
        <DialogHistory
          dialogHistory={dialogHistory}
          onClose={() => setShowHistory(false)}
          onOpenChange={() => setShowHistory(false)}
          open={showHistory}
          onReplayScene={replayCurrentScene}
        />
      )}
    </>
  );
};

export default DialogHistorySection;
