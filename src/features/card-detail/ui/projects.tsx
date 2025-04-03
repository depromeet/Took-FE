import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/shared/lib/utils';
import { spacingStyles } from '@/shared/spacing';

import Empty from '../components/empty';
import { ProjectDto } from '../types/cardDetail';

interface ProjectsProps {
  data: ProjectDto[];
}

function Projects({ data }: ProjectsProps) {
  if (!data || data.length === 0) {
    return <Empty />;
  }
  return (
    <div className="grid grid-cols-2 gap-4">
      {data.map((project, i) => (
        <div key={i} className="flex flex-col overflow-hidden rounded-md">
          <Link href={project.link} target="_blank" className="block">
            <div className="relative aspect-[4/3] w-full border-[1px] border-opacity-white-20">
              <Image
                src={project.imageUrl || '/icons/imageIcon-gray.svg'}
                alt={project.title}
                fill
                className={cn('bg-opacity-white-20', !project.imageUrl ? 'p-[35px]' : '')}
              />
            </div>

            <div className={`flex flex-col ${spacingStyles({ marginTop: 'sm' })}`}>
              <p className="line-clamp-1 text-body-5 text-white">{project.title}</p>
              <p className="line-clamp-1 text-caption-1 text-gray-300">{project.description}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Projects;
