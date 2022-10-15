import { Grid, Radio, Typography, WithStyles, withStyles } from '@material-ui/core';
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from '@material-ui/lab';
import { ClassNameMap } from '@material-ui/styles';
import moment from 'moment';
import { PurchaseOrder } from '../../../../../../models/purchaseOrder.interface';
import { PURCHASE_ORDER_STATUS } from '../../../../../../utils/purchaseStatus';
import styles from './PurchaseOrderTimeline.styles';

interface Props extends WithStyles<typeof styles> {
  classes: ClassNameMap;
  selectedStatus: string;
  currentPurchaseOrder: PurchaseOrder;
  handleStatusChange: (value: any) => void;
}

const PurchaseOrderTimelineComponent: React.FC<Props> = (props): JSX.Element => {
  const { classes, currentPurchaseOrder, selectedStatus, handleStatusChange } = props;

  return (
    <Grid className={classes.root} aria-label="purchase-timeline">
      <Timeline className={classes.timeline}>
        {PURCHASE_ORDER_STATUS.map((status, index) => {
          if (status.name == 'voided' && currentPurchaseOrder.status != 'voided') return;
          return (
            <TimelineItem key={status.name}>
              <TimelineOppositeContent className={classes.timelineContentOpposite}>
                <Grid className={classes.timelineContent}>
                  <Typography>{status.label}</Typography>
                </Grid>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <Radio
                  checked={selectedStatus === status.name}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleStatusChange(event.target.value)
                  }
                  value={status.name}
                  name={'status'}
                  inputProps={{ 'aria-label': status.name }}
                />
                {index != 0 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent className={classes.timelineContentContainer}>
                <Grid className={classes.timelineContent}>
                  <Grid container direction="column">
                    <Typography variant="caption">
                      {currentPurchaseOrder[status.name + '_at']
                        ? moment(new Date(currentPurchaseOrder[status.name + '_at'])).format(
                          'MM/DD/YY',
                        )
                        : null}
                    </Typography>
                  </Grid>
                </Grid>
              </TimelineContent>
            </TimelineItem>
          );
        }).reverse()}
      </Timeline>
    </Grid>
  );
};

export default withStyles(styles)(PurchaseOrderTimelineComponent);
