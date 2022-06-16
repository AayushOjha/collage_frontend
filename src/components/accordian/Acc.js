import Accordion from 'react-bootstrap/Accordion';
import HeaderComp from '../header-layout/HeaderComp';

function AllCollapseExample({ data }) {
  return (
    <>
      {data.Header ? <HeaderComp data={data.Header} /> : null}
      <Accordion>
        {data.record.map((item, index) => {
          return (
            <Accordion.Item eventKey={index} key={index}>
              <Accordion.Header>{item.Heading}</Accordion.Header>
              <Accordion.Body>{item.Description}</Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </>
  );
}

export default AllCollapseExample;
