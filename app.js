/** @jsx React.DOM  */

var data = {
   "query": {
      "count":1,
      "created":"2014-10-29T18:32:26Z",
      "lang":"en-US",
      "results": {
         "channel": {
            "item": {
               "title":"Conditions for McLean, VA at 1:50 pm EDT",
               "lat":"38.94",
               "long":"-77.18",
               "link":"http://us.rd.yahoo.com/dailynews/rss/weather/McLean__VA/*http://weather.yahoo.com/forecast/USVA0485_f.html",
               "pubDate":"Wed, 29 Oct 2014 1:50 pm EDT",
               "condition": {
                  "code":"11",
                  "date":"Wed, 29 Oct 2014 1:50 pm EDT",
                  "temp":"61",
                  "text":"Light Rain"
               },
               "description":"\n<img src=\"http://l.yimg.com/a/i/us/we/52/11.gif\"/><br />\n<b>Current Conditions:</b><br />\nLight Rain, 61 F<BR />\n<BR /><b>Forecast:</b><BR />\nWed - Showers. High: 59 Low: 43<br />\nThu - Mostly Sunny. High: 59 Low: 39<br />\nFri - Partly Cloudy. High: 59 Low: 43<br />\nSat - Rain. High: 50 Low: 37<br />\nSun - Partly Cloudy/Wind. High: 51 Low: 33<br />\n<br />\n<a href=\"http://us.rd.yahoo.com/dailynews/rss/weather/McLean__VA/*http://weather.yahoo.com/forecast/USVA0485_f.html\">Full Forecast at Yahoo! Weather</a><BR/><BR/>\n(provided by <a href=\"http://www.weather.com\" >The Weather Channel</a>)<br/>\n",
               "forecast": [
                  {
                     "code":"11",
                     "date":"29 Oct 2014",
                     "day":"Wed",
                     "high":"59",
                     "low":"43",
                     "text":"Showers"
                  },
                  {
                     "code":"34",
                     "date":"30 Oct 2014",
                     "day":"Thu",
                     "high":"59",
                     "low":"39",
                     "text":"Mostly Sunny"
                  },
                  {
                     "code":"30",
                     "date":"31 Oct 2014",
                     "day":"Fri",
                     "high":"59",
                     "low":"43",
                     "text":"Partly Cloudy"
                  },
                  {
                     "code":"12",
                     "date":"1 Nov 2014",
                     "day":"Sat",
                     "high":"50",
                     "low":"37",
                     "text":"Rain"
                  },
                  {
                     "code":"24",
                     "date":"2 Nov 2014",
                     "day":"Sun",
                     "high":"51",
                     "low":"33",
                     "text":"Partly Cloudy/Wind"
                  }
               ],
               "guid": {
                  "isPermaLink":"false",
                  "content":"USVA0485_2014_11_02_8_00_EDT"
               }
            }
         }
      }
   }
};

var WeatherWidget = React.createClass({
   render: function() {
      // rounded corner box with shadows
      var widgetStyle = {
         border: '1px solid lightgray',
         boxShadow: '6px 6px 3px gray',
         width:'310px',height:'160px',
         padding: '5px',
         //marginLeft: 'auto', marginRight: 'auto',
         margin: 'auto',
         position: 'absolute',
         top: '0', left: '0', bottom: '0', right: '0'
         //position: 'relative',
         //top: '50%',
         //-webkit-transform: 'translateY(-50%)',
         //-ms-transform: translateY(-50%);
         //transform: 'translateY(-50%)'
      };
      return (
         <div className="table table-curved" style={widgetStyle}>
            <div className="row"><div className="col-md-12"><Location data={this.props.data.title} /></div></div>
            <div className="row">
               <div className="col-md-4"><CurrentTemp data={this.props.data.condition} /></div>
               <div className="col-md-8"><WeatherIcon imageCode={this.props.data.condition.code} text={this.props.data.condition.text} /></div>
            </div>
            <div className="row"><Forecast data={this.props.data.forecast} /></div>
         </div>
      );
   }
});

var Location = React.createClass({
   render: function() {
      var locationStyle = {
         fontSize: '10pt'
      }
      var rawLocation = this.props.data;
      rawLocation = rawLocation.split(' ');
      var city = rawLocation[2] + ' ' + rawLocation[3];
      return <span style={locationStyle}>{city}</span>
   }
});

var CurrentTemp = React.createClass({
   render: function() {
      var tempStyle = {
         fontSize: '48pt'
      }
      return <span style={tempStyle}>{this.props.data.temp}&deg;</span>
   }
});

var WeatherIcon = React.createClass({
   render: function() {
      var imageUrl = "http://l.yimg.com/a/i/us/we/52/" + this.props.imageCode + ".gif";
      var textStyle = {
         fontSize: '8pt'
      }
      var imageDimensions = {
         height: '50px', width: '50px',
         paddingTop: '5px'
      }
      return <span style={textStyle}><img src={imageUrl} style={imageDimensions} /><br/>{this.props.text}</span>
   }
});

var Forecast = React.createClass({
   render: function() {
      var rows = [];
      var forecastStyle = {
        paddingLeft: '50px'
      };
      this.props.data.forEach(function (dayForecast) {
         rows.push(<DayForecast data={dayForecast} />);
      })
      return (<div className="row" style={forecastStyle}>{rows}</div>);
   }
});

var DayForecast = React.createClass({
   render: function() {
      var highLow = {
         fontSize: '8pt'
      }
      return <div className="col-x-sm-2 forecast">
            {this.props.data.day}<br/>
            <span style={highLow}>{this.props.data.high}&deg; / {this.props.data.low}&deg;</span>
         </div>
   }
});

var req = new XMLHttpRequest();
req.open('GET', 'http://query.yahooapis.com/v1/public/yql?q=select%20item%20from%20weather.forecast%20where%20location%3D%2222102%22&format=json', true);

req.onload = function(e) {
   if (e.target.response.length > 0) {
      var result = JSON.parse(e.target.response);
      if (result) {
         React.render(
            <WeatherWidget data={result.query.results.channel.item} />,
            document.body
         );
      }
   }
};

req.send();



