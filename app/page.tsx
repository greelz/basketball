'use client'
import Image from "next/image";
import React from "react";
import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import AdminSidebar from "./steveWork/components/admin/AdminSidebar";

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Admin', href: '/admin' },
]

export default function Home() {
  return (
    <AdminSidebar />
  )
};