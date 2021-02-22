export function getChartOptions(type, data: any[]): Highcharts.Options {
    return {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type,
            backgroundColor: '#8C8C8C',
            // margin: [0, 0, 20, 0],
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true,
                size: 150
            }
        },
        title: {
            text: '',
        },
        credits: {
            enabled: false,
        },
        series: [{
            name: 'Value',
            colorByPoint: true,
            data,
            type
        }]
    };
};