import React from 'react';
import { Form, FormInput, FormGroup, Card, CardBody, CardTitle, Progress } from "shards-react";

import {
    Table,
    Pagination,
    Select,
    Row,
    Col,
    Divider,
    Slider,
    Rate,
    Button,
    Radio,
    Menu,
    Cascader,
    BackTop
} from 'antd'
import { StarOutlined, FireOutlined } from '@ant-design/icons';
import { RadarChart } from 'react-vis';
import { format } from 'd3-format';




import MenuBar from '../components/MenuBar';
import { getAllRestaurants, getRestaurantSearch, getRestaurant } from '../fetcher'
const wideFormat = format('.3r');

const datasource1 = [
  {
    business_id: '1',
    name: 'Mike\'s Grill',
    city: 'Portland',
    State: 'OR',
    stars: 5,
    review_count: 10,
    categories: 'American, Mexican',
    RestaurantsPriceRange2: 2,
    photo_id:'__0nof27AJTcA_es7-1PCw'
  },
  {
    business_id: '2',
    name: 'John\'s Sushi',
    city: 'Boston',
    State: 'MA',
    stars: 4,
    review_count: 100,
    categories: 'Japanese',
    RestaurantsPriceRange2: 4,
    photo_id:'__0nof27AJTcA_es7-1PCw'
  },
];

const priceOptions = [
  {label: '$', value: '1'},
  {label: '$$', value: '2'},
  {label: '$$$', value: '3'},
  {label: '$$$$', value: '4'},
]

const locationOptions = [
  {value:'MA',
    label:'Massachusetts',
    children: [
      {value: 'Allston', label:'Allston'},
      {value: 'Andover', label:'Andover'},
      {value: 'Arling-n', label:'Arling-n'},
      {value: 'Arlington', label:'Arlington'},
      {value: 'Ashland', label:'Ashland'},
      {value: 'Auburndale', label:'Auburndale'},
      {value: 'Avon', label:'Avon'},
      {value: 'Back Bay', label:'Back Bay'},
      {value: 'Beacon Hill', label:'Beacon Hill'},
      {value: 'Bedford', label:'Bedford'},
      {value: 'Belmont', label:'Belmont'},
      {value: 'Beverly', label:'Beverly'},
      {value: 'Billerica', label:'Billerica'},
      {value: 'Boston', label:'Boston'},
      {value: 'Boston-Fenway', label:'Boston-Fenway'},
      {value: 'Boston-Winthrop', label:'Boston-Winthrop'},
      {value: 'BRA', label:'BRA'},
      {value: 'Braintee', label:'Braintee'},
      {value: 'Braintree', label:'Braintree'},
      {value: 'Braintree ', label:'Braintree '},
      {value: 'Braintree Ma', label:'Braintree Ma'},
      {value: 'Brighton', label:'Brighton'},
      {value: 'Brockton', label:'Brockton'},
      {value: 'Brookline', label:'Brookline'},
      {value: 'Burlington', label:'Burlington'},
      {value: 'Cambridge', label:'Cambridge'},
      {value: 'Canton', label:'Canton'},
      {value: 'Carlisle', label:'Carlisle'},
      {value: 'Charlestown', label:'Charlestown'},
      {value: 'Chelsea', label:'Chelsea'},
      {value: 'Chestnut Hill', label:'Chestnut Hill'},
      {value: 'Chestnut Hills', label:'Chestnut Hills'},
      {value: 'Cohasset', label:'Cohasset'},
      {value: 'Concord', label:'Concord'},
      {value: 'Danvers', label:'Danvers'},
      {value: 'Dedham', label:'Dedham'},
      {value: 'Dorchester', label:'Dorchester'},
      {value: 'Dorchester Center', label:'Dorchester Center'},
      {value: 'Dover', label:'Dover'},
      {value: 'E Boston', label:'E Boston'},
      {value: 'E. Boston', label:'E. Boston'},
      {value: 'EAST  Boston', label:'EAST  Boston'},
      {value: 'East Boston', label:'East Boston'},
      {value: 'East Walpole', label:'East Walpole'},
      {value: 'East Watertown', label:'East Watertown'},
      {value: 'East Weymouth', label:'East Weymouth'},
      {value: 'Everett', label:'Everett'},
      {value: 'Framingham', label:'Framingham'},
      {value: 'Franklin', label:'Franklin'},
      {value: 'Greater Boston Area', label:'Greater Boston Area'},
      {value: 'Hanover', label:'Hanover'},
      {value: 'Hanscom Air Force Ba', label:'Hanscom Air Force Ba'},
      {value: 'Hingham', label:'Hingham'},
      {value: 'HOLB', label:'HOLB'},
      {value: 'Holbrook', label:'Holbrook'},
      {value: 'Hollbrook', label:'Hollbrook'},
      {value: 'Hull', label:'Hull'},
      {value: 'Hyde Park', label:'Hyde Park'},
      {value: 'Jamaica  Plain', label:'Jamaica  Plain'},
      {value: 'Jamaica Plain', label:'Jamaica Plain'},
      {value: 'Jeffries Point / Air', label:'Jeffries Point / Air'},
      {value: 'Lexington', label:'Lexington'},
      {value: 'Lincoln', label:'Lincoln'},
      {value: 'Lower Mills', label:'Lower Mills'},
      {value: 'Lynn', label:'Lynn'},
      {value: 'Lynnfield', label:'Lynnfield'},
      {value: 'Malden', label:'Malden'},
      {value: 'Marblehead', label:'Marblehead'},
      {value: 'Marlbehead', label:'Marlbehead'},
      {value: 'Marlborough', label:'Marlborough'},
      {value: 'Marshfield', label:'Marshfield'},
      {value: 'Mattapan', label:'Mattapan'},
      {value: 'Maynard', label:'Maynard'},
      {value: 'Medfield', label:'Medfield'},
      {value: 'Medford', label:'Medford'},
      {value: 'Melrose', label:'Melrose'},
      {value: 'Mid-Cambridge', label:'Mid-Cambridge'},
      {value: 'Middleton', label:'Middleton'},
      {value: 'Milton', label:'Milton'},
      {value: 'Mission Hill', label:'Mission Hill'},
      {value: 'N Billerica', label:'N Billerica'},
      {value: 'N. Billerica', label:'N. Billerica'},
      {value: 'N. Weymouth', label:'N. Weymouth'},
      {value: 'N.Billerica', label:'N.Billerica'},
      {value: 'N.Reading', label:'N.Reading'},
      {value: 'Nahant', label:'Nahant'},
      {value: 'Natick', label:'Natick'},
      {value: 'Needham', label:'Needham'},
      {value: 'Needham Heights', label:'Needham Heights'},
      {value: 'Newburyport', label:'Newburyport'},
      {value: 'Newton', label:'Newton'},
      {value: 'Newton Center', label:'Newton Center'},
      {value: 'Newton Centre', label:'Newton Centre'},
      {value: 'Newton Corner', label:'Newton Corner'},
      {value: 'Newton Highlands', label:'Newton Highlands'},
      {value: 'Newton L F', label:'Newton L F'},
      {value: 'Newton Lower Falls', label:'Newton Lower Falls'},
      {value: 'Newton MA', label:'Newton MA'},
      {value: 'Newton U F', label:'Newton U F'},
      {value: 'Newton Upper Falls', label:'Newton Upper Falls'},
      {value: 'Newtonville', label:'Newtonville'},
      {value: 'North Andover', label:'North Andover'},
      {value: 'North Beverly', label:'North Beverly'},
      {value: 'North Billerica', label:'North Billerica'},
      {value: 'North Cambridge', label:'North Cambridge'},
      {value: 'North Quincy', label:'North Quincy'},
      {value: 'North Reading', label:'North Reading'},
      {value: 'North Scituate Villa', label:'North Scituate Villa'},
      {value: 'North Weymouth', label:'North Weymouth'},
      {value: 'Norwell', label:'Norwell'},
      {value: 'Norwood', label:'Norwood'},
      {value: 'Norwood Center', label:'Norwood Center'},
      {value: 'Peabody', label:'Peabody'},
      {value: 'Pinehurst', label:'Pinehurst'},
      {value: 'Quincy', label:'Quincy'},
      {value: 'Quincy Center', label:'Quincy Center'},
      {value: 'Randolph', label:'Randolph'},
      {value: 'Reading', label:'Reading'},
      {value: 'Revere', label:'Revere'},
      {value: 'Rockland', label:'Rockland'},
      {value: 'Rockport', label:'Rockport'},
      {value: 'Roslindale', label:'Roslindale'},
      {value: 'Roxbury', label:'Roxbury'},
      {value: 'Roxbury Crossing', label:'Roxbury Crossing'},
      {value: 'S. Boston', label:'S. Boston'},
      {value: 'Salem', label:'Salem'},
      {value: 'Saugus', label:'Saugus'},
      {value: 'Sharon', label:'Sharon'},
      {value: 'Sherborn', label:'Sherborn'},
      {value: 'So. Weymouth', label:'So. Weymouth'},
      {value: 'Somerville', label:'Somerville'},
      {value: 'Sommerville', label:'Sommerville'},
      {value: 'South Boston', label:'South Boston'},
      {value: 'South Brookline', label:'South Brookline'},
      {value: 'South End', label:'South End'},
      {value: 'South Natick', label:'South Natick'},
      {value: 'South Waltham', label:'South Waltham'},
      {value: 'South Weymouth', label:'South Weymouth'},
      {value: 'Stoneham', label:'Stoneham'},
      {value: 'Stoughton', label:'Stoughton'},
      {value: 'Stoughton MA', label:'Stoughton MA'},
      {value: 'Sudbury', label:'Sudbury'},
      {value: 'Swampscott', label:'Swampscott'},
      {value: 'Tewksbury', label:'Tewksbury'},
      {value: 'Tewskbury', label:'Tewskbury'},
      {value: 'W. Roxbury', label:'W. Roxbury'},
      {value: 'Waban', label:'Waban'},
      {value: 'Wakefield', label:'Wakefield'},
      {value: 'Wakefield Ma', label:'Wakefield Ma'},
      {value: 'Wakefield, Massachus', label:'Wakefield, Massachus'},
      {value: 'Walpole', label:'Walpole'},
      {value: 'Waltham', label:'Waltham'},
      {value: 'Watertown', label:'Watertown'},
      {value: 'Watertown,', label:'Watertown,'},
      {value: 'Wayland', label:'Wayland'},
      {value: 'Wellesley', label:'Wellesley'},
      {value: 'Wellesley Hills', label:'Wellesley Hills'},
      {value: 'Wellesley,', label:'Wellesley,'},
      {value: 'Wenham', label:'Wenham'},
      {value: 'West Concord', label:'West Concord'},
      {value: 'West Medford', label:'West Medford'},
      {value: 'West Newton', label:'West Newton'},
      {value: 'West Peabody', label:'West Peabody'},
      {value: 'West Roxbury', label:'West Roxbury'},
      {value: 'West Roxury', label:'West Roxury'},
      {value: 'Westford', label:'Westford'},
      {value: 'Weston', label:'Weston'},
      {value: 'Westwood', label:'Westwood'},
      {value: 'Weymouth', label:'Weymouth'},
      {value: 'Wilmington', label:'Wilmington'},
      {value: 'Winchester', label:'Winchester'},
      {value: 'Winthrop', label:'Winthrop'},
      {value: 'Woburn', label:'Woburn'},
      {value: 'Wollaston', label:'Wollaston'},
  ]},
  {value: 'OR',
    label: 'Oregon',
    children: [
      {value: 'Aloha', label: 'Aloha'},
      {value:'Beavercreek', label:'Beavercreek'},
      {value:'Beaverton', label:'Beaverton'},
      {value:'Beaverton (Portland)', label:'Beaverton (Portland)'},
      {value:'beaverton Or', label:'beaverton Or'},
      {value:'Beaverton-Aloha', label:'Beaverton-Aloha'},
      {value:'Bend', label:'Bend'},
      {value:'Boring', label:'Boring'},
      {value:'Clackamas', label:'Clackamas'},
      {value:'Damascus', label:'Damascus'},
      {value:'Delta Park', label:'Delta Park'},
      {value:'Durham', label:'Durham'},
      {value:'Fairview', label:'Fairview'},
      {value:'Gladstone', label:'Gladstone'},
      {value:'Gresham', label:'Gresham'},
      {value:'Happy Valley', label:'Happy Valley'},
      {value:'Hillsbor', label:'Hillsbor'},
      {value:'Hillsboro', label:'Hillsboro'},
      {value:'Historic Milwaukie', label:'Historic Milwaukie'},
      {value:'King City', label:'King City'},
      {value:'Lake Grove', label:'Lake Grove'},
      {value:'Lake Oswego', label:'Lake Oswego'},
      {value:'Lake Oswego, OR', label:'Lake Oswego, OR'},
      {value:'Lake Owego', label:'Lake Owego'},
      {value:'Marylhurst', label:'Marylhurst'},
      {value:'Milwauke', label:'Milwauke'},
      {value:'Milwaukee', label:'Milwaukee'},
      {value:'Milwaukie', label:'Milwaukie'},
      {value:'Oak Grove', label:'Oak Grove'},
      {value:'OR', label:'OR'},
      {value:'Oregon City', label:'Oregon City'},
      {value:'Portand', label:'Portand'},
      {value:'Portland', label:'Portland'},
      {value:'Portland Oregon', label:'Portland Oregon'},
      {value:'Portland-Eastport Pl', label:'Portland-Eastport Pl'},
      {value:'Portland-Gateway Pla', label:'Portland-Gateway Pla'},
      {value:'Prontland', label:'Prontland'},
      {value:'San dy', label:'San dy'},
      {value:'Sellwood', label:'Sellwood'},
      {value:'Sherwood', label:'Sherwood'},
      {value:'St Johns', label:'St Johns'},
      {value:'Tigard', label:'Tigard'},
      {value:'Tigard (Portland)', label:'Tigard (Portland)'},
      {value:'Troutland', label:'Troutland'},
      {value:'Tualatin', label:'Tualatin'},
      {value:'Vancouver', label:'Vancouver'},
      {value:'West Linn', label:'West Linn'},
      {value:'Wilsonville', label:'Wilsonville'},
    ]},

]

const restaurantColumns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),
        render: (text, row) => <a href={`/restaurants?id=${row.business_id}`}>{text}</a>
    },
    {
        title: 'City',
        dataIndex: 'city',
        key: 'city',
        sorter: (a, b) => a.city.localeCompare(b.city)
    },
    {
        title: 'State',
        dataIndex: 'State',
        key: 'State',
        filters: [
          {text: 'MA', value: 'MA'},
          {text: 'OR', value: 'OR'}
        ],
        onFilter: (value, record) => record.State === value,
    },
    // TASK 19: copy over your answers for tasks 7 - 9 to add columns for potential, club, and value
    {
        title:"Stars",
        dataIndex:"stars",
        key:"stars",
        sorter: (a, b) => a.stars - b.stars
    },
    {
        title:"Review Count",
        dataIndex:"review_count",
        key:"review_count",
        sorter: (a, b) => a.review_count - b.review_count
    },
    {
        title:"Categories",
        dataIndex:"categories",
        key:"categories"
    },
    {
        title:"Price Level",
        dataIndex:"RestaurantsPriceRange2",
        key:"RestaurantsPriceRange2"
    }
];


class RestaurantsRecommender extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nameQuery: '',
            stateQuery: '',
            cityQuery: '',
            zipQuery: '',
            categoryQuery: '',
            ratingHighQuery: 5,
            ratingLowQuery: 1,
            priceQuery: '',
            selectedRestaurantId: window.location.search ? window.location.search.substring(1).split('=')[1] : '__CskSr6YIhxxZYt9445Fg',
            selectedRestaurantDetails: null,
            restaurantsResults: []

        }

        this.updateSearchResults = this.updateSearchResults.bind(this)
        this.resetQueries = this.resetQueries.bind(this)
        this.handleNameQueryChange = this.handleNameQueryChange.bind(this)
        this.handleLocationQueryChange = this.handleLocationQueryChange.bind(this)
        this.handleZipQueryChange = this.handleZipQueryChange.bind(this)
        this.handleCategoryQueryChange = this.handleCategoryQueryChange.bind(this)
        this.handleRatingChange = this.handleRatingChange.bind(this)
        this.handlePriceChange = this.handlePriceChange.bind(this)
    }



    handleNameQueryChange(event) {
        this.setState({ nameQuery: event.target.value })
    }

    handleLocationQueryChange(value, selectedLocations) {
        this.setState({stateQuery: selectedLocations.map(o => o.label)[0] == 'Massachusetts'? 'MA':'OR',
                        cityQuery: selectedLocations.map(o => o.label)[1]})
    }

    handleZipQueryChange(event) {
        this.setState({zipQuery:event.target.value})
    }

    handleCategoryQueryChange(event) {
        this.setState({categoryQuery:event.target.value})
    }

    handleRatingChange(value) {
        this.setState({ ratingLowQuery: value[0] })
        this.setState({ ratingHighQuery: value[1] })
    }

    handlePriceChange(event) {
        this.setState({priceQuery: event.target.value})
    }

    updateSearchResults() {
        getRestaurantSearch(this.state.nameQuery, this.state.stateQuery, this.state.cityQuery, this.state.zipQuery, this.state.categoryQuery, this.state.ratingHighQuery, this.state.ratingLowQuery, this.state.priceQuery, null, null).then(res => {
            this.setState({restaurantsResults:res.results})
        })
    }

    resetQueries() {
      this.setState({ nameQuery: '' })
      this.setState({ stateQuery: '' })
      this.setState({ cityQuery: '' })
      this.setState({ zipQuery: '' })
      this.setState({ categoryQuery: '' })
      this.setState({ ratingHighQuery: 5 })
      this.setState({ ratingLowQuery: 1 })
      this.setState({ priceQuery: '' })
    }

    componentDidMount() {
        getRestaurantSearch(this.state.nameQuery, this.state.locationQuery, this.state.clubQuery, this.state.ratingHighQuery, this.state.ratingLowQuery, this.state.potHighQuery, this.state.potLowQuery, null, null).then(res => {
            this.setState({ restaurantsResults: res.results })
        })

        // TASK 25: call getRestaurant with the appropriate parameter and set update the correct state variable.
        // See the usage of getMatch in the componentDidMount method of MatchesPage for a hint!
        getRestaurant(this.state.selectedRestaurantId).then(res => {
            this.setState({selectedRestaurantDetails: res.results[0]})
        })
    }

    render() {
        return (

            <div>

                <MenuBar />
                <Form style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '25vw', margin: '0 auto' }}>
                            <label>Restaurant</label>
                            <FormInput placeholder={this.state.nameQuery? this.state.nameQuery : 'e.g. Bradley\'s Bar & Grill'} value={this.state.nameQuery} onChange={this.handleNameQueryChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '14vw', margin: '0 auto' }}>
                            <label>Location</label>
                            <br/>
                            <div>{this.state.cityQuery}{this.state.stateQuery && this.state.cityQuery? ',' : ''} {this.state.stateQuery}</div>
                            <Cascader options={locationOptions} onChange={this.handleLocationQueryChange}>
                            <a href="#">Change city</a>
                            </Cascader>
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '10vw', margin: '0 auto' }}>
                            <label>Zip</label>
                            <FormInput placeholder={this.state.zipQuery? this.state.zipQuery : 'e.g. 97217'} value={this.state.zipQuery} onChange={this.handleZipQueryChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '15vw', margin: '0 auto' }}>
                            <label>Category</label>
                            <FormInput placeholder={this.state.categoryQuery? this.state.categoryQuery : 'e.g. American'} value={this.state.categoryQuery} onChange={this.handleCategoryQueryChange} />
                        </FormGroup></Col>

                    </Row>
                    <br></br>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '15vw', margin: '0 auto' }}>
                            <label>Stars</label>
                            <Slider range value={[this.state.ratingLowQuery,this.state.ratingHighQuery]} max={5} min={1} onChange={this.handleRatingChange}/>
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Price Level</label>
                            <Radio.Group options={priceOptions} value={this.state.priceQuery} onChange={this.handlePriceChange} optionType="button"/>
                        </FormGroup></Col>
                        <Col flex={2}>
                            <Button style={{ marginTop: '4vh' }} type="primary" onClick={this.updateSearchResults}>Search</Button>
                            &nbsp;
                            <Button style={{ marginTop: '4vh' }} type="primary" onClick={this.resetQueries}>Reset</Button>
                        </Col>


                    </Row>


                </Form>
                <Divider />
                {/* TASK 24: Copy in the players table from the Home page, but use the following style tag: style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }} - this should be one line of code! */}
                    <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
                    <h3>Restaurants</h3>

                    <Table dataSource={/*datasource1*/this.state.restaurantsResults} columns={restaurantColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
                    <BackTop />
                    </div>
                <Divider />

                {this.state.selectedRestaurantDetails ? <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
                    <Card>

                        <CardBody>
                        <Row gutter='30' align='middle' justify='center'>
                            <Col flex={2} style={{ textAlign: 'left' }}>
                            <h3>{this.state.selectedRestaurantDetails.name}</h3>

                            </Col>

                            <Col flex={2} style={{ textAlign: 'right' }}>
                            <img src='https://yelpphoto.s3.amazonaws.com/${this.state.selectedRestaurantDetails.photo_id}.jpg' referrerpolicy="no-referrer" alt={null} style={{height:'15vh'}}/>

                            </Col>
                        </Row>
                            <Row gutter='30' align='middle' justify='left'>
                                <Col>
                                <h5>{this.state.selectedRestaurantDetails.Club}</h5>
                                </Col>
                                <Col>
                                <h5>{this.state.selectedRestaurantDetails.JerseyNumber}</h5>
                                </Col>
                                <Col>
                                <h5>{this.state.selectedRestaurantDetails.BestPosition}</h5>
                                </Col>
                            </Row>
                            <br>
                            </br>
                            <Row gutter='30' align='middle' justify='left'>
                                <Col>
                                Age: {this.state.selectedRestaurantDetails.Age}
                                </Col>
                                {/* TASK 28: add two more columns here for Height and Weight, with the appropriate labels as above */}
                                <Col>
                                Height: {this.state.selectedRestaurantDetails.Height}
                                </Col>
                                <Col>
                                Weight: {this.state.selectedRestaurantDetails.Weight}
                                </Col>
                                <Col flex={2} style={{ textAlign: 'right' }}>
                                {this.state.selectedRestaurantDetails.Location}
                                    <img src={this.state.selectedRestaurantDetails.Flag} referrerpolicy="no-referrer" alt={null} style={{height:'3vh', marginLeft: '1vw'}}/>
                                </Col>

                            </Row>
                            <Row gutter='30' align='middle' justify='left'>
                                <Col>
                                Value: {this.state.selectedRestaurantDetails.Value}
                                </Col>
                                <Col>
                                Release Clause: {this.state.selectedRestaurantDetails.ReleaseClause}
                                </Col>
                                {/* TASK 29: Create 2 additional columns for the attributes 'Wage' and 'Contract Valid Until' (use spaces between the words when labelling!) */}
                                <Col>
                                Wage: {this.state.selectedRestaurantDetails.Wage}
                                </Col>
                                <Col>
                                Contract Valid Until: {this.state.selectedRestaurantDetails.ContractValidUntil}
                                </Col>
                            </Row>
                        </CardBody>

                    </Card>

                    <Card style={{marginTop: '2vh'}}>
                        <CardBody>
                            <Row gutter='30' align='middle' justify='center'>
                            <Col flex={2} style={{ textAlign: 'left' }}>
                            <h6>Skill</h6>
                            <Rate disabled defaultValue={this.state.selectedRestaurantDetails.Skill} />
                            <h6>Reputation</h6>
                            {/* TASK 30: create a star rating component for 'InternationalReputation'. Make sure you use the 'disabled' option as above to ensure it is read-only*/}
                            <Rate disabled defaultValue={this.state.selectedRestaurantDetails.InternationalReputation} />
                            <h6>International Reputation</h6>
                            <Divider/>
                            <h6>Best Rating</h6>
                                <Progress style={{ width: '20vw'}} value={this.state.selectedRestaurantDetails.BestOverallRating} >{this.state.selectedRestaurantDetails.BestOverallRating}</Progress>
                                {/* TASK 31: create the headings and progress bars for 'Potential' and 'Rating'. Use the same style as the one above for 'Best Rating'.*/}
                                <h6>Potential</h6>
                                <Progress style={{ width: '20vw'}} value={this.state.selectedRestaurantDetails.Potential} >{this.state.selectedRestaurantDetails.Potential}</Progress>
                                <h6>Rating</h6>
                                <Progress style={{ width: '20vw'}} value={this.state.selectedRestaurantDetails.Rating} >{this.state.selectedRestaurantDetails.Rating}</Progress>
                                </Col >
                                <Col  push={2} flex={2}>
                                {/*TASK 32: In case the player is a GK, show a radar chart (replacing 'null' below) with the labels: Agility, Ball Control, Passing, Positioning, Stamina, Strength */}

                                    {this.state.selectedRestaurantDetails.BestPosition === 'GK'?
                                    <RadarChart
                                data={[this.state.selectedRestaurantDetails]}
                                tickFormat={t => wideFormat(t)}
                                startingAngle={0}
                                domains={[
                                    { name: 'Penalties', domain: [0, 100], getValue: d => d.GKPenalties },
                                    { name: 'Diving', domain: [0, 100], getValue: d => d.GKDiving },
                                    { name: 'Handling', domain: [0, 100], getValue: d => d.GKHandling },
                                    { name: 'Kicking', domain: [0, 100], getValue: d => d.GKKicking },
                                    { name: 'Positioning', domain: [0, 100], getValue: d => d.GKPositioning },
                                    { name: 'Reflexes', domain: [0, 100], getValue: d => d.GKReflexes }
                                ]}
                                width={450}
                                height={400}

                            />
                                    :<RadarChart
                                data={[this.state.selectedRestaurantDetails]}
                                tickFormat={t => wideFormat(t)}
                                startingAngle={0}
                                domains={[
                                    { name: 'Agility', domain: [0, 100], getValue: d => d.NAdjustedAgility },
                                    { name: 'Ball Control', domain: [0, 100], getValue: d => d.NBallControl },
                                    { name: 'Passing', domain: [0, 100], getValue: d => d.NPassing },
                                    { name: 'Positioning', domain: [0, 100], getValue: d => d.NPositioning },
                                    { name: 'Stamina', domain: [0, 100], getValue: d => d.NStamina },
                                    { name: 'Strength', domain: [0, 100], getValue: d => d.NStrength }
                                ]}
                                width={450}
                                height={400}

                            />}

                                </Col>
                            </Row>
                        </CardBody>
                    </Card>

                </div> : null}

            </div>

        )

    }
}

export default RestaurantsRecommender
