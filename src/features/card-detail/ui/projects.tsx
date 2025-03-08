import Image from 'next/image';
import React from 'react';

import { spacingStyles } from '@/shared/spacing';

import { ProjectDto } from '../types/sample';

interface ProjectsProps {
  data: ProjectDto[];
}

function Projects({ data }: ProjectsProps) {
  return (
    <div className={`grid grid-cols-2 gap-4 ${spacingStyles({ marginTop: 'xl' })}`}>
      {data.map((project) => (
        <div key={project.id} className="flex flex-col overflow-hidden rounded-md">
          <div className="relative h-40 w-full border-[1px] border-opacity-white-20">
            <Image
              src={project.thumbnail || '/icons/imageIcon.svg'}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>

          <div className={`flex flex-col ${spacingStyles({ marginTop: 'sm' })}`}>
            <p className="line-clamp-1 text-body-5 text-white">{project.title}</p>
            <p className="line-clamp-1 text-caption-1 text-gray-300">{project.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Projects;
