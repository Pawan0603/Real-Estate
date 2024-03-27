"use client";
import React from 'react'
import { useAppContext } from '../../../../context/AppContext';

const ContactUs = () => {
  const { Uname, Uemail } = useAppContext();
  console.log(Uname);
  console.log(Uemail)

  return (
    <div>ContactUs</div>
  )
}

export default ContactUs