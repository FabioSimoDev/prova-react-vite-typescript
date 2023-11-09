/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";

//pensavo avesse senso  ma non ha senso, potevo usare l'interface results che è uguale :)
export interface ArticleFromId {
  id: number;
  title: string;
  url: string;
  image_url: string;
  news_site: string;
  summary: string;
  published_at: Date;
  updated_at: Date;
  featured: boolean;
  launches: any[];
  events: any[];
}

const Details = function () {
  const articleId = useParams<string>().id;
  const [article, setArticle] = useState<ArticleFromId>();

  const fetchArticles = async () => {
    try {
      const response = await fetch(
        `https://api.spaceflightnewsapi.net/v4/articles/${articleId}/`
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setArticle(data);
      } else {
        throw new Error("errore nella fetch");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container>
      <Row className="align-items-start my-5">
        {/* Left Column for Article */}
        <Col
          md={8}
          className="text-start"
          role="button"
          onClick={() => location.assign(`${article?.url}`)}
        >
          <h1>{article?.title}</h1>
          <p className="text-muted">By {article?.news_site}</p>
          <img
            src={article?.image_url}
            alt="Starlab Space Station"
            className="img-fluid mb-3 w-100"
          />
          <p className="text-muted">Credit: {article?.news_site}</p>
          <p>{article?.summary}</p>
        </Col>

        {/* Right Column for Subscription Form */}
        <Col md={4}>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Subscribe to the newsletter</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
              Subscribe
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Details;
