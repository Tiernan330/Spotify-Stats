import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import MultiRangeSlider from "multi-range-slider-react";

import GraphsExtended from "./GraphsExtended";

import '../../CSS/SpotifyParseData.css'

function Extended(props) {
    let { theme, tracks} = props;

    const dates = tracks.map((track) => new Date(track.ts));
    const min = new Date(Math.min.apply(null, dates));
    const max = new Date(Math.max.apply(null, dates));
    const diff = Math.ceil((max - min) / (1000 * 60 * 60 * 24));
    const dateArray = [...Array(diff + 1).keys()].map((day) => {
        const date = new Date(min);
        date.setDate(date.getDate() + day);
        return date;
    });

    const [minDate, set_minDate] = useState(0);
    const [maxDate, set_maxDate] = useState(dateArray.length-1);
    const changeValue = (e) => {
        set_minDate(e.minValue);
        set_maxDate(e.maxValue);
    };

    const years = Array.from(new Set(dateArray.map((date) => date.getFullYear())));
    const [year, setYear] = useState(years[0])
    const [minLabel, set_minLabel] = useState(0);
    const [maxLabel, set_maxLabel] = useState(dateArray.length-1);
    const changeLabel = (e) => {
        set_minLabel(e.minValue);
        set_maxLabel(e.maxValue);
    };
    
    const labels = [dateArray[minDate].toLocaleDateString(), dateArray[maxDate].toLocaleDateString()]

    return(
        <>
            <div className="graphs-Container">
                <GraphsExtended theme={theme} tracks={tracks} startDate={dateArray[minDate].toLocaleDateString()} endDate={dateArray[maxDate].toLocaleDateString()} year={year}/>
            </div>
            <div id={theme+'-Tertiary'} className="filters-Container">
                <div className="filter slider">
                    <SliderComponent
                        id={theme+'-Tertiary'}
                        min={0}
                        max={diff}
                        step={1}
                        minValue={minDate}
                        minCaption={dateArray[minDate].toLocaleDateString()}
                        maxValue={maxDate}
                        maxCaption={dateArray[maxDate].toLocaleDateString()}
                        ruler={false}
                        label={true}
                        labels={labels}
                        onChange={(e) => {changeValue(e);}}
                    />
                </div>
                <Dropdown className="filter">
                    <Dropdown.Toggle variant="primary" id={theme+'-Fourth'}>
                    Monthly Count Year: {year}
                    </Dropdown.Toggle>
                    <Dropdown.Menu id={theme+'-Fourth'}>
                    {years.map((year, index) => (
                        <Dropdown.Item
                        id={theme+'-Fourth'}
                        key={index}
                        onClick={() => {setYear(year)}}
                        >
                        {year}
                        </Dropdown.Item>
                    ))}
                    </Dropdown.Menu>
                </Dropdown>  
            </div>
        </>
    );
}

const SliderComponent = React.memo(MultiRangeSlider);

export default Extended;
