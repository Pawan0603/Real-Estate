'use client'
import React from 'react';
// import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import PropertyCard from '@/components/propertyCard';
import { useRouter } from 'next/navigation';

const PropertyList = () => {
    // const router = useRouter();
    const searchParams = useSearchParams();
    const location = searchParams.get('location');
    const [data, setData] = useState();
    const router  = useRouter();
  
    const fetchProperty = async () => {
      const propertyList = await fetch(`/api/getProperty`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(location),
      })
      const PROPERTYlist = await propertyList.json()
      // console.log(PROPERTYlist.Property)
      setData(PROPERTYlist.Property)
    }
  
    useEffect(() => {
      fetchProperty();
    }, []);



  return (
    <div className='min-h-screen'>
    <h1 className='my-6 text-xl font-semibold ml-6'>Search Results in {location}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full sm:mx-6">
        {data && data.map((e) => {
          return <PropertyCard key={Math.random()} BHKinfo={e.BHKinfo} propertyHeading={e.propertyHeading} _id={e._id} propertyDecription={e.propertyDecription} furinishing={e.furinishing} area={e.area} address={e.address} coverImg={e.coverImg} firstName={e.firstName} lastName={e.lastName} price={e.price} sellingType={e.sellingType} noOfBalcony={e.noOfBalcony} noOfBedroom={e.noOfBedroom} noOfKitchen={e.noOfKitchen} noOfHall={e.noOfHall} parking={e.parking}/>
        })}
      </div>
    </div>
  )
}

export default PropertyList