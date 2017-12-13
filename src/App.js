/* global google */
import React, { Component } from 'react';
import { Grid, Row, Col, Thumbnail, Jumbotron } from 'react-bootstrap';
import logo from './QuietStreets.png';
import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'
import './App.css';



class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      rating: '',
      website: '',
      url: ''
    }
  }
  componentDidMount() {
    let map = new google.maps.Map(document.getElementById("map"), {
      center: {lat:40.7575285, lng: -73.9884469}
    });
    var service = new google.maps.places.PlacesService(map);
    if(!this.props.placeId) {
      return;
    }
    service.getDetails({placeId: this.props.placeId},
      (place, status) => {
        this.setState(place);
      }
    )
  }
  render() {
    return (
      <Thumbnail src={this.props.photo_url} href={this.props.website || this.state.website}>
        <h3>{this.props.name || this.state.name}</h3>
        <h3>{this.props.range}</h3>
        <p>
          Language Arts: {this.props.grades[0]}%
        </p>
        <p>
          Mathematics: {this.props.grades[1]}%
        </p>
        <p>
          Science: {this.props.grades[2]}%
        </p>
        <p>
          {this.props.rating_provider} Reviews:
          <Rater interactive={false} rating={this.props.rating || this.state.rating} total={5}/>
        </p>
      </Thumbnail>
    )
  }
}

Review.defaultProps = {
  grades: [],
  rating_provider: "Google",
  range: "K-12"
}
class App extends Component {
  render() {
    return (
      <div className="App">

        <Jumbotron>
          <h1>Utah Online Schools!</h1>
          by <img src={logo} className="App-logo" alt="logo" />
        </Jumbotron>

        <p className="App-intro">
          Gathering helpful information in one place.
          Academic Proficiency information is from <a href="https://datagateway.schools.utah.gov/">2016-2017 USBOE Sage Test Results</a>
        </p>
        <Grid>
          <Row>
            <Col xs={6} md={4}>
              <Review placeId="ChIJQQf6dCiETYcRwCybJ-7XgzY" photo_url="mha.png" range="7-12" grades={[44,42,54]}/>
            </Col>
            <Col xs={6} md={4}>
              <Review placeId="ChIJ1S-iRcVEyoARWJoKWpoQQPY" name="Utah Online School" range="K-8" photo_url="uos.png" grades={[35,42,45]}/>
            </Col>
            <Col xs={6} md={4}>
              <Review placeId="ChIJ1S-iRcVEyoARWJoKWpoQQPY" name="Utah Online School" range="7-12" photo_url="uos.png" grades={['N<10', 35, 55]}/>
            </Col>
            <Col xs={6} md={4}>
              <Review placeId="ChIJN_mwIRSKUocRKwyuL1hQrlw" photo_url="UTVA.jpg" grades={[25, 21, 30]}/>
            </Col>
            <Col xs={6} md={4}>
              <Review name="Provo eSchool" rating_provider="Niche" website="https://provo.edu/eschool/" rating={4.5} photo_url="//provo.edu/wp-content/uploads/2017/05/eschool-logo.png" grades={[45, 41, 35]}/>
            </Col>
            <Col xs={6} md={4}>
              <Review placeId="ChIJeaRpLYT3UocRAIKqATycfYI" photo_url="uca.jpg" grades={[25, 18, 32]}/>
            </Col>
          </Row>
        </Grid>
        <p>

        </p>
      </div>
    );
  }
}

export default App;
