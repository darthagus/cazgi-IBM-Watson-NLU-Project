import './bootstrap.min.css';
import './App.css';
import EmotionTable from './EmotionTable.js';
import React from 'react';
import axios from 'axios';

class App extends React.Component {
  state = {innercomp:<textarea rows="4" cols="50" id="textinput"/>,
            mode: "text",
          sentimentOutput:[],
          sentiment:true
        }
  
  renderTextArea = ()=>{
    document.getElementById("textinput").value = "";
    if(this.state.mode === "url") {
      this.setState({innercomp:<textarea rows="4" cols="50" id="textinput"/>,
      mode: "text",
      sentimentOutput:[],
      sentiment:true
    })
    } 
  }

  renderTextBox = ()=>{
    document.getElementById("textinput").value = "";
    if(this.state.mode === "text") {
      this.setState({innercomp:<textarea rows="1" cols="50" id="textinput"/>,
      mode: "url",
      sentimentOutput:[],
      sentiment:true
    })
    }
  }

  sendForSentimentAnalysis = () => {
    this.setState({sentiment:true});
    let ret = "";
    let url = ".";

    if(this.state.mode === "url") {
      url = url+"/url/sentiment?url="+document.getElementById("textinput").value;
    } else {
      url = url+"/text/sentiment?text="+document.getElementById("textinput").value;
    }
    ret = axios.get(url);
    ret.then((response) => {
      /* console.log(response.data.result.entities); */
      //Include code here to check the sentiment and fomrat the data accordinglyd
      if (Array.isArray(response.data.result.entities) && response.data.result.entities.length) {
      /* this.setState({sentimentOutput:response.data.result.entities[0]}); */
      let result = JSON.stringify(response.data.result.entities[0]);
        var output;
        if (response.data.result.entities[0].sentiment.label === "positive") {
          output = <div style={{ color: "green", fontSize: 20 }}>{result}</div>
        } else if (response.data.result.entities[0].sentiment.label === "negative") {
          output = <div style={{ color: "red", fontSize: 20 }}>{result}</div>
        } else {
          output = <div style={{ color: "yellow", fontSize: 20 }}>{result}</div>
        }
        this.setState({ sentimentOutput: output });
      }
    });
  }

  sendForEmotionAnalysis = () => {
    this.setState({sentiment:false});
    let ret = "";
    let url = ".";
    if(this.state.mode === "url") {
      url = url+"/url/emotion?url="+document.getElementById("textinput").value;
    } else {
      url = url+"/text/emotion/?text="+document.getElementById("textinput").value;
    }
    ret = axios.get(url);

    ret.then((response) => {
      console.log(response.data.result.entities);
      if (Array.isArray(response.data.result.entities) && response.data.result.entities.length>0) {
        this.setState({ sentimentOutput: <EmotionTable emotions={response.data.result.entities[0].emotion} /> });
      } else {
        this.setState({ sentimentOutput: null})
      }
  });
  }
  

  render() {
    return (  
      <div className="App">
      <button className="btn btn-info" onClick={this.renderTextArea}>Text</button>
        <button className="btn btn-dark"  onClick={this.renderTextBox}>URL</button>
        <br/><br/>
        {this.state.innercomp}
        <br/>
        <button className="btn-primary" onClick={this.sendForSentimentAnalysis}>Analyze Sentiment</button>
        <button className="btn-primary" onClick={this.sendForEmotionAnalysis}>Analyze Emotion</button>
        <br/>
            {this.state.sentimentOutput}
      </div>
    );
    }
}

export default App;