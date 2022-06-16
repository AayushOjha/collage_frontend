import { useState, useEffect } from 'react';
import Img from './components/image/Image';
import Nav from './components/nav/Nav';
import Slider from './components/slider/Slider';
import Acc from './components/accordian/Acc';
import Footer from './components/footer/Footer';
import QuickLink from './components/quickLink/QuickLink';
import MyCards from './components/cards/MyCards';
import HeaderComp from './components/header-layout/HeaderComp';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { BallTriangle } from 'react-loader-spinner';
import axios from 'axios';

export default function App() {
  const domain = window.location.hostname;
  const [loading, setloading] = useState(true);
  const [errorFlag, setErrorFlag] = useState(null);

  useEffect(() => {
    getWebsiteId(domain);
  }, []);

  const getWebsiteId = (domain) => {
    axios
      .get(
        `${process.env.REACT_APP_STRAPI_REST_ENDPOINT}websites?filters[domain][$eq]=${domain}`
      )
      .then((response) => {
        if (response.data.data.length != 1) {
          setErrorFlag('Please do proper DNS entries.');
        } else {
          let id = response.data.data[0].id;
          getHomePage(id);
        }
      })
      .catch((error) => {
        setErrorFlag('Network Issue, try again!!');
        console.log(error.message);
      });
  };

  const getHomePage = (id) => {
    axios({
      url: `${process.env.REACT_APP_STRAPI_GRAPHQL_ENDPOINT}`,
      method: 'post',
      data: {
        query: `
        {
          website(id:${id}) {
            data {
              attributes {
                domain
                home_page {
                  data {
                    attributes {
                      Page_Content {
                        ... on ComponentGeneralOnlyText {
                          __typename
                          Heading
                          Description
                        }
                        ... on ComponentGeneralSlider {
                          __typename
                          sliderCard:Cards {
                            Heading
                            description
                            Image {
                              data {
                                attributes {
                                  url
                                }
                              }
                            }
                          }
                        }
                        ... on ComponentGeneralAccordion {
                          __typename
                          Header {
                            Heading
                            Description
                          }
                          record {
                            Heading
                            Description
                          }
                        }
                        ... on ComponentGeneralQuickLink {
                          __typename
                          Header {
                            Heading
                            Description
                          }
                          Links {
                            Heading
                            card {
                              Link
                              Name
                            }
                          }
                        }
                        ... on ComponentGeneralCardSection {
                          __typename
                          Header {
                            Heading
                            Description
                          }
                          Cards {
                            Heading
                            description
                            Image {
                              data {
                                attributes {
                                  url
                                }
                              }
                            }
                          }
                        }
                        ... on ComponentGeneralSimpleImage {
                          __typename
                          Height
                          Image {
                            data {
                              attributes {
                                url
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }        
        `,
      },
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  if (errorFlag != null) {
    return (
      <div className="LoaderCointainer">
        <h1>{errorFlag}</h1>
      </div>
    );
  } else if (loading) {
    return (
      <div className="LoaderCointainer">
        <BallTriangle color="#00BFFF" height={80} width={80} />
      </div>
    );
  } else {
    return (
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
      </div>
    );
  }
}
