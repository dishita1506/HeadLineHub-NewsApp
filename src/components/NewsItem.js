import React, { Component } from "react";

// constructor banakr super ko call krna hoga warna error aayega
// jab bhi koi class ka object create hota hai tb contructor call hota  hai
// parent class k constructor ko ya kisi method ko call krne k liye we use super keyword
export default class NewsItem extends Component {
    // constructor(){
    //     super();
    //     console.log("Hey i am a constructor....");
    // }
    render() {
        let { title, description, imageUrl, newsUrl, author, date, source } =
            this.props;
        return (
            <div className="my-3 container">
                <div className="card">
                    <div style={{display:'flex',justifyContent:'flex-end',position:'absolute',right:'0'}}>
                    <span className=" badge rounded-pill bg-danger">
                        {source}
                    </span>
                    </div>
                    <img
                        src={
                            imageUrl ? imageUrl : "https://source.unsplash.com/user/wsanter"
                        }
                    ></img>
                    <div className="card-body">
                        <h5 className="card-title">{title}.....</h5>
                        <p className="card-text">{description}.....</p>
                        <p className="card-text" style={{fontStyle:'italic',backgroundColor:'#e9ecef'}}>
                            <small className="text-body-secondary">
                                by {author ? author : "Anonymous"} on{" "}
                                {new Date(date).toGMTString()}
                            </small>
                        </p>
                        <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark">
                            Read More
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}
