// components/SkeletonLoader.tsx
import React from 'react';

// Componente de skeleton individual para elementos
const SkeletonItem = ({ className }: { className: string }) => (
  <div className={`bg-(--principal-main-color) rounded animate-pulse ${className}`}></div>
);

// Componente principal del Skeleton Loader
const SkeletonLoader = () => {
  return (
    <div className="h-screen w-screen flex flex-col">
      {/* Header Skeleton */}
      <div className="bg-(--principal-secondary-color) border-b border-(--shadow) p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <SkeletonItem className="h-6 w-24" />
            <SkeletonItem className="h-4 w-32" />
          </div>
          <SkeletonItem className="h-8 w-20" />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto flex justify-center">
        <div className="w-full md:w-[30%] p-2 md:p-8">
          {/* Progress Bar Skeleton */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <SkeletonItem className="h-4 w-16" />
              <SkeletonItem className="h-4 w-12" />
            </div>
            <div className="w-full bg-(--principal-secondary-color) rounded-full h-2 animate-pulse">
              <SkeletonItem className="h-2 rounded-full w-1/4 bg-(--shadow) "/>
            </div>
          </div>

          {/* Question Statement Skeleton */}
          <div className="min-h-[40%] flex items-center justify-center text-center mb-6">
            <div className="space-y-3 w-full">
              <SkeletonItem className="h-6 w-full bg-(--shadow)" />
              <SkeletonItem className="h-6 w-3/4 mx-auto bg-(--shadow)" />
              <SkeletonItem className="h-6 w-5/6 mx-auto bg-(--shadow)" />
            </div>
          </div>

          {/* Options Skeleton */}
          <div className="space-y-2">
            {[0, 1, 2, 3].map((index) => (
              <div
                key={index}
                className="border border-(--shadow) rounded-lg p-4 flex items-center space-x-3 animate-pulse"
              >
                <SkeletonItem className="w-8 h-8 rounded-[8px] flex-shrink-0 bg-(--shadow)" />
                <div className="flex-1">
                  <SkeletonItem className="h-5 w-full bg-(--shadow)" />
                </div>
              </div>
            ))}
          </div>

          <div className="md:h-10 h-5"></div>
        </div>
      </div>

      {/* Bottom Action Bar( Skeleton */}
      <div className="bg-(--principal-secondary-color) sticky bottom-0 w-full border-t border-(--shadow) min-h-[100px] py-6 flex flex-col justify-center items-center">
        <SkeletonItem className="h-12 w-32 bg-(--shadow)" />
      </div>
    </div>
  );
};

export default SkeletonLoader;