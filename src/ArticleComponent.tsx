import React from "react";
import { useNavigate } from "react-router-dom";

// definizione dell'interfaccia per un articolo
export interface Article {
  count: number;
  next: string;
  previous: null;
  results: Result[];
}

export interface Result {
  id: number;
  title: string;
  url: string;
  image_url: string;
  news_site: string;
  summary: string;
  published_at: string;
  updated_at: string;
  featured: boolean;
  launches: Launch[];
  // eslint-disable-next-line
  events: any[];
}

export interface Launch {
  launch_id: string;
  provider: string;
}

// componente per visualizzare un articolo nella lista
const ArticleComponent = function ({ result }: { result: Result }) {
  const navigate = useNavigate();
  const handleClick = (id: number) => {
    navigate("/" + id.toString());
  };

  return (
    <div onClick={() => handleClick(result.id)} role="button">
      <h2>{result.title}</h2>
      <p>{result.published_at}</p>
      <img src={result.image_url} alt={result.title} width="200px" />
    </div>
  );
};

export default ArticleComponent;
