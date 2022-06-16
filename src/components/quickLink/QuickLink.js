import React from 'react';
import HeaderComp from '../header-layout/HeaderComp';
import linkGenerator from '../linkGenerator';

export default function QuickLink({ data }) {
  console.log(data);
  return (
    <>
      {data.Header ? <HeaderComp data={data.Header} /> : null}
      <div className="container p-4">
        <div className="row">
          {data.Links.map((item, index) => {
            return (
              <div key={index} className="col-lg-3 col-md-6 mb-4 mb-md-0">
                <h5 className="text-uppercase">{item.Heading}</h5>

                <ul className="list-unstyled mb-0">
                  {item.card.map((card, index) => {
                    return (
                      <li key={index}>
                        <a
                          href={linkGenerator(card.Link)}
                          className="link-text"
                        >
                          {card.Name}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
