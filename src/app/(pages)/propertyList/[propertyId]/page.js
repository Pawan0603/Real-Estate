"use client";
import React, { useEffect, useState } from 'react'
import styles from './style.module.css';
import { Carousel } from 'keep-react';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Loading02 from '@/components/loading/loading02.js';


const page = ({ params }) => {
  const route = useRouter();
  const [data, setData] = useState();
  const [pImg, setPImg] = useState();
  const [msgData, setMsgData] = useState({ email: '', cName: '', cEmail: '', cMobile: '', cMessage: '' });
  const [loading, setLoading] = useState(true);
  // console.log(params.propertyId)

  const fetchProperty = async () => {
    const property = await fetch(`/api/getPropertyDetails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params.propertyId),
    })
    const PROPERTY = await property.json()
    // console.log(PROPERTY)
    if (PROPERTY.error) {
      route.push(`/`);
    } else {
      setData(PROPERTY.Property[0])
      setPImg(PROPERTY.Property[0].propertyImg)
      setMsgData(prevData => ({ ...prevData, email: PROPERTY.Property[0].UserEmail }));
      setLoading(false);
    }


  }

  useEffect(() => {
    fetchProperty();

  }, []);

  const handelSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(msgData),
    })

    const response = await res.json()
    console.log(response)

    if (response.success) {
      toast.success("You'r message has been sended...", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

    } else {
      console.log("somthing erreo")
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(e.target.value)
    setMsgData((prevData) => ({
      ...prevData, [name]: value
    }));
  }



  return (
    <>
      <ToastContainer
        positon="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

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

            <div className='mt-4 mb-4'>
              <h1 className='text-lg font-semibold'>About</h1>
              <p className='text-gray-600'>{data.propertyDecription}</p>
            </div>

            <hr />


            <div className="flex items-center justify-center mt-8 flex-col">

              <h1 className='text-xl font-bold '>Contact to Oner</h1>

              <div className="mx-auto w-full max-w-[650px]">
                <form onSubmit={handelSubmit}>
                  <div className="mb-5">
                    <label
                      htmlFor="cName"
                      className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      Full Name
                    </label>
                    <input onChange={handleChange}
                      type="text"
                      name="cName"
                      id="cName"
                      placeholder="Full Name"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="cEmail"
                      className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      Email Address
                    </label>
                    <input onChange={handleChange}
                      type="email"
                      name="cEmail"
                      id="cEmail"
                      placeholder="example@domain.com"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                  <div className="mb-5">
                    <label htmlFor="cMobile" className="mb-3 block text-base font-medium text-[#07074D]" >  Mobile Number </label>
                    <input onChange={handleChange}
                      type="number"
                      name="cMobile"
                      id="cMobile"
                      placeholder="Enter your subject"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                  <div className="mb-5">
                    <label htmlFor="cMessage" className="mb-3 block text-base font-medium text-[#07074D]" >
                      Message
                    </label>
                    <textarea onChange={handleChange}
                      rows="4"
                      name="cMessage"
                      id="cMessage"
                      placeholder="Type your message"
                      className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    ></textarea>
                  </div>
                  <div>
                    <button className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none"> Send </button>
                  </div>
                </form>
              </div>
            </div>


          </div>}
        </div>
      </div>
    </>
  )
}

export default page