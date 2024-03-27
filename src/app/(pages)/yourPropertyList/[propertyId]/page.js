'use client'
import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../../../../context/AppContext';
import styles from './style.module.css';
import { Carousel } from 'keep-react';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { FileEdit, Trash2 } from 'lucide-react';
import { Button, Modal } from "keep-react";
import { Trash } from "phosphor-react";


const page = ({ params }) => {
  const route = useRouter();
  const { Uemail } = useAppContext();
  const [data, setData] = useState();
  const [pImg, setPImg] = useState();
  const [showErrorModalX, setShowErrorModalX] = useState(false);
  const [loading, setLoading] = useState(false);
  // console.log(params.propertyId)

  const onClickErrorModal = () => {
    setShowErrorModalX(!showErrorModalX);
  };

  const fetchProperty = async () => {
    const property = await fetch(`/api/getUserPropertyDetails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        UserEmail: Uemail, propertyId: params.propertyId,
      }),
    })
    const PROPERTY = await property.json()
    console.log(PROPERTY)

    if (PROPERTY.error) {
      route.push(`/`);
    } else {
      // console.log(PROPERTY.Property[0])
      setData(PROPERTY.Property[0])
      setPImg(PROPERTY.Property[0].propertyImg)
    }
  }

  useEffect(() => {
    if (Uemail) {
      fetchProperty();
    }

  }, [Uemail]);

  const deleteProperty = async () => {
    setLoading(true);
    const res = await fetch(`/api/deleteProperty`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        UserEmail: Uemail, propertyId: params.propertyId,
      }),
    })
    const responce = await res.json()
    console.log(responce)
  }

  return (
    <div className={styles.Bg}>
      <div className={styles.Box}>
        <div className="h-56 w-full sm:h-64 xl:h-80 2xl:h-96">
          {pImg && pImg.length > 0 && (
            <Carousel slideInterval={5000} showControls={true} indicators={true}>
              {pImg.map((img, index) => (
                <Image
                  key={index} // Assuming each image has a unique identifier
                  src={img}
                  alt={`slider-${index + 1}`}
                  height={400}
                  width={910}
                />
              ))}
            </Carousel>
          )}
        </div>

        {data && <div>
          <div className='mt-8'>
            <h1 className='text-xl font-semibold'>
              {data.propertyHeading}
            </h1>
            <p>{data.address}</p>
          </div>

          <div>
            <div className="flex flex-col">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                  <div className="overflow-hidden">
                    <table className="min-w-full text-left text-sm font-light">

                      <tbody className='font-medium'>
                        <tr className="border-b dark:border-neutral-50">
                          <td className="whitespace-nowrap px-6 py-4">BHKinfo</td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <span>{data.BHKinfo}</span>
                            <span><p className='text-gray-500'>( Hall: {data.noOfHall}, Bedroom: {data.noOfBedroom}, Kitchen: {data.noOfKitchen}, Balcony: {data.noOfBalcony} )</p></span>
                          </td>
                        </tr>
                        <tr className="border-b dark:border-neutral-50">
                          <td className="whitespace-nowrap px-6 py-4">Area</td>
                          <td className="whitespace-nowrap px-6 py-4">{data.area} sq.ft.</td>
                        </tr>
                        <tr className="border-b dark:border-neutral-50">
                          <td className="whitespace-nowrap px-6 py-4">City</td>
                          <td className="whitespace-nowrap px-6 py-4">{data.city}</td>
                        </tr>
                        <tr className="border-b dark:border-neutral-50">
                          <td className="whitespace-nowrap px-6 py-4">Furinishing</td>
                          <td className="whitespace-nowrap px-6 py-4">{data.furinishing}</td>
                        </tr>
                        <tr className="border-b dark:border-neutral-50">
                          <td className="whitespace-nowrap px-6 py-4">Parking</td>
                          <td className="whitespace-nowrap px-6 py-4">{data.parking}</td>
                        </tr>
                        <tr className="border-b dark:border-neutral-50">
                          <td className="whitespace-nowrap px-6 py-4">Posted By</td>
                          <td className="whitespace-nowrap px-6 py-4">{data.postedBy}</td>
                        </tr>
                        <tr className="border-b dark:border-neutral-50">
                          <td className="whitespace-nowrap px-6 py-4">Security</td>
                          <td className="whitespace-nowrap px-6 py-4">{data.security}</td>
                        </tr>
                        <tr className="border-b dark:border-neutral-50">
                          <td className="whitespace-nowrap px-6 py-4">SellingType</td>
                          <td className="whitespace-nowrap px-6 py-4">{data.sellingType}</td>
                        </tr>
                        <tr className="border-b dark:border-neutral-50">
                          <td className="whitespace-nowrap px-6 py-4">Price</td>
                          <td className="whitespace-nowrap px-6 py-4">Rs. {data.price}</td>
                        </tr>
                        <tr className="border-b dark:border-neutral-50">
                          <td className="whitespace-nowrap px-6 py-4">Oner name</td>
                          <td className="whitespace-nowrap px-6 py-4">{data.firstName} {data.lastName}</td>
                        </tr>

                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='mt-4'>
            <h1 className='text-lg font-semibold'>About</h1>
            <p className='text-gray-600'>{data.propertyDecription}</p>
          </div>

          <div className='flex space-x-5 mt-5 justify-end'>
            <FileEdit className='cursor-pointer hover:text-blue-500' />
            <Trash2 onClick={onClickErrorModal} className='cursor-pointer hover:text-red-500' />
          </div>

          {/* ======================= Shoving delet popup ============================ */}

          <Modal
            icon={<Trash size={28} color="#E92215" />}
            size="md"
            show={showErrorModalX}
            onClose={onClickErrorModal}
          >
            <Modal.Header>Do you want to delete this Property?</Modal.Header>
            <Modal.Body>
              <div className="space-y-6">
                <p className="text-base leading-relaxed text-slate-500">

                </p>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button type="outlineGray" onClick={onClickErrorModal}>
                Cancel
              </Button>
              <Button type="primary" color="error" onClick={deleteProperty}>
                {loading == true && <div
                  className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-neutral-25 motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status">
                  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"> Loading...</span>
                </div>}
                {loading == false && <p>Delete</p>}
              </Button>
            </Modal.Footer>
          </Modal>

        </div>}
      </div>
    </div>
  )
}

export default page