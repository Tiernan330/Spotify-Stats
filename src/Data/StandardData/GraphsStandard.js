import 'bootstrap/dist/css/bootstrap.min.css';
import {Row, Card} from 'react-bootstrap';
import { registerables , Chart } from "chart.js";
import { Bar } from 'react-chartjs-2';


import "../../CSS/SpotifyParseData.css"

Chart.register(...registerables);


function GraphsStandard(props){
	let { theme, tracks, startDate, endDate} = props;
	let topSongs = {};
	let topArtists = {};
  let HourCount = {};
  let monthCounts = {}

	tracks.forEach(item => {
    const songName = item["trackName"];
    const artistName = item["artistName"];
    const hour = item['endTime'].slice(11,13)
    const month = item['endTime'].slice(5,7)
    const itemDate = new Date(item.endTime.slice(0,10));
    startDate = new Date(startDate);
    endDate = new Date(endDate);

    if (month) {
      monthCounts[month] = (monthCounts[month] || 0) + 1;
    } 
    if (itemDate >= startDate && itemDate <= endDate && artistName !== "Unknown Artist" && songName !== "Unknown Track"){
      if (hour) {
        HourCount[hour] = (HourCount[hour] || 0) + 1;
      }
      if (songName) {
        topSongs[`${songName} - ${artistName}`] = (topSongs[`${songName} - ${artistName}`] || 0) + 1;
      }
      if (artistName) {
        topArtists[artistName] = (topArtists[artistName] || 0) + 1;
      }
    }
	});

  monthCounts = Object.entries(monthCounts)
  HourCount = Object.entries(HourCount)

	topSongs = Object.entries(topSongs)
	.sort((a, b) => b[1] - a[1])
	.slice(0, 10);

	topArtists = Object.entries(topArtists)
	.sort((a, b) => b[1] - a[1])
	.slice(0, 10);

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const hours = ['12AM', '1AM', '2AM', '3AM', '4AM', '5AM', '6AM', '7AM', '8AM', '9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM', '10PM', '11PM']

  function data(i, Tracks, labels){
    const label = ["Song", "Artist", "Hourly", "Monthly"]
    return({
      labels: labels || Tracks.map((track) => {
        const [name, artist] = track[0].split(' - ')
        return artist ? [name, artist] : [name];
      }),
      datasets: [
          {
              label: label[i] + ' Listen Count',
              data: Tracks.map((track) => {return track[1]}),
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
          },
      ],
    })
  }

  function options() {
    const color = theme === 'dark' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)'
    const secColor = theme === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.2)' 
    return {
      responsive: true,
      maintainAspectRatio: true,
      plugins: { legend: { labels: { color: color }, }, },
      scales: {
        x: {
          grid: { color: secColor },
          ticks: {
            color: color,
            maxRotation: 15, 
            autoSkip: false
          },
        },
        y: {
          grid: { color: secColor },
          beginAtZero: true,
          ticks: { color: color },
        },
      },
    };
  }

  return (
    <Row className='mx-2 row row-cols-2 '>
      <Card id={theme+'-Tertiary'} className='graph'><Bar data={data(0, topSongs)} options={options()}/></Card>
      <Card id={theme+'-Tertiary'} className='graph'><Bar data={data(1, topArtists)} options={options()}/></Card>
      <Card id={theme+'-Tertiary'} className='graph'><Bar data={data(2, HourCount, hours)} options={options()}/></Card>
      <Card id={theme+'-Tertiary'} className='graph'><Bar data={data(3, monthCounts, months)} options={options()}/></Card>
    </Row>
  );
}

export default GraphsStandard