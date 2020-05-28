import React, { useContext, useState } from 'react';
import { CIQ } from 'chartiq/js/componentUI';
import { ChartContext } from '../../context/ChartContext';

const HistogramButton = ({}) => {
  const context = useContext(ChartContext);
  const [isOn, setIsOn] = useState(false);
  const handleStackHistogram = () => {
    if (isOn) {
      context.stx.removeSeriesRenderer(
        context.stx.chart.seriesRenderers['Stacked Histogram'],
      );
      context.stx.removeSeries('Close');

      // re-deisplay the main series and axis
      context.stx.chart.seriesRenderers['_main_series'].params.hidden = false;
      context.stx.setYAxisPosition(context.stx.chart.yAxis, 'right');

      Object.values(context.stx.chart.series).forEach((renderer) => {
        const { parameters } = renderer;
        if (parameters.isComparison == true) {
          parameters.hidden = false;
          context.stx.addSeries(parameters.symbol, {
            name: 'comparison ' + parameters.symbol,
            symbolObject: parameters.symbolObject,
            isComparison: true,
            color: parameters.color,
            pattern: parameters.pattern,
            width: parameters.width || 1,
            data: { useDefaultQuoteFeed: true },
            forceData: true,
          });
        }
      });

      context.stx.home(); // align the chnart to the edge.
      setIsOn(false);
    } else {
      setIsOn(true);

      // remove the line renderers
      for (const id in context.stx.chart.seriesRenderers) {
        const renderer = context.stx.chart.seriesRenderers[id];
        if (renderer.params.isComparison == true)
          context.stx.removeSeriesRenderer(renderer);
      }

      // this is so you can access the "Close" from the stacked histogram
      context.stx.addSeries('Close', {
        loadData: false,
      });

      // hide the primay axis, we are not using it with histograms
      context.stx.setYAxisPosition(context.stx.chart.yAxis, 'none');
      context.stx.chart.seriesRenderers['_main_series'].params.hidden = true;

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

      // clear the renderer, just in case
      histRenderer.removeAllSeries();

      histRenderer.removeAllSeries();
      histRenderer.attachSeries(context.stx.chart.symbol);
      Object.values(context.stx.chart.series).forEach((single) => {
        histRenderer.attachSeries(single.id);
      });
      histRenderer.ready();
    }
  };
  return (
    <button style={{ height: '100%' }} onClick={handleStackHistogram}>
      Stacked Histogram
    </button>
  );
};

export default HistogramButton;
