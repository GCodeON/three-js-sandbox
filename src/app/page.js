'use client'
import Example from '@/components/example';
import Carousel3D from '@/components/carousel3d';

const list = [
  {
    src: '/sites/aocs.png',
    caption: 'aocs'
  },
  {
    src: '/sites/hustle.png',
    caption: 'hustle'
  },
  {
    src: '/sites/methfree.png',
    caption: 'methfree'
  },
  {
    src: '/sites/rescue.png',
    caption: 'rescue'
  },
  {
    src: '/sites/sta.png',
    caption: 'sta'
  },
  {
    src: '/sites/up2sd.png',
    caption: 'up2sd'
  },
  {
    src: '/sites/yahlok.png',
    caption: 'yahlok'
  }
]

export default function Home() {
  return (
    <main className="home">
      <Carousel3D 
        imageList={list} 
        radius={200} 
        width={150} 
        height={100}
      />
      {/* <Example/>
      <Text3D display={'Gerardo Soto'} color={'red'}/> */}
    </main>
  )
}
