$(document).ready(function(){
    $.ajax({
        url:'/county_data',
        dataType: 'json',
        success: function (datax) {
            var d =[]
            var acc = datax.reduce((acc, val) => acc.set(val, 1 + (acc.get(val) || 0)), new Map());
            acc.forEach((k,v)=>{
                var x = {'name':v, y:k}
                d.push(x)
            })
            Highcharts.chart('container', {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: 'Accidents Statistics per County'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false
                        },
                        showInLegend: true
                    }
                },
                series: [{
                    name: 'Brands',
                    colorByPoint: true,
                    data:d
                }]
            });
        }
      });
   
        
    })
