$(function () {

    //ring_short();
    //ring_mid();
    // ring_long();
    // //barLine_short();
    // barLine_mid();
    //barLine_long();

// ############################################################################################################
// -----------------------------------------环形图——短期--------------------------------------------------------
// ############################################################################################################
    window.ring_short = function () {
        var myChart = echarts.init(document.getElementById('ring_short'));

        var option = {
            animation: true,
            tooltip: { trigger: 'item', formatter: '{b}<br/>{c}（{d}%）' },
            title: {
            x: 'left',
            y: 'top',
            textStyle: { color: '#b3e5ff', fontSize: 16, fontWeight: 'normal' }
            },
            legend: {
            orient: 'horizontal',
            bottom: 60,
            left: 'center',
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 10,
            textStyle: { color: '#fff', fontSize: 12 },
            data: ['A级', 'B级', 'C级', 'D级', 'E级', 'F级']
            },
            series: [
            {
                type: 'pie',
                center: ['50%', '30%'],
                radius: ['30%', '50%'],
                color: ['#FEE449','#00FFFF','#00FFA8','#2c95f7f6','#0048ffff','#F76F01','#01A4F7','#FE2C8A'],
                startAngle: 90,
                avoidLabelOverlap: true,
                labelLayout: { hideOverlap: true },
                minAngle: 3,
                labelLine: { length: 10, length2: 8, smooth: true },
                label: {
                show: true,
                formatter: '{b}\n{per|{d}%}',
                rich: { per: { color: '#FDF44E', fontSize: 11, fontWeight: 'bold', padding: [2, 4] } },
                color: '#b3e5ff',
                fontSize: 11
                },
                // 关键：用 emphasis.scale 实现“变大”
                emphasis: {
                scale: true,          // 打开缩放
                scaleSize: 12,        // 放大像素（可按需调大/调小）
                label: { show: true }
                },
                animationDurationUpdate: 300,
                animationEasingUpdate: 'cubicOut',
                data: [
                { name: 'A级', value: 121 },
                { name: 'B级', value: 73 },
                { name: 'C级', value: 52 },
                { name: 'D级', value: 52 },
                { name: 'E级', value: 52 },
                { name: 'F级', value: 21 }
                ]
            },
            {
                type: 'pie',
                center: ['50%', '30%'],
                radius: ['23%', '26%'],
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
                        { offset: 0.5, color: '#fe2caaff' },
                        { offset: 0.5, color: '#e4460dff' },
                        { offset: 0.8, color: '#FEE449' },
                        { offset: 1,   color: '#00FFA8' }
                    ]
                    }
                }
                }]
            }
            ]
        };

        myChart.setOption(option);
        myChart.currentIndex = -1;

        // 防重复：如果函数会被多次调用，先清理旧定时器
        if (myChart.__timer) {
            clearInterval(myChart.__timer);
        }

        // 先高亮第 0 个
        myChart.currentIndex = 0;
        myChart.dispatchAction({ type: 'highlight', seriesIndex: 0, dataIndex: 0 });

        // 每 2 秒轮播：当前变大 -> 复位 -> 下一个变大
        myChart.__timer = setInterval(function () {
            var len = option.series[0].data.length;

            // 复位上一个
            myChart.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: myChart.currentIndex
            });

            // 下一个
            myChart.currentIndex = (myChart.currentIndex + 1) % len;

            // 高亮（触发放大）
            myChart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: myChart.currentIndex
            });
        }, 1000); // 单位为 ms

        window.addEventListener('resize', function () {
            myChart.resize();
        });
        };


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
                        bottom: 60,                 // 图例固定在底部并留点边距
                        left: 'center',
                        itemWidth: 10,
                        itemHeight: 10,
                        itemGap: 10,
                        textStyle: { color: '#fff', fontSize: 12 },
                        data: ['A级', 'B级', 'C级', 'D级', 'E级', 'F级']
                        },
                    series: [
                        {
                        type: 'pie',
                        center: ['50%', '30%'],
                        radius: ['30%', '50%'],    // 稍微缩小，避免贴边
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
                            per: { color: '#FDF44E', fontSize: 11, fontWeight: 'bold', padding: [2, 4] }
                            },
                            color: '#b3e5ff',
                            fontSize: 11
                        },
                        emphasis: {
                            scale: false,                    // 取消放大，避免“跳动”
                            label: { show: true }
                        },
                        data: [
                            { name: 'A级', value: 121 },
                            { name: 'B级', value: 73 },
                            { name: 'C级', value: 52 },
                            { name: 'D级', value: 52 },
                            { name: 'E级', value: 52 },
                            { name: 'F级', value: 21 }
                        ]
                        },
                        {
                        // 装饰用内环（更小且不响应鼠标事件）
                        type: 'pie',
                        center: ['50%', '30%'],
                        radius: ['23%', '26%'],
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
                                { offset: 0.5, color: '#fe2caaff' },
                                { offset: 0.5, color: '#e4460dff' },
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
                        bottom: 60,                 // 图例固定在底部并留点边距
                        left: 'center',
                        itemWidth: 10,
                        itemHeight: 10,
                        itemGap: 10,
                        textStyle: { color: '#fff', fontSize: 12 },
                        data: ['A级', 'B级', 'C级', 'D级', 'E级', 'F级']
                        },
                    series: [
                        {
                        type: 'pie',
                        center: ['50%', '30%'],
                        radius: ['30%', '50%'],    // 稍微缩小，避免贴边
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
                            per: { color: '#FDF44E', fontSize: 11, fontWeight: 'bold', padding: [2, 4] }
                            },
                            color: '#b3e5ff',
                            fontSize: 11
                        },
                        emphasis: {
                            scale: false,                    // 取消放大，避免“跳动”
                            label: { show: true }
                        },
                        data: [
                            { name: 'A级', value: 121 },
                            { name: 'B级', value: 73 },
                            { name: 'C级', value: 52 },
                            { name: 'D级', value: 52 },
                            { name: 'E级', value: 52 },
                            { name: 'F级', value: 21 }
                        ]
                        },
                        {
                        // 装饰用内环（更小且不响应鼠标事件）
                        type: 'pie',
                        center: ['50%', '30%'],
                        radius: ['23%', '26%'],
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
                                { offset: 0.5, color: '#fe2caaff' },
                                { offset: 0.5, color: '#e4460dff' },
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

        // --- 原始数据（作为稳定基线，避免累计漂移） ---
        const base = {
            bar1: [10930,4647,4813,50643,108872,69922,66001,70522,77006,112342,69565,33687],
            bar2: [4055,1660,1717,18235,37555,24030,24475,24326,28105,41035,25495,12439],
            line: [38.60814147,41.18693515,38.94548239,34.56775748,34.70956176,35.12525545,
                35.64662452,35.61539516,33.54218873,33.08170065,31.77334315,35.23114946]
        };

        var option = {
            color: colors,
            tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'cross' },
            formatter: function(params) {
                let html = params[0].name + "<br>";
                for (var i = 0; i < params.length; i++) {
                html += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + params[i].color + ';"></span>';
                if (option.series[params[i].seriesIndex].type == "line") {
                    html += params[i].seriesName + ": " + params[i].value + "%<br>";
                } else {
                    html += params[i].seriesName + ": " + params[i].value + "<br>";
                }
                }
                return html;
            }
            },
            grid: { left: 20, right: 12, top: 40, bottom: 70, containLabel: true },
            toolbox: { right: 4, top: 0, feature: { dataView: {show: false}, restore: {show: false}, saveAsImage: {show: false} } },
            legend: {
            left: 140, bottom: 200, itemWidth: 13, itemHeight: 13, itemGap: 10,
            textStyle: { color: '#fff', fontSize: 11 },
            data: ['大中型车辆流量', '小型车辆流量', '速度']
            },
            xAxis: [{
            type: 'category',
            axisTick: { alignWithLabel: true },
            axisLabel: { formatter: '{value}', textStyle: { color: "#ffffff" } },
            data: ['00', '02', '04', '06', '08', '10', '12','14', '16', '18', '20', '22']
            }],
            yAxis: [
            {
                type: 'value',
                name: '大中型车辆流量',
                nameRotate: 0, nameGap: 20,
                nameTextStyle: { padding: [0, -95, -5, 0], color: colors[0], fontSize: 12 },
                min: 0, max: 120000, position: 'right', offset: 90,
                axisLine: { lineStyle: { color: colors[0] } },
                axisLabel: { color: colors[0], formatter: '{value} pcu/h' }
            },
            {
                type: 'value',
                name: '小型车辆流量',
                nameLocation: 'end', nameRotate: 0, nameGap: 20,
                nameTextStyle: { padding: [0, -85, -5, 0], color: colors[1], fontSize: 12 },
                min: 0, max: 50000, position: 'right', offset: 0,
                axisLine: { offset:0, lineStyle: { color: colors[1] } },
                axisLabel: { color: colors[1], formatter: '{value} pcu/h' }
            },
            {
                type: 'value',
                name: '速度',
                nameLocation: 'end', nameRotate: 0, nameGap: 20,
                nameTextStyle: { padding: [0, 50, 0, 0], color: colors[2], fontSize: 12 },
                min: 30, max: 45, position: 'left',
                axisLine: { lineStyle: { color: colors[2] } },
                axisLabel: { color: colors[2], formatter: '{value} km/h' }
            }
            ],
            // 让更新动画更柔和
            animationDurationUpdate: 350,
            animationEasingUpdate: 'cubicOut',
            series: [
            {
                name: '大中型车辆流量',
                type: 'bar',
                data: base.bar1.slice(),
                itemStyle: { normal: { barBorderRadius: 2 } }
            },
            {
                barGap: '-50%',
                name: '小型车辆流量',
                type: 'bar',
                yAxisIndex: 1,
                data: base.bar2.slice(),
                itemStyle: { normal: { barBorderRadius: 2 } }
            },
            {
                name: '速度',
                type: 'line',
                yAxisIndex: 2,
                smooth: true,
                symbolSize: 6,
                data: base.line.slice()
            }
            ]
        };

        // 辅助：夹紧到范围
        function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

        // 对所有横坐标一起生成扰动
        function jitterAll() {
        const upOrDown = () => (Math.random() < 0.5 ? -1 : 1);

        const newBar1 = option.series[0].data.slice();
        const newBar2 = option.series[1].data.slice();
        const newLine = option.series[2].data.slice();

        for (let i = 0; i < base.bar1.length; i++) {
            const b1 = base.bar1[i];
            const b2 = base.bar2[i];
            const l0 = base.line[i];

            // 每个点各自独立地小幅上/下浮动
            const d1 = Math.round(Math.max(200, b1 * (0.02 + Math.random() * 0.03)) * upOrDown()); // ~2%~5%
            const d2 = Math.round(Math.max(80,  b2 * (0.02 + Math.random() * 0.04)) * upOrDown());  // ~2%~6%
            const dL = (0.2 + Math.random() * 0.8) * upOrDown(); // ~0.2~1.0 km/h

            newBar1[i] = clamp(b1 + d1, 0, 120000);
            newBar2[i] = clamp(b2 + d2, 0, 50000);
            newLine[i] = +clamp(l0 + dL, 30, 45).toFixed(2);
        }

        return { newBar1, newBar2, newLine };
        }

        myChart.setOption(option);

        // 防重复定时器
        if (myChart.__jitterTimer) clearInterval(myChart.__jitterTimer);
        if (myChart.__jitterBackTimer) clearTimeout(myChart.__jitterBackTimer);

        // 每 2 秒：整列“浮动一下” -> 600ms 回到基线
        myChart.__jitterTimer = setInterval(function () {
        const { newBar1, newBar2, newLine } = jitterAll();

        // 先到达偏移值（触发动画）
        myChart.setOption({
            series: [
            { data: newBar1 },
            { data: newBar2 },
            { data: newLine }
            ]
        }, false);

        // 回弹
        if (myChart.__jitterBackTimer) clearTimeout(myChart.__jitterBackTimer);
        myChart.__jitterBackTimer = setTimeout(() => {
            myChart.setOption({
            series: [
                { data: base.bar1.slice() },
                { data: base.bar2.slice() },
                { data: base.line.slice() }
            ]
            }, false);
        }, 300);
        }, 500);

        window.addEventListener("resize", function() {
            myChart.resize();
        });
        };

    
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
                    left: 20,
                    right: 12,      // 给右侧标签足够空间
                    top: 40,
                    bottom: 70,
                    containLabel: true   // 关键：让坐标轴文字不包含在 grid 内
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
                    bottom: 200,       // 距离底部
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
                //nameLocation: 'end',   // 把轴名称放到轴线中间
                nameRotate: 0,
                nameGap:20,
                nameTextStyle: {
                    padding: [0, -95, -5, 0], // 上右下左 内边距，等效于 offset
                    color: colors[0],
                    fontSize: 12
                },
                min: 0,
                max: 120000,
                position: 'right',
                offset: 90,
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
                        padding: [0, -85, -5, 0], // 上右下左 内边距，等效于 offset
                        color: colors[1],
                        fontSize: 12
                    },
                    min: 0,
                    max: 50000,
                    position: 'right',
                    offset: 0,
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
                    left: 20,
                    right: 12,      // 给右侧标签足够空间
                    top: 40,
                    bottom: 70,
                    containLabel: true   // 关键：让坐标轴文字不包含在 grid 内
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
                    bottom: 200,       // 距离底部
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
                //nameLocation: 'end',   // 把轴名称放到轴线中间
                nameRotate: 0,
                nameGap:20,
                nameTextStyle: {
                    padding: [0, -95, -5, 0], // 上右下左 内边距，等效于 offset
                    color: colors[0],
                    fontSize: 12
                },
                min: 0,
                max: 120000,
                position: 'right',
                offset: 90,
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
                        padding: [0, -85, -5, 0], // 上右下左 内边距，等效于 offset
                        color: colors[1],
                        fontSize: 12
                    },
                    min: 0,
                    max: 50000,
                    position: 'right',
                    offset: 0,
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
});