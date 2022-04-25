import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Input, Table, Radio, Cascader, Select, Row, Col, Divider, Space, Tabs, Button, Spin, Alert, Result } from 'antd'
import { SearchOutlined, StarFilled } from '@ant-design/icons';
import { Bar, Pie, measureTextWidth } from '@ant-design/plots';
import { Chart } from "react-google-charts";
import { format } from 'd3-format';

import MenuBar from '../components/MenuBar';
import {
    getStarDistribution,
    getPriceDistribution,
    getAverageData,
    getHealthData
} from '../fetcher'
import { getSelectUnstyledUtilityClass } from '@mui/base';
import FormItem from 'antd/lib/form/FormItem';
import continuousColorLegend from 'react-vis/dist/legends/continuous-color-legend';
const wideFormat = format('.3r');

const { Column, ColumnGroup } = Table;
const { TabPane } = Tabs;
const { Option } = Select;

const stateMap = {
    "AL": "Alabama", "AK": "Alaska", "AZ": "Arizona", "AR": "Arkansas", "CA": "California", "CO": "Colorado",
    "CT": "Connecticut", "DE": "Delaware", "DC": "District Of Columbia", "FL": "Florida", "GA": "Georgia", "HI": "Hawaii",
    "ID": "Idaho", "IL": "Illinois", "IN": "Indiana", "IA": "Iowa", "KS": "Kansas", "KY": "Kentucky", "LA": "Louisiana", "ME": "Maine",
    "MD": "Maryland", "MA": "Massachusetts", "MI": "Michigan", "MN": "Minnesota", "MS": "Mississippi", "MO": "Missouri",
    "MT": "Montana", "NE": "Nebraska", "NV": "Nevada", "NH": "New Hampshire", "NJ": "New Jersey", "NM": "New Mexico",
    "NY": "New York", "NC": "North Carolina", "ND": "North Dakota", "OH": "Ohio", "OK": "Oklahoma", "OR": "Oregon",
    "PA": "Pennsylvania", "RI": "Rhode Island", "SC": "South Carolina", "SD": "South Dakota", "TN": "Tennessee",
    "TX": "Texas", "UT": "Utah", "VT": "Vermont", "VA": "Virginia", "WA": "Washington", "WV": "West Virginia",
    "WI": "Wisconsin", "WY": "Wyoming"
};

//Massachusetts,25783,1.8558,
//Oregon,18991,1.7356,
//Texas,17496,1.7513,
//Florida,16662,1.73,
//Georgia,13636,1.8028,
//?,12416,1.8869,
//Ohio,8842,1.6977,
//Colorado,2471,1.8617,
//Washington,2403,1.7216

const USMapData = [
    ['State', 'NumberOfBusiness', 'AvragePrice'],
    ['Alabama', 200, 3],
    ['Washington', 300, 4],
    ['California', 400, 5],
    ['Colorado', 500, 4],
    ['Utah', 600, 4],
    ['Texas', 700, 4],
];

const sampleCityData = [
    ['City', 'NumberOfBusiness', 'AvragePrice'],
    ['Boston', 200, 3],
    ['New York', 300, 4],
    ['San Francisco', 400, 5],
    ['Los Angeles', 500, 4],
    ['Chicago', 600, 4],
    ['Houston', 700, 4],
    ['Philadelphia', 800, 4],
    ['Washington', 900, 4],
    ['Miami', 1000, 4],
]

const stateMapOptions = {
    region: "US", //United States
    resolution: "provinces",
    displayMode: 'auto',
    magnifyingGlass: {
        enable: true,
        zoomFactor: 20.0
    }

};
const CityMapOptions = {
    region: "US", //United States
    displayMode: 'markers',
    magnifyingGlass: {
        enable: true,
        zoomFactor: 20.0
    }
}


function USMap(props) {
    return (
        <Chart
            chartEvents={[
                {
                    eventName: "select",
                    callback: ({ chartWrapper }) => {
                        const chart = chartWrapper.getChart();
                        const selection = chart.getSelection();
                        if (selection.length === 0) return;
                        const region = props.data[selection[0].row + 1];
                        console.log("Selected : " + region);
                    },
                },
            ]}
            chartType="GeoChart"
            width="500px"
            height="400px"

            data={props.data}
            options={props.options}
        />
    );

}



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

//Properties : {data, xField, yField, seriesField, xAxisLabel, yAxisLabel}
function BarPlot(props) {
    return < Bar {...{
        data: props.data,
        xField: props.xField,
        yField: props.yField,
        seriesField: props.seriesField,
        isPercent: true,
        isStack: true,
        autoFit: true,
        width: 1200,
        xAxis: { title: { text: props.xAxisLabel } },
        yAxis: { title: { text: props.yAxisLabel } },
        label: {
            position: 'middle',
            content: (item) => { return item.count.toFixed(2); },
            style: { fill: '#fff' }
        }
    }}
    />
}

function DonutPlot(props) {
    var config = {
        appendPadding: 10,
        data: props.data,
        angleField: props.angleField,
        colorField: props.colorField,
        radius: 1,
        innerRadius: 0.6,
        meta: { percent: { formatter: (v) => v + '%' } },
        label: { type: 'inner', offset: '-50%', style: { textAlign: 'center', fontSize: 14 } },
        interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
        statistic: {
            title: false,
            content: {
                style: {
                    whiteSpace: 'pre-wrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                },
                content: props.title,
            },
        },
    };

    return <Pie {...config} />;
};

class ScientistPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            regionQuery: 'state',
            stateNameQuery: '',
            cityNameQuery: '',
            zipNameQuery: '',
            starDistribution: [],
            priceDistribution: [],
            averageRating: [],

            starBarPlot: [],
            priceBarPlot: [],
            starDonutPlot: [],
            priceDonutPlot: [],

            stateMapData: [],
            statePriceData: [],
            stateRatingData: [],
            displayAvgPrice: true,
            cityMapData: [],
            zipMapData: [],

            healthStateQuery: '',
            healthData: [],
            healthDataPrice: [],
            healthDataRating: [],
            loadings: []
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
        this.UpdateMapData = this.UpdateMapData.bind(this)
        this.updateHealthData = this.updateHealthData.bind(this)
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
            stateNameQuery: value[0],
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
        let countKey = type === 'stars' ? starCount : priceCount;
        let dataset = type === 'stars' ? this.state.starDistribution : this.state.priceDistribution;
        if (dataset.length === 0) return;

        for (let i = 0; i < dataset.length; i++) {
            let element = dataset[i];
            var sum = element[countKey[1]] + element[countKey[2]] + element[countKey[3]] + element[countKey[4]] + element[countKey[5]];
            result.push({ "title": element[title], [type]: "$", "count": element[countKey[1]], "sum": sum });
            result.push({ "title": element[title], [type]: "$$", "count": element[countKey[2]], "sum": sum });
            result.push({ "title": element[title], [type]: "$$$", "count": element[countKey[3]], "sum": sum });
            result.push({ "title": element[title], [type]: "$$$$", "count": element[countKey[4]], "sum": sum });
            result.push({ "title": element[title], [type]: "$$$$$", "count": element[countKey[5]], "sum": sum });
        }

        result = result.sort(function (a, b) {
            return b.sum - a.sum;
        });

        if (type === 'stars') {
            this.setState({
                starBarPlot: result.slice(0, 50)
            })
        } else {
            this.setState({
                priceBarPlot: result.slice(0, 50)
            })
        }

    }

    UpdateStarDistribution() {
        var NameQuery = '';
        var title = '';
        console.log("this.state.regionQuery is :" + this.state.regionQuery);
        if (this.state.regionQuery === 'state') {
            NameQuery = this.state.stateNameQuery;
            title = 'city';
        } else if (this.state.regionQuery === 'city') {
            NameQuery = this.state.cityNameQuery;
            title = 'postal_code';
        } else if (this.state.regionQuery === 'zip') {
            NameQuery = this.state.zipNameQuery;
        }
        console.log("NameQuery is :" + NameQuery);

        if (this.state.regionQuery === 'state' || this.state.regionQuery === 'city') {
            getStarDistribution(this.state.regionQuery, NameQuery, null, null).then(res => {
                this.setState({ starDistribution: res.results }, () => {
                    this.getStarBarPlot(title, 'stars');
                })
            });
        } else if (this.state.regionQuery === 'zip') {
            console.log("regionQuery is " + this.state.regionQuery);
            console.log("zipNameQuery is " + this.state.zipNameQuery);
            let tempData = []
            getStarDistribution(this.state.regionQuery, NameQuery, null, null).then(res => {
                let tempData = [];
                if (res.results.length > 0) {
                    tempData.push({ "stars": "2-2.5 Stars", "count": res.results[0]['count'] + res.results[1]['count'] });
                    tempData.push({ "stars": "3-3.5 Stars", "count": res.results[2]['count'] + res.results[3]['count'] });
                    tempData.push({ "stars": "4-4.5 Stars", "count": res.results[4]['count'] + res.results[5]['count'] });
                    tempData.push({ "stars": "5 Stars", "count": res.results[6]['count'] });
                }
                this.setState({ starDonutPlot: tempData });
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
                this.setState({ priceDistribution: res.results }, () => {
                    console.log("title is :" + title);
                    this.getStarBarPlot(title, 'price');
                }
                )
            });
        } else if (this.state.regionQuery === 'zip') {
            console.log("regionQuery is " + this.state.regionQuery);
            console.log("zipNameQuery is " + this.state.zipNameQuery);
            getPriceDistribution(this.state.regionQuery, NameQuery, null, null).then(res => {
                let result = [];
                if (res.results.length > 0) {
                    result.push({ 'price': '$', 'percent': Math.round(res.results[0]['percent'] * 100) });
                    result.push({ 'price': '$$', 'percent': Math.round(res.results[1]['percent'] * 100) });
                    result.push({ 'price': '$$$', 'percent': Math.round(res.results[2]['percent'] * 100) });
                    result.push({ 'price': '$$$$', 'percent': Math.round(res.results[3]['percent'] * 100) });
                }
                this.setState({ priceDonutPlot: result });
            });
        }
    }

    UpdateMapData(key) {
        if (key === 'price') {
            this.setState({ displayAvgPrice: true });
        } else {
            this.setState({ displayAvgPrice: false });
        }

    }

    handleTabChange(key) {
        this.setState({
            stateNameQuery: '',
            cityNameQuery: '',
            zipNameQuery: '',
            starDistribution: [],
            priceDistribution: [],
            starBarPlot: [],
            priceBarPlot: [],
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
                loadings: [false]
            })
            console.log(`${res.results.length}, and ${this.state.healthDataPrice.length}`)
            console.log(`${this.state.healthDataPrice[0].price}, and ${this.state.healthDataPrice[0].county}, and ${this.state.healthDataPrice[0].value}`)
        })
    }

    componentDidMount() {
        //this.UpdateStarDistribution();
        this.UpdateMapData('price')
        {
            getAverageData('state', null, null).then(res => {
                this.setState({ stateMapData: res.results });
                let priceresult = [];
                let ratingresult = [];
                priceresult.push(['State', 'Average Price', 'NumberOfBusiness']);
                ratingresult.push(['State', 'Average Rating', 'NumberOfBusiness']);
                if (res.results.length > 0) {
                    for (let i = 0; i < res.results.length; i++) {
                        if (res.results[i].state != 'BC') {
                            priceresult.push([stateMap[res.results[i]['state']], res.results[i]['avg_price'], res.results[i]['num']]);
                            ratingresult.push([stateMap[res.results[i]['state']], res.results[i]['avg_review'], res.results[i]['num']]);
                        }
                    }
                    this.setState({ statePriceData: priceresult });
                    this.setState({ stateRatingData: ratingresult });
                }
            });
        }
    }




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
                                <Select style={{ width: 150 }} onChange={this.handleStateNameQueryChange}>
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
                                <BarPlot
                                    data={this.state.starBarPlot}
                                    xField="count"
                                    yField="title"
                                    seriesField="stars"
                                    xAxisLabel="Percentage of Businesses"
                                    yAxisLabel="City"
                                />
                            }
                        </Row>
                    </TabPane>
                    <TabPane tab="City" key="city" >
                        <Row justify='center'>
                            <Space>
                                <h4>Select a state:   </h4>
                                <Cascader size="" options={CityOptions} onChange={this.handleCityNameQueryChange} placeholder="Please select" />
                                &nbsp;
                                <Button type="primary" size="medium" onClick={this.UpdateStarDistribution}>Search</Button>
                            </Space>
                        </Row>
                        <Row justify='center'>
                            {<h3>City: {this.state.cityNameQuery + ' | ' + this.state.stateNameQuery}</h3>}
                        </Row>

                        {this.state.starBarPlot.length == 0 ? null :
                            <BarPlot
                                data={this.state.starBarPlot}
                                xField="count"
                                yField="title"
                                seriesField="stars"
                                xAxisLabel="Percentage of Businesses"
                                yAxisLabel="Postal Code"
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
                            {<h3>Zip: {this.state.zipNameQuery}</h3>}
                        </Row>

                        <Row justify='center'>
                            {this.state.starDonutPlot == 0 ? <Result title="Input a valid postal code." /> :
                                <DonutPlot
                                    data={this.state.starDonutPlot}
                                    angleField="count"
                                    colorField="stars"
                                    title="Business Rating"
                                />
                            }
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
                <h4>Business Price Rating: </h4>
            </Row>
            <Row justify='center' >
                <Tabs defaultActiveKey="state" centered type="card" size='large' onChange={this.handleTabChange}>
                    <TabPane tab="State" key="state" >
                        <Row justify='center'>
                            <Space>
                                <h4>Select a state:   </h4>
                                <Select style={{ width: 150 }} onChange={this.handleStateNameQueryChange}>
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
                            {this.state.priceBarPlot == 0 ? null :
                                <BarPlot
                                    data={this.state.priceBarPlot}
                                    xField="count"
                                    yField="title"
                                    seriesField="price"
                                    xAxisLabel="Percentage of Businesses"
                                    yAxisLabel="City"
                                />
                            }
                        </Row>
                    </TabPane>
                    <TabPane tab="City" key="city" >
                        <Row justify='center'>
                            <Space>
                                <h4>Select a state:   </h4>
                                <Cascader size="medium" options={CityOptions} onChange={this.handleCityNameQueryChange} placeholder="Please select" />

                                <Button type="primary" size="medium" onClick={this.UpdatePrice}>Search</Button>
                            </Space>
                        </Row>
                        <Row justify='center'>
                            {<h3>City: {this.state.cityNameQuery + ' | ' + this.state.stateNameQuery}</h3>}
                        </Row>

                        {this.state.priceBarPlot.length == 0 ? null :
                            <BarPlot
                                data={this.state.priceBarPlot}
                                xField="count"
                                yField="title"
                                seriesField="price"
                                xAxisLabel="Percentage of Businesses"
                                yAxisLabel="Postal Code"
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
                            {<h3>Zip: {this.state.zipNameQuery}</h3>}
                        </Row>

                        <Row justify='center'>
                            {this.state.priceDonutPlot == 0 ? <Result title="Input a valid postal code." /> :
                                <DonutPlot
                                    data={this.state.priceDonutPlot}
                                    angleField="percent"
                                    colorField="price"
                                    title="Business Rating"
                                />
                            }
                        </Row>
                    </TabPane>
                </Tabs>
            </Row>
            <Divider />
        </div>
    );

    overviewTab = () => (
        <div>
            <Row justify='center'>
                <h3>Business Overview: </h3>
            </Row>
            <Row justify='center' >
                <Tabs defaultActiveKey="state" centered type="card" size='large' onChange={this.handleTabChange}>
                    <TabPane tab="State" key="state" >
                        <Row justify='center'>
                            <h4>State Overview</h4>
                        </Row>
                        <Tabs defaultActiveKey="price" centered type="card" size='large'>
                            <TabPane tab="Average Price" key="price" >
                                <Row justify='center'>
                                    <h5>Price Range: 1 - 4</h5>
                                </Row>
                                <Row justify='center'>
                                    <USMap
                                        data={this.state.statePriceData}
                                        options={stateMapOptions} />
                                </Row>
                            </TabPane>
                            <TabPane tab="Average Rating" key="stars" >
                                <Row justify='center'>
                                    <h5>Rating Range: 1 - 5</h5>
                                </Row>
                                <Row justify='center'>
                                    <USMap
                                        data={this.state.stateRatingData}
                                        options={stateMapOptions} />
                                </Row>
                            </TabPane>
                        </Tabs>
                    </TabPane>
                    <TabPane tab="City" key="city" >
                        <Row justify='center'>
                            <h3>City level map</h3>
                        </Row>
                        <Row justify='center'>
                            <USMap
                                data={sampleCityData}
                                options={CityMapOptions} />
                        </Row>
                    </TabPane>
                    <TabPane tab="Postal Code" key="postal_code">
                        <Row justify='center'>
                            <h3>Postal Code level map</h3>
                        </Row>
                    </TabPane>
                </Tabs>
            </Row>
            <Divider />
        </div >
    )


    healthTab() {
        const { loadings } = this.state;
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
                <Button onClick={() => { this.enterLoading(0); this.updateHealthData(); }} loading={loadings[0]}>Search</Button>
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
                <Tabs defaultActiveKey="1" centered type="card" size='large' onChange={this.handleTabChange} >
                    <TabPane tab="Rating" key="1">
                        {this.ratingTab()}
                    </TabPane>
                    <TabPane tab="Price" key="2">
                        {this.priceTab()}
                    </TabPane>
                    <TabPane tab="Overview" key="3">
                        {this.overviewTab()}
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
