export default function Img({ height, source }) {
  return (
    <img
      src={source}
      style={{
        width: '100%',
        height: `${height}`,
        borderRadius: '20px',
        objectFit: 'cover',
      }}
      alt="alt text"
    />
  );
}
