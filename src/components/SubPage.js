import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BallTriangle } from 'react-loader-spinner';
import axios from 'axios';
import ContentRenderer from './ContentRenderer';

export default function SubPage({ list }) {
  const [isAvailable, setisAvailable] = useState(false);
  const [subPageId, setsubPageId] = useState(null);
  const [loading, setloading] = useState(true);

  // getting the route name
  const params = useParams();
  const { routeName } = params;

  useEffect(() => {
    // check if page is legitimate
    list.forEach((element) => {
      if (element.attributes.Route == routeName) {
        setsubPageId(element.id);
        setisAvailable(true);
      }
    });
    setloading(false);
  }, []);

  if (loading) {
    return (
      <div className="LoaderCointainer">
        <BallTriangle color="#00BFFF" height={80} width={80} />
      </div>
    );
  }
  if (isAvailable) {
    return <PageBody pageId={subPageId} />;
  }
  return <h1 style={{ margin: '40vh 20vw' }}>404 Page Not Available</h1>;
}

const PageBody = ({ pageId }) => {
  const [loading, setloading] = useState(true);
  const [content, setcontent] = useState(null);
  useState(() => {
    axios({
      url: `${process.env.REACT_APP_STRAPI_GRAPHQL_ENDPOINT}`,
      method: 'post',
      data: {
        query: `
        {
          subPage(id: ${pageId}) {
            data {
              attributes {
                Content {
                  ... on ComponentGeneralOnlyText {
                    __typename
                    Heading
                    Description
                  }
                  ... on ComponentGeneralSlider {
                    __typename
                    sliderCard: Cards {
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
                    Header {
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
        }        
        `,
      },
    })
      .then((response) => {
        setcontent(response.data.data.subPage.data.attributes.Content);
        setloading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  if (loading) {
    return (
      <div className="LoaderCointainer">
        <BallTriangle color="#00BFFF" height={80} width={80} />
      </div>
    );
  }
  return <ContentRenderer data={content} />;
};
