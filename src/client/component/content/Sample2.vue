<template>
    <form class="" action="">
        <div id="visualize-loan" class="visualize-loan">
            <div id="informations-vizualize-loan">
            <div id="project-amount">
                <span class="value-visualize-loan" v-html:value="amount"></span><span class="unit-visualize-loan" v-html:value="unit"></span>
                <span class="label-visualize-loan"> Project Amount </span>
            </div>
            <div id="real-estate-investment">
                <span class="value-visualize-loan" v-html:value="investment"></span><span class="unit-visualize-loan"  v-html:value="unit">;</span>
                <span class="label-visualize-loan">Real estate investment </span>
            </div>
            <div id="notary-fees">
                <span class="value-visualize-loan" v-html:value="notaryFees"></span><span class="unit-visualize-loan"  v-html:value="unit"></span>
                <span class="label-visualize-loan">Notary fees </span>
            </div>
            <div id="others-fees">
                <span class="value-visualize-loan" v-html:value="othersFees"></span><span class="unit-visualize-loan"  v-html:value="unit"></span>
                <span class="label-visualize-loan">Others fees </span>
            </div>
            <div id="times-loan">
                <span class="value-visualize-loan" v-html:value="duration"></span><span class="unit-visualize-loan" v-html:value="scale"></span>
                <span class="label-visualize-loan">Times </span>
            </div>
            </div>
            <div id="piechart" style=""></div>
        </div>
    </form>
</template>

<script>
 export default {
    mounted:function(){
            this.onload() // will execute at pageload
    },
    data: function() { return {
        open:true,
        amount:'305 000',
        unit:'€',
        investment:'45 000',
        notaryFees :'15 000',
        othersFees : '15 000',
        insurance:'0.2487',
        duration:'240',
        scale:'month',
        changes : [
            {
            amount: '10000',
            date : '2018-12-01',  
            },
            {
            amount: '10000',
            date : '2019-12-01',  
            }
        ]
    }},
    methods : {
        onload(){
            google.charts.load('current', {'packages':['corechart']});
            google.charts.setOnLoadCallback(drawChart);

            function drawChart() {
                var data = google.visualization.arrayToDataTable([
                ['Task', 'Hours per Day'],
                ['Total asset',     292570.00],
                ['Notary fees',      23000.00],
                ['Others fees',  15000],
                ['Total insurance', 14070.00],
                ['Total interest',    75070.00]
                ]);

                var options = {
                title: 'Scenario Loan Summary',
                animation: {
                        duration: 1000,
                        easing: 'out',
                        "startup": true
                },
                width: 210,
                legend:'none',
                /*pieSliceText: 'label',
                slices: {  1: {offset: 0.2},
                            2: {offset: 0.3},
                            3: {offset: 0.4},
                },*/
                slices: {
                    0: { color: '#7cb5ec' },
                    4: { color: '#f50057' },
                    3: { color: '#d500f9' }
                }
                };

                var chart = new google.visualization.PieChart(document.getElementById('piechart'));
                chart.draw(data, options);
            }
        }
    }
 }
</script>