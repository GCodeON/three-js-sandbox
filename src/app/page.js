'use client'
import Example from '@/components/example';
import Text3D from '@/components/text3D';

export default function Home() {
  return (
    <main className="home">
      <Example></Example>
      <Text3D display={'Gerardo Soto'} color={'red'}/>
    </main>
  )
}
