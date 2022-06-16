import { useState, useEffect } from 'react';
import Nav from './components/nav/Nav';
import Footer from './components/footer/Footer';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { BallTriangle } from 'react-loader-spinner';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import ContentRenderer from './components/ContentRenderer';

export default function App() {
  const domain = window.location.hostname;
  const [loading, setloading] = useState(true);
  const [errorFlag, setErrorFlag] = useState(null);
  const [pageContent, setpageContent] = useState(null);
  const [navData, setnavData] = useState(null);
  const [footData, setfootData] = useState(null);

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
                NavBar{
                  Brand_Name
                  Nav_Items{
                    Name
                    Link
                  }
                }
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
                          Header{
                            Heading
                            Description
                          }
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
                Footer{
                  Brand_Link{
                    Name
                    Link
                  }
                  CopyRight_Text
                }
              }
            }
          }
        }        
        `,
      },
    })
      .then((response) => {
        setpageContent(
          response.data.data.website.data.attributes.home_page.data.attributes
            .Page_Content
        );
        setnavData(response.data.data.website.data.attributes.NavBar);
        setfootData(response.data.data.website.data.attributes.Footer);
        setloading(false);
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
      <BrowserRouter>
        <Nav data={navData} />
        <Routes>
          <Route path="/" element={<ContentRenderer data={pageContent} />} />
          <Route path="/sl" element={<ContentRenderer />} />
        </Routes>
        <Footer data={footData} />
      </BrowserRouter>
    );
  }
}
