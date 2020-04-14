import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, Typography } from '@material-ui/core';

import { Pie, PieChart, ResponsiveContainer, Sector } from 'recharts';

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`PV ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

function SidePlayer({ openPlayerModal, videoData }) {
  let data = videoData;
  const [updateCount, setUpdateCount] = useState(0);

  useEffect(() => {
    setUpdateCount(updateCount + 1);
  }, [videoData]);
  return (
    <Dialog
      open={openPlayerModal}
      aria-labelledby="about-movie-dialog"
      hideBackdrop={true}
      disableBackdropClick={true}
      style={{
        height: 'auto',
        width: 'auto',
        right: 'auto',
        bottom: '0',
        top: '0',
        left: '0',
      }}
      PaperProps={{
        style: {
          backgroundColor: '#E0DBD5',
          boxShadow: 'none',
        },
      }}
    >
      <DialogContent
        style={{
          height: '100%',
          position: 'fixed',
          right: 0,
          top: 0,
          width: '220px',
          backgroundColor: '#E0DBD5',
          boxShadow: 'none',
        }}
      >
        {(data && data.Title) || 'Video'}
        <div style={{ height: '240px', width: '240px' }}>
          <ResponsiveContainer width={'99%'} height={300}>
            <PieChart key={'chart' + updateCount}>
              <Pie
                activeShape={renderActiveShape}
                data={[
                  {
                    name: 'IMDB',
                    value: videoData.imdbRating,
                    fill: '#349ADC',
                  },
                  {
                    name: '',
                    value: 10 - videoData.imdbRating,
                    fill: '#8D8D8D',
                  },
                ]}
                cx={100}
                cy={125}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
              />
              <text
                x={100}
                y={125}
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {(data && 'IMDB ' + (videoData.imdbRating || '')) ||
                  'no rating'}
              </text>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <Typography variant="h6" gutterBottom>
          Actors
        </Typography>
        {(data && data.Actors) || 'Actors'}

        <Typography variant="h6" gutterBottom>
          Released
        </Typography>
        {(data && data.Released) || 'Released'}

        <Typography variant="h6" gutterBottom>
          Plot
        </Typography>
        {(data && data.Plot) || 'Released'}
        <div
          style={{
            position: 'absolute',
            bottom: '10px',
            width: '99%',
            right: '-1px',
            height: '10px',
            backgroundColor: '#3598DB',
          }}
        ></div>
      </DialogContent>
    </Dialog>
  );
}

export default SidePlayer;
