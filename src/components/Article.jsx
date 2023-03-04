import React from "react";
import { HiOutlineArrowLongRight } from "react-icons/hi2";

const Article = ({ article }) => {
  return (
    <div className="article">
      <img src={article.img} alt="article" />
      <h1>{article.title}</h1>
      <p>{article.body}</p>

      <div className="more">
        <p>February 8, 2023</p>
        <a href="#about">
          Read more <HiOutlineArrowLongRight />
        </a>
      </div>
    </div>
  );
};

export default Article;
