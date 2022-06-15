import React from 'react';
import Img from './components/image/Image';
import Nav from './components/nav/Nav';
import Slider from './components/slider/Slider';
import Acc from './components/accordian/Acc';
import Footer from './components/footer/Footer';
import QuickLink from './components/quickLink/QuickLink';
import MyCards from './components/cards/MyCards';
import HeaderComp from './components/header-layout/HeaderComp';

export default function App() {
  return (
    <>
      <Nav />
      <br />
      <div className="my-container">
        <Img
          height="500px"
          source="https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1575&q=80"
        />
        <br />
        <br />
        <Slider />
        <br />
        <Acc />
        <br />
        <QuickLink />
        <br />
        <HeaderComp />
        <MyCards />
      </div>
      <br />
      <Footer />
    </>
  );
}
