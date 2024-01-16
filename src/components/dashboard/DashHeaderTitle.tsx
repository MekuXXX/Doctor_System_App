"use clint";
import { usePathname } from 'next/navigation';
import React from 'react'
import { Skeleton } from '@/components/ui/skeleton';

type Props = {}

export function DashHeaderTitle({}: Props) {
  const path = usePathname().split('/').slice(1);
  let pageHeader = path[path.length - 1]; 
  if (pageHeader.includes('-')) pageHeader = pageHeader.split('-').join(' ');

  return (
    <h1 className='capitalize font-semibold text-2xl'>{pageHeader}</h1>
  )
}

export function DashHeaderTitleFallback() {
  return <Skeleton className='w-32 h-6'/>
}