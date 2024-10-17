import { getUserAvailability } from '@/actions/availability'
import React from 'react'
import { defaultAvailability } from './data';
import AvailabilityForm from './_components/availability-form';

const AvailabilityPage = async () => {
    const availData = await getUserAvailability();
    // console.log(avail);

  return (
    <div className="no-scrollbar">
      <AvailabilityForm initialData={ availData || defaultAvailability} />

    </div>
  )
}

export default AvailabilityPage