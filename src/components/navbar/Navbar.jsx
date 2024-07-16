'use client'
import React from 'react'
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import Link from 'next/link'

const Navbar = () => {
  const router = useRouter();

  return (
    <div className="flex flex-row items-center justify-between px-4 py-4 bg-green-100">
      <div className="flex flex-row items-center">
        <Link href="/user/list"><p className="font-bold text-xl">adopt-a-pet</p></Link>
      </div>
      <div className="flex flex-row">
        <Button
          className="mx-4"
          onClick={ () => {
            router.push('/user/list')
          }}
        >
          User
        </Button>
        <Button
          className="mx-4"
          onClick={ () => {
            router.push('/admin')
          }}
        >
          Admin
        </Button>
      </div>
    </div>
  )
}

export default Navbar