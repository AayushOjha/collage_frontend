import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import HeaderComp from '../header-layout/HeaderComp';

function GridExample({ data }) {
  console.log(data);
  return (
    <>
      {data.Header ? <HeaderComp data={data.Header} /> : null}
      <Row xs={1} md={2} className="g-4">
        {data.Cards.map((item, index) => {
          return (
            <Col key={index}>
              <Card>
                <Card.Img
                  variant="top"
                  className="CardImage"
                  src={
                    process.env.REACT_APP_BASE + item.Image.data.attributes.url
                  }
                />
                <Card.Body>
                  <Card.Title>{item.Heading}</Card.Title>
                  <Card.Text>{item.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
  );
}

export default GridExample;
