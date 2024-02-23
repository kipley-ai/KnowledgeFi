export const metadata = {
  title: "Users Tiles - Mosaic",
  description: "Page description",
};

import SearchForm from "@/components/search-form";
import TabCard from "../tab-card";
import PaginationNumeric from "@/components/pagination-numeric";

import Image01 from "@/public/images/user-64-01.jpg";
import Image02 from "@/public/images/user-64-02.jpg";
import Image03 from "@/public/images/user-64-03.jpg";
import Image04 from "@/public/images/user-64-04.jpg";
import Image05 from "@/public/images/user-64-05.jpg";
import Image06 from "@/public/images/user-64-06.jpg";
import Image07 from "@/public/images/user-64-07.jpg";
import Image08 from "@/public/images/user-64-08.jpg";
import Image09 from "@/public/images/user-64-09.jpg";
import Image10 from "@/public/images/user-64-10.jpg";
import Image11 from "@/public/images/user-64-11.jpg";
import Image12 from "@/public/images/user-64-12.jpg";

// import { useRouter } from 'next/navigation'
import { useUserDetail } from "@/hooks/api/user";

export default function UsersTiles() {
  const users = [
    {
      id: 0,
      name: "Dominik McNeail",
      image: Image01,
      link: "#0",
      location: "🇮🇹",
      content:
        "Fitness Fanatic, Design Enthusiast, Mentor, Meetup Organizer & PHP Lover.",
    },
    {
      id: 1,
      name: "Ivan Mesaros",
      image: Image02,
      link: "#0",
      location: "🇫🇷",
      content:
        "Fitness Fanatic, Design Enthusiast, Mentor, Meetup Organizer & PHP Lover.",
    },
    {
      id: 2,
      name: "Tisha Yanchev",
      image: Image03,
      link: "#0",
      location: "🇩🇪",
      content:
        "Fitness Fanatic, Design Enthusiast, Mentor, Meetup Organizer & PHP Lover.",
    },
    {
      id: 3,
      name: "Sergio Gonnelli",
      image: Image04,
      link: "#0",
      location: "🇮🇹",
      content:
        "Fitness Fanatic, Design Enthusiast, Mentor, Meetup Organizer & PHP Lover.",
    },
    {
      id: 4,
      name: "Jerzy Wierzy",
      image: Image05,
      link: "#0",
      location: "🇪🇸",
      content:
        "Fitness Fanatic, Design Enthusiast, Mentor, Meetup Organizer & PHP Lover.",
    },
    {
      id: 5,
      name: "Mirko Grubisic",
      image: Image06,
      link: "#0",
      location: "🇩🇪",
      content:
        "Fitness Fanatic, Design Enthusiast, Mentor, Meetup Organizer & PHP Lover.",
    },
    {
      id: 6,
      name: "Alisha Acharya",
      image: Image07,
      link: "#0",
      location: "🇬🇧",
      content:
        "Fitness Fanatic, Design Enthusiast, Mentor, Meetup Organizer & PHP Lover.",
    },
    {
      id: 7,
      name: "Brian Halligan",
      image: Image08,
      link: "#0",
      location: "🇺🇸",
      content:
        "Fitness Fanatic, Design Enthusiast, Mentor, Meetup Organizer & PHP Lover.",
    },
    {
      id: 8,
      name: "Patricia Semklo",
      image: Image09,
      link: "#0",
      location: "🇮🇳",
      content:
        "Fitness Fanatic, Design Enthusiast, Mentor, Meetup Organizer & PHP Lover.",
    },
    {
      id: 9,
      name: "Maria Martinez",
      image: Image10,
      link: "#0",
      location: "🇮🇹",
      content:
        "Fitness Fanatic, Design Enthusiast, Mentor, Meetup Organizer & PHP Lover.",
    },
    {
      id: 10,
      name: "Vedad Siljak",
      image: Image11,
      link: "#0",
      location: "🇨🇦",
      content:
        "Fitness Fanatic, Design Enthusiast, Mentor, Meetup Organizer & PHP Lover.",
    },
    {
      id: 11,
      name: "Dominik Lamakani",
      image: Image12,
      link: "#0",
      location: "🇧🇪",
      content:
        "Fitness Fanatic, Design Enthusiast, Mentor, Meetup Organizer & PHP Lover.",
    },
  ];

  return (
    <div className="mx-auto w-full max-w-[96rem] px-4 py-8 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="mb-8 sm:flex sm:items-center sm:justify-between">
        {/* Left: Title */}
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 md:text-3xl">
            Acme Inc. ✨
          </h1>
        </div>

        {/* Right: Actions */}
        <div className="grid grid-flow-col justify-start gap-2 sm:auto-cols-max sm:justify-end">
          {/* Search form */}
          <SearchForm />
          {/* Add member button */}
          <button className="btn bg-indigo-500 text-white hover:bg-indigo-600">
            <svg
              className="h-4 w-4 shrink-0 fill-current opacity-50"
              viewBox="0 0 16 16"
            >
              <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
            </svg>
            <span className="ml-2 hidden xs:block">Add Member</span>
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-12 gap-6">
        {users.map((user) => (
          <TabCard key={user.id} user={user} />
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8">
        <PaginationNumeric />
      </div>
    </div>
  );
}
