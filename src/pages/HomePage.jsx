import React from 'react'
import Homebanner from '../components/homecomponent/Homebanner'
import ExploreByStream from '../components/homecomponent/ExploreByStream'
import MedicalFieldsSection from '../components/homecomponent/MedicalFieldsSection'
import CtaSection from '../components/CtaSection'

const HomePage = () => {
  return (
    <div>
      <Homebanner/>
      <ExploreByStream/>
      <MedicalFieldsSection/>
      <CtaSection silent={true} />
    </div>
  )
}

export default HomePage
