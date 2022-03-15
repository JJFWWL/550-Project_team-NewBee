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
    List,
    Avatar,
    Button,
    Skeleton,
    Typography
} from 'antd'
import { RadarChart } from 'react-vis';
import { format } from 'd3-format';

import MenuBar from '../components/MenuBar';
import { getPlayerSearch, getPlayer } from '../fetcher'
const wideFormat = format('.3r');
const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
];

const playerColumns = [
    {
        title: 'Name',
        dataIndex: 'Name',
        key: 'Name',
        sorter: (a, b) => a.Name.localeCompare(b.Name),
        render: (text, row) => <a href={`/players?id=${row.PlayerId}`}>{text}</a>
    },
    {
        title: 'Review Count',
        dataIndex: 'ReviewCount',
        key: 'ReviewCount',
        sorter: (a, b) => a.Reviewcount.localeCompare(b.Reviewcount)
    },
    {
        title: 'Yelping Since',
        dataIndex: 'YelpingSince',
        key: 'YelpingSince',
        sorter: (a, b) => a.YelpingSince - b.YelpingSince

    }
];


class PlayersPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            oneConnectionQuery: '',
            twoConnectionQuery: '',
            threeConnectionQuery: '',
            businessQuery: '',

            selectedPlayerId: window.location.search ? window.location.search.substring(1).split('=')[1] : 229594,
            selectedPlayerDetails: null,
            playersResults: []

        }

        this.updateSearchResults = this.updateSearchResults.bind(this)
        this.handleNameQueryChange = this.handleNameQueryChange.bind(this)
        this.handleClubQueryChange = this.handleClubQueryChange.bind(this)
    }



    handleNameQueryChange(event) {
        this.setState({ nameQuery: event.target.value })
    }

    handleClubQueryChange(event) {
        // TASK 20: update state variables appropriately. See handleNameQueryChange(event) for reference
        this.setState({ clubQuery: event.target.value })
    }

    handleNationalityQueryChange(event) {
        // TASK 21: update state variables appropriately. See handleNameQueryChange(event) for reference
        this.setState({ nationalityQuery: event.target.value })
    }

    handleRatingChange(value) {
        this.setState({ ratingLowQuery: value[0] })
        this.setState({ ratingHighQuery: value[1] })
    }

    handlePotentialChange(value) {
        // TASK 22: parse value and update state variables appropriately. See handleRatingChange(value) for reference
        this.setState({ potLowQuery: value[0] })
        this.setState({ potHighQuery: value[1] })
    }



    updateSearchResults() {

        //TASK 23: call getPlayerSearch and update playerResults in state. See componentDidMount() for a hint
        getPlayerSearch(this.state.nameQuery, this.state.nationalityQuery, this.state.clubQuery, this.state.ratingHighQuery, this.state.ratingLowQuery, this.state.potHighQuery, this.state.potLowQuery, null, null).then(res => {
            this.setState({ playersResults: res.results })
        })
    }

    componentDidMount() {
        getPlayerSearch(this.state.nameQuery, this.state.nationalityQuery, this.state.clubQuery, this.state.ratingHighQuery, this.state.ratingLowQuery, this.state.potHighQuery, this.state.potLowQuery, null, null).then(res => {
            this.setState({ playersResults: res.results })
        })

        // TASK 25: call getPlayer with the appropriate parameter and set update the correct state variable. 
        // See the usage of getMatch in the componentDidMount method of MatchesPage for a hint! 
        getPlayer(this.state.selectedPlayerId).then(res => {
            // this.setState({ selectedPlayerDetails: res.results[0] })
        })
    }

    render() {
        return (

            <div>

                <MenuBar />
                <Form style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Business</label>
                            <FormInput placeholder="Name" value={this.state.nameQuery} onChange={this.handleNameQueryChange} />
                        </FormGroup></Col>
                    </Row>
                    <br></br>
                </Form>
                <Divider orientation="left">Top rated business</Divider>
                <List
                    // header={<div>Header</div>}
                    // footer={<div>Footer</div>}
                    bordered
                    dataSource={data}
                    renderItem={item => (
                        <List.Item>
                            <Typography.Text mark>[ITEM]</Typography.Text> {item}
                        </List.Item>
                    )}
                />

                {/* TASK 24: Copy in the players table from the Home page, but use the following style tag: style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }} - this should be one line of code! */}
                <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
                    <h3>People Recomended</h3>
                    <Table dataSource={this.state.playersResults} columns={playerColumns} pagination={{ pageSizeOptions: [5, 10], defaultPageSize: 5, showQuickJumper: true }} />
                </div>
                <Divider />

                {this.state.selectedPlayerDetails ? <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
                    <Card>

                        <CardBody>
                            <Row gutter='30' align='middle' justify='center'>
                                <Col flex={2} style={{ textAlign: 'left' }}>
                                    <h3>{this.state.selectedPlayerDetails.Name}</h3>

                                </Col>

                                <Col flex={2} style={{ textAlign: 'right' }}>
                                    <img src={this.state.selectedPlayerDetails.Photo} referrerpolicy="no-referrer" alt={null} style={{ height: '15vh' }} />

                                </Col>
                            </Row>
                            <Row gutter='30' align='middle' justify='left'>
                                <Col>
                                    <h5>{this.state.selectedPlayerDetails.Club}</h5>
                                </Col>
                                <Col>
                                    <h5>{this.state.selectedPlayerDetails.JerseyNumber}</h5>
                                </Col>
                                <Col>
                                    <h5>{this.state.selectedPlayerDetails.BestPosition}</h5>
                                </Col>
                            </Row>
                            <br>
                            </br>
                            <Row gutter='30' align='middle' justify='left'>
                                <Col>
                                    Age: {this.state.selectedPlayerDetails.Age}
                                </Col>
                                {/* TASK 28: add two more columns here for Height and Weight, with the appropriate labels as above */}
                                <Col>
                                    Height: {this.state.selectedPlayerDetails.Height}
                                </Col>
                                <Col>
                                    Weight: {this.state.selectedPlayerDetails.Weight}
                                </Col>
                                <Col flex={2} style={{ textAlign: 'right' }}>
                                    {this.state.selectedPlayerDetails.Nationality}
                                    <img src={this.state.selectedPlayerDetails.Flag} referrerpolicy="no-referrer" alt={null} style={{ height: '3vh', marginLeft: '1vw' }} />
                                </Col>

                            </Row>
                            <Row gutter='30' align='middle' justify='left'>
                                <Col>
                                    Value: {this.state.selectedPlayerDetails.Value}
                                </Col>
                                <Col>
                                    Release Clause: {this.state.selectedPlayerDetails.ReleaseClause}
                                </Col>
                                {/* TASK 29: Create 2 additional columns for the attributes 'Wage' and 'Contract Valid Until' (use spaces between the words when labelling!) */}
                                <Col>
                                    Wage: {this.state.selectedPlayerDetails.Wage}
                                </Col>
                                <Col>
                                    Contract Valid Until: {this.state.selectedPlayerDetails.ContractValidUntil}
                                </Col>
                            </Row>
                        </CardBody>

                    </Card>

                    <Card style={{ marginTop: '2vh' }}>
                        <CardBody>
                            <Row gutter='30' align='middle' justify='center'>
                                <Col flex={2} style={{ textAlign: 'left' }}>
                                    <h6>Skill</h6>
                                    <Rate disabled defaultValue={this.state.selectedPlayerDetails.Skill} />
                                    <h6>Reputation</h6>
                                    {/* TASK 30: create a star rating component for 'InternationalReputation'. Make sure you use the 'disabled' option as above to ensure it is read-only*/}
                                    <h6>InternationalReputation</h6>
                                    <Rate disabled defaultValue={this.state.selectedPlayerDetails.InternationalReputation} />
                                    <Divider />
                                    <h6>Best Rating</h6>
                                    <Progress style={{ width: '20vw' }} value={this.state.selectedPlayerDetails.BestOverallRating} >{this.state.selectedPlayerDetails.BestOverallRating}</Progress>
                                    {/* TASK 31: create the headings and progress bars for 'Potential' and 'Rating'. Use the same style as the one above for 'Best Rating'.*/}
                                    <h6>Potential</h6>
                                    <Progress style={{ width: '20vw' }} value={this.state.selectedPlayerDetails.Potential} >{this.state.selectedPlayerDetails.Potential}</Progress>
                                    <h6>Rating</h6>
                                    <Progress style={{ width: '20vw' }} value={this.state.selectedPlayerDetails.Rating} >{this.state.selectedPlayerDetails.Rating}</Progress>

                                </Col >
                                <Col push={2} flex={2}>
                                    {/*TASK 32: In case the player is a GK, show a radar chart (replacing 'null' below) with the labels: Agility, Ball Control, Passing, Positioning, Stamina, Strength */}

                                    {this.state.selectedPlayerDetails.BestPosition == 'GK' ?
                                        (<RadarChart
                                            data={[this.state.selectedPlayerDetails]}
                                            tickFormat={t => wideFormat(t)}
                                            startingAngle={0}
                                            domains={[
                                                { name: 'Penalties', domain: [0, 100], getValue: d => d.GKPenalties },
                                                { name: 'Diving', domain: [0, 100], getValue: d => d.GKDriving },
                                                { name: 'Handling', domain: [0, 100], getValue: d => d.GKHandling },
                                                { name: 'Kicking', domain: [0, 100], getValue: d => d.GKKicking },
                                                { name: 'Positioning', domain: [0, 100], getValue: d => d.GKPositioning },
                                                { name: 'Reflexes', domain: [0, 100], getValue: d => d.GKReflexes }
                                            ]}
                                            width={450}
                                            height={400}
                                        />) : (<RadarChart
                                            data={[this.state.selectedPlayerDetails]}
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
                                        />)
                                    }

                                </Col>
                            </Row>
                        </CardBody>
                    </Card>

                </div> : null}

            </div>
        )
    }
}

export default PlayersPage

