import React from 'react';

import {
    Form,
    Input,
    Table,
    Pagination,
    Select,
    Row,
    Col,
    Divider,
    Slider,
    Rate,
    List,
    Avatar,
    Button,
    Switch,
    Skeleton,
    Typography,
    Tag,
    Space
} from 'antd'
// import { Pie } from '@ant-design/plots';
import * as V from 'victory';
import { RadarChart } from 'react-vis';
import { format } from 'd3-format';

import MenuBar from '../components/MenuBar';
import {
    getStarDistributionByState,
    getStarDistributionByCity,
    getStarDistributionByZip,
    getPriceDistributionByState,
    getPriceDistributionByCity,
    getPriceDistributionByZip,
    getAverageRatingByState,
    getAverageRatingByCity,
    getAverageRatingByZip,
    getAveragePriceByState,
    getAveragePriceByCity,
    getAveragePriceByZip,
    getBusinessPercentageByState,
    getBusinessPercentageByCity,
    getBusinessPercentageByZip
} from '../fetcher'
import { getSelectUnstyledUtilityClass } from '@mui/base';
import FormItem from 'antd/lib/form/FormItem';
const wideFormat = format('.3r');

const { Column, ColumnGroup } = Table;

class ScientistPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            stateQuery: '',
            cityQuery: '',
            zipQuery: '',
            stateLevelStarDistribution: [],
            cityLevelStarDistribution: [],
            zipLevelStarDistribution: [],
            stateLevelPriceDistribution: [],
            cityLevelPriceDistribution: [],
            zipLevelPriceDistribution: [],
            averageRatingByState: [],
            averageRatingByCity: [],
            averageRatingByZip: [],
            averagePriceByState: [],
            averagePriceByCity: [],
            averagePriceByZip: [],
            businessPercentageByState: [],
            businessPercentageByCity: [],
            businessPercentageByZip: []

        }
        this.handleStateQueryChange = this.handleStateQueryChange.bind(this)
        this.hadnleCityQueryChange = this.hadnleCityQueryChange.bind(this)
        this.handleZipQueryChange = this.handleZipQueryChange.bind(this)

        this.UpdateStateLevelStarDistribution = this.UpdateStateLevelStarDistribution.bind(this)
        this.UpdateCityLevelStarDistribution = this.UpdateCityLevelStarDistribution.bind(this)
        this.UpdateZipLevelStarDistribution = this.UpdateZipLevelStarDistribution.bind(this)
        this.UpdateStateLevelPriceDistribution = this.UpdateStateLevelPriceDistribution.bind(this)
        this.UpdateCityLevelPriceDistribution = this.UpdateCityLevelPriceDistribution.bind(this)
        this.UpdateZipLevelPriceDistribution = this.UpdateZipLevelPriceDistribution.bind(this)
        this.UpdateAverageRatingByState = this.UpdateAverageRatingByState.bind(this)
        this.UpdateAverageRatingByCity = this.UpdateAverageRatingByCity.bind(this)
        this.UpdateAverageRatingByZip = this.UpdateAverageRatingByZip.bind(this)
        this.UpdateAveragePriceByState = this.UpdateAveragePriceByState.bind(this)
        this.UpdateAveragePriceByCity = this.UpdateAveragePriceByCity.bind(this)
        this.UpdateAveragePriceByZip = this.UpdateAveragePriceByZip.bind(this)
        this.UpdateBusinessPercentageByState = this.UpdateBusinessPercentageByState.bind(this)
        this.UpdateBusinessPercentageByCity = this.UpdateBusinessPercentageByCity.bind(this)
        this.UpdateBusinessPercentageByZip = this.UpdateBusinessPercentageByZip.bind(this)

    }

    handleStateQueryChange(event) {
        this.setState({
            stateQuery: event.target.value
        })
    }

    hadnleCityQueryChange(event) {
        this.setState({
            cityQuery: event.target.value
        })
    }

    handleZipQueryChange(event) {
        this.setState({
            zipQuery: event.target.value
        })
    }


    UpdateStateLevelStarDistribution() {
        getStarDistributionByState(this.state.stateQuery, null, null).then(res => {
            this.setState({
                stateLevelStarDistribution: res.results
            })
        })
    }

    UpdateCityLevelStarDistribution() {
        getStarDistributionByCity(this.state.cityQuery, null, null).then(res => {
            this.setState({
                cityLevelStarDistribution: res.results
            })
        })
    }

    UpdateZipLevelStarDistribution() {
        getStarDistributionByZip(this.state.zipQuery, null, null).then(res => {
            this.setState({
                zipLevelStarDistribution: res.results
            })
        })
    }

    UpdateStateLevelPriceDistribution() {
        getPriceDistributionByState(this.state.stateQuery, null, null).then(res => {
            this.setState({
                stateLevelPriceDistribution: res.results
            })
        })
    }

    UpdateCityLevelPriceDistribution() {
        getPriceDistributionByCity(this.state.cityQuery, null, null).then(res => {
            this.setState({
                cityLevelPriceDistribution: res.results
            })
        })
    }

    UpdateZipLevelPriceDistribution() {
        getPriceDistributionByZip(this.state.zipQuery, null, null).then(res => {
            this.setState({
                zipLevelPriceDistribution: res.results
            })

        })
    }

    UpdateAverageRatingByState() {
        getAverageRatingByState(this.state.stateQuery, null, null).then(res => {
            this.setState({
                averageRatingByState: res.results
            })
        })
    }

    UpdateAverageRatingByCity() {
        getAverageRatingByCity(this.state.cityQuery, null, null).then(res => {
            this.setState({
                averageRatingByCity: res.results
            })
        })
    }

    UpdateAverageRatingByZip() {
        getAverageRatingByZip(this.state.zipQuery, null, null).then(res => {
            this.setState({
                averageRatingByZip: res.results
            })
        })
    }

    UpdateAveragePriceByState() {
        getAveragePriceByState(this.state.stateQuery, null, null).then(res => {
            this.setState({
                averagePriceByState: res.results
            })
        })
    }

    UpdateAveragePriceByCity() {
        getAveragePriceByCity(this.state.cityQuery, null, null).then(res => {
            this.setState({
                averagePriceByCity: res.results
            })
        })
    }

    UpdateAveragePriceByZip() {
        getAveragePriceByZip(this.state.zipQuery, null, null).then(res => {
            this.setState({
                averagePriceByZip: res.results
            })
        })
    }

    UpdateBusinessPercentageByState() {
        getBusinessPercentageByState(this.state.stateQuery, null, null).then(res => {
            this.setState({
                businessPercentageByState: res.results
            })
        })
    }

    UpdateBusinessPercentageByCity() {
        getBusinessPercentageByCity(this.state.cityQuery, null, null).then(res => {
            this.setState({
                businessPercentageByCity: res.results
            })
        })
    }

    UpdateBusinessPercentageByZip() {
        getBusinessPercentageByZip(this.state.zipQuery, null, null).then(res => {
            this.setState({
                businessPercentageByZip: res.results
            })
        })
    }






    componentDidMount() {

        this.UpdateStateLevelStarDistribution()
        this.UpdateCityLevelStarDistribution()
        this.UpdateZipLevelStarDistribution()
        this.UpdateStateLevelPriceDistribution()
        this.UpdateCityLevelPriceDistribution()
        this.UpdateZipLevelPriceDistribution()
        this.UpdateAverageRatingByState()
        this.UpdateAverageRatingByCity()
        this.UpdateAverageRatingByZip()
        this.UpdateAveragePriceByState()
        this.UpdateAveragePriceByCity()
        this.UpdateAveragePriceByZip()
        this.UpdateBusinessPercentageByState()
        this.UpdateBusinessPercentageByCity()
        this.UpdateBusinessPercentageByZip()


    }

    render() {
        return (

            <div>
                <MenuBar />
                <Divider orientation="left">
                    <h3>Rating Distribution</h3>
                </Divider>
                <Row>
                    <Col span={5} offset={3}>
                        <Select
                            showSearch
                            placeholder="Select a State"
                            optionFilterProp="children"
                            // onChange={onChange}
                            // onSearch={onSearch}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            <Select value="MA">Massachusetts</Select>
                            <Select value="OR">Oregon</Select>
                            <Select value="CA">California</Select>
                            <Select value="Co">Colorado</Select>
                        </Select>
                    </Col>
                    <Col span={5} offset={3}>
                        <Select
                            showSearch
                            placeholder="Select a city"
                            optionFilterProp="children"
                            // onChange={onChange}
                            // onSearch={onSearch}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            <Select value="Boston">Boston</Select>
                            <Select value="Cambridge">Cambridge</Select>
                            <Select value="Wocester">Wocester</Select>
                            <Select value="Amherst">Amherst</Select>
                        </Select>

                    </Col>

                    <Col span={5} offset={3}>
                        <Select
                            showSearch
                            placeholder="Select a zipcode"
                            optionFilterProp="children"
                            // onChange={onChange}
                            // onSearch={onSearch}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            <Select value="1111">1111</Select>
                            <Select value="2222">2222</Select>
                            <Select value="3333">3333</Select>

                        </Select>
                    </Col>
                </Row>
                <Row>
                    <Col span={6} offset={3}>
                        <V.VictoryPie
                            data={[
                                { x: "MA", y: 35 },
                                { x: "CA", y: 40 },
                                { x: "CO", y: 55 }
                            ]}
                        />
                    </Col>
                </Row>
            </div >
        )
    }
}

export default ScientistPage
