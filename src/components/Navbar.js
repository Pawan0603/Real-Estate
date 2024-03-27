"use client";

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { MenuSquare, UserCircle, Loader, School, LogOut, LandPlot, Mail, X, Trash2, RotateCcw } from "lucide-react";
import { useAppContext } from '../../context/AppContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Modal } from "keep-react";
import { CloudArrowUp } from "phosphor-react";


const sideBarStatus = () => {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("hidden")
    sidebar.classList.toggle("flex")
}
const UserSideBarStatus = () => {
    const sidebar = document.getElementById("UserSidebar");
    sidebar.classList.toggle("hidden")
    sidebar.classList.toggle("flex")
}

const Navbar = () => {
    const route = useRouter();
    const { Uname, Uemail, navbarKey, fetchUser } = useAppContext();
    const [localToken, setLocalToken] = useState();
    const [showModal, setShowModal] = useState(false);
    const [showMessageBox, setShowMessageBox] = useState(false);
    const [msgData, setMsgData] = useState();
    const [message, setMessage] = useState();


    useEffect(() => {
        const token = localStorage.getItem("token");
        setLocalToken(token);
        if (token) {
            fetchUser(token).then((res) => {
                // console.log(res.User[0].email)
                if (res.error) {
                    localStorage.removeItem("token");
                    location.reload();
                } else {
                    fetchMassage(res.User[0].email);
                }
            })
        }
    }, [])

    const logOut = () => {
        localStorage.removeItem("token");
        route.push(`/`);
        location.reload();
    }

    const messageListBox = () => {
        setShowModal(!showModal);
    };

    const messageBox = () => {
        setShowMessageBox(!showMessageBox)
    }

    // ======================== fetching messages from database =====================

    const fetchMassage = async (u) => {
        const res = await fetch(`/api/getMessages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(u)
        })
        const response = await res.json();
        console.log(response.massages);

        setMsgData(response.massages);
    }

    // ================================ showing singel message ======================================

    const seeMessage = (e) => {
        console.log("seeMessage : ", e);
        setMessage(e);
        // console.log(message);
    }

    useEffect(() => {
        if (message) {
            messageBox();
        }

        console.log(message);
    }, [message]);

    const deleteMessage = async (_id) => {
        const res = await fetch(`/api/deleteMessage`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(_id),
        })
        const responce = await res.json()
        console.log(responce)
        if (responce.success){
            messageBox();
            fetchMassage(Uemail);
        }

        // console.log("Uemail : ",Uemail)
    }


    return (
        <div className="sticky top-0 z-50">
            <nav className='bg-white flex justify-between px-6 py-4 items-center drop-shadow-md'>
                <div className='flex space-x-5'>
                    <Link href="/"><h1 className='text-xl font-bold'>HouseHub</h1></Link>
                    <div className='space-x-4 hidden sm:flex items-center' id='linkList' >
                        <Link href="/">Home</Link>
                        <Link href="/about">About</Link>
                        <Link href="/contactUs">Contact Us</Link>
                    </div>
                </div>
                <div>
                    {!localToken && !Uname && <Link className='hidden sm:flex' href="/logIn">LogIn</Link>}
                    {localToken && !Uname && <Loader className='hidden sm:flex' />}
                    {Uname && <span onClick={UserSideBarStatus} className='hidden sm:flex items-center space-x-2 cursor-pointer'><UserCircle /><p>{Uname}</p></span>}

                    <MenuSquare size={28} className='sm:hidden' onClick={sideBarStatus} />
                </div>
            </nav>

            {/* ====== mobile side bar ======== */}

            <div className='hidden w-fit absolute right-0 bg-white border border-gray-300 z-40 sm:hidden' id='sidebar'>
                <div className='space-y-4 flex flex-col text-xl font-medium p-6 w-80' id='linkList' >
                    <Link onClick={sideBarStatus} href="/">Home</Link>
                    <Link onClick={sideBarStatus} href="/about">About</Link>
                    <Link onClick={sideBarStatus} href="/contactUs">Contact Us</Link>

                    <hr className='bg-black' />

                    {!localToken && !Uname && <Link onClick={sideBarStatus} href="/logIn">LogIn</Link>}
                    {localToken && !Uname && <Loader />}
                    {Uname && <>
                        <span className='flex items-center space-x-2'><UserCircle /><p>{Uname}</p></span>
                        <Link onClick={UserSideBarStatus} className='flex items-center space-x-2' href="/postProperty"><LandPlot /><p>Post Property</p></Link>
                        <Link onClick={UserSideBarStatus} className='flex items-center space-x-2' href="/yourPropertyList"><School /><p>Your Property</p></Link>
                        <span onClick={messageListBox} className='flex items-center space-x-2 cursor-pointer'><Mail /><p>Message</p></span>
                        <span onClick={logOut} className='flex items-center space-x-2 cursor-pointer'><LogOut /><p>Log out</p></span>
                    </>}
                </div>
            </div>

            {/* ============= user side bar =========== */}

            {Uname && <div className='hidden w-fit absolute right-0 bg-white shadow-md' id='UserSidebar'>
                <div className='space-y-4 flex flex-col text-lg font-medium p-6 w-60' id='linkList' >

                    {!localToken && !Uname && <Link onClick={UserSideBarStatus} className='hidden sm:flex' href="/logIn">LogIn</Link>}
                    {localToken && !Uname && <Loader />}
                    {Uname && <span className='flex items-center space-x-2'><UserCircle /><p>{Uname}</p></span>}

                    <hr className='bg-black' />

                    <Link onClick={UserSideBarStatus} className='flex items-center space-x-2' href="/postProperty"><LandPlot /><p>Post Property</p></Link>
                    <Link onClick={UserSideBarStatus} className='flex items-center space-x-2' href="/yourPropertyList"><School /><p>Your Property</p></Link>
                    <span onClick={messageListBox} className='flex items-center space-x-2 cursor-pointer'><Mail /><p>Message</p></span>
                    <span onClick={logOut} className='flex items-center space-x-2 cursor-pointer'><LogOut /><p>Log out</p></span>
                </div>
            </div>}

            {/* ============================Message List Box ============================= */}

            <Modal
                icon={<X size={28} onClick={messageListBox} className='hover:text-red-500 cursor-pointer' />}
                size="5xl"
                show={showModal}
                position="top-center"
            >
                <Modal.Header>Messages...</Modal.Header>
                <Modal.Body>
                    {/* <RotateCcw /> */}
                    <div className="flex flex-col">
                        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                <div className="overflow-hidden">
                                    <table className="min-w-full text-left text-sm font-light">
                                        <thead className="border-b font-medium dark:border-neutral-500">
                                            <tr>
                                                <th scope="col" className="px-6 py-4">Email</th>
                                                <th scope="col" className="px-6 py-4">Massage</th>
                                            </tr>
                                        </thead>
                                        <tbody className="h-3/4 overflow-auto ...">
                                            {msgData && msgData.map((e) => {
                                                return <tr key={Math.random()} onClick={() => { seeMessage(e); }} className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 cursor-pointer">
                                                    <td className="whitespace-nowrap px-6 py-4">{e.cEmail}</td>
                                                    <td className="whitespace-nowrap px-6 py-4">{e.cMessage}</td>
                                                </tr>
                                            })}

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>


            {/* ============================Message Box ============================= */}

            {message && <Modal
                icon={<X size={28} onClick={messageBox} className='hover:text-red-500 cursor-pointer' />}
                size="5xl"
                show={showMessageBox}
                position="top-center"
            >
                <Modal.Header>{message.cName}</Modal.Header>
                <Modal.Body>
                    <p className='text-gray-700'>Email : <span className='text-blue-500 cursor-pointer'>{message.cEmail}</span></p>
                    <p className='text-gray-700'>Mobile No. : {message.cMobile}</p>
                    <p className='mt-5'>{message.cMessage}</p>
                </Modal.Body>
                <Modal.Footer>
                    <div className='flex justify-between w-full'>
                        <Link href="/" className='text-blue-400'>See Property...</Link>
                        <div>
                            <Trash2 onClick={() => { deleteMessage(message._id) }} className='hover:text-red-600 cursor-pointer' />
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>}


            {/* =======================================Massage List box 2 ++++++++++++++++++++++++++++++++++ */}

            {/* <div className='w-screen h-fit flex justify-center fixed items-center '>
                <div className='w-screen md:w-9/12 max-h-screen mt-3  z-50 bg-transparent backdrop-blur-xl border-2 border-amber-500 rounded-md '>
                    <div className="flex flex-col">
                        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                <div>
                                    <table className="min-w-full text-left text-sm font-light">
                                        <thead className="border-b font-medium dark:border-neutral-500">
                                            <tr>
                                                <th scope="col" className="px-6 py-4">Email</th>
                                                <th scope="col" className="px-6 py-4">Massage</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {msgData && msgData.map((e) => {
                                                return <tr key={Math.random()} onClick={messageBox} className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 cursor-pointer">
                                                    <td className="whitespace-nowrap px-6 py-4">{e.cEmail}</td>
                                                    <td className="whitespace-nowrap px-6 py-4">{e.cMessage}</td>
                                                </tr>
                                            })}

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    )
}

export default Navbar