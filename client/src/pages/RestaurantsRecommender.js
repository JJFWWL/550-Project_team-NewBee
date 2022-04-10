import React from 'react';
import { Form, FormInput, FormGroup, } from "shards-react";

import {
    Table,
    Pagination,
    Row,
    Col,
    Divider,
    Slider,
    Rate,
    Button,
    Radio,
    Cascader,
    BackTop,
    Image,
    Descriptions,
    Badge,
    Carousel,
    Tabs,
    Popover,
    notification,
} from 'antd'
import { StarOutlined, DollarOutlined, DollarCircleFilled, CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import { format } from 'd3-format';

import MenuBar from '../components/MenuBar';
import { getRestaurantSearch, getRestaurant, getRestaurantRecommendation } from '../fetcher'
const wideFormat = format('.3r');

const { TabPane } = Tabs;

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

const restaurantColumns = '';

const contentStyle = {

  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',

};

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
            userNameQuery: '',
            userIdQuery: '',
            selectedRestaurantId: window.location.search ? window.location.search.substring(1).split('=')[1] : '',
            selectedRestaurantDetails: [],
            restaurantsResults: [],
            loadings: [],
        }


        this.updateSearchResults = this.updateSearchResults.bind(this)
        this.resetQueries = this.resetQueries.bind(this)
        this.handleNameQueryChange = this.handleNameQueryChange.bind(this)
        this.handleLocationQueryChange = this.handleLocationQueryChange.bind(this)
        this.handleZipQueryChange = this.handleZipQueryChange.bind(this)
        this.handleCategoryQueryChange = this.handleCategoryQueryChange.bind(this)
        this.handleRatingChange = this.handleRatingChange.bind(this)
        this.handlePriceChange = this.handlePriceChange.bind(this)

        this.handleUserNameQueryChange = this.handleUserNameQueryChange.bind(this)
        this.handleUserIdQueryChange = this.handleUserIdQueryChange.bind(this)
        this.updateRecommendResults = this.updateRecommendResults.bind(this)

        this.handleRestaurantIdChange = this.handleRestaurantIdChange.bind(this)
        this.updateRestaurantDetails = this.updateRestaurantDetails.bind(this)
    }

    enterLoading = index => {
      this.setState(({ loadings }) => {
        const newLoadings = [...loadings];
        newLoadings[index] = true;

        return {
          loadings: newLoadings,
        };
      });
      setTimeout(() => {
        this.setState(({ loadings }) => {
          const newLoadings = [...loadings];
          newLoadings[index] = false;

          return {
            loadings: newLoadings,
          };
        });
      }, 30000);
    };

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
            console.log("results returned! now loading results to variable...")
            this.setState({restaurantsResults:res.results})
            console.log("results loaded to variable!")
            this.setState({loadings: [false, false]})
            if (this.state.restaurantsResults.length==0) {
              notification.info({message: "No results found!"})
            }
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
      this.setState({ userNameQuery: '' })
      this.setState({ userIdQuery: '' })
    }

    handleUserNameQueryChange(event) {
        this.setState({ userNameQuery: event.target.value })
    }

    handleUserIdQueryChange(event) {
        this.setState({ userIdQuery: event.target.value })
    }

    updateRecommendResults() {

        getRestaurantRecommendation(this.state.userNameQuery, this.state.userIdQuery, this.state.stateQuery, this.state.cityQuery, this.state.zipQuery, null, null).then(res => {
            console.log("results returned! now loading results to variable...")
            this.setState({restaurantsResults:res.results})
            console.log("results loaded to variable!")
            this.setState({loadings: [false, false]})
            if (this.state.restaurantsResults.length==0) {
              notification.info({message: "No results found! Please verify your name and ID."})
            }
        })
    }

    handleRestaurantIdChange(value) {
        this.setState({ selectedRestaurantId: value })
    }

    updateRestaurantDetails() {
      getRestaurant(this.state.selectedRestaurantId).then(res => {
          this.setState({selectedRestaurantDetails: res.results})
          console.log("Wow, this Get Restaurant is automatic!")
      })
    }

    componentDidMount() {
    }



    render() {
        const { loadings } = this.state;
        return (

            <div>

                <MenuBar />

                <Tabs defaultActiveKey="1" centered size="large" >

                    <TabPane tab="Search" key="1">
                        <Form style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
                            <Row>
                                <Col flex={2}><FormGroup style={{ width: '25vw', margin: '0 auto' }}>
                                    <label>Business</label>
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
                            <br/>
                            <Row>
                                <Col flex={2}><FormGroup style={{ width: '15vw', margin: '0 auto' }}>
                                    <label>Stars</label>
                                    <Slider range value={[this.state.ratingLowQuery,this.state.ratingHighQuery]} max={5} min={1} step={0.5} onChange={this.handleRatingChange}/>
                                </FormGroup></Col>
                                <Col flex={2}><FormGroup style={{ width: '18vw', margin: '0 auto' }}>
                                    <label>Price Level</label>
                                    <Radio.Group options={priceOptions} value={this.state.priceQuery} onChange={this.handlePriceChange} optionType="button"/>
                                </FormGroup></Col>
                                <Col flex={2}>
                                    <Button style={{ marginTop: '4vh' }} type="primary" onClick={()=>{if (this.state.stateQuery) { this.enterLoading(0);  this.updateSearchResults(); } else {notification.error({message: 'Please select the location!'})}}} loading={loadings[0]}>Search</Button>
                                    &nbsp;
                                    <Button style={{ marginTop: '4vh' }} type="primary" onClick={this.resetQueries}>Reset</Button>
                                </Col>
                            </Row>
                        </Form>
                    </TabPane>

                    <TabPane tab="Recommend" key="2">
                        <Form style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
                          <Row>
                              <Col flex={2}><FormGroup style={{ width: '15vw', margin: '0 auto' }}>
                                  <label>Your name</label>
                                  <FormInput placeholder={this.state.userNameQuery? this.state.userNameQuery : 'e.g. John'} value={this.state.userNameQuery} onChange={this.handleUserNameQueryChange} />
                              </FormGroup></Col>
                              <Col flex={2}><FormGroup style={{ width: '15vw', margin: '0 auto' }}>
                                  <label>Last 6 digit of your user ID</label>
                                  <FormInput placeholder={this.state.userIdQuery? this.state.userIdQuery : 'e.g. OiezZw'} value={this.state.userIdQuery} onChange={this.handleUserIdQueryChange} />
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
                              <Col flex={2}>
                                  <Button style={{ marginTop: '4vh' }} type="primary" onClick={()=>{if (this.state.stateQuery!='' && this.state.userIdQuery!='' && this.state.userNameQuery!='') {this.enterLoading(1); this.updateRecommendResults(); } else { notification.error({message: 'Name, ID, and Location are required for recommendation!'})}}} loading={loadings[1]}>Recommend</Button>
                                  &nbsp;
                                  <Button style={{ marginTop: '4vh' }} type="primary" onClick={this.resetQueries}>Reset</Button>
                              </Col>
                          </Row>
                        </Form>
                    </TabPane>
                </Tabs>
                    {this.state.restaurantsResults.length != 0? <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
                    <Divider />
                    <h3>Businesses</h3>
                    <Table dataSource={this.state.restaurantsResults} columns={[
                        {
                            title: 'Name',
                            dataIndex: 'name',
                            key: 'name',
                            sorter: (a, b) => a.name.localeCompare(b.name),
                            render: (text, row) => <Popover content="Double click to show details" trigger="hover"><button onClick={()=>{this.handleRestaurantIdChange(row.business_id); console.log("business_id loaded! Now searching..."); this.updateRestaurantDetails();}}>{text}</button></Popover>
                        },
                        {
                            title: 'City',
                            dataIndex: 'city',
                            key: 'city',
                            sorter: (a, b) => a.city.localeCompare(b.city)
                        },
                        {
                            title: 'State',
                            dataIndex: 'state',
                            key: 'state',
                            filters: [
                              {text: 'MA', value: 'MA'},
                              {text: 'OR', value: 'OR'}
                            ],
                            onFilter: (value, record) => record.state === value,
                        },
                        {
                            title:"Rating",
                            dataIndex:"stars",
                            key:"stars",
                            sorter: (a, b) => a.stars - b.stars,
                            render: (text) => <Rate allowHalf disabled value={text} style={{fontSize: 15}}/>,
                            width: 140
                        },
                        {
                            title:"Price",
                            dataIndex:"price_range",
                            key:"price_range",
                            sorter: (a, b) => a.price_range - b.price_range,
                            render: (text) => <Rate character={<DollarOutlined/>} count={4} disabled value={text} style={{fontSize: 15, color: "black"}}/>,
                            width: 120
                        },
                        {
                            title:"Categories",
                            dataIndex:"categories",
                            key:"categories"
                        },
                        {
                            title:"Review Count",
                            dataIndex:"review_count",
                            key:"review_count",
                            sorter: (a, b) => a.review_count - b.review_count
                        },
                    ]} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
                    </div>:null}

                {this.state.selectedRestaurantDetails[0] ? <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>

                <Divider />
                <Descriptions title={this.state.selectedRestaurantDetails[0].name} bordered layout='horizontal'>
                  <Descriptions.Item label="Categories" span={3}>{this.state.selectedRestaurantDetails[0].categories}</Descriptions.Item>
                  <Descriptions.Item label="Price"><Rate character={<DollarOutlined/>} style={{color: "black"}} count={4} disabled value={this.state.selectedRestaurantDetails[0].price_range}/></Descriptions.Item>
                  <Descriptions.Item label="Rating"><Rate allowHalf disabled value={this.state.selectedRestaurantDetails[0].stars}/></Descriptions.Item>
                  <Descriptions.Item label="Review Count">{this.state.selectedRestaurantDetails[0].review_count}</Descriptions.Item>
                  <Descriptions.Item label="In Business?">
                    {this.state.selectedRestaurantDetails[0].is_open == '1' ? <Badge status="success" text="In Business" /> : <Badge status="error" text="Permanently Closed" />}
                  </Descriptions.Item>
                  <Descriptions.Item label="Today's Hours">
                  {new Date().getDay() == 1? this.state.selectedRestaurantDetails[0].Monday:''}
                  {new Date().getDay() == 2? this.state.selectedRestaurantDetails[0].Tuesday:''}
                  {new Date().getDay() == 3? this.state.selectedRestaurantDetails[0].Wednesday:''}
                  {new Date().getDay() == 4? this.state.selectedRestaurantDetails[0].Thursday:''}
                  {new Date().getDay() == 5? this.state.selectedRestaurantDetails[0].Friday:''}
                  {new Date().getDay() == 6? this.state.selectedRestaurantDetails[0].Saturday:''}
                  {new Date().getDay() == 7? this.state.selectedRestaurantDetails[0].Sunday:''}
                  </Descriptions.Item>
                  <Descriptions.Item label="Address">{this.state.selectedRestaurantDetails[0].address}, <br/>
                  {this.state.selectedRestaurantDetails[0].city}, {this.state.selectedRestaurantDetails[0].State} {this.state.selectedRestaurantDetails[0].postal_code}</Descriptions.Item>
                </Descriptions>

                <br/>
                <Carousel autoplay /*afterChange={onChange}*/>
                  <div>
                    <h3 style={contentStyle}><Image preview={true} src={this.state.selectedRestaurantDetails[0].num_photo? `https://yelpphoto.s3.amazonaws.com/${this.state.selectedRestaurantDetails[0].photo_id}.jpg` : 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'} /></h3>
                  </div>
                  {this.state.selectedRestaurantDetails[0].num_photo > 1? <div>
                    <h3 style={contentStyle}><Image preview={true} src={`https://yelpphoto.s3.amazonaws.com/${this.state.selectedRestaurantDetails[1].photo_id}.jpg`} /></h3>
                  </div>: null}
                  {this.state.selectedRestaurantDetails[0].num_photo > 2? <div>
                    <h3 style={contentStyle}><Image preview={true} src={`https://yelpphoto.s3.amazonaws.com/${this.state.selectedRestaurantDetails[2].photo_id}.jpg`} /></h3>
                  </div>: null}
                  {this.state.selectedRestaurantDetails[0].num_photo > 3? <div>
                    <h3 style={contentStyle}><Image preview={true} src={`https://yelpphoto.s3.amazonaws.com/${this.state.selectedRestaurantDetails[3].photo_id}.jpg`} /></h3>
                  </div>: null}
                </Carousel>
              </div> : null}
              <footer><br/><br/><br/><p style={{textAlign: 'center', fontFamily: 'Trebuchet MS, sans-serif', backgroundColor:'#041527', color:'white'}}>CIS550 Project ©2022 Created by Team NewBee</p></footer>
              <BackTop/>
            </div>

        )

    }
}

export default RestaurantsRecommender
