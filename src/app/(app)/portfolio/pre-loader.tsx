import { TypeWriteText } from '@/app/components/type-write-text'

export default function PreLoader() {
  return (
    <div className="min-w-screen flex min-h-screen flex-col items-center justify-center">
      <TypeWriteText texts={['Activate HyperSpace', 'Put your seatbelt']} />
    </div>
  )
}
