/*
 * © 2021 Thoughtworks, Inc.
 */

/*
We're using a custom tool tip so that we can show data from the wattHours and cost series in the tooltip,
even when the wattHours and cost series are toggled off. When using the default tooltip provided by apex charts,
there is no way to access additional data in the series, for example, the wattHours and cost data in the co2e series.
The custom tooltip also allows us to add an asterisk for data points that were estimated using an average CPU constant.
 */

import React, { ReactElement } from 'react'
import moment from 'moment'
import { cloudEstPerDay } from 'Types'
import config from 'ConfigLoader'

type CustomTooltipProps = {
  dataPoint: cloudEstPerDay
}

//pass group by here --- weeks start on monday

const CustomTooltip = ({ dataPoint }: CustomTooltipProps): ReactElement => {
  const grouping: string = config().GROUP_BY

  if (dataPoint?.x) {
    const dateLabel = {
      day: moment.utc(dataPoint.x).format('MMMM DD, YYYY'),
      week: moment.utc(dataPoint.x).format('[Week] w, MMMM'),
      month: moment.utc(dataPoint.x).format('MMMM YYYY'),
      quarter: moment.utc(dataPoint.x).format('Qo [quarter], YYYY'),
      year: moment.utc(dataPoint.x).format('YYYY'),
    }
    return (
      <div style={{ padding: '10px' }}>
        <div>
          <b>{dateLabel[grouping]}</b>
        </div>
        <div>
          {dataPoint.y} metric tons CO2e
          {dataPoint.usesAverageCPUConstant && '*'}
        </div>
        <div>{dataPoint.kilowattHours} kilowatt hrs</div>
        <div>${dataPoint.cost} cost</div>
      </div>
    )
  }
  return <div />
}

export default CustomTooltip
