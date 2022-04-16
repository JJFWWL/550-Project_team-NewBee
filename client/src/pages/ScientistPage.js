import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Input, Table, Cascader, Select, Row, Col, Divider, Space, Tabs, Button } from 'antd'
import { SearchOutlined, StarFilled } from '@ant-design/icons';
import { Bar, Pie, measureTextWidth } from '@ant-design/plots';

import { AreaMap } from '@ant-design/maps';
import { format } from 'd3-format';

import MenuBar from '../components/MenuBar';
import {
    getStarDistribution,
    getPriceDistribution,
    getAverageRating,
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
    {
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
    {
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
    {
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
            regionQuery: '',
            stateNameQuery: '',
            cityNameQuery: '',
            zipNameQuery: '',
            starDistribution: [],
            priceDistribution: [],
            averageRating: [],

            starBarPlot: [],
            starDonutPlot: [],

            data: {
                mapType: '',
                features: [],
            },


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
        this.UpdatePrice = this.UpdatePrice.bind(this)

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
            cityNameQuery: value[1]
        })
    }

    handleZipNameQueryChange(e) {

        this.setState({ zipNameQuery: e.target.value })
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

    getStarBarPlot(title, type) {
        let result = [];
        console.log("title is " + title);
        let starCount = ["", "1star_count", "2star_count", "3star_count", "4star_count", "5star_count"];
        let priceCount = ["", "1price_count", "2price_count", "3price_count", "4price_count", "5price_count"];
        let countKey = type === 'star' ? starCount : priceCount;

        for (let i = 0; i < this.state.starDistribution.length; i++) {
            let element = this.state.starDistribution[i];
            var sum = element[countKey[1]] + element[countKey[2]] + element[countKey[3]] + element[countKey[4]] + element[countKey[5]];
            result.push({ "title": element[title], "stars": "*", "count": element[countKey[1]], "sum": sum });
            result.push({ "title": element[title], "stars": "**", "count": element[countKey[2]], "sum": sum });
            result.push({ "title": element[title], "stars": "***", "count": element[countKey[3]], "sum": sum });
            result.push({ "title": element[title], "stars": "****", "count": element[countKey[4]], "sum": sum });
            result.push({ "title": element[title], "stars": "*****", "count": element[countKey[5]], "sum": sum });
        }

        result = result.sort(function (a, b) {
            return b.sum - a.sum;
        });
        console.log("starResult is :" + result);
        this.setState({
            starBarPlot: result.slice(0, 50)
        })

    }

    UpdateStarDistribution() {
        this.state.starDistribution = [];
        var NameQuery = '';
        var title = '';
        if (this.state.regionQuery === 'state') {
            NameQuery = this.state.stateNameQuery;
            title = 'city';
        } else if (this.state.regionQuery === 'city') {
            NameQuery = this.state.cityNameQuery;
            title = 'postal_code';
        } else if (this.state.regionQuery === 'zip') {
            NameQuery = this.state.zipNameQuery;
        }
        if (this.state.regionQuery === 'state' || this.state.regionQuery === 'city') {
            getStarDistribution(this.state.regionQuery, NameQuery, null, null).then(res => {
                this.setState({ starDistribution: res.results }, () => {
                    this.getStarBarPlot(title, 'star');
                }
                )
            });
        } else if (this.state.regionQuery === 'zip') {
            console.log("regionQuery is " + this.state.regionQuery);
            console.log("zipNameQuery is " + this.state.zipNameQuery);
            this.state.starDonutPlot = [];
            getStarDistribution(this.state.regionQuery, NameQuery, null, null).then(res => {
                this.setState({ starDonutPlot: res.results });
                console.log("starDonutPlot is :" + this.state.starDonutPlot);
            });
        }
    }

    UpdatePrice() {
        var NameQuery = '';
        var title = '';
        if (this.state.regionQuery === 'state') {
            NameQuery = this.state.stateNameQuery;
            title = 'city';
        } else if (this.state.regionQuery === 'city') {
            NameQuery = this.state.cityNameQuery;
            title = 'postal_code';
        } else if (this.state.regionQuery === 'zip') {
            NameQuery = this.state.zipNameQuery;
        }
        if (this.state.regionQuery === 'state' || this.state.regionQuery === 'city') {
            getPriceDistribution(this.state.regionQuery, NameQuery, null, null).then(res => {
                this.setState({ starDistribution: res.results }, () => {
                    this.getStarBarPlot(title, 'price');
                }
                )
            });
        } else if (this.state.regionQuery === 'zip') {
            console.log("regionQuery is " + this.state.regionQuery);
            console.log("zipNameQuery is " + this.state.zipNameQuery);
            this.state.starDonutPlot = [];
            getPriceDistribution(this.state.regionQuery, NameQuery, null, null).then(res => {
                let result = [];
                for (let i = 0; i < res.results.length; i++) {
                    let element = res.results[i];
                    if (i === 0) { result.push({ 'price': '$', 'percent': element.percent }); }
                    else if (i === 1) { result.push({ 'price': '$$', 'percent': element.percent }); }
                    else if (i === 2) { result.push({ 'price': '$$$', 'percent': element.percent }); }
                    else if (i === 3) { result.push({ 'price': '$$$$', 'percent': element.percent }); }
                    else if (i === 4) { result.push({ 'price': '$$$$$', 'percent': element.percent }); }
                }
                this.setState({ starDonutPlot: result });
                console.log("starDonutPlot is :" + this.state.starDonutPlot);
            });
        }
    }


    handleTabChange(key) {
        this.setState({
            starDistribution: [],
            starBarPlot: [],
        });

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
                regionQuery: 'zip'
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


    PiePlot = () => {
        var config = {
            appendPadding: 10,
            data: this.state.starDonutPlot,
            angleField: 'count',
            colorField: 'stars',
            radius: 1,
            innerRadius: 0.6,
            label: {
                type: 'inner',
                offset: '-50%',
                style: {
                    textAlign: 'center',
                    fontSize: 14,
                },
            },
            interactions: [
                {
                    type: 'element-selected',
                },
                {
                    type: 'element-active',
                },
            ],
            statistic: {
                title: false,
                content: {
                    style: {
                        whiteSpace: 'pre-wrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    },
                    content: 'Business Rating',
                },
            },
        };

        return <Pie {...config} />;
    };

    pricePiePlot = () => {
        var config = {
            appendPadding: 10,
            data: this.state.starDonutPlot,
            angleField: 'percent',
            colorField: 'stars',
            radius: 1,
            innerRadius: 0.6,
            // meta: {
            //     percent: {
            //         formatter: (v) => `${v * 100} %`,
            //     },
            // },
            label: {
                type: 'inner',
                offset: '-50%',
                // content: (d) => `${d.RestaurantsPriceRange2}`,
                style: {
                    textAlign: 'center',
                    fontSize: 14,
                },
            },
            interactions: [
                {
                    type: 'element-selected',
                },
                {
                    type: 'element-active',
                },
            ],
            statistic: {
                title: false,
                content: {
                    style: {
                        whiteSpace: 'pre-wrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    },
                    content: 'Price',
                },
            },
        };

        return <Pie {...config} />;
    };


    ratingTab = () => (
        <div>
            <Row justify='center'>
                <h4>Business Rating Scope: </h4>
            </Row>
            <Row justify='center' >
                <Tabs defaultActiveKey="state" centered type="card" size='large' onChange={this.handleTabChange}>
                    <TabPane tab="State" key="state" >
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
                        <Row justify='center'>
                            <h3>State: {this.state.stateNameQuery}</h3>
                        </Row>
                        <Row>
                            {this.state.starBarPlot == 0 ? null :
                                < Bar {...{
                                    data: this.state.starBarPlot,
                                    xField: 'count',
                                    yField: 'title',
                                    seriesField: 'stars',
                                    isPercent: true,
                                    isStack: true,
                                    autoFit: true,
                                    width: 1200,
                                    // padding: [30, 100, 80, 80],
                                    xAxis: {
                                        title: {
                                            text: 'Percentage',
                                        },
                                    },
                                    yAxis: {
                                        title: {
                                            text: 'City',
                                        },
                                    },
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
                                }
                                />
                            }
                        </Row>
                    </TabPane>
                    <TabPane tab="City" key="city" >
                        <Row justify='center'>
                            <Space>
                                <h4>Select a state:   </h4>
                                <Cascader options={CityOptions} onChange={this.handleCityNameQueryChange} placeholder="Please select" />
                                <Button type="primary" size="medium" onClick={this.UpdateStarDistribution}>Search</Button>
                            </Space>
                        </Row>

                        {this.state.starBarPlot.length == 0 ? null :
                            < Bar {...{
                                data: this.state.starBarPlot,
                                xField: 'count',
                                yField: 'title',
                                seriesField: 'stars',
                                isPercent: true,
                                isStack: true,
                                autoFit: true,
                                width: 1200,
                                // padding: [30, 100, 80, 80],
                                xAxis: {
                                    title: {
                                        text: 'Percentage',
                                    },
                                },
                                yAxis: {
                                    title: {
                                        text: 'Postal Code',
                                    },
                                },
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
                            }
                            />
                        }
                    </TabPane>
                    <TabPane tab="Postal Code" key="postal_code">
                        <Row justify='center'>
                            <Space>
                                <h4>Input Zip Code:  </h4>
                                <Input placeholder="input search text" allowClear enterButton="Search" size="large" onChange={this.handleZipNameQueryChange} />
                                <Button type="primary" size="medium" onClick={this.UpdateStarDistribution}>Search</Button>
                            </Space>
                        </Row>

                        <Row justify='center'>
                            {this.state.starDonutPlot == 0 ? null : this.PiePlot()}
                        </Row>
                    </TabPane>
                </Tabs>
            </Row>
            <Divider />
        </div>
    );

    priceTab = () => (
        <div>
            <Row justify='center'>
                <h4>Business Price Scope: </h4>
            </Row>
            <Row justify='center' >
                <Tabs defaultActiveKey="state" centered type="card" size='large' onChange={this.handleTabChange}>
                    <TabPane tab="State" key="state" >
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
                                <Button type="primary" icon={<SearchOutlined />} size="medium" onClick={this.UpdatePrice}>
                                    Search
                                </Button>
                            </Space>
                        </Row>
                        <Row justify='center'>
                            <h3>State: {this.state.stateNameQuery}</h3>
                        </Row>
                        <Row>
                            {this.state.starBarPlot == 0 ? null :
                                < Bar {...{
                                    data: this.state.starBarPlot,
                                    xField: 'count',
                                    yField: 'title',
                                    seriesField: 'stars',
                                    isPercent: true,
                                    isStack: true,
                                    autoFit: true,
                                    width: 1200,
                                    // padding: [30, 100, 80, 80],
                                    xAxis: {
                                        title: {
                                            text: 'Percentage',
                                        },
                                    },
                                    yAxis: {
                                        title: {
                                            text: 'City',
                                        },
                                    },
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
                                }
                                />
                            }
                        </Row>
                    </TabPane>
                    <TabPane tab="City" key="city" >
                        <Row justify='center'>
                            <Space>
                                <h4>Select a state:   </h4>
                                <Cascader options={CityOptions} onChange={this.handleCityNameQueryChange} placeholder="Please select" />
                                <Button type="primary" size="medium" onClick={this.UpdatePrice}>Search</Button>
                            </Space>
                        </Row>

                        {this.state.starBarPlot.length == 0 ? null :
                            < Bar {...{
                                data: this.state.starBarPlot,
                                xField: 'count',
                                yField: 'title',
                                seriesField: 'stars',
                                isPercent: true,
                                isStack: true,
                                autoFit: true,
                                width: 1200,
                                // padding: [30, 100, 80, 80],
                                xAxis: {
                                    title: {
                                        text: 'Percentage',
                                    },
                                },
                                yAxis: {
                                    title: {
                                        text: 'Postal Code',
                                    },
                                },
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
                            }
                            />
                        }
                    </TabPane>
                    <TabPane tab="Postal Code" key="postal_code">
                        <Row justify='center'>
                            <Space>
                                <h4>Input Zip Code:  </h4>
                                <Input placeholder="input search text" allowClear enterButton="Search" size="large" onChange={this.handleZipNameQueryChange} />
                                <Button type="primary" size="medium" onClick={this.UpdatePrice}>Search</Button>
                            </Space>
                        </Row>

                        <Row justify='center'>
                            {this.state.starDonutPlot == 0 ? null : this.pricePiePlot()}
                        </Row>
                    </TabPane>
                </Tabs>
            </Row>
            <Divider />

        </div>
    );

    DemoAreaMap = () => {
        this.setState({ mapType: 'FeatureCollection', features: [] });
        //UPDATE MAP DATA
        //TO-DO
        const asyncFetch = () => {
            fetch('https://gw.alipayobjects.com/os/basement_prod/d36ad90e-3902-4742-b8a2-d93f7e5dafa2.json')
                .then((response) => response.json())
                .then((json) => {
                    this.setState({ mapType: json.type, features: json.features });
                })
                .catch((error) => {
                    console.log('fetch data failed', error);
                });
        };
        const color = [
            'rgb(255,255,217)',
            'rgb(237,248,177)',
            'rgb(199,233,180)',
            'rgb(127,205,187)',
            'rgb(65,182,196)',
            'rgb(29,145,192)',
            'rgb(34,94,168)',
            'rgb(12,44,132)',
        ];
        const config = {
            map: {
                type: 'mapbox',
                style: 'blank',
                center: [120.19382669582967, 30.258134],
                zoom: 3,
                pitch: 0,
            },
            source: {
                data: this.state.data,
                parser: {
                    type: 'geojson',
                },
            },
            autoFit: true,
            color: {
                field: 'density',
                value: color,
                scale: {
                    type: 'quantile',
                },
            },
            style: {
                opacity: 1,
                stroke: 'rgb(93,112,146)',
                lineType: 'dash',
                lineDash: [2, 2],
                lineWidth: 0.6,
                lineOpacity: 1,
            },
            state: {
                active: true,
                select: true,
            },
            tooltip: {
                items: ['name', 'density'],
            },
            zoom: {
                position: 'bottomright',
            },
            legend: {
                position: 'bottomleft',
            },
        };

        return <AreaMap {...config} />;
    };


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
                        {this.priceTab()}
                    </TabPane>
                    <TabPane tab="Map" key="3" id='mapPage'>

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
