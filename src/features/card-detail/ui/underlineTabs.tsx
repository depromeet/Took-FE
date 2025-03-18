import { cn } from '@/shared/lib/utils';
import { spacingStyles } from '@/shared/spacing';
import { Typography } from '@/shared/ui/typography';

import { TabId, TabItem } from '../config/tabs-config';

interface UnderlineTabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: TabId) => void;
  className?: string;
}

export const UnderlineTabs = ({ tabs, activeTab, onChange, className }: UnderlineTabsProps) => {
  return (
    <div
      className={cn('flex w-full overflow-x-auto whitespace-nowrap bg-black', className)}
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      {tabs.map((tab) => (
        <button
          role="tab"
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            `mr-2 flex-shrink-0 transition-colors duration-200 ${spacingStyles({ paddingX: 'sm', paddingY: 'ms' })}`,
            activeTab === tab.id ? 'border-b-2 border-gray-white text-gray-white' : 'text-gray-600',
          )}
        >
          <Typography variant="body-3">{tab.label}</Typography>
        </button>
      ))}
    </div>
  );
};
