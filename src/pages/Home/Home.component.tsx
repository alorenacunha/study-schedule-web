import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Grid, WithStyles, withStyles } from '@material-ui/core';
import { ClassNameMap } from '@material-ui/styles';
import styles from './Home.styles';

interface Props extends WithStyles<typeof styles> {
  classes: ClassNameMap;
}

const HomeComponent: React.FC<Props> = (props): JSX.Element => {
  const { classes } = props;

  const events = [
    {
      title: 'All Day Event very long title',
      allDay: true,
      start: new Date(2022, 10, 0),
      end: new Date(2022, 10, 1),
    },
    {
      title: 'Long Event',
      start: new Date(2022, 10, 7),
      end: new Date(2022, 10, 10),
    },

    {
      title: 'DTS STARTS',
      start: new Date(2016, 10, 13, 0, 0, 0),
      end: new Date(2016, 10, 20, 0, 0, 0),
    },

    {
      title: 'DTS ENDS',
      start: new Date(2016, 10, 6, 0, 0, 0),
      end: new Date(2016, 10, 13, 0, 0, 0),
    },

    {
      title: 'Some Event',
      start: new Date(2022, 10, 9, 0, 0, 0),
      end: new Date(2022, 10, 9, 0, 0, 0),
    },
    {
      title: 'Conference',
      start: new Date(2022, 10, 11),
      end: new Date(2022, 10, 13),
      desc: 'Big conference for important people',
    },
    {
      title: 'Meeting',
      start: new Date(2022, 10, 12, 10, 30, 0, 0),
      end: new Date(2022, 10, 12, 12, 30, 0, 0),
      desc: 'Pre-meeting meeting, to prepare for the meeting',
    },
    {
      title: 'Lunch',
      start: new Date(2022, 10, 12, 12, 0, 0, 0),
      end: new Date(2022, 10, 12, 13, 0, 0, 0),
      desc: 'Power lunch',
    },
    {
      title: 'Meeting',
      start: new Date(2022, 10, 12, 14, 0, 0, 0),
      end: new Date(2022, 10, 12, 15, 0, 0, 0),
    },
    {
      title: 'Happy Hour',
      start: new Date(2022, 10, 12, 17, 0, 0, 0),
      end: new Date(2022, 10, 12, 17, 30, 0, 0),
      desc: 'Most important meal of the day',
    },
    {
      title: 'Dinner',
      start: new Date(2022, 10, 12, 20, 0, 0, 0),
      end: new Date(2022, 10, 12, 21, 0, 0, 0),
    },
    {
      title: 'Birthday Party',
      start: new Date(2022, 10, 13, 7, 0, 0),
      end: new Date(2022, 10, 13, 10, 30, 0),
    },
    {
      title: 'Birthday Party 2',
      start: new Date(2022, 10, 13, 7, 0, 0),
      end: new Date(2022, 10, 13, 10, 30, 0),
    },
    {
      title: 'Birthday Party 3',
      start: new Date(2022, 10, 13, 7, 0, 0),
      end: new Date(2022, 10, 13, 10, 30, 0),
    },
    {
      title: 'Late Night Event',
      start: new Date(2022, 10, 17, 19, 30, 0),
      end: new Date(2022, 10, 18, 2, 0, 0),
    },
    {
      title: 'Multi-day Event',
      start: new Date(2022, 10, 20, 19, 30, 0),
      end: new Date(2022, 10, 22, 2, 0, 0),
    },
  ];

  // const localizer = momentLocalizer(moment);

  // const allViews = Object.keys(BigCalendar.Views).map((k) => BigCalendar.Views[k]);

  return (
    <Grid
      container
      className={classes.content}
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item className={classes.contentOverlay}>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            start: 'title', // will normally be on the left. if RTL, will be on the right
            center: '',
            end: 'dayGridMonth,dayGridWeek,dayGridDay today prev,next',
          }}
          height="auto"
          events={events}
        />
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(HomeComponent);
