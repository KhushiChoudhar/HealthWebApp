import "./Calender.scss";
import { XAxis, YAxis, Line, CartesianGrid, ResponsiveContainer, Tooltip, LineChart } from "recharts"
import Emoji from "react-emoji-render"
import GaugeChart from 'react-gauge-chart'
import dayjs from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import Navbar from "../../Components/navbar/Navbar";



const data = [
  {
    "date": "01-01-2024",
    "day": "01",
    "mood": 2,
    "emoji": '😵'
  },
  {
    "date": "02-01-2024",
    "day": "02",
    "mood": 3,
    "emoji": '😊'
  },
  {
    "date": "03-01-2024",
    "day": "03",
    "mood": 1,
    "emoji": '😞'
  },
  {
    "date": "04-01-2024",
    "day": "04",
    "mood": 4,
    "emoji": '😀'
  },
  {
    "date": "05-01-2024",
    "day": "05",
    "mood": 0,
    "emoji": '😡'
  },
  {
    "date": "06-01-2024",
    "day": "06",
    "mood": 0,
    "emoji": '😡'
  }
]

let totalMoodScore = 0;

for (let i = 0; i < data.length; i++) {
  totalMoodScore += data[i].mood;
}

const calculateOverallMoodScore = () => {
  const averageMoodScore = totalMoodScore / data.length;
  return averageMoodScore;
}


// ---------CALENDAR--------

const initialValue = dayjs(new Date());
// console.log(initialValue)
// console.log(new Date()) Sat Jan 06 2024

function ServerDay(props) {
  const { day, ...other } = props;


  const emojiEntry = data.find(entry => entry.date === day.format('DD-MM-YYYY'));


  const emoji = emojiEntry ? emojiEntry.emoji : '';

  return (
    <Badge
      key={day.toString()}
      overlap="circular"
      badgeContent={emoji ? emoji : undefined}
    >
      <PickersDay {...other} day={day} />
    </Badge>
  );
}

export default function calender() {

  // ---------GRAPH---------
  const formatAxis = (value) => {
    if (value === 4) return "😀"
    if (value === 3) return "😊"
    if (value === 2) return "😵"
    if (value === 1) return "😞"
    if (value === 0) return "😡"
    return value
  }

  const CustomToolTip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const selectedData = data.find(item => item.day === label);
      if (selectedData) {
        const { date, mood } = selectedData;
        // console.log(label) label = date
        return (
          <div>
            <p className="labelToolTip">{date} </p>
            <p className="labelToolTip">Mood:{formatAxis(mood)}</p>
          </div>
        )
      }
    }
  }

  const overallMoodScore = calculateOverallMoodScore();
  const roundedPercentage = Math.round((overallMoodScore / 4) * 100);

  const chartStyle = {
    height: 135,
  }
  return (
    <>
      <Navbar></Navbar>
      <div className="wrapper">
        <div className="cal">
          <div className="up">

            <span className="text">Monthly Progress
              <Emoji>📊</Emoji>
            </span>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                defaultValue={initialValue}
                renderLoading={() => <DayCalendarSkeleton />}
                slots={{
                  day: ServerDay,
                }}
                slotProps={{
                  day: {
                    data,
                  },
                }}
              />
            </LocalizationProvider>

          </div>

          <div className="gauge-chart">
            
            <span className="text">Happiness Meter</span>
            <GaugeChart
              id="gauge-chart"
              nrOfLevels={5}
              colors={["#FF5F6D", "#FFC371", "#FFD700", "#9ACD32", "#008000"]}
              percent={roundedPercentage/100 }  
              // formatTextValue={(roundedPercentage) => roundedPercentage + '%'}
              textColor=""
              needleColor="#45B39D"
              needleBaseColor="#D1F2EB"
              style={chartStyle}
            />
          </div>

        </div>

        <div className="chart">
          <span className="text">Mood Analytics</span>
          <ResponsiveContainer className="cont" width="100%">
            <LineChart height="400px" data={data}>
              <XAxis dataKey="day"></XAxis>
              <YAxis interval={0} tickFormatter={formatAxis}></YAxis >
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip content={<CustomToolTip></CustomToolTip>}></Tooltip>
              <Line type="monotone" dataKey="mood" stroke="#45B39D " />
            </LineChart>
          </ResponsiveContainer>
        </div>


      </div>
    </>
  );
}