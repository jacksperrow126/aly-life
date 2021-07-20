export function getChartOptions(
  type,
  data: any[],
  color?: string[]
): Highcharts.Options {
  return {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type,
      backgroundColor: 'transparent',
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false,
        },
        showInLegend: true,
        size: 150,
        colors: color || [
          '#71f071',
          '#f071cb',
          '#8bbc21',
          '#910000',
          '#1aadce',
          '#492970',
          '#f28f43',
          '#77a1e5',
          '#c42525',
          '#a6c96a',
        ],
      },
    },
    title: {
      text: '',
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        name: 'Value',
        colorByPoint: true,
        data,
        type,
      },
    ],
  };
}
