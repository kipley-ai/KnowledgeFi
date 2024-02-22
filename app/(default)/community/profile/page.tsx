export const metadata = {
  title: 'Profile - Mosaic',
  description: 'Page description',
}

import { FlyoutProvider } from '@/app/flyout-context'
import ProfileSidebar from './profile-sidebar'
import ProfileBody from './profile-body'

import { useRouter } from 'next/router'
import { useUserDetail } from '@/hooks/api/user'

function ProfileContent() {
  const router = useRouter();

  const { data: userDetail } = useUserDetail();

  const onboarding = userDetail?.data.data.onboarding;
  if (!onboarding) {
    router.push("/onboarding");
  }

  return (
    <div className="relative flex">

      {/* Profile sidebar */}
      <ProfileSidebar />

      {/* Profile body */}
      <ProfileBody />

    </div>
  )
}

export default function Profile() {
  return (
    <FlyoutProvider>
      <ProfileContent />
    </FlyoutProvider>
  )
}