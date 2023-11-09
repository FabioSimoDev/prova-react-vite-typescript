import { useEffect, useState } from "react";
// import ArticleComponent from "./ArticleComponent"; non lo uso più, devo spostare il jsx da qui a li.
import { Result } from "./ArticleComponent";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import format from "date-fns/format";
import { useNavigate } from "react-router-dom";

const HomePage = function () {
  const [articles, setArticles] = useState<Result[]>([]);
  const navigate = useNavigate();

  // funzione per recuperare gli articoli dalle API
  const fetchArticles = async () => {
    try {
      const response = await fetch(
        "https://api.spaceflightnewsapi.net/v4/articles"
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setArticles(data.results); // ora impostiamo direttamente l'array dei risultati
      } else {
        throw new Error("errore nella fetch");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  //da rimuovere, è per debug
  useEffect(() => {
    console.log(articles);
  }, [articles]);

  return (
    <Container>
      <Row className="justify-content-md-center py-4 main-row">
        {articles.length > 0 && (
          <Col
            xs={12}
            md={8}
            className="main-article text-start"
            role="button"
            onClick={() => navigate(`/${articles[0].id}`)}
          >
            <Card className="border-0">
              <Card.Img variant="top" src={articles[0].image_url} />
              <Card.Body className="ps-0">
                <Card.Title
                  className="fw-bold"
                  style={{ fontSize: "2rem", color: "black" }}
                >
                  {articles[0].title}
                </Card.Title>
                <small className="text-muted">
                  {format(Date.parse(articles[0].updated_at), "MM/dd/yyyy")}
                </small>
                <Card.Text>{articles[0].summary}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        )}
        <Col
          xs={12}
          md={4}
          className="side-articles"
          style={{ height: "100%" }}
        >
          <ListGroup className="border-0">
            {articles.slice(1).map((article, index) => (
              <ListGroup.Item key={index} className="border-0">
                <Card
                  className="d-flex flex-row border-0"
                  role="button"
                  onClick={() => navigate(`/${article.id}`)}
                >
                  <Col xs={5}>
                    <Card.Img
                      variant="top"
                      src={article.image_url}
                      className="rounded-0"
                    />
                  </Col>
                  <Col xs={7}>
                    {" "}
                    <Card.Body className="text-start p-0 text-truncate">
                      <small className="fw-semibold">{article.title}</small>
                      <Card.Text className="text-muted">
                        {format(Date.parse(article.updated_at), "MM/dd/yyyy")}
                      </Card.Text>
                    </Card.Body>
                  </Col>
                </Card>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
      {/* {articles.map((article) => (
        <ArticleComponent key={article.id} result={article} />
      ))} */}
    </Container>
  );
};

export default HomePage;
