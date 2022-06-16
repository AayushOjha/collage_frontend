import linkGenerator from '../linkGenerator';

export default function Footer({ data }) {
  return (
    <footer className="bg-dark text-center text-lg-start">
      <div
        className="text-center p-3 text-light"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
      >
        {data.CopyRight_Text}
        <a
          className="text-light m-2"
          href={linkGenerator(data.Brand_Link.Link)}
        >
          {data.Brand_Link.Name}
        </a>
      </div>
    </footer>
  );
}
