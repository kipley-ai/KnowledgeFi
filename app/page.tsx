"use client"
import { redirect, useSearchParams } from 'next/navigation'
import { useAccount } from 'wagmi';

export default function Home() {
  const { isConnected } = useAccount();
  const searchParams = useSearchParams();

  const nextUrl = searchParams.get("next") || "/dashboard";
  if (isConnected) {
    console.log(nextUrl)
    redirect(nextUrl);
  } else {
  return <>
  </>
  }
}
