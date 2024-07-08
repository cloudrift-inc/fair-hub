import Link from 'next/link'
import React from 'react'
import HomeIcon from '@mui/icons-material/Home'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import SettingsIcon from '@mui/icons-material/Settings'
import SupportRoundedIcon from '@mui/icons-material/SupportRounded';

const SidebarConsole: React.FC = () => {
  return (
    <div className='relative top-[88px] h-screen bg-[#1C1C1C] text-white text-xs p-4 border-r-1 border-[#292929] w-36 md:w-56 md:fixed md:text-left'>
      <nav>
        <ul>
          <li className='mb-3'>
            <Link href='/console'>
              <span className='bg-[#191970] hover:bg-blue-700 p-2 rounded flex items-center'>
                <HomeIcon className='mr-3' />
                Console
              </span>
            </Link>
          </li>
          <li className='mb-3'>
            <Link href='/transactions'>
              <span className='hover:bg-gray-700 p-2 rounded flex items-center'>
                <AccountBalanceIcon className='mr-2' />
                Billing
              </span>
            </Link>
          </li>
          <li className='mb-3'>
            <Link href='/settings'>
              <span className='hover:bg-gray-700 p-2 rounded flex items-center'>
                <SettingsIcon className='mr-2' />
                Settings and Profile
              </span>
            </Link>
          </li>
        </ul>
      </nav>
      {/* Move Customer Support link to the very bottom of the sidebar */}
      <div className='absolute bottom-0 mb-3 w-full'>
        <Link href="/support">
          <span className="hover:bg-gray-700 p-2 rounded flex items-center w-full justify-start">
            <SupportRoundedIcon className="mr-2" />
            Customer Support
          </span>
        </Link>
      </div>
    </div>
  )
}

export default SidebarConsole;
