'use client'
import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../../../context/AppContext';
import { useRouter } from 'next/navigation';
import UserPropertyCard from '@/components/userPropertyCard';


const yourPropertyList = () => {
  const route = useRouter();
  const { Uemail, reRenderKey } = useAppContext();
  const [data, setData] = useState();

  const fetchProperty = async () => {
    const propertyList = await fetch(`/api/getUserProperty`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Uemail),
    })
    const PROPERTYlist = await propertyList.json()
    // console.log(PROPERTYlist.Property)
    setData(PROPERTYlist.Property)
  }

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      route.push('/')
    }
    fetchProperty();
  }, [reRenderKey]);

  return (
    <div key={reRenderKey} className='min-h-screen'>
    <h1 className='my-6 text-xl font-semibold ml-6'>Your Property List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full sm:mx-6">
        {data && data.map((e) => {
          return <UserPropertyCard key={Math.random()} BHKinfo={e.BHKinfo} propertyHeading={e.propertyHeading} _id={e._id} propertyDecription={e.propertyDecription} furinishing={e.furinishing} area={e.area} address={e.address} coverImg={e.coverImg} firstName={e.firstName} lastName={e.lastName} price={e.price} sellingType={e.sellingType} noOfBalcony={e.noOfBalcony} noOfBedroom={e.noOfBedroom} noOfKitchen={e.noOfKitchen} noOfHall={e.noOfHall} parking={e.parking}/>
        })}
      </div>
    </div>
  )
}

export default yourPropertyList