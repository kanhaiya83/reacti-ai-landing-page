import React from "react";
import { articles } from "../../assets/sources/article";
import Article from "../../components/Article";
import "./blog.css";

const Blog = () => {
  return (
    <div className="blog">
      <div className="heading">
        <h1>Product in the news</h1>
        <button>Browse all news</button>
      </div>

      <div className="articles">
        {articles.map((article, index) => (
          <Article key={index} article={article} />
        ))}
      </div>
    </div>
  );
};

export default Blog;
