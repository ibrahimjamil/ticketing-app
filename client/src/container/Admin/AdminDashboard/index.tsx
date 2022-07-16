import React from 'react';
import { GenericHeader } from '../../../components';
import { links } from '../../../utils/dummyData';


export function AdminDashboard() {
  return (
    <>
      <GenericHeader links={links}/>
    </>
  );
}