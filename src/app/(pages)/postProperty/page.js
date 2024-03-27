'use client'
import React, { useEffect } from 'react'
import styles from './PostPropertyCss.module.css'
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { useAppContext } from '../../../../context/AppContext';
import Loading01 from '@/components/loading/loading01.js'
import { useRouter } from 'next/navigation';

const postProperty = () => {
    const route = useRouter();
    const { Uemail } = useAppContext();
    const [userMail, setUserMail] = useState(Uemail);
    const [cImg, setCImag] = useState('');
    const [pImg, setPImg] = useState([]);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        UserEmail: userMail, firstName: '', lastName: '', phoneNumber: '', email: '', city: '', address: '', propertyHeading: '', area: '', price: '', BHKinfo: '', noOfBedroom: '', noOfHall: '', noOfKitchen: '', noOfBalcony: '', furinishing: '', parking: '', sellingType: '', security: '', postedBy: '', coverImg: [], propertyImg: [], propertyDecription: '',
    });

    useEffect(() => {
        let token = localStorage.getItem("token")
        if(!token){
            route.push('/');
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        // console.log(e.target.value)
        setData((prevData) => ({
            ...prevData, [name]: value
        }));
    };

    const SubmitData = async () => {
        console.log("run SubmitData", data)
        let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/postProperty`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        let response = await res.json()
        console.log(response);

        if (response.success) {
            setLoading(false);
            toast.success('Your property has been posed...', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            // setTimeout(() => {
            //   router.push(`${process.env.NEXT_PUBLIC_HOST}`)
            // }, 1000);
        }
        else {
            console.log("err");
        }
    }

    const uploadCoverImg = async () => {
        console.log("run uploadCoverImg");
        setLoading(true);
        let Data = new FormData();
        Data.append('file', cImg);
        Data.append('upload_preset', 'Realested');
        Data.append('cloud_name', 'dfqpdi2dq')
        fetch('https://api.cloudinary.com/v1_1/dfqpdi2dq/image/upload', {
            method: 'POST',
            body: Data
        })
            .then(res => res.json())
            .then((res) => {
                console.log(res);
                data.coverImg.push(res.secure_url);
                uploadProertyImgs();
            }).catch((err) => {
                console.log(err)
            })
    }

    const uploadProertyImgs = async () => {
        console.log("run uploadPropertyImg")
        // console.log(cImg)
        // console.log(pImg)
        try {
            for (let i = 0; i < pImg.length; i++) {
                const Data = new FormData()
                Data.append("file", pImg[i])
                Data.append('upload_preset', 'Realested');
                Data.append('cloud_name', 'dfqpdi2dq');
                let a = await fetch('https://api.cloudinary.com/v1_1/dfqpdi2dq/image/upload', {
                    method: 'POST',
                    body: Data
                })
                let res = await a.json();
                data.propertyImg.push(res.secure_url);
            }
            console.log(data);
            SubmitData();
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        uploadCoverImg();
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
            {loading == true && <div>
                <Loading01 className="" />
            </div>}
            <div className={styles.postPropertyBg}>
                <div className={styles.formBox} >
                    <form onSubmit={handleSubmit}>


                        <div className="space-y-12">

                            <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                                <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-3">
                                        <label htmlFor="firstName" className=" block text-sm font-medium leading-6 text-gray-900">First name</label>
                                        <div className="mt-2">
                                            <input type="text" onChange={handleChange} name="firstName" id="firstName" autoComplete="given-name" className=" outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">Last name</label>
                                        <div className="mt-2">
                                            <input type="text" onChange={handleChange} name="lastName" id="lastName" autoComplete="family-name" className="outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-4">
                                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                                        <div className="mt-2">
                                            <input id="email" onChange={handleChange} name="email" type="email" autoComplete="email" className="outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2 sm:col-start-1">
                                        <label htmlFor="phoneNumber" className="block text-sm font-medium leading-6 text-gray-900">Mobile No.</label>
                                        <div className="mt-2">
                                            <input type="number" onChange={handleChange} name="phoneNumber" id="phoneNumber" autoComplete="address-level2" className="outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">Country</label>
                                        <div className="mt-2">
                                            <select id="country" onChange={handleChange} name="country" autoComplete="country-name" className=" outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 " disabled>
                                                <option>India</option>
                                                <option>Canada</option>
                                                <option>Mexico</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-span-full">
                                        <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">Street address</label>
                                        <div className="mt-2">
                                            <input type="text" onChange={handleChange} name="address" id="address" autoComplete="address" className="outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2 sm:col-start-1">
                                        <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">City</label>
                                        <div className="mt-2">
                                            <input type="text" onChange={handleChange} name="city" id="city" autoComplete="city" className="outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">State / Province</label>
                                        <div className="mt-2">
                                            <input type="text" name="region" id="region" autoComplete="address-level1" className="outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900" >ZIP / Postal code</label>
                                        <div className="mt-2">
                                            <input type="number" name="postal-code" id="postal-code" autoComplete="postal-code" className="outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-base font-semibold leading-7 text-gray-900">Property Information</h2>
                                <p className="mt-1 text-sm leading-6 text-gray-600">Enter the currect information of your property.</p>

                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="col-span-full">
                                        <label htmlFor="propertyHeading" className="block text-sm font-medium leading-6 text-gray-900">Property Heading</label>
                                        <div className="mt-2">
                                            <input type="text" onChange={handleChange} name="propertyHeading" id="propertyHeading" autoComplete="propertyHeading" className="outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required />
                                        </div>
                                    </div>

                                    <div className="col-span-full">
                                        <label htmlFor="propertyDecription" className="block text-sm font-medium leading-6 text-gray-900">About</label>
                                        <div className="mt-2">
                                            <textarea id="propertyDecription" onChange={handleChange} name="propertyDecription" rows="3" className="outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required></textarea>
                                        </div>
                                        <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about your property.</p>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="BHKinfo" className="block text-sm font-medium leading-6 text-gray-900">BHK info</label>
                                        <div className="mt-2">
                                            <select id="BHKinfo" onChange={handleChange} name="BHKinfo" autoComplete="BHKinfo-name" className="outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6" required>
                                                <option value="" >Choose...</option>
                                                <option value="1BHK">1BHK</option>
                                                <option value="2BHK">2BHK</option>
                                                <option value="3BHK">3BHK</option>
                                                <option value="4BHK">4BHK</option>
                                                <option value="4+BHK">4+BHK</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2 sm:col-start-1">
                                        <label htmlFor="noOfBedroom" className="block text-sm font-medium leading-6 text-gray-900">No. of Bedroom</label>
                                        <div className="mt-2">
                                            <input type="number" onChange={handleChange} name="noOfBedroom" id="noOfBedroom" autoComplete="address-level2" className="outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="noOfHall" className="block text-sm font-medium leading-6 text-gray-900">No. of Hall</label>
                                        <div className="mt-2">
                                            <input type="number" onChange={handleChange} name="noOfHall" id="noOfHall" autoComplete="address-level2" className="outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="noOfKitchen" className="block text-sm font-medium leading-6 text-gray-900">No. of Kitchen</label>
                                        <div className="mt-2">
                                            <input type="number" onChange={handleChange} name="noOfKitchen" id="noOfKitchen" autoComplete="noOfKitchen" className="outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="noOfBalcony" className="block text-sm font-medium leading-6 text-gray-900">No. of Balcony</label>
                                        <div className="mt-2">
                                            <input type="number" onChange={handleChange} name="noOfBalcony" id="noOfBalcony" autoComplete="noOfBalcony" className="outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required />
                                        </div>
                                    </div>



                                    <div className="sm:col-span-2 sm:col-start-1">
                                        <label htmlFor="area" className="block text-sm font-medium leading-6 text-gray-900">Area In sq.ft.</label>
                                        <div className="mt-2">
                                            <input type="number" onChange={handleChange} name="area" id="area" autoComplete="area" className="outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">Price (In Rs.)</label>
                                        <div className="mt-2">
                                            <input type="number" onChange={handleChange} name="price" id="price" autoComplete="price" className="outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required />
                                        </div>
                                    </div>





                                    <div className="sm:col-span-3">
                                        <label htmlFor="furinishing" className="block text-sm font-medium leading-6 text-gray-900">Furinishing Status</label>
                                        <div className="mt-2">
                                            <select id="furinishing" onChange={handleChange} name="furinishing" autoComplete="furinishing" className="outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6" required>
                                                <option value="" >Choose...</option>
                                                <option value="Furnished">Furnished</option>
                                                <option value="Senifurnished">Senifurnished</option>
                                                <option value="'Unfurnished'">'Unfurnished'</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="parking" className="block text-sm font-medium leading-6 text-gray-900">Parking</label>
                                        <div className="mt-2">
                                            <select id="parking" onChange={handleChange} name="parking" autoComplete="parking" className="outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6" required>
                                                <option value="" >Choose...</option>
                                                <option value="Yes">Yes</option>
                                                <option value="No">No</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="sellingType" className="block text-sm font-medium leading-6 text-gray-900">Selling type</label>
                                        <div className="mt-2">
                                            <select id="sellingType" onChange={handleChange} name="sellingType" autoComplete="sellingType" className="outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6" required>
                                                <option value="" >Choose...</option>
                                                <option value="Sell">Sell</option>
                                                <option value="Resell">Resell</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="security" className="block text-sm font-medium leading-6 text-gray-900">Seurity</label>
                                        <div className="mt-2">
                                            <select id="security" onChange={handleChange} name="security" autoComplete="security" className="outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6" required>
                                                <option value="" >Choose...</option>
                                                <option value="Yes">Yes</option>
                                                <option value="No">No</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="postedBy" className="block text-sm font-medium leading-6 text-gray-900">Posted By</label>
                                        <div className="mt-2">
                                            <select id="postedBy" onChange={handleChange} name="postedBy" autoComplete="postedBy" className="outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6" required>
                                                <option value="" >Choose...</option>
                                                <option value="Owner">Owner</option>
                                                <option value="Builder">Builder</option>
                                                <option value="Dealar">Dealar</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-span-full">
                                        <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">Upload Cover photo</label>
                                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                            <div className="text-center">
                                                <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                                    <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                                                </svg>
                                                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                    <label htmlFor="coverImg" className="relative cursor-pointer rounded-md bg-transparent font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                                        <span>Upload a file</span>
                                                        <input onChange={(e) => setCImag(e.target.files[0])} id="coverImg" name="coverImg" type="file" className="sr-only" required />
                                                    </label>
                                                    <p className="pl-1">or drag and drop</p>
                                                </div>
                                                <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-span-full">
                                        <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">Upload Property photos</label>
                                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                            <div className="text-center">
                                                <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                                    <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                                                </svg>
                                                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                    <label htmlFor="propertyImg" className="relative cursor-pointer rounded-md bg-transparent font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                                        <span>Upload a file</span>
                                                        <input onChange={(e) => setPImg(e.target.files)} id="propertyImg" name="propertyImg" type="file" className="sr-only" required multiple />
                                                    </label>
                                                    <p className="pl-1">or drag and drop</p>propertyImg
                                                </div>
                                                <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>




                        </div>

                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button type="button" className="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                            <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default postProperty