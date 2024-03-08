import React, { Component, useContext } from "react";
import NewsItem from "./NewsItem";
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


//REACT LIFECYCEL --> series of event startimg from mounting of react component to its unmounting
//  1. Mount --> birth of component
//  2.Unmount -->death of component
//  3. Update --> growth of component
//a. Render() --> # Used to render html components in react
//                # It is required for class based component to render DOM
//                # It  runs during mounting and updating component
//                # We cannot modify state inside render method
//b. componentDidMount() -->   # This method is run after render()
//                       --->   # Isme hum data fetch wagera krte hai like API s , state bhi set kr skte hai
//c. componentDidUpdate() --->  # This method run as soon as some updation is done in DOM (Jaise state change hori , new props aare hai)
//d. componentWillUnmount()---> # This method is called just before unmounting or component destruction.

//Hum state use krte hai jab hume kuch baar baar change krna hota hai bina page reload kiye like BG color
//props hum tb use krte hai jab hum koi cheez bhejte hai and vo change nhi krni hoti like title 
//ComponentDidMount() method jo React code ko execute krta hai jb component already DOM mai placed hai


//INFINITE LOOP --> npm pacakage
//TOP LOAD BAR  --> npm package


//ENVIROMENT VARIABLES --> 1. Thses variables are used to manage sensitive data
//                     -->2. These variables are kept in .env.local file
//                     -->3. they are excessed by process.env.API_KEY  (API_KEY="dfghj456rtbvcxds")-->.env.local file


//HOOKS --> 1. Feautres of class based components can be used in function based component with the help of hooks
//      -->2 . Class LifeCycle methods can be used without creating class 
//       --> 3. useState --> used to change the state or initialize state
//              useEffect --> used in place of componentDidUpdate();
//              useContext
//               useRef

export default class News extends Component{
    //Prop Types and Default props are also there in class based component
    static defaultProps={
       country:"in",
       pageSize:10,
       category:"general"
    }

    static propTypes={
      country:PropTypes.string,
      pageSize:PropTypes.number
    }

    constructor(props) {
      super(props);
      this.state = {
          articles: [], // Initialize articles as an empty array
          loading: true, //initially loading false rakhna hai
          page:2,
          totalResults:0  //by default total results is 0
      };
      document.title=`HeadLineHub - ${this.capatilizeFirstLetter(this.props.category)}`;
  }

  capatilizeFirstLetter=(string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1);
  }

  async updateNews(){
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e061a8fb88fa492095644bf9a19fff96&page=1&pageSize=${this.props.pageSize}`;
      // jab bhi API ki fetch request jayegi loading true kr denge and spinner show karenge ....in every case
      try{
      this.setState({loading:true})
      this.props.setProgress(30);
      let data = await fetch(url);
      let parseData = await data.json();
      this.props.setProgress(60);
      // Baad m firse loading ko false kr denge
      this.setState({ articles: parseData.articles ,
                      totalResults:parseData.totalResults ,
                      loading:false});

      console.log(parseData.totalResults);
      }catch(err){
        console.log("Error in fetching",err);
        this.setState({loading:false});
      }

      this.props.setProgress(100);
  }
  
    async componentDidMount() {
      this.updateNews();
  }

  
   

    //PREVCLICK
    //  handlePrevClick=async()=>{
    //  console.log("Previous is clicked....")
    //  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e061a8fb88fa492095644bf9a19fff96&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    //  this.setState({loading:true});
    //  let data = await fetch(url);
    //  let parseData = await data.json();
     

    //  this.setState({
    //    page:this.state.page-1,
    //    articles: parseData.articles,
    //    loading:false
    //  })
    // }


    //  //NEXTCLICK
    //  handleNextClick=async()=>{
    //   //Agr hum jis next page par jana chahte hai and vo exist he nhi krta to do nothing else redirect to next page
      
    //   //totalResults --> total no. of articles in API
    //   //${this.props.pageSize} --> pageSize ek page pr kitne articles display honge
      
    
    //   console.log("Next is clicked....")
      
    //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e061a8fb88fa492095644bf9a19fff96&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    //   this.setState({loading:true});
    //   let data = await fetch(url);
    //   let parseData = await data.json();
      

    //   this.setState({
    //     page:this.state.page+1,
    //     articles: parseData.articles,
    //     loading:false
    //   })
       
    //  }

    

    //FETCHMORE FUNCTION
    fetchMoreData = async() => {
      this.setState({page:this.state.page+1})
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e061a8fb88fa492095644bf9a19fff96&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      // jab bhi API ki fetch request jayegi loading true kr denge and spinner show karenge ....in every case
      try{
     
      let data = await fetch(url);
      let parseData = await data.json();

      // Baad m firse loading ko false kr denge
      //articles mai aur articles concatinate karre hai hum
      this.setState({ articles: this.state.articles.concat(parseData.articles) ,
                      totalResults:parseData.totalResults ,
                      loading:false});

      console.log(parseData.totalResults);
      }catch(err){
        console.log("Error in fetching",err);
        this.setState({loading:false});
      }
      
    };


    render(){
         return(
            

            <>
                <h2 className="text-center " style={{margin:'40px 0px'}}>HeadLineHub - Top {this.capatilizeFirstLetter(this.props.category)} HeadLines </h2>
                
                 {/* PREVIOUS NEXT BUTTON */}

                {/* jab this.state.loading==true ho tab spinner ko dikha do */}
                {this.state.loading && <Spinner/>}
                 {/* agr this.state.loading false hai tabhi items ko show krro page pr warna spinner ko show krro */}
                    {/* {!this.state.loading && this.state.articles.map((item)=>{
                        return  <div className="col-md-4" key={item.url}>
                        <NewsItem  title={item.title} description={item.description} imageUrl={item.urlToImage}  newsUrl={item.url} author={item.author} date={item.publishedAt} source={item.source.name}/>
                     </div>

                    })} */}
                  
                
                {/* INFINITE SCROLL */}

                <InfiniteScroll
                dataLength={this.state.articles.length}
                next={this.fetchMoreData}
                hasMore={this.state.articles.length!==this.state.totalResults}
                loader={<Spinner/>}
                >
                 

                <div className="container">

                <div className="row">          
                    { this.state.articles.map((item)=>{
                        return  <div className="col-md-4" key={item.url}>
                        <NewsItem  title={item.title} description={item.description} imageUrl={item.urlToImage}  newsUrl={item.url} author={item.author} date={item.publishedAt} source={item.source.name}/>
                     </div>

                    })}

                    
              
              </div>
              </div>
              </InfiniteScroll>
                

              {/* PREVIOUS NEXT BUTTON */}

              {/* <div className="container d-flex justify-content-between">
              <button disabled={this.state.page<=1} type="button" className="btn btn-danger" onClick={this.handlePrevClick}>&larr; Previous</button>
              <button  disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-danger" onClick={this.handleNextClick}>Next &rarr;</button>
              </div> */}
            
            </>
        )
    }
}