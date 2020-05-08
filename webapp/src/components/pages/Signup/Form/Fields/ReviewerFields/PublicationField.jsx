import React from 'react'


export default class Publication extends React.Component {
  render() {
    let articleMark;
    if (this.props.article.is_valid) {
      articleMark = <img src={tick} className="articleMark" alt="tick" />;
    } else {
      articleMark = <img src={cross} className="articleMark" alt="cross" />;
    }
    return (
      <div>
        {articleMark}
        <h3>
          {this.props.article.title}
        </h3>
        <p>{this.props.article.journal_name} ({this.props.article.publication_year})</p>
        <ul>
          {this.props.article.author_list.map((value) => {return <li>{value}</li>})}
        </ul>
        <p>DOI: <a href={this.props.article.url} target="_blank">{this.props.article.doi}</a></p>
      </div>
    );
  }
}
