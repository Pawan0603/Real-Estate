'use client'
import Image from 'next/image'
import { Search } from 'lucide-react'
import styles from './Home.module.css'
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
  const router  = useRouter();
  const [location, setLocation] = useState('')
  const [BuyRent, setBuyRent] = useState('')
  const [Budget, setBudget] = useState('')
  const [bhkInfo, setBhkInfo] = useState('')
  const [postedBy, setPostedBy] = useState('')

  const handleChange = (e) => {
    if (e.target.name == 'location') {
      setLocation(e.target.value)
    }
    else if (e.target.name == 'BuyRent') {
      setBuyRent(e.target.value)
    }
    else if (e.target.name == 'Budget') {
      setBudget(e.target.value)
    }
    else if (e.target.name == 'bhkInfo') {
      setBhkInfo(e.target.value)
    }
    else if (e.target.name == 'postedBy') {
      setPostedBy(e.target.value)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/propertyList/?location=${location}`);
  }
  
  return (
    <main className='flex items-center flex-col'>
      <div className='homeBg w-screen h-full flex flex-col items-center'>

        <h1 className='text-2xl md:text-4xl font-custom font-semibold mt-10 sm:mt-36'>New property Explore by <span className='text-red-600'><i>Location</i></span></h1>
      

        <div className='bg-white border-2 drop-shadow-md rounded-lg mt-7 mb-24 mx-8 SearchBox'>
          <form onSubmit={handleSubmit}>
            <div className='flex bg-white rounded-lg  border-2 justify-between mt-7 mx-4 sm:mx-7 mb-4 searchInputBox'>
              <div className='flex space-x-4 w-full'>
                <span className='p-2 border-r-2'>
                  <Search />
                </span>
                <input onChange={handleChange} type='text' id='location' name='location' className='outline-none  w-full' placeholder='Enter the location...' />
              </div>
              <button className=' p-2 bg-blue-500 hover:bg-blue-600 text-white overflow-hidden rounded-e-lg searchBtn' type='submit'>Search</button>
            </div>

            <hr />
            <div className='flex mt-4 mx-5 mb-6 flex-wrap'>
              <select onChange={handleChange} id='BuyRent' name='BuyRent' className="py-2 px-3 pr-3 mx-[6px] my-[3px] rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 outline-none border border-gray-300 text-gray-700 bg-white">
                <option default >Buy/Rent</option>
                <option value="Buy">Buy</option>
                <option value="Rent">Rent</option>
              </select>

              <select onChange={handleChange} id='Budget' name='Budget' className="py-2 px-3 pr-3 mx-[6px] my-[3px]  rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 outline-none border border-gray-300 text-gray-700 bg-white">
                <option default >Budget</option>
                <option value="50L">50 L</option>
                <option value="1C">1 C</option>
                <option value="5C">5 C</option>
                <option value="10C">10 C</option>
                <option value="20C">20 C</option>
                <option value="30C">30 C</option>
                <option value="50C">50 C</option>
                <option value="75C">75 C</option>
                <option value="100C">100+ C</option>
              </select>

              <select onChange={handleChange} id='bhkInfo' name='bhkInfo' className="py-2 px-3 pr-3 mx-[6px] my-[3px]  rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 outline-none border border-gray-300 text-gray-700 bg-white">
                <option default >Bedroom</option>
                <option value="1 BHK">1 BHK</option>
                <option value="2 BHK">2 BHK</option>
                <option value="3 BHK">3 BHK</option>
                <option value="4 BHK">4 BHK</option>
                <option value="4+ BHK">4+ BHK</option>
              </select>

              <select onChange={handleChange} id='postedBy' name='postedBy' className="py-2 px-3 pr-3 mx-[6px] my-[3px]  rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 outline-none border border-gray-300 text-gray-700 bg-white">
                <option default >Posted By</option>
                <option value="Owner">Owner</option>
                <option value="Builder">Builder</option>
                <option value="Dealer">Dealer</option>
              </select>
            </div>

          </form>
        </div>

      </div>
      <div className='flex flex-col items-center space-y-8 mt-5 mb-32'>
        <h1 className='text-xl md:text-2xl font-medium text-center'>Explore Real Estate In Popular Indian Cities</h1>
        <div className={styles.topdestinationinindiacontainer}>
          <div className={styles.topdestcontent}>
            <div >
              <Image className={styles.topdestinationimg} src="./dehli.img.jpg" width={500} height={500} alt='topdestinationimage'/>
            </div>
            <div className={styles.topdestinationtext}>
              <p className={styles.topdestinationname}>New Dehli and NCR</p>
              <p className={styles.topdestpcolor}>10,012 Properties</p>
            </div>
          </div>

          <div className={styles.topdestcontent}>
            <div >
              <Image className={styles.topdestinationimg} src="./chennai.img.jpg" width={500} height={500} alt='topdestinationimage'/>
            </div>
            <div className={styles.topdestinationtext}>
              <p className={styles.topdestinationname}>New chennai and NCR</p>
              <p className={styles.topdestpcolor}>10,012 Properties</p>
            </div>
          </div>

          <div className={styles.topdestcontent}>
            <div >
              <Image className={styles.topdestinationimg} src="./bangalore-img.jpg" width={500} height={500} alt='topdestinationimage'/>
            </div>
            <div className={styles.topdestinationtext}>
              <p className={styles.topdestinationname}>New bangalore and NCR</p>
              <p className={styles.topdestpcolor}>10,012 Properties</p>
            </div>
          </div>

          <div className={styles.topdestcontent}>
            <div >
              <Image className={styles.topdestinationimg} src="./goa-img.jpg" width={500} height={500} alt='topdestinationimage'/>
            </div>
            <div className={styles.topdestinationtext}>
              <p className={styles.topdestinationname}>New Dehli and NCR</p>
              <p className={styles.topdestpcolor}>10,012 Properties</p>
            </div>
          </div>

          <div className={styles.topdestcontent}>
            <div >
              <Image className={styles.topdestinationimg} src="./hydarbad-img.jpg" width={500} height={500} alt='topdestinationimage'/>
            </div>
            <div className={styles.topdestinationtext}>
              <p className={styles.topdestinationname}>New hydarbad and NCR</p>
              <p className={styles.topdestpcolor}>10,012 Properties</p>
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}
