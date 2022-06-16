import HeaderComp from '../header-layout/HeaderComp';
export default function Img({ data }) {
  return (
    <>
      {data.Header ? <HeaderComp data={data.Header} /> : null}
      <img
        src={process.env.REACT_APP_BASE + data.Image.data.attributes.url}
        style={{
          width: '100%',
          height: `${data.Height}px`,
          borderRadius: '20px',
          objectFit: 'cover',
        }}
        alt="alt text"
      />
    </>
  );
}
