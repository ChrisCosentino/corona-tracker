import React, { useState } from 'react';
import ReactTooltip from 'react-tooltip';

import MapChart from './MapChart';
import { BarChart, XAxis, YAxis, Label, CartesianGrid, Tooltip, Legend, Bar, LineChart, Line, ResponsiveContainer } from 'recharts';

import { AiFillGithub } from 'react-icons/ai';

import './styles.css'

// const [content, setContent] = useState("");


const rounded = num => {
    if (num > 1000000000) {
      return Math.round(num / 100000000) / 10 + "Bn";
    } else if (num > 1000000) {
      return Math.round(num / 100000) / 10 + "M";
    } else if (num > 1000) {
        return Math.round(num / 100) / 10 + "K";
    } else {
        return num;
    }
};

const App = () => {
    const [content, setContent] = useState('');
    const [activeCountries, setActiveCountry] = useState([]);
    
    return (
        <div>
            <nav>
                <a href="#map" id="title"><h1 >Covid 19 Tracker by Chris Cosentino</h1></a>
                <div className="nav-links">
                    
                    <a href="#new" className="nav-link">New Cases</a>
                    <a href="#total" className="nav-link">Total Cases</a>
                    <a href="https://github.com/ChrisCosentino" className="github-icon"><AiFillGithub id="icon" /></a>
                </div>
                
            </nav>
            
            <section id="map">
                <MapChart setTooltipContent={setContent} setActiveCountry={setActiveCountry} className="map"  />
                <ReactTooltip>
                    {content
                    ? 
                    <div>
                        <h1>{content.Country}</h1>
                        <table>
                            <tbody>
                                <tr>
                                    <th>New Confirmed</th>
                                    <td>{rounded(content.NewConfirmed)}</td>
                                </tr>
                                <tr>
                                    <th>New Deaths</th>
                                    <td>{rounded(content.NewDeaths)}</td>
                                </tr>
                                <tr>
                                    <th>New Recovered</th>
                                    <td>{rounded(content.NewRecovered)}</td>
                                </tr>
                                <tr>
                                    <th>Total Confirmed</th>
                                    <td>{rounded(content.TotalConfirmed)}</td>
                                </tr>
                                <tr>
                                    <th>Total Recovered</th>
                                    <td>{rounded(content.TotalRecovered)}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div>Valid as of: {new Date(content.Date).toLocaleString()}</div>
                    </div>
                    : 
                    <div>Not Found</div>
                    }
                </ReactTooltip>
            </section>

            <div>
                {activeCountries 
                ?
                <div>
                <div id="new">
                    <h1>New Cases</h1>
                    <section id="linechart">
                        <ResponsiveContainer width="95%" height={250}>
                            <LineChart data={activeCountries}
                                margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="Country"></XAxis>
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="NewConfirmed" stroke="#6666FF" />
                                <Line type="monotone" dataKey="NewDeaths" stroke="#5cb85c" />
                                <Line type="monotone" dataKey="NewRecovered" stroke="#FF6633" />
                            </LineChart>
                        </ResponsiveContainer>
                    </section>
                    <section id="barchart">
                        <ResponsiveContainer width="95%" height={250}>
                            <BarChart data={activeCountries}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="Country"></XAxis>
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="NewConfirmed" fill="#6666FF" />
                                <Bar dataKey="NewDeaths" fill="#5cb85c" />
                                <Bar dataKey="NewRecovered" fill="#FF6633" />
                            </BarChart>
                        </ResponsiveContainer>
                    </section>
                </div>
                <div id="total">
                    <h1>Total Cases</h1>
                    <section id="linechart">
                        <ResponsiveContainer width="95%" height={250}>
                            <LineChart data={activeCountries}
                                margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="Country"></XAxis>
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="TotalConfirmed" stroke="#6666FF" />
                                <Line type="monotone" dataKey="TotalRecovered" stroke="#5cb85c" />
                            </LineChart>
                        </ResponsiveContainer>
                    </section>
                    <section id="barchart">
                        <ResponsiveContainer width="95%" height={250}>
                            <BarChart data={activeCountries}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="Country"></XAxis>
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="TotalConfirmed" fill="#6666FF" />
                                <Bar dataKey="TotalRecovered" fill="#5cb85c" />
                            </BarChart>
                        </ResponsiveContainer>
                    </section>
                </div>
                </div>
                :
                <div>

                </div>
                }
            </div>
        </div>
    )



}



export default App
