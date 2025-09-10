$(function () {

    //ring_short();
    //ring_mid();
    // ring_long();
    // barLine_short();
    // barLine_mid();
    //barLine_long();

// ############################################################################################################
// -----------------------------------------环形图——短期--------------------------------------------------------
// ############################################################################################################
    window.ring_short = function() {
        var myChart = echarts.init(document.getElementById('ring_short'));

        option = {
                    animation: true,
                    tooltip: { trigger: 'item', formatter: '{b}<br/>{c}（{d}%）' },
                    title: {
                        x: 'left',
                        y: 'top',
                        textStyle: { color: '#b3e5ff', fontSize: 16, fontWeight: 'normal' }
                    },
                    legend : {
                        orient: 'horizontal',
                        bottom: 6,                 // 图例固定在底部并留点边距
                        left: 'center',
                        itemWidth: 10,
                        itemHeight: 10,
                        itemGap: 10,
                        textStyle: { color: '#fff', fontSize: 12 },
                        data: ['(0,200]', '(200,500]', '(500,1000]', '>1000']
                        },
                    series: [
                        {
                        type: 'pie',
                        center: ['50%', '40%'],
                        radius: ['36%', '60%'],    // 稍微缩小，避免贴边
                        color: ['#FEE449','#00FFFF','#00FFA8','#2c95f7f6','#0048ffff','#F76F01','#01A4F7','#FE2C8A'],
                        startAngle: 90,
                        avoidLabelOverlap: true,           // 防重叠
                        labelLayout: { hideOverlap: true },// 防重叠（echarts 5）
                        minAngle: 3,                       // 极小扇区也能看清
                        labelLine: {
                            length: 10,
                            length2: 8,
                            smooth: true
                        },
                        label: {
                            show: true,
                            formatter: '{b}\n{per|{d}%}',
                            rich: {
                            per: { color: '#FDF44E', fontSize: 12, fontWeight: 'bold', padding: [2, 4] }
                            },
                            color: '#b3e5ff',
                            fontSize: 12
                        },
                        emphasis: {
                            scale: false,                    // 取消放大，避免“跳动”
                            label: { show: true }
                        },
                        data: [
                            { name: '(0,200]', value: 121 },
                            { name: '(200,500]', value: 73 },
                            { name: '(500,1000]', value: 52 },
                            { name: '>1000', value: 21 }
                        ]
                        },
                        {
                        // 装饰用内环（更小且不响应鼠标事件）
                        type: 'pie',
                        center: ['50%', '40%'],
                        radius: ['22%', '23%'],
                        silent: true,
                        z: 0,
                        label: { show: false },
                        data: [{
                            value: 1,
                            name: 'decor',
                            itemStyle: {
                            color: {
                                x: 0, y: 0, x2: 1, y2: 0, type: 'linear', global: false,
                                colorStops: [
                                { offset: 0,   color: '#9F17FF' },
                                { offset: 0.2, color: '#01A4F7' },
                                { offset: 0.5, color: '#FE2C8A' },
                                { offset: 0.8, color: '#FEE449' },
                                { offset: 1,   color: '#00FFA8' }
                                ]
                            }
                            }
                        }]
                        }
                    ]
                    }

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        myChart.currentIndex = -1;
        //myChart.setOption(option);
        //console.log(option.series[0].data[0]);
        setInterval(function () {
            var dataLen = option.series[0].data.length;
            // 取消之前高亮的图形
            myChart.dispatchAction({
                type: 'downplay',
                seriesIndex: 0,
                dataIndex: myChart.currentIndex
            });
            myChart.currentIndex = (myChart.currentIndex + 1) % dataLen;
            // 高亮当前图形
            myChart.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: myChart.currentIndex
            });
        }, 1000);

        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }

// ############################################################################################################
// -----------------------------------------环形图——中期--------------------------------------------------------
// ############################################################################################################

        window.ring_mid = function() {
        var myChart = echarts.init(document.getElementById('ring_mid'));

        option = {
                    animation: true,
                    tooltip: { trigger: 'item', formatter: '{b}<br/>{c}（{d}%）' },
                    title: {
                        x: 'left',
                        y: 'top',
                        textStyle: { color: '#b3e5ff', fontSize: 16, fontWeight: 'normal' }
                    },
                    legend : {
                        orient: 'horizontal',
                        bottom: 6,                 // 图例固定在底部并留点边距
                        left: 'center',
                        itemWidth: 5,
                        itemHeight: 10,
                        itemGap: 10,
                        textStyle: { color: '#fff', fontSize: 12 },
                        data: ['(0,2000]', '(2000,5000]', '(5000,10000]', '>10000']},
                    series: [
                        {
                        type: 'pie',
                        center: ['50%', '40%'],
                        radius: ['36%', '60%'],    // 稍微缩小，避免贴边
                        color: ['#FEE449','#00FFFF','#00FFA8','#2c95f7f6','#0048ffff','#F76F01','#01A4F7','#FE2C8A'],
                        startAngle: 90,
                        avoidLabelOverlap: true,           // 防重叠
                        labelLayout: { hideOverlap: true },// 防重叠（echarts 5）
                        minAngle: 3,                       // 极小扇区也能看清
                        labelLine: {
                            length: 10,
                            length2: 8,
                            smooth: true
                        },
                        label: {
                            show: true,
                            formatter: '{b}\n{per|{d}%}',
                            rich: {
                            per: { color: '#FDF44E', fontSize: 12, fontWeight: 'bold', padding: [2, 4] }
                            },
                            color: '#b3e5ff',
                            fontSize: 12
                        },
                        emphasis: {
                            scale: false,                    // 取消放大，避免“跳动”
                            label: { show: true }
                        },
                        data: [
                            { name: '(0,2000]', value: 100 },
                            { name: '(2000,5000]', value: 56 },
                            { name: '(5000,10000]', value: 72 },
                            { name: '>10000', value: 39 }
                        ]
                        },
                        {
                        // 装饰用内环（更小且不响应鼠标事件）
                        type: 'pie',
                        center: ['50%', '40%'],
                        radius: ['22%', '23%'],
                        silent: true,
                        z: 0,
                        label: { show: false },
                        data: [{
                            value: 1,
                            name: 'decor',
                            itemStyle: {
                            color: {
                                x: 0, y: 0, x2: 1, y2: 0, type: 'linear', global: false,
                                colorStops: [
                                { offset: 0,   color: '#9F17FF' },
                                { offset: 0.2, color: '#01A4F7' },
                                { offset: 0.5, color: '#FE2C8A' },
                                { offset: 0.8, color: '#FEE449' },
                                { offset: 1,   color: '#00FFA8' }
                                ]
                            }
                            }
                        }]
                        }
                    ]
                    }

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        myChart.currentIndex = -1;
        //myChart.setOption(option);
        //console.log(option.series[0].data[0]);
        setInterval(function () {
            var dataLen = option.series[0].data.length;
            // 取消之前高亮的图形
            myChart.dispatchAction({
                type: 'downplay',
                seriesIndex: 0,
                dataIndex: myChart.currentIndex
            });
            myChart.currentIndex = (myChart.currentIndex + 1) % dataLen;
            // 高亮当前图形
            myChart.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: myChart.currentIndex
            });
        }, 1000);

        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }

// ############################################################################################################
// -----------------------------------------环形图——长期--------------------------------------------------------
// ############################################################################################################

        window.ring_long = function() {
        var myChart = echarts.init(document.getElementById('ring_long'));

        option = {
                    animation: true,
                    tooltip: { trigger: 'item', formatter: '{b}<br/>{c}（{d}%）' },
                    title: {
                        x: 'left',
                        y: 'top',
                        textStyle: { color: '#b3e5ff', fontSize: 16, fontWeight: 'normal' }
                    },
                    legend : {
                        orient: 'horizontal',
                        bottom: 6,                 // 图例固定在底部并留点边距
                        left: 'center',
                        itemWidth: 10,
                        itemHeight: 10,
                        itemGap: 10,
                        textStyle: { color: '#fff', fontSize: 12 },
                        data: ['(0,5万]', '(5万,10万]', '(10万,20万]', '>20万']
                        },
                    series: [
                        {
                        type: 'pie',
                        center: ['50%', '30%'],
                        radius: ['36%', '60%'],    // 稍微缩小，避免贴边
                        color: ['#FEE449','#00FFFF','#00FFA8','#2c95f7f6','#0048ffff','#F76F01','#01A4F7','#FE2C8A'],
                        startAngle: 90,
                        avoidLabelOverlap: true,           // 防重叠
                        labelLayout: { hideOverlap: true },// 防重叠（echarts 5）
                        minAngle: 3,                       // 极小扇区也能看清
                        labelLine: {
                            length: 10,
                            length2: 8,
                            smooth: true
                        },
                        label: {
                            show: true,
                            formatter: '{b}\n{per|{d}%}',
                            rich: {
                            per: { color: '#FDF44E', fontSize: 12, fontWeight: 'bold', padding: [2, 4] }
                            },
                            color: '#b3e5ff',
                            fontSize: 12
                        },
                        emphasis: {
                            scale: false,                    // 取消放大，避免“跳动”
                            label: { show: true }
                        },
                        data: [
                            { name: '(0,5万]', value: 84 },
                            { name: '(5万,10万]', value: 30 },
                            { name: '(10万,20万]', value: 47 },
                            { name: '>20万', value: 110 }
                        ]
                        },
                        {
                        // 装饰用内环（更小且不响应鼠标事件）
                        type: 'pie',
                        center: ['50%', '30%'],
                        radius: ['22%', '23%'],
                        silent: true,
                        z: 0,
                        label: { show: false },
                        data: [{
                            value: 1,
                            name: 'decor',
                            itemStyle: {
                            color: {
                                x: 0, y: 0, x2: 1, y2: 0, type: 'linear', global: false,
                                colorStops: [
                                { offset: 0,   color: '#9F17FF' },
                                { offset: 0.2, color: '#01A4F7' },
                                { offset: 0.5, color: '#FE2C8A' },
                                { offset: 0.8, color: '#FEE449' },
                                { offset: 1,   color: '#00FFA8' }
                                ]
                            }
                            }
                        }]
                        }
                    ]
                    }

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        myChart.currentIndex = -1;
        //myChart.setOption(option);
        //console.log(option.series[0].data[0]);
        setInterval(function () {
            var dataLen = option.series[0].data.length;
            // 取消之前高亮的图形
            myChart.dispatchAction({
                type: 'downplay',
                seriesIndex: 0,
                dataIndex: myChart.currentIndex
            });
            myChart.currentIndex = (myChart.currentIndex + 1) % dataLen;
            // 高亮当前图形
            myChart.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: myChart.currentIndex
            });
        }, 1000);

        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }

// ############################################################################################################
// -----------------------------------------柱线图——短期--------------------------------------------------------
// ############################################################################################################

    window.barLine_short = function() {
        var myChart = echarts.init(document.getElementById('barLine_short'));

        var colors = ['rgba(5, 243, 247, 1)', 'rgba(8, 140, 235, 1)', 'rgb(255, 185, 128)'];

        option = {
            color: colors,

            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross'
                },
                formatter: function(params) {
                    // 系列
                    let html = params[0].name + "<br>";

                    for (var i = 0; i < params.length; i++) {

                        // 获取每个系列对应的颜色值
                        html += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + params[i].color + ';"></span>';

                        // 通过判断指定系列增加 % 符号
                        if (option.series[params[i].seriesIndex].type == "line") {
                            html += params[i].seriesName + ": " + params[i].value + "%<br>";
                        } else {
                            html += params[i].seriesName + ": " + params[i].value + "<br>";
                        }
                    }
                    return html;
                }
            },
            grid: {
                    left: 70,
                    right: 20,      // 给右侧标签足够空间
                    top: 20,
                    bottom: 50,
                    containLabel: false   // 关键：让坐标轴文字不包含在 grid 内
                    },
            toolbox: {
                right: 4,   // 靠右 
                top: 0,     // 下移
                feature: {
                    dataView: {
                        show: false,
                        readOnly: false
                    },
                    restore: {
                        show: false,
                    },
                    saveAsImage: {
                        show: false,
                    }
                }
            },
            legend: {
                    left: 140,   // 居中
                    bottom: 160,       // 距离底部
                    itemWidth: 13,    // 图例标记宽度
                    itemHeight: 13,   // 图例标记高度
                    itemGap: 10,      // 图例项间距
                    textStyle: {
                        color: '#fff',
                        fontSize: 11
            },
            data: ['大中型车辆流量', '小型车辆流量', '速度']
            },
            // 缩放组件
            /*dataZoom: {
                type: 'slider'
            },*/
            xAxis: [{
                type: 'category',
                axisTick: {
                    alignWithLabel: true
                },
                axisLabel: {
                    formatter: '{value}',
                    textStyle: {
                        color: "#ffffff" //X轴文字颜色
                    }
                },
                data: ['00', '02', '04', '06', '08', '10', '12','14', '16', '18', '20', '22']
            }],
            yAxis: [{
                type: 'value',
                name: '大中型车辆流量',
                nameLocation: 'end',   // 把轴名称放到轴线中间
                nameRotate: 0,
                nameGap:20,
                nameTextStyle: {
                    padding: [0, -45, 0, 0], // 上右下左 内边距，等效于 offset
                    color: colors[0],
                    fontSize: 12
                },
                min: 0,
                max: 120000,
                position: 'right',
                offset: 10,
                axisLine: {
                    lineStyle: {
                        color: colors[0]
                    }
                },
                axisLabel: {
                    color: colors[0],
                    formatter: '{value} pcu/h'
                }
            },
                {
                    type: 'value',
                    name: '小型车辆流量',
                    nameLocation: 'end',   // 把轴名称放到轴线中间
                    nameRotate: 0,
                    nameGap:20,
                    nameTextStyle: {
                        padding: [0, -75, 0, 0], // 上右下左 内边距，等效于 offset
                        color: colors[1],
                        fontSize: 12
                    },
                    min: 0,
                    max: 50000,
                    position: 'right',
                    offset: 110,
                    axisLine: {
                        offset:0,
                        lineStyle: {
                            color: colors[1]
                        }
                    },
                    axisLabel: {
                        color: colors[1],
                        formatter: '{value} pcu/h'
                    }
                },
                {
                    type: 'value',
                    name: '速度',
                    nameLocation: 'end',   // 把轴名称放到轴线中间
                    nameRotate: 0,
                    nameGap:20,
                    nameTextStyle: {
                        padding: [0, 50, 0, 0], // 上右下左 内边距，等效于 offset
                        color: colors[2],
                        fontSize: 12
                    },
                    min: 30,
                    max: 45,
                    position: 'left',
                    axisLine: {
                        lineStyle: {
                            color: colors[2]
                        }
                    },
                    axisLabel: {
                        color: colors[2],
                        formatter: '{value} km/h'
                    }
                }
            ],
            series: [{
                name: '大中型车辆流量',
                type: 'bar',
                data: [10930,4647,4813,50643,108872,69922,66001,70522,77006,112342,69565,33687,],
                itemStyle: {
                    normal: {
                        barBorderRadius: 2
                    }
                }
            },
                {
                    barGap: '-50%', // 增加偏移量使重叠显示
                    name: '小型车辆流量',
                    type: 'bar',
                    yAxisIndex: 1,
                    data: [4055,1660,1717,18235,37555,24030,24475,24326,28105,41035,25495,12439,],
                    itemStyle: {
                        normal: {
                            barBorderRadius: 2
                        }
                    }
                },
                {
                    name: '速度',
                    type: 'line',
                    yAxisIndex: 2,
                    data: [38.60814147,41.18693515,38.94548239,34.56775748,34.70956176,35.12525545,
                        35.64662452,35.61539516,33.54218873,33.08170065,31.77334315,35.23114946,],
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }
// ############################################################################################################
// -----------------------------------------柱线图——短期--------------------------------------------------------
// ############################################################################################################

    
// ############################################################################################################
// -----------------------------------------柱线图——中期--------------------------------------------------------
// ############################################################################################################

    window.barLine_mid = function() {
        var myChart = echarts.init(document.getElementById('barLine_mid'));

        var colors = ['rgba(5, 243, 247, 1)', 'rgba(8, 140, 235, 1)', 'rgb(255, 185, 128)'];

        option = {
            color: colors,

            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross'
                },
                formatter: function(params) {
                    // 系列
                    let html = params[0].name + "<br>";

                    for (var i = 0; i < params.length; i++) {

                        // 获取每个系列对应的颜色值
                        html += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + params[i].color + ';"></span>';

                        // 通过判断指定系列增加 % 符号
                        if (option.series[params[i].seriesIndex].type == "line") {
                            html += params[i].seriesName + ": " + params[i].value + "%<br>";
                        } else {
                            html += params[i].seriesName + ": " + params[i].value + "<br>";
                        }
                    }
                    return html;
                }
            },
            grid: {
                    left: 70,
                    right: 120,      // 给右侧标签足够空间
                    top: 20,
                    bottom: 50,
                    containLabel: false   // 关键：让坐标轴文字不包含在 grid 内
                    },
            toolbox: {
                right: 4,   // 靠右 
                top: 0,     // 下移
                feature: {
                    dataView: {
                        show: false,
                        readOnly: false
                    },
                    restore: {
                        show: false,
                    },
                    saveAsImage: {
                        show: false,
                    }
                }
            },
            legend: {
                    left: 140,   // 居中
                    bottom: 160,       // 距离底部
                    itemWidth: 13,    // 图例标记宽度
                    itemHeight: 13,   // 图例标记高度
                    itemGap: 10,      // 图例项间距
                    textStyle: {
                        color: '#fff',
                        fontSize: 11
            },
            data: ['大中型车辆流量', '小型车辆流量', '速度']
            },
            // 缩放组件
            /*dataZoom: {
                type: 'slider'
            },*/
            xAxis: [{
                type: 'category',
                axisTick: {
                    alignWithLabel: true
                },
                axisLabel: {
                    formatter: '{value}',
                    textStyle: {
                        color: "#ffffff" //X轴文字颜色
                    }
                },
                data: ['5-12', '5-13', '5-14', '5-15', '5-16', '5-17', '5-18']
            }],
            yAxis: [{
                type: 'value',
                name: '大中型车辆流量',
                nameLocation: 'end',   // 把轴名称放到轴线中间
                nameRotate: 0,
                nameGap:20,
                nameTextStyle: {
                    padding: [0, -45, 0, 0], // 上右下左 内边距，等效于 offset
                    color: colors[0],
                    fontSize: 12
                },
                min: 0,
                max: 1500000,
                position: 'right',
                offset: 10,
                axisLine: {
                    lineStyle: {
                        color: colors[0]
                    }
                },
                axisLabel: {
                    color: colors[0],
                    formatter: '{value} pcu/h'
                }
            },
                {
                    type: 'value',
                    name: '小型车辆流量',
                    nameLocation: 'end',   // 把轴名称放到轴线中间
                    nameRotate: 0,
                    nameGap:20,
                    nameTextStyle: {
                        padding: [0, -75, 0, 0], // 上右下左 内边距，等效于 offset
                        color: colors[1],
                        fontSize: 12
                    },
                    min: 0,
                    max: 510000,
                    position: 'right',
                    offset: 110,
                    axisLine: {
                        offset:0,
                        lineStyle: {
                            color: colors[1]
                        }
                    },
                    axisLabel: {
                        color: colors[1],
                        formatter: '{value} pcu/h'
                    }
                },
                {
                    type: 'value',
                    name: '速度',
                    nameLocation: 'end',   // 把轴名称放到轴线中间
                    nameRotate: 0,
                    nameGap:20,
                    nameTextStyle: {
                        padding: [0, 50, 0, 0], // 上右下左 内边距，等效于 offset
                        color: colors[2],
                        fontSize: 12
                    },
                    min: 33,
                    max: 35,
                    position: 'left',
                    axisLine: {
                        lineStyle: {
                            color: colors[2]
                        }
                    },
                    axisLabel: {
                        color: colors[2],
                        formatter: '{value} km/h'
                    }
                }
            ],
            series: [{
                name: '大中型车辆流量',
                type: 'bar',
                data: [1339786,1311915,1326257,1334930,1342505,1352481,1359045],
                itemStyle: {
                    normal: {
                        barBorderRadius: 2
                    }
                }
            },
                {
                    barGap: '-50%', // 增加偏移量使重叠显示
                    name: '小型车辆流量',
                    type: 'bar',
                    yAxisIndex: 1,
                    data: [482019,474860,478088,483075,496541,501284,483126,],
                    itemStyle: {
                        normal: {
                            barBorderRadius: 2
                        }
                    }
                },
                {
                    name: '速度',
                    type: 'line',
                    yAxisIndex: 2,
                    data: [34.26223388,34.09771796,34.01126448,34.10966031,34.32339974,34.43868667,33.88773083,],
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }
// ############################################################################################################
// -----------------------------------------柱线图——长期--------------------------------------------------------
// ############################################################################################################

    window.barLine_long = function() {
        var myChart = echarts.init(document.getElementById('barLine_long'));

        var colors = ['rgba(5, 243, 247, 1)', 'rgba(8, 140, 235, 1)', 'rgb(255, 185, 128)'];

        option = {
            color: colors,

            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross'
                },
                formatter: function(params) {
                    // 系列
                    let html = params[0].name + "<br>";

                    for (var i = 0; i < params.length; i++) {

                        // 获取每个系列对应的颜色值
                        html += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + params[i].color + ';"></span>';

                        // 通过判断指定系列增加 % 符号
                        if (option.series[params[i].seriesIndex].type == "line") {
                            html += params[i].seriesName + ": " + params[i].value + "%<br>";
                        } else {
                            html += params[i].seriesName + ": " + params[i].value + "<br>";
                        }
                    }
                    return html;
                }
            },
            grid: {
                    left: 70,
                    right: 120,      // 给右侧标签足够空间
                    top: 20,
                    bottom: 50,
                    containLabel: false   // 关键：让坐标轴文字不包含在 grid 内
                    },
            toolbox: {
                right: 4,   // 靠右 
                top: 0,     // 下移
                feature: {
                    dataView: {
                        show: false,
                        readOnly: false
                    },
                    restore: {
                        show: false,
                    },
                    saveAsImage: {
                        show: false,
                    }
                }
            },
            legend: {
                    left: 140,   // 居中
                    bottom: 160,       // 距离底部
                    itemWidth: 13,    // 图例标记宽度
                    itemHeight: 13,   // 图例标记高度
                    itemGap: 10,      // 图例项间距
                    textStyle: {
                        color: '#fff',
                        fontSize: 11
            },
            data: ['大中型车辆流量', '小型车辆流量', '速度']
            },
            // 缩放组件
            /*dataZoom: {
                type: 'slider'
            },*/
            xAxis: [{
                type: 'category',
                axisTick: {
                    alignWithLabel: true
                },
                axisLabel: {
                    formatter: '{value}',
                    textStyle: {
                        color: "#ffffff" //X轴文字颜色
                    }
                },
                data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
            }],
            yAxis: [{
                type: 'value',
                name: '大中型车辆流量',
                nameLocation: 'end',   // 把轴名称放到轴线中间
                nameRotate: 0,
                nameGap:20,
                nameTextStyle: {
                    padding: [0, -85, 0, 0], // 上右下左 内边距，等效于 offset
                    color: colors[0],
                    fontSize: 12
                },
                min: 0,
                max: 50000000,
                position: 'right',
                offset: 10,
                axisLine: {
                    lineStyle: {
                        color: colors[0]
                    }
                },
                axisLabel: {
                    color: colors[0],
                    formatter: '{value} pcu/h'
                }
            },
                {
                    type: 'value',
                    name: '小型车辆流量',
                    nameLocation: 'end',   // 把轴名称放到轴线中间
                    nameRotate: 0,
                    nameGap:20,
                    nameTextStyle: {
                        padding: [0, -75, 0, 0], // 上右下左 内边距，等效于 offset
                        color: colors[1],
                        fontSize: 12
                    },
                    min: 0,
                    max: 18000000,
                    position: 'right',
                    offset: 120,
                    axisLine: {
                        offset:0,
                        lineStyle: {
                            color: colors[1]
                        }
                    },
                    axisLabel: {
                        color: colors[1],
                        formatter: '{value} pcu/h'
                    }
                },
                {
                    type: 'value',
                    name: '速度',
                    nameLocation: 'end',   // 把轴名称放到轴线中间
                    nameRotate: 0,
                    nameGap:20,
                    nameTextStyle: {
                        padding: [0, 50, 0, 0], // 上右下左 内边距，等效于 offset
                        color: colors[2],
                        fontSize: 12
                    },
                    min: 32,
                    max: 35,
                    position: 'left',
                    axisLine: {
                        lineStyle: {
                            color: colors[2]
                        }
                    },
                    axisLabel: {
                        color: colors[2],
                        formatter: '{value} km/h'
                    }
                }
            ],
            series: [{
                name: '大中型车辆流量',
                type: 'bar',
                data: [31167073.5,35322683.3,39478293.1,42802780.94,41556098,45296146.82,
                    47789512.7,45711707.8,43633902.9,41556098,39478293.1,35322683.3,],
                itemStyle: {
                    normal: {
                        barBorderRadius: 2
                    }
                }
            },
                {
                    barGap: '-50%', // 增加偏移量使重叠显示
                    name: '小型车辆流量',
                    type: 'bar',
                    yAxisIndex: 1,
                    data: [11337274.5,12848911.1,14360547.7,15569856.98,15116366,16476838.94,
                        17383820.9,16628002.6,15872184.3,15116366,14360547.7,12848911.1,],
                    itemStyle: {
                        normal: {
                            barBorderRadius: 2
                        }
                    }
                },
                {
                    name: '速度',
                    type: 'line',
                    yAxisIndex: 2,
                    data: [32.40531857,32.74642719,34.11086165,34.79307889,34.11086165,
                        33.42864442,33.0875358,33.76975304,34.45197027,34.11086165,33.0875358,32.74642719,],
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }
});