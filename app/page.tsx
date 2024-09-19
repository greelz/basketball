'use client'
import Image from "next/image";
import React from "react";
import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Admin', href: '/admin' },
]

export default function Home() {
  return (
    <div className="">
      <div className="relative isolate px-6 pt-14 lg:px-8 ">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-white-600 ring-1 ring-gray-900/10 bg-white/50 hover:ring-gray-900/20 hover:bg-white/100 ">
              Time to hit the slab.{' '}
              <a href="/admin" className="font-semibold text-indigo-600">
                <span aria-hidden="true" className="absolute inset-0" />
                See Teams <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl ">
              Welcome to SlabStats.gov.co.ru
            </h1>
            <p className="mt-6 text-lg leading-8 text-white">
              if you can't take the heat, get out of the kitchen.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/admin"
                className="rounded-md bg-white/50 px-3.5 py-2.5 text-sm font-semibold  shadow-sm hover:bg-white/100 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Hit the courts
              </a>
              <a href="/admin" className="text-sm font-semibold leading-6 text-white hover:text-gray-800">
                Are you ready? <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>
    </div>
  );
}


interface IPlayerProps {
  name: string;
}
function Player(props: IPlayerProps) {
  return <div className="hover:bg-slate-100 player">{props.name}</div>;
}

interface ITeamProps {
  players: string[];
  teamId: number;
}
function Team(props: ITeamProps) {
  return (
    <div className="team" key={props.teamId}>
      {props.players.map((p, i) => (
        <Player name={p} key={p + i} />
      ))}
    </div>
  );
}
