import Link from 'next/link'
import React from 'react'
import HomeIcon from '@mui/icons-material/Home'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import SettingsIcon from '@mui/icons-material/Settings'
import MemoryIcon from '@mui/icons-material/Memory';
import { useRouter } from 'next/router';
import SupportRoundedIcon from '@mui/icons-material/SupportRounded';

const SidebarMyPods: React.FC = () => {
    const router = useRouter();
  
  return (
    <div className=' relative top-[88px] h-screen bg-[#1C1C1C] text-white text-xs p-4 border-r-1 border-[#292929] w-36 md:w-56 md:fixed md:text-left'>
      <nav>
        <ul>
          <li className='mb-3'>
            <Link href='/console_login'>
              <span className={`p-2 rounded flex items-center ${router.pathname === '/pods' ? 'hover:bg-gray-700' : 'bg-[#191970] hover:bg-blue-700'}`}>
                <HomeIcon className='mr-3' />
                Console
              </span>
            </Link>
          </li>
          <li className='mb-3'>
            <Link href='/pods'>
              <span className={` p-2 rounded flex items-center ${router.pathname === '/pods' ? 'bg-[#191970] hover:bg-blue-700' : 'hover:bg-gray-700'}`}>

                < MemoryIcon className='mr-2'/>
                My Pods
              </span>
            </Link>
          </li>
          <li className='mb-3'>
            <Link href='/billing'>
                <span className='hover:bg-gray-700 p-2 rounded flex items-center'>
                    <AccountBalanceIcon className='mr-2' />
                    Billing
                </span>
                </Link>
          </li>
          <li className='mb-3'>
            <Link href='/settings'>
              <span className='hover:bg-gray-700 p-2 rounded  flex  items-center'>
                <SettingsIcon className='mr-2' />
                Settings and Profile
              </span>
            </Link>
          </li>
          
        </ul>
      </nav>
      
    </div>
  )
}

export default SidebarMyPods;
