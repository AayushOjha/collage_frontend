import Carousel from 'react-bootstrap/Carousel';

function IndividualIntervalsExample({ data }) {
  return (
    <Carousel>
      {data.sliderCard.map((item, index) => {
        return (
          <Carousel.Item key={index} interval={1000}>
            <img
              className="d-block w-100"
              src={process.env.REACT_APP_BASE + item.Image.data.attributes.url}
              alt="Slider"
            />
            <Carousel.Caption>
              <h3>{item.Heading}</h3>
              <p>{item.Description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}

export default IndividualIntervalsExample;
