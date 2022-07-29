import React, { Component } from 'react'
import './Style.css';

export default class NewsItem extends Component {

    render() {
        //    let {title,description}=this.props;
        return (
            <div className='my-3'>
                <div className="Card">
                    <div style={{display:'flex',justifyContent:'flex-end',position:'absolute'}}>
                         <span className='badge rounded-pill bg-danger'>{this.props.source}</span>
                    </div>
                   
                    <img src={this.props.imageurl ? this.props.imageurl : "https://images.livemint.com/img/2022/07/25/1140x641/US-SPACE-NASA-WEBB-ASTRONOMY-5_1658725765260_1658725765260_1658725786876_1658725786876.jpg"} className="card-img-top" alt="..." />
                    <div className="">
                        <h5 className="">{this.props.title}</h5>
                        <p className="">{this.props.description}</p>
                        <p className='card-text'><small className='text-muted'>By {this.props.author ? this.props.author : "Unknown"} on {new Date(this.props.date).toGMTString()}</small></p>
                        <a href={this.props.newsUrl} rel="noreferrer" target="_blank" className="button">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}
