import React from "react";
import { Card, Row, Col } from "antd";
import { EditOutlined } from "@ant-design/icons";

const keys = {
  actors: "Actors",
  producer: "Producer",
  year_of_release: "Year of Release",
};

const MovieCard = ({ movieList, handleEdit }) => {
  return (
    <div className="movie-grids">
      <Row gutter={[10, 10]}>
        {movieList?.map((movie, index) => (
          <Col key={movie?.id} xs={24} sm={12} lg={6} xl={4} xxl={4}>
            <Card
              key={movie?.id || index}
              hoverable
              style={{
                backgroundColor: "#121212",
                color: "#fff",
                borderRadius: "10px",
                overflow: "hidden",
              }}
              cover={
                <img
                  alt={movie?.movie_name}
                  src={movie?.poster || ""}
                  style={{
                    height: 300,
                    objectFit: "cover",
                    borderRadius: "10px 10px 0 0",
                  }}
                />
              }
              actions={[
                <EditOutlined
                  key="edit"
                  onClick={() => handleEdit({ action: "edit", data: movie })}
                />,
              ]}
            >
              <div
                style={{
                  marginTop: 4,
                  fontSize: 16,
                  fontWeight: 600,
                  color: "#fff",
                }}
              >
                {movie?.movie_name}
              </div>
              <div style={{ gap: 6 }}>
                {["actors", "producer", "year_of_release"].map((list) => (
                  <p style={{ color: "#fff", fontWeight: 500 }}>
                    {keys[list]}:{" "}
                    {Array?.isArray(movie?.[list])
                      ? movie?.[list].join(",")
                      : movie?.[list]}
                  </p>
                ))}
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MovieCard;
