import React from 'react';
import ReactMarkdown from 'react-markdown';

export default function HeaderComp({ data }) {
  return (
    <div style={{ margin: '15px 0' }}>
      <h1>{data.Heading}</h1>
      <ReactMarkdown>{data.Description}</ReactMarkdown>
    </div>
  );
}
