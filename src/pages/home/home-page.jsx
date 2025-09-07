import React from 'react'
import LandingPage from './components/middle-page'
// import ShopNow from './components/shop-now'
import AboutUs from './components/about-us'
import Footer from './components/footer-sec'

export default function HomePage() {
  return (
    <>
      <LandingPage />
      {/* <ShopNow /> */}
      <AboutUs />
      <Footer />
    </>
  )
};