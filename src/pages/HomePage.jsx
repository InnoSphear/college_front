import React from 'react'
import Homebanner from '../components/homecomponent/Homebanner'
import ExploreByStream from '../components/homecomponent/ExploreByStream'
import MedicalFieldsSection from '../components/homecomponent/MedicalFieldsSection'

const HomePage = () => {
  return (
    <div>
      <Homebanner/>
      <ExploreByStream/>
      <MedicalFieldsSection/>
    </div>
  )
}

export default HomePage
