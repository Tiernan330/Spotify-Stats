import React, { useState } from "react";
import MultiRangeSlider from "multi-range-slider-react";

import GraphsStandard from "./GraphsStandard";


import '../../CSS/SpotifyParseData.css'

function Standard(props) {
	const { theme, tracks} = props;

	const dates = tracks.map((track) => new Date(track.endTime));
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
	
	const labels = [dateArray[minDate].toLocaleDateString(), dateArray[maxDate].toLocaleDateString()]

	

	return(
        <>
            <div className="graphs-Container">
				<GraphsStandard theme={theme} tracks={tracks} startDate={labels[0]} endDate={labels[1]}/>
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
                        onInput={(e) => {changeValue(e);}}
                    />
                </div>  
            </div>
        </>
    );
}

const SliderComponent = React.memo(MultiRangeSlider);

export default Standard;
