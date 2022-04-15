import React, { useState } from 'react';

import {
    Form,
    Input,
    Table,
    Cascader,
    Select,
    Row,
    Col,
    Divider,
    Space,
    Tabs,
    Button,
    Radio
} from 'antd'
import { SearchOutlined } from '@ant-design/icons';
import { Bar } from '@ant-design/plots';
import { format } from 'd3-format';

import MenuBar from '../components/MenuBar';
import {
    getStarDistribution,
    getPriceDistribution,
    getAverageRating,
    getAveragePrice,
    getBusinessPercentage,
    getHealthData
} from '../fetcher'
import { getSelectUnstyledUtilityClass } from '@mui/base';
import FormItem from 'antd/lib/form/FormItem';
const wideFormat = format('.3r');

const { Column, ColumnGroup } = Table;
const { TabPane } = Tabs;
const { Option } = Select;

const CityOptions = [
    //OH, OR, TX, WA
    {
        value: 'MA',
        label: 'Massachusetts',
        children: [
            { value: 'Boston', label: 'Boston' },
            { value: 'Cambridge', label: 'Cambridge' },
            { value: 'Somerville', label: 'Somerville' },
            { value: 'Quincy', label: 'Quincy' },
            { value: 'Brookline', label: 'Brookline' },
            { value: 'Waltham', label: 'Waltham' },
            { value: 'Newton', label: 'Newton' },
            { value: 'Natick', label: 'Natick' },
            { value: 'Salem', label: 'Salem' },
            { value: 'Medford', label: 'Medford' },
            { value: 'Woburn', label: 'Woburn' },
            { value: 'Peabody', label: 'Peabody' },
            { value: 'Burlington', label: 'Burlington' },
            { value: 'Watertown', label: 'Watertown' },
            { value: 'Braintree', label: 'Braintree' },
            { value: 'Malden', label: 'Malden' },
            { value: 'Arlington', label: 'Arlington' },
            { value: 'Danvers', label: 'Danvers' },
            { value: 'Norwood', label: 'Norwood' },
            { value: 'Beverly', label: 'Beverly' }
        ]
    },
    {   //Portland,13614
        // Beaverton,1721
        // Tigard,751
        // Lake Oswego,590
        // Milwaukie,363
        // Clackamas,357
        // Happy Valley,331
        // Tualatin,296
        // Hillsboro,261
        // Oregon City,189
        // West Linn,144
        // Aloha,121
        // Gresham,84
        // Gladstone,73
        // Oak Grove,26
        // Damascus,16
        // King City,14
        // Fairview,4
        // Durham,4
        // Milwaukee,3

        value: 'OR',
        label: 'Oregon',
        children: [
            { value: 'Portland', label: 'Portland' },
            { value: 'Beaverton', label: 'Beaverton' },
            { value: 'Tigard', label: 'Tigard' },
            { value: 'Lake Oswego', label: 'Lake Oswego' },
            { value: 'Milwaukie', label: 'Milwaukie' },
            { value: 'Clackamas', label: 'Clackamas' },
            { value: 'Happy Valley', label: 'Happy Valley' },
            { value: 'Tualatin', label: 'Tualatin' },
            { value: 'Hillsboro', label: 'Hillsboro' },
            { value: 'Oregon City', label: 'Oregon City' },
            { value: 'West Linn', label: 'West Linn' },
            { value: 'Aloha', label: 'Aloha' },
            { value: 'Gresham', label: 'Gresham' },
            { value: 'Gladstone', label: 'Gladstone' },
            { value: 'Oak Grove', label: 'Oak Grove' },
            { value: 'Damascus', label: 'Damascus' },
            { value: 'King City', label: 'King City' },
            { value: 'Fairview', label: 'Fairview' },
            { value: 'Durham', label: 'Durham' },
            { value: 'Milwaukee', label: 'Milwaukee' }
        ]
    },
    {   //Austin,15959
        // Lakeway,250
        // Buda,225
        // Bee Cave,217
        // Kyle,191
        // Dripping Springs,167
        // Pflugerville,92
        // West Lake Hills,84
        // Sunset Valley,66
        // Manor,46
        // Del Valle,37
        // Manchaca,32
        // Leander,15
        // Driftwood,15
        // Spicewood,14
        // Rollingwood,12
        // Round Rock,8
        // Westlake Hills,7
        // Creedmoor,6
        // Bee Caves,4

        value: 'TX',
        label: 'Texas',
        children: [
            { value: 'Austin', label: 'Austin' },
            { value: ';Lakeway', label: 'Lakeway' },
            { value: 'Buda', label: 'Buda' },
            { value: 'Bee Cave', label: 'Bee Cave' },
            { value: 'Kyle', label: 'Kyle' },
            { value: 'Dripping Springs', label: 'Dripping Springs' },
            { value: 'Pflugerville', label: 'Pflugerville' },
            { value: 'West Lake Hills', label: 'West Lake Hills' },
            { value: 'Sunset Valley', label: 'Sunset Valley' },
            { value: 'Manor', label: 'Manor' },
            { value: 'Del Valle', label: 'Del Valle' },
            { value: 'Manchaca', label: 'Manchaca' },
            { value: 'Leander', label: 'Leander' },
            { value: 'Driftwood', label: 'Driftwood' },
            { value: 'Spicewood', label: 'Spicewood' },
            { value: 'Rollingwood', label: 'Rollingwood' },
            { value: 'Round Rock', label: 'Round Rock' },
            { value: 'Westlake Hills', label: 'Westlake Hills' },
            { value: 'Creedmoor', label: 'Creedmoor' },
            { value: 'Bee Caves', label: 'Bee Caves' }
        ]
    },
    {   //Vancouver,2322
        // Camas,64
        // Hazel Dell,4
        // Portland,3
        // Ridgefield,3
        // Orchards,3
        // Beaverton,2
        // Vancover,1
        // Felida,1

        value: 'WA',
        label: 'Washington',
        children: [
            { value: 'Vancouver', label: 'Vancouver' },
            { value: 'Camas', label: 'Camas' },
            { value: 'Hazel Dell', label: 'Hazel Dell' },
            { value: 'Portland', label: 'Portland' },
            { value: 'Ridgefield', label: 'Ridgefield' },
            { value: 'Orchards', label: 'Orchards' },
            { value: 'Beaverton', label: 'Beaverton' },
            { value: 'Vancover', label: 'Vancover' },
            { value: 'Felida', label: 'Felida' }
        ]
    }
];


class ScientistPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            regionQuery: 'state',
            stateNameQuery: '',
            cityNameQuery: '',
            zipNameQuery: '',
            starDistribution: [],
            stateStarDistribution: [],
            cityStarDistribution: [],
            zipStarDistribution: [],
            starBarPlotData: [],
            starBarPlotData2: [],
            starBarPlotData3: [],
            healthStateQuery: '',
            healthData: [],
            healthDataPrice: [],
            healthDataRating: [],
        }

        this.handleRegionQueryChange = this.handleRegionQueryChange.bind(this)
        this.handleStateNameQueryChange = this.handleStateNameQueryChange.bind(this)
        this.handleCityNameQueryChange = this.handleCityNameQueryChange.bind(this)
        this.handleZipNameQueryChange = this.handleZipNameQueryChange.bind(this)
        this.handleTabChange = this.handleTabChange.bind(this)

        //Query 3.5 method onChange of healthStateQuery
        this.handleHealthStateQueryChange = this.handleHealthStateQueryChange.bind(this)

        this.UpdateStarDistribution = this.UpdateStarDistribution.bind(this)
        this.updateHealthData = this.updateHealthData.bind(this)
    }

    handleRegionQueryChange(value) {
        this.setState({
            regionQuery: value
        })
    }

    handleStateNameQueryChange(value) {
        this.setState({
            stateNameQuery: value
        })
    }

    handleCityNameQueryChange(value) {
        this.setState({
            cityNameQuery: value
        })
    }

    handleZipNameQueryChange(value) {
        this.setState({
            zipNameQuery: value
        })
    }

    handleHealthStateQueryChange(value) {
        this.setState({
            healthStateQuery: value
        })
    }

    getRegionTitle(value) {
        if (value === 'state') {
            return 'City'
        } else if (value === 'city') {
            return 'Postal Code'
        }
    }

    getRegionChild(region) {
        if (region === 'state') {
            return 'city'
        } else if (region === 'city') {
            return 'zip'
        }
    }


    UpdateStarDistribution(value) {
        var NameQuery = '';
        var title = '';
        var starResult = [];
        if (this.state.regionQuery === 'state') {
            NameQuery = this.state.stateNameQuery;
            title = 'city';
            getStarDistribution('state', NameQuery, null, null).then(res => {
                this.setState({
                    starDistribution: res.results
                })
            })
            for (var i = 0; i < this.state.starDistribution.length; i++) {
                var element = this.state.starDistribution[i];
                var sum = element["1star_count"] + element["2star_count"] + element["3star_count"] + element["4star_count"] + element["5star_count"];
                console.log("sum is : " + sum);
                starResult.push({ "title": element[title], "stars": "$", "count": element["1star_count"], "sum": sum });
                starResult.push({ "title": element[title], "stars": "$$", "count": element["2star_count"], "sum": sum });
                starResult.push({ "title": element[title], "stars": "$$$", "count": element["3star_count"], "sum": sum });
                starResult.push({ "title": element[title], "stars": "$$$$", "count": element["4star_count"], "sum": sum });
                starResult.push({ "title": element[title], "stars": "$$$$", "count": element["5star_count"], "sum": sum });
            }
        } else if (this.state.regionQuery === 'city') {
            NameQuery = value[1];
            title = 'postal_code';
            getStarDistribution('city', NameQuery, null, null).then(res => {
                this.setState({
                    cityStarDistribution: res.results
                })
            })
            for (let element of this.state.cityStarDistribution) {
                var sum = element["1star_count"] + element["2star_count"] + element["3star_count"] + element["4star_count"] + element["5star_count"];
                console.log("sum is : " + sum);
                starResult.push({ "title": element[title], "stars": "$", "count": element["1star_count"], "sum": sum });
                starResult.push({ "title": element[title], "stars": "$$", "count": element["2star_count"], "sum": sum });
                starResult.push({ "title": element[title], "stars": "$$$", "count": element["3star_count"], "sum": sum });
                starResult.push({ "title": element[title], "stars": "$$$$", "count": element["4star_count"], "sum": sum });
                starResult.push({ "title": element[title], "stars": "$$$$", "count": element["5star_count"], "sum": sum });
            }
        } else if (this.state.regionQuery === 'zip') {
            NameQuery = this.state.zipNameQuery
        }
        console.log("region query is :" + this.state.regionQuery);
        console.log("NameQuery is :" + NameQuery);

        starResult = starResult.sort(function (a, b) {
            return b.sum - a.sum;
        });
        console.log("starResult is :" + starResult);

        this.setState({
            starBarPlotData: starResult.slice(0, 50)
        })
    }


    UpdateCityLevelStarDistribution(value) {
        this.handleCityNameQueryChange(value)
        getStarDistribution("city", this.state.cityQuery, null, null).then(res => {
            this.setState({
                starDistribution: res.results
            })
        })

    }

    handleTabChange(key) {
        if (key === 'state') {
            this.setState({
                regionQuery: 'state'
            })
        } else if (key === 'city') {
            this.setState({
                regionQuery: 'city'
            })
        } else if (key === 'postal_code') {
            this.setState({
                regionQuery: 'postal_code'
            })
        }
    }


    updateHealthData() {
        getHealthData(this.state.healthStateQuery, null, null).then(res => {
            var priceData = [];
            var ratingData = [];

            for (var i = 0; i < res.results.length; i++) {
                console.log(`enter the ${i} th loop`)
                priceData.push.apply(priceData, [
                    {
                        price: '$',
                        county: res.results[i].county,
                        value: res.results[i].price1_count
                    },
                    {
                        price: '$$',
                        county: res.results[i].county,
                        value: res.results[i].price2_count
                    },
                    {
                        price: '$$$',
                        county: res.results[i].county,
                        value: res.results[i].price3_count
                    },
                    {
                        price: '$$$$',
                        county: res.results[i].county,
                        value: res.results[i].price4_count
                    }
                ])
                ratingData.push.apply(ratingData, [
                    {
                        rating: '1-2 Stars',
                        county: res.results[i].county,
                        value: res.results[i].star1_2_count
                    },
                    {
                        rating: '2-3 Stars',
                        county: res.results[i].county,
                        value: res.results[i].star2_3_count
                    },
                    {
                        rating: '3-4 Stars',
                        county: res.results[i].county,
                        value: res.results[i].star3_4_count
                    },
                    {
                        rating: '4-5 Stars',
                        county: res.results[i].county,
                        value: res.results[i].star4_5_count
                    }
                ])
            }
            console.log(`priceData's length is : ${priceData.length}`)
            this.setState({
                healthData: res.results,
                healthDataPrice: priceData,
                healthDataRating: ratingData,
            })
            console.log(`${res.results.length}, and ${this.state.healthDataPrice.length}`)
            console.log(`${this.state.healthDataPrice[0].price}, and ${this.state.healthDataPrice[0].county}, and ${this.state.healthDataPrice[0].value}`)
        })
    }

    componentDidMount() {
        this.UpdateStarDistribution();
    }



    ratingTab = () => (
        <div>
            <Row justify='center'>
                <h4>Business Rating Scope: </h4>
            </Row>
            <Row justify='center' >
                <Tabs defaultActiveKey="state" centered type="card" size='large' onChange={this.handleTabChange}>
                    <TabPane tab="State" key="state"  >
                        <Row justify='center'>
                            <Space>
                                <h4>Select a state:   </h4>
                                <Select
                                    defaultValue={"MA"}
                                    onChange={this.handleStateNameQueryChange}
                                >
                                    <Option value="MA">Massachusetts</Option>
                                    <Option value="OH">Ohio</Option>
                                    <Option value="OR">Oregon</Option>
                                    <Option value="TX">Texas</Option>
                                    <Option value="WA">Washington</Option>
                                </Select>
                                <Button type="primary" icon={<SearchOutlined />} size="medium" onClick={this.UpdateStarDistribution}>
                                    Search
                                </Button>
                            </Space>
                        </Row>

                        {this.state.starBarPlotData.length == 0 ? null :
                            <Bar {...{
                                data: this.state.starBarPlotData,
                                xField: 'count',
                                yField: 'title',
                                seriesField: 'stars',
                                isPercent: true,
                                isStack: true,
                                autoFit: true,
                                width: 1600,
                                // padding: [30, 100, 80, 80],
                                label: {
                                    position: 'middle',
                                    content: (item) => {
                                        return item.count.toFixed(2);
                                    },
                                    style: {
                                        fill: '#fff',
                                    }
                                },
                            }
                            } />
                        }
                    </TabPane>
                    <TabPane tab="City" key="city" >
                        <Row justify='center'>
                            <Cascader options={CityOptions} onChange={this.UpdateStarDistribution} placeholder="Please select" />
                            <Divider />
                            {this.state.starBarPlotData.length == 0 ? null :
                                <Bar {...{
                                    data: this.state.starBarPlotData,
                                    xField: 'count',
                                    yField: 'title',
                                    seriesField: 'stars',
                                    isPercent: true,
                                    isStack: true,
                                    autoFit: true,
                                    width: 1600,
                                    // padding: [30, 100, 80, 80],
                                    label: {
                                        position: 'middle',
                                        content: (item) => {
                                            return item.count.toFixed(2);
                                        },
                                        style: {
                                            fill: '#fff',
                                        }
                                    }
                                }
                                } />
                            }
                        </Row>
                    </TabPane>
                    <TabPane tab="Postal Code" key="postal_code">
                        Content of Tab Pane 3
                    </TabPane>
                </Tabs>
            </Row>
            <Divider />

        </div>
    );


    healthTab() {
        return (
            <div style={{ textAlign: 'center' }}>
                <Select placeholder='Select a state' style={{ width: 150 }} onChange={this.handleHealthStateQueryChange}>
                    <Option value="CO">Colorado</Option>
                    <Option value="FL">Florida</Option>
                    <Option value="GA">Georgia</Option>
                    <Option value="MA">Massachusetts</Option>
                    <Option value="OH">Ohio</Option>
                    <Option value="OR">Oregon</Option>
                    <Option value="TX">Texas</Option>
                    <Option value="WA">Washington</Option>
                </Select>
                &nbsp;
                <Button onClick={this.updateHealthData}>Search</Button>
                <br />
                {this.state.healthData.length == 0 ? null :
                    <Tabs style={{ marginLeft: 20, marginRight: 20 }}>
                        <TabPane tab='Price' key='price'>
                            <Bar {...{
                                data: [...this.state.healthDataPrice],
                                xField: 'value',
                                yField: 'county',
                                seriesField: 'price',
                                isPercent: true,
                                isStack: true,

                                label: {
                                    position: 'middle',
                                    content: (item) => {
                                        return item.value.toFixed(2);
                                    },
                                    style: {
                                        fill: '#fff',
                                    }
                                },

                            }
                            } />
                            <p>* The counties above are ordered by their respective health ranking according to data published by <i>The County Health Rankings & Roadmaps</i>, a program of the University of Wisconsin Population Health Institute.
                                <br />The counties closer to the top have higher health rankings. The counties closer to the bottom have lower health rankings</p>
                        </TabPane>
                        <TabPane tab='Rating' key='rating'>
                            <Bar {...{
                                data: [...this.state.healthDataRating],
                                xField: 'value',
                                yField: 'county',
                                seriesField: 'rating',
                                isPercent: true,
                                isStack: true,
                                label: {
                                    position: 'middle',
                                    content: (item) => {
                                        return item.value.toFixed(2);
                                    },
                                    style: {
                                        fill: '#fff',
                                    }
                                }
                            }
                            } />
                            <p>* The counties above are ordered by their respective health ranking according to data published by <i>The County Health Rankings & Roadmaps</i>, a program of the University of Wisconsin Population Health Institute.
                                <br />The counties closer to the top have higher health rankings. The counties closer to the bottom have lower health rankings</p>
                        </TabPane>
                    </Tabs>
                }
            </div>
        )
    }

    render() {
        return (

            <div>
                <MenuBar />

                <Tabs defaultActiveKey="1" centered type="card" size='large' >
                    <TabPane tab="Rating" key="1">
                        {this.ratingTab()}
                    </TabPane>
                    <TabPane tab="Price" key="2">
                        Content of Tab Pane 2
                    </TabPane>
                    <TabPane tab="Map" key="3">
                        Content of Tab Pane 3
                    </TabPane>
                    <TabPane tab="Health" key="4">
                        {this.healthTab()}
                    </TabPane>
                </Tabs>
            </div >
        )
    }
}

export default ScientistPage
