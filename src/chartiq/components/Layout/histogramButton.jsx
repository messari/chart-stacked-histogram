import React, { useContext, useState } from 'react';
import { CIQ } from 'chartiq/js/componentUI';
import { ChartContext } from '../../context/ChartContext';

const HistogramButton = ({}) => {
  const context = useContext(ChartContext);
  const [isOn, setIsOn] = useState(false);
  const handleStackHistogram = () => {
    if (isOn) {
      // context.stx.chart.seriesRenderers['Stacked Histogram'].removeAllSeries();
      context.stx.removeSeriesRenderer(
        context.stx.chart.seriesRenderers['Stacked Histogram'],
      );
      context.stx.removeSeries('Close');

      // hide the primay axis, we are not using it with histograms
      // context.stx.chart.seriesRenderers['_main_series'].params.hidden = false;
      context.stx.setYAxisPosition(context.stx.chart.yAxis, 'right');

      Object.values(context.stx.chart.seriesRenderers).forEach((renderer) => {
        const { params } = renderer;
        if (params.isComparison == true) {
          params.hidden = false;
          context.stx.removeSeriesRenderer(renderer);
          context.stx.addSeries(params.symbol, {
            name: 'comparison ' + params.symbol,
            symbolObject: params.symbolObject,
            isComparison: true,
            color: params.color,
            pattern: params.pattern,
            width: params.width || 1,
            data: { useDefaultQuoteFeed: true },
            forceData: true,
            loadData: false,
          });
        }
      });

      // hide the primay series line, we are not using it with histograms
      context.stx.home(); // align the chnart to the edge.
      context.stx.setChartType('candle');
      context.stx.setChartScale('percent');
      context.stx.calculateYAxisMargins(context.stx.chart.yAxis);
      context.stx.draw();
      context.stx.chart.seriesRenderers['_main_series'].ready();
      setIsOn(false);
    } else {
      setIsOn(true);
      // hide the primay axis, we are not using it with histograms
      context.stx.setYAxisPosition(context.stx.chart.yAxis, 'none');
      context.stx.chart.seriesRenderers['_main_series'].params.hidden = true;

      // hide the primay series line, we are not using it with histograms
      context.stx.setChartType('none');

      Object.values(context.stx.chart.seriesRenderers).forEach((renderer) => {
        if (renderer.params.isComparison == true) {
          renderer.params.hidden = true;
        }
      });
      let histRenderer;
      if (context.stx.chart.seriesRenderers['Stacked Histogram'] != null) {
        histRenderer = context.stx.chart.seriesRenderers['Stacked Histogram'];
      } else {
        histRenderer = context.stx.setSeriesRenderer(
          new CIQ.Renderer.Histogram({
            params: {
              name: 'Stacked Histogram',
              type: 'histogram',
              subtype: 'stacked',
              heightPercentage: 0.9, // how high to go. 1 = 100%
              opacity: 1, // only needed if supporting IE8, otherwise can use rgba values when selecting the color for the stacked bar
              widthFactor: 0.8, // to control space between bars. 1 = no space in between
              yAxis: {},
            },
          }),
        );
      }
      context.stx.setYAxisPosition(context.stx.chart.yAxis, 'none');
      context.stx.addSeries('Close', {
        loadData: false,
      });
      histRenderer.removeAllSeries();
      histRenderer.attachSeries(context.stx.chart.symbol);
      Object.values(context.stx.chart.series).forEach((single) => {
        histRenderer.attachSeries(single.id);
      });
      histRenderer.ready();
      context.stx.setChartScale('linear');
    }
  };
  return (
    <button style={{ height: '100%' }} onClick={handleStackHistogram}>
      Stacked Histogram
    </button>
  );
};

export default HistogramButton;
