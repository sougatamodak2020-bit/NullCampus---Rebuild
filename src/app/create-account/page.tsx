// Force dynamic rendering for Supabase
export const dynamic = 'force-dynamic'
export const revalidate = 0

import lazyLoad from 'next/dynamic'
import { Loader2 } from 'lucide-react'

const CreateAccountForm = lazyLoad(() => import('./CreateAccountForm'), {
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
    </div>
  ),
  ssr: false,
})

export default function CreateAccountPage() {
  return <CreateAccountForm />
}
