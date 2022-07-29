import React, { Component } from 'react'
import NewsItem from './NewsItem'
import './Style.css';
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export default class News extends Component {
static defaultProps={
    country:'in',
    pageSize:8,
    category:'general'
}

static propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category: PropTypes.string,
}
   capitalizefirstLetter=(string)=>{
     return string.charAt(0).toUpperCase()+string.slice(1);
   }

    constructor(props) {
        super(props);
        console.log("constructor news component")

        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults:0

        };
       document.title=`${this.capitalizefirstLetter(this.props.category)} - DailyNewzz` ;
    }

    async updateNews(){
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2c0be36e8b8646c9893ffd108f7bd68d&pageSize=${this.props.pageSize}&page=${this.state.page}`
        this.setState({loading:true})
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json()
        this.props.setProgress(70);
        console.log(parsedData)
        this.setState({ articles: parsedData.articles,
                  totalResults:parsedData.totalResults,
                loading:false,
            })
            this.props.setProgress(100);

    }
    async componentDidMount() {
      this.updateNews();
    }  
 fetchMoreData=async()=>{
    this.setState({page:this.state.page+1})
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2c0be36e8b8646c9893ffd108f7bd68d&pageSize=${this.props.pageSize}&page=${this.state.page}`
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData)
    this.setState({ articles:this.state.articles.concat(parsedData.articles),
              totalResults:parsedData.totalResults,
        })
  }

    render() {
        return (
            <div style={{marginTop:'101px'}}>
                <h2 className="head">DailyNewzz - Top {this.capitalizefirstLetter(this.props.category)} Headlines</h2>
               {this.state.loading && <Spinner/>}

               <InfiniteScroll dataLength={this.state.articles.length} next={this.fetchMoreData} hasMore={this.state.articles.length !== this.state.totalResults} loader={<Spinner/>}>
                <div className="box">
                    {this.state.articles.map((element,index) => {
                        return <div style={{ width: "27rem" }} key={element.url}>
                            <NewsItem title={element.title ? element.title : ""} key={index} description={element.description ? element.description : ""} newsUrl={element.url} imageurl={element.urlToImage} author={element.author} date={element.publishedAt} source={element.source.name}/>
                        </div>

                    })}
                </div>
              
                </InfiniteScroll>

            </div>
        )
    }
}
