import { HeaderContainer } from '@/features/home/containers/HeaderContainer';
import { SettingView } from '@/features/setting';
import { cn } from '@/shared/lib/utils';
import { spacingStyles } from '@/shared/spacing';
import { Navbar } from '@/shared/ui/Navigation';

export default function SettingPage() {
  return (
    <div className="relative mx-auto h-dvh w-full max-w-[600px] justify-center">
      <HeaderContainer />
      <section className={cn(spacingStyles({ paddingY: 'md', paddingX: 'ml' }))}>
        <SettingView />
      </section>
      <footer>
        <Navbar />
      </footer>
    </div>
  );
}
