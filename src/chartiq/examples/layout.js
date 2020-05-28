export const LAYOUT = {
  interval: 'day',
  periodicity: 1,
  timeUnit: null,
  candleWidth: 8,
  flipped: false,
  volumeUnderlay: false,
  adj: true,
  crosshair: false,
  chartType: 'candle',
  extended: true,
  marketSessions: { pre: true, post: true },
  aggregationType: 'ohlc',
  chartScale: 'percent',
  panels: {
    chart: {
      percent: 1,
      display: 'AAPL',
      chartName: 'chart',
      index: 0,
      yAxis: { name: 'chart', position: null },
      yaxisLHS: [],
      yaxisRHS: ['chart'],
    },
  },
  setSpan: {},
  outliers: false,
  smartzoom: true,
  headsUp: null,
  sidenav: 'sidenavOff',
  symbols: [
    {
      symbol: 'AAPL',
      symbolObject: { symbol: 'AAPL' },
      periodicity: 1,
      interval: 'day',
      timeUnit: null,
      setSpan: {},
    },
    {
      symbol: 'GOOGL',
      symbolObject: {
        symbol: 'GOOGL',
        name: 'Alphabet Inc - Ordinary Shares - Class A',
        exchDisp: 'NASDAQ',
      },
      periodicity: 1,
      interval: 'day',
      timeUnit: null,
      setSpan: {},
      id: 'GOOGL',
      parameters: {
        name: 'comparison GOOGL',
        symbolObject: {
          symbol: 'GOOGL',
          name: 'Alphabet Inc - Ordinary Shares - Class A',
          exchDisp: 'NASDAQ',
        },
        isComparison: true,
        color: 'rgb(142, 198, 72)',
        pattern: '',
        width: 1,
        data: { useDefaultQuoteFeed: true },
        forceData: true,
        shareYAxis: true,
        chartName: 'chart',
        panel: 'chart',
        fillGaps: false,
        action: 'add-series',
        symbol: 'GOOGL',
        gapDisplayStyle: 'transparent',
        overChart: true,
        useChartLegend: true,
        heightPercentage: 0.7,
        opacity: 1,
        highlightable: true,
        type: 'line',
        style: 'stx_line_chart',
        highlight: false,
      },
    },
    {
      symbol: 'GOLD',
      symbolObject: {
        symbol: 'GOLD',
        name: 'Barrick Gold Corp.',
        exchDisp: 'NYSE',
      },
      periodicity: 1,
      interval: 'day',
      timeUnit: null,
      setSpan: {},
      id: 'GOLD',
      parameters: {
        name: 'comparison GOLD',
        symbolObject: {
          symbol: 'GOLD',
          name: 'Barrick Gold Corp.',
          exchDisp: 'NYSE',
        },
        isComparison: true,
        color: 'rgb(0, 175, 237)',
        pattern: '',
        width: 1,
        data: { useDefaultQuoteFeed: true },
        forceData: true,
        shareYAxis: true,
        chartName: 'chart',
        panel: 'chart',
        fillGaps: false,
        action: 'add-series',
        symbol: 'GOLD',
        gapDisplayStyle: 'transparent',
        overChart: true,
        useChartLegend: true,
        heightPercentage: 0.7,
        opacity: 1,
        highlightable: true,
        type: 'line',
        style: 'stx_line_chart',
        highlight: false,
      },
    },
  ],
};
