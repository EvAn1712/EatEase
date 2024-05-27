import React from 'react';
import BeefIcon from '@/components/icons/beef';


export type InitialStateType = {
  filter: string;
};

export const initialState: InitialStateType = {
  filter: '',
};

// Options
export const filterOptions = [
  
  {
    id: 14,
    name: 'Beef',
    value: 'beef',
    icon: BeefIcon,
  },

];
