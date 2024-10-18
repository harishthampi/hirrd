import Header from '@/components/header'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <div>
        <div className='grid-background'></div>
        <main className='min-h-screen container'>
            <Header />
            <Outlet /> {/* This is where the child routes will be rendered */}
        </main>
        <div className='p-10 text-center bg-gray-800 mt-10'> Made by Harish</div>
    </div>
  )
}

export default AppLayout
