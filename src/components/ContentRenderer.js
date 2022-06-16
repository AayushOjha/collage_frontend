import Img from '../components/image/Image';
import Slider from '../components/slider/Slider';
import Acc from '../components/accordian/Acc';
import QuickLink from '../components/quickLink/QuickLink';
import MyCards from '../components/cards/MyCards';
import HeaderComp from '../components/header-layout/HeaderComp';

export default function ContentRenderer({ data }) {
  return (
    <div className="my-container">
      {data.map((element, index) => {
        return (
          <div className="componentCointainer" key={index}>
            {getComponent(element)}
          </div>
        );
      })}
    </div>
  );
}

const getComponent = (component) => {
  let typeName = component.__typename;
  switch (typeName) {
    case 'ComponentGeneralOnlyText':
      return <HeaderComp data={component} />;
    case 'ComponentGeneralSimpleImage':
      return <Img data={component} />;
    case 'ComponentGeneralAccordion':
      return <Acc data={component} />;
    case 'ComponentGeneralCardSection':
      return <MyCards data={component} />;
    case 'ComponentGeneralQuickLink':
      return <QuickLink data={component} />;
    case 'ComponentGeneralSlider':
      return <Slider data={component} />;
    default:
      return <h1>Component No Found</h1>;
  }
};

/*
      <div>
        {
          //   <Nav />
          //   <br />
            //   <div className="my-container">
          //     <Img
          //       height="500px"
          //       source="https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1575&q=80"
          //     />
          //     <br />
          //     <br />
          //     <Slider />
          //     <br />
          //     <Acc />
          //     <br />
          //     <QuickLink />
          //     <br />
          //     <HeaderComp />
          //     <MyCards />
          //   </div>
          //   <br />
          //   <Footer />
        }
        <h1>{pageContent.length}</h1>
      </div>
*/
