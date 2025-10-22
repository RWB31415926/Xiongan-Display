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
            bottom: 55,
            left: 'center',
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 10,
            textStyle: { color: '#fff', fontSize: 12 },
            data: ['>50km/h', '40-50km/h', '30-40km/h', '20-30km/h', '10-20km/h', '<10km/h']
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
                { name: '>50km/h', value: 12 },
                { name: '40-50km/h', value: 29 },
                { name: '30-40km/h', value: 76 },
                { name: '20-30km/h', value: 99 },
                { name: '10-20km/h', value: 14 },
                { name: '<10km/h', value: 37 }
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
        }, 1500); // 单位为 ms

        window.addEventListener('resize', function () {
            myChart.resize();
        });
        };


// ############################################################################################################
// -----------------------------------------环形图——中期--------------------------------------------------------
// ############################################################################################################

        window.ring_mid = function() {
        var myChart = echarts.init(document.getElementById('ring_mid'));

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
            bottom: 55,
            left: 'center',
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 10,
            textStyle: { color: '#fff', fontSize: 12 },
            data: ['>50km/h', '40-50km/h', '30-40km/h', '20-30km/h', '10-20km/h', '<10km/h']
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
                { name: '>50km/h', value: 12 },
                { name: '40-50km/h', value: 29 },
                { name: '30-40km/h', value: 76 },
                { name: '20-30km/h', value: 99 },
                { name: '10-20km/h', value: 14 },
                { name: '<10km/h', value: 37 }
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
        }, 1500); // 单位为 ms

        window.addEventListener('resize', function () {
            myChart.resize();
        });
        };

// ############################################################################################################
// -----------------------------------------环形图——长期--------------------------------------------------------
// ############################################################################################################

        window.ring_long = function() {
        var myChart = echarts.init(document.getElementById('ring_long'));

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
            bottom: 55,
            left: 'center',
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 10,
            textStyle: { color: '#fff', fontSize: 12 },
            data: ['>50km/h', '40-50km/h', '30-40km/h', '20-30km/h', '10-20km/h', '<10km/h']
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
                { name: '>50km/h', value: 12 },
                { name: '40-50km/h', value: 29 },
                { name: '30-40km/h', value: 76 },
                { name: '20-30km/h', value: 99 },
                { name: '10-20km/h', value: 14 },
                { name: '<10km/h', value: 37 }
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
        }, 1500); // 单位为 ms

        window.addEventListener('resize', function () {
            myChart.resize();
        });
        };

// ############################################################################################################
// -----------------------------------------柱线图——短期--------------------------------------------------------
// ############################################################################################################

window.barLine_short = function() {
  const colors = ['rgba(5, 243, 247, 1)', 'rgba(8, 140, 235, 1)', 'rgb(255, 185, 128)'];
  const myChart = echarts.init(document.getElementById('barLine_short'));

  // ===== 一周数据：每一天 12 个点（00~22，间隔2小时） =====
  const weekData = [
            {
                date: '2025-05-12',
                bar1: [30,11.125,15.125,153.875,279.75,184.5,203.5,203.375,257.875,329.625,233.125,101.625],
                bar2: [66.75,21.75,29.125,278,592,351.125,387.125,410.125,482.5,652,429.875,194.5],
                line: [33.534,34.380,32.768,28.545,27.913,28.705,30.088,29.014,27.676,26.411,26.936,30.719]
            },
            {
                date: '2025-05-13',
                bar1: [32.75,14.625,14.25,140.75,250.5,205.625,202.875,195.125,241,311.875,240.125,101.625],
                bar2: [64.125,28.125,26.25,263.375,497.75,409.5,399.125,386.25,443.875,655,437.875,210],
                line: [33.596,36.374,31.821,28.665,27.169,29.228,31.526,29.309,27.898,27.016,26.741,30.680]
            },
            {
                date: '2025-05-14',
                bar1: [33.375,12,14.875,138,275.75,187.75,212.75,217.375,248.375,327,255.375,103.75],
                bar2: [74.25,25.375,23.625,258.125,575.625,351.25,420.25,432.25,466.875,680.875,481.125,220.125],
                line: [36.307,36.569,30.890,28.756,27.798,29.396,30.635,28.818,27.456,27.126,27.096,32.433]
            },
            {
                date: '2025-05-15',
                bar1: [29.875,11.25,17.375,147.125,272.875,202.375,214.5,189.125,238.375,324.75,255.375,108.25],
                bar2: [72.75,27.375,32.625,256.375,541.625,392.25,425,401.875,434,667.625,443.75,208.75],
                line: [36.004,35.942,33.443,28.741,28.196,28.797,31.430,29.706,27.021,27.848,26.769,31.198]
            },
            {
                date: '2025-05-16',
                bar1: [33.5,11.5,17,144.25,271.625,202.5,206.375,212.75,273.375,363.375,221.25,102.875],
                bar2: [72.375,28.375,30.875,263.75,519.5,381.625,428.5,415.875,505.5,775.125,427.5,222.375],
                line: [34.001,36.113,30.593,29.098,28.252,29.137,30.956,29.272,27.389,26.992,27.427,31.670]
            },
            {
                date: '2025-05-17',
                bar1: [39.125,12.875,17.125,128.25,185.25,253.25,247.375,234.5,259.25,328.625,236,109.125],
                bar2: [77.125,25.625,26.25,234.375,404,478.875,488.25,454,452.75,660.75,411.25,213.875],
                line: [33.328,36.429,31.813,28.945,28.595,27.684,29.510,27.669,26.461,27.187,26.812,31.206]
            },
            {
                date: '2025-05-18',
                bar1: [33.125,11.625,14.75,111,197.125,240.625,235.25,235.125,255.5,322.75,227.875,100.625],
                bar2: [63.5,21.75,22,204.125,380.75,449.25,463.25,447.875,470.875,645,394.25,223.5],
                line: [35.243,35.678,31.024,29.126,28.536,26.965,29.747,27.988,27.174,27.264,26.618,31.431]
            }
  ];

  const hours = ['00','02','04','06','08','10','12','14','16','18','20','22'];

  // ===== timeline 播放器配置（自动轮播、循环） =====
  const baseOption = {
    color: colors,
    timeline: {
      show: false,        // 隐藏 timeline 进度条
      axisType: 'category',
      autoPlay: true,
      loop: true,
      playInterval: 1100,     // 每天停留 playInterval/100秒
      bottom: 8,
      label: { color: '#fff' },
      data: weekData.map(d => d.date)
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'cross' },
      formatter: function(params) {
        let html = params[0].name + "<br>";
        for (let i = 0; i < params.length; i++) {
          html += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + params[i].color + ';"></span>';
          if (optionTimeline.options[myChart.getOption().timeline[0].currentIndex].series[params[i].seriesIndex].type === "line") {
            html += params[i].seriesName + ": " + params[i].value + "%<br>";
          } else {
            html += params[i].seriesName + ": " + params[i].value + "<br>";
          }
        }
        return html;
      }
    },
    grid: { left: 20, right: 12, top: 54, bottom: 70, containLabel: true },
    toolbox: { right: 4, top: 0, feature: { dataView: {show: false}, restore: {show: false}, saveAsImage: {show: false} } },
    legend: {
      left: 140, bottom: 200, itemWidth: 13, itemHeight: 13, itemGap: 10,
      textStyle: { color: '#fff', fontSize: 11 },
      data: ['大中型车辆流量', '小型车辆流量', '速度']
    },
    xAxis: [{
      type: 'category',
      axisTick: { alignWithLabel: true },
      axisLabel: { formatter: '{value}', color: "#ffffff" },
      data: hours
    }],
    yAxis: [
      {
        type: 'value',
        name: '大中型车辆',
        nameRotate: 0, nameGap: 20,
        nameTextStyle: { padding: [0, -75, -5, 0], color: colors[0], fontSize: 12 },
        min: 0, max: 400, position: 'right', offset: 70,
        axisLine: { lineStyle: { color: colors[0] } },
        axisLabel: { color: colors[0], formatter: '{value} pcu/h' }
      },
      {
        type: 'value',
        name: '小型车辆',
        nameRotate: 0, nameGap: 20,
        nameTextStyle: { padding: [0, -75, -5, 0], color: colors[1], fontSize: 12 },
        min: 0, max: 800, position: 'right', offset: 0,
        axisLine: { lineStyle: { color: colors[1] } },
        axisLabel: { color: colors[1], formatter: '{value} pcu/h' }
      },
      {
        type: 'value',
        name: '速度',
        nameRotate: 0, nameGap: 20,
        nameTextStyle: { padding: [0, 50, -20, 0], color: colors[2], fontSize: 12 },
        min: 25, max: 38, position: 'left',
        axisLine: { lineStyle: { color: colors[2] } },
        axisLabel: { color: colors[2], formatter: '{value} km/h' }
      }
    ],
    // 全局动画设置：切天时平滑过渡
    animationDurationUpdate: 600,
    animationEasingUpdate: 'cubicOut'
  };

  // ===== 为每天生成一个 option =====
  const optionTimeline = {
    baseOption,
    options: weekData.map(d => ({
      title: {
        subtext: d.date,                // 显示当前日期
        left: 10,
        top: 6,
        subtextStyle: { color: 'rgba(238, 255, 0, 1)', fontSize: 14 }
      },
      series: [
        {
          name: '大中型车辆流量',
          type: 'bar',
          data: d.bar1.slice(),
          itemStyle: { borderRadius: 2 },
          universalTransition: true
        },
        {
          name: '小型车辆流量',
          type: 'bar',
          yAxisIndex: 1,
          barGap: '-50%',
          data: d.bar2.slice(),
          itemStyle: { borderRadius: 2 },
          universalTransition: true
        },
        {
          name: '速度',
          type: 'line',
          yAxisIndex: 2,
          smooth: true,
          symbolSize: 6,
          data: d.line.slice(),
          universalTransition: true
        }
      ]
    }))
  };

  myChart.setOption(optionTimeline);
  window.addEventListener('resize', () => myChart.resize());
};

    
// ############################################################################################################
// -----------------------------------------柱线图——中期--------------------------------------------------------
// ############################################################################################################

window.barLine_mid = function() {
  const colors = ['rgba(5, 243, 247, 1)', 'rgba(8, 140, 235, 1)', 'rgb(255, 185, 128)'];
  const myChart = echarts.init(document.getElementById('barLine_mid'));

  // ===== 一周数据：每一天 12 个点（00~22，间隔2小时） =====
  const weekData = [
            {
                date: '2025-05-12',
                bar1: [30,11.125,15.125,153.875,279.75,184.5,203.5,203.375,257.875,329.625,233.125,101.625],
                bar2: [66.75,21.75,29.125,278,592,351.125,387.125,410.125,482.5,652,429.875,194.5],
                line: [33.534,34.380,32.768,28.545,27.913,28.705,30.088,29.014,27.676,26.411,26.936,30.719]
            },
            {
                date: '2025-05-13',
                bar1: [32.75,14.625,14.25,140.75,250.5,205.625,202.875,195.125,241,311.875,240.125,101.625],
                bar2: [64.125,28.125,26.25,263.375,497.75,409.5,399.125,386.25,443.875,655,437.875,210],
                line: [33.596,36.374,31.821,28.665,27.169,29.228,31.526,29.309,27.898,27.016,26.741,30.680]
            },
            {
                date: '2025-05-14',
                bar1: [33.375,12,14.875,138,275.75,187.75,212.75,217.375,248.375,327,255.375,103.75],
                bar2: [74.25,25.375,23.625,258.125,575.625,351.25,420.25,432.25,466.875,680.875,481.125,220.125],
                line: [36.307,36.569,30.890,28.756,27.798,29.396,30.635,28.818,27.456,27.126,27.096,32.433]
            },
            {
                date: '2025-05-15',
                bar1: [29.875,11.25,17.375,147.125,272.875,202.375,214.5,189.125,238.375,324.75,255.375,108.25],
                bar2: [72.75,27.375,32.625,256.375,541.625,392.25,425,401.875,434,667.625,443.75,208.75],
                line: [36.004,35.942,33.443,28.741,28.196,28.797,31.430,29.706,27.021,27.848,26.769,31.198]
            },
            {
                date: '2025-05-16',
                bar1: [33.5,11.5,17,144.25,271.625,202.5,206.375,212.75,273.375,363.375,221.25,102.875],
                bar2: [72.375,28.375,30.875,263.75,519.5,381.625,428.5,415.875,505.5,775.125,427.5,222.375],
                line: [34.001,36.113,30.593,29.098,28.252,29.137,30.956,29.272,27.389,26.992,27.427,31.670]
            },
            {
                date: '2025-05-17',
                bar1: [39.125,12.875,17.125,128.25,185.25,253.25,247.375,234.5,259.25,328.625,236,109.125],
                bar2: [77.125,25.625,26.25,234.375,404,478.875,488.25,454,452.75,660.75,411.25,213.875],
                line: [33.328,36.429,31.813,28.945,28.595,27.684,29.510,27.669,26.461,27.187,26.812,31.206]
            },
            {
                date: '2025-05-18',
                bar1: [33.125,11.625,14.75,111,197.125,240.625,235.25,235.125,255.5,322.75,227.875,100.625],
                bar2: [63.5,21.75,22,204.125,380.75,449.25,463.25,447.875,470.875,645,394.25,223.5],
                line: [35.243,35.678,31.024,29.126,28.536,26.965,29.747,27.988,27.174,27.264,26.618,31.431]
            }
  ];

  const hours = ['00','02','04','06','08','10','12','14','16','18','20','22'];

  // ===== timeline 播放器配置（自动轮播、循环） =====
  const baseOption = {
    color: colors,
    timeline: {
      show: false,        // 隐藏 timeline 进度条
      axisType: 'category',
      autoPlay: true,
      loop: true,
      playInterval: 1100,     // 每天停留 playInterval/100秒
      bottom: 8,
      label: { color: '#fff' },
      data: weekData.map(d => d.date)
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'cross' },
      formatter: function(params) {
        let html = params[0].name + "<br>";
        for (let i = 0; i < params.length; i++) {
          html += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + params[i].color + ';"></span>';
          if (optionTimeline.options[myChart.getOption().timeline[0].currentIndex].series[params[i].seriesIndex].type === "line") {
            html += params[i].seriesName + ": " + params[i].value + "%<br>";
          } else {
            html += params[i].seriesName + ": " + params[i].value + "<br>";
          }
        }
        return html;
      }
    },
    grid: { left: 20, right: 12, top: 54, bottom: 70, containLabel: true },
    toolbox: { right: 4, top: 0, feature: { dataView: {show: false}, restore: {show: false}, saveAsImage: {show: false} } },
    legend: {
      left: 140, bottom: 200, itemWidth: 13, itemHeight: 13, itemGap: 10,
      textStyle: { color: '#fff', fontSize: 11 },
      data: ['大中型车辆流量', '小型车辆流量', '速度']
    },
    xAxis: [{
      type: 'category',
      axisTick: { alignWithLabel: true },
      axisLabel: { formatter: '{value}', color: "#ffffff" },
      data: hours
    }],
    yAxis: [
      {
        type: 'value',
        name: '大中型车辆',
        nameRotate: 0, nameGap: 20,
        nameTextStyle: { padding: [0, -75, -5, 0], color: colors[0], fontSize: 12 },
        min: 0, max: 400, position: 'right', offset: 70,
        axisLine: { lineStyle: { color: colors[0] } },
        axisLabel: { color: colors[0], formatter: '{value} pcu/h' }
      },
      {
        type: 'value',
        name: '小型车辆',
        nameRotate: 0, nameGap: 20,
        nameTextStyle: { padding: [0, -75, -5, 0], color: colors[1], fontSize: 12 },
        min: 0, max: 800, position: 'right', offset: 0,
        axisLine: { lineStyle: { color: colors[1] } },
        axisLabel: { color: colors[1], formatter: '{value} pcu/h' }
      },
      {
        type: 'value',
        name: '速度',
        nameRotate: 0, nameGap: 20,
        nameTextStyle: { padding: [0, 50, -20, 0], color: colors[2], fontSize: 12 },
        min: 25, max: 38, position: 'left',
        axisLine: { lineStyle: { color: colors[2] } },
        axisLabel: { color: colors[2], formatter: '{value} km/h' }
      }
    ],
    // 全局动画设置：切天时平滑过渡
    animationDurationUpdate: 600,
    animationEasingUpdate: 'cubicOut'
  };

  // ===== 为每天生成一个 option =====
  const optionTimeline = {
    baseOption,
    options: weekData.map(d => ({
      title: {
        subtext: d.date,                // 显示当前日期
        left: 10,
        top: 6,
        subtextStyle: { color: 'rgba(238, 255, 0, 1)', fontSize: 14 }
      },
      series: [
        {
          name: '大中型车辆流量',
          type: 'bar',
          data: d.bar1.slice(),
          itemStyle: { borderRadius: 2 },
          universalTransition: true
        },
        {
          name: '小型车辆流量',
          type: 'bar',
          yAxisIndex: 1,
          barGap: '-50%',
          data: d.bar2.slice(),
          itemStyle: { borderRadius: 2 },
          universalTransition: true
        },
        {
          name: '速度',
          type: 'line',
          yAxisIndex: 2,
          smooth: true,
          symbolSize: 6,
          data: d.line.slice(),
          universalTransition: true
        }
      ]
    }))
  };

  myChart.setOption(optionTimeline);
  window.addEventListener('resize', () => myChart.resize());
};

// ############################################################################################################
// -----------------------------------------柱线图——长期--------------------------------------------------------
// ############################################################################################################

    window.barLine_long = function() {
  const colors = ['rgba(5, 243, 247, 1)', 'rgba(8, 140, 235, 1)', 'rgb(255, 185, 128)'];
  const myChart = echarts.init(document.getElementById('barLine_long'));

  // ===== 一周数据：每一天 12 个点（00~22，间隔2小时） =====
  const weekData = [
            {
                date: '2025-05-12',
                bar1: [30,11.125,15.125,153.875,279.75,184.5,203.5,203.375,257.875,329.625,233.125,101.625],
                bar2: [66.75,21.75,29.125,278,592,351.125,387.125,410.125,482.5,652,429.875,194.5],
                line: [33.534,34.380,32.768,28.545,27.913,28.705,30.088,29.014,27.676,26.411,26.936,30.719]
            },
            {
                date: '2025-05-13',
                bar1: [32.75,14.625,14.25,140.75,250.5,205.625,202.875,195.125,241,311.875,240.125,101.625],
                bar2: [64.125,28.125,26.25,263.375,497.75,409.5,399.125,386.25,443.875,655,437.875,210],
                line: [33.596,36.374,31.821,28.665,27.169,29.228,31.526,29.309,27.898,27.016,26.741,30.680]
            },
            {
                date: '2025-05-14',
                bar1: [33.375,12,14.875,138,275.75,187.75,212.75,217.375,248.375,327,255.375,103.75],
                bar2: [74.25,25.375,23.625,258.125,575.625,351.25,420.25,432.25,466.875,680.875,481.125,220.125],
                line: [36.307,36.569,30.890,28.756,27.798,29.396,30.635,28.818,27.456,27.126,27.096,32.433]
            },
            {
                date: '2025-05-15',
                bar1: [29.875,11.25,17.375,147.125,272.875,202.375,214.5,189.125,238.375,324.75,255.375,108.25],
                bar2: [72.75,27.375,32.625,256.375,541.625,392.25,425,401.875,434,667.625,443.75,208.75],
                line: [36.004,35.942,33.443,28.741,28.196,28.797,31.430,29.706,27.021,27.848,26.769,31.198]
            },
            {
                date: '2025-05-16',
                bar1: [33.5,11.5,17,144.25,271.625,202.5,206.375,212.75,273.375,363.375,221.25,102.875],
                bar2: [72.375,28.375,30.875,263.75,519.5,381.625,428.5,415.875,505.5,775.125,427.5,222.375],
                line: [34.001,36.113,30.593,29.098,28.252,29.137,30.956,29.272,27.389,26.992,27.427,31.670]
            },
            {
                date: '2025-05-17',
                bar1: [39.125,12.875,17.125,128.25,185.25,253.25,247.375,234.5,259.25,328.625,236,109.125],
                bar2: [77.125,25.625,26.25,234.375,404,478.875,488.25,454,452.75,660.75,411.25,213.875],
                line: [33.328,36.429,31.813,28.945,28.595,27.684,29.510,27.669,26.461,27.187,26.812,31.206]
            },
            {
                date: '2025-05-18',
                bar1: [33.125,11.625,14.75,111,197.125,240.625,235.25,235.125,255.5,322.75,227.875,100.625],
                bar2: [63.5,21.75,22,204.125,380.75,449.25,463.25,447.875,470.875,645,394.25,223.5],
                line: [35.243,35.678,31.024,29.126,28.536,26.965,29.747,27.988,27.174,27.264,26.618,31.431]
            }
  ];

  const hours = ['00','02','04','06','08','10','12','14','16','18','20','22'];

  // ===== timeline 播放器配置（自动轮播、循环） =====
  const baseOption = {
    color: colors,
    timeline: {
      show: false,        // 隐藏 timeline 进度条
      axisType: 'category',
      autoPlay: true,
      loop: true,
      playInterval: 1100,     // 每天停留 playInterval/100秒
      bottom: 8,
      label: { color: '#fff' },
      data: weekData.map(d => d.date)
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'cross' },
      formatter: function(params) {
        let html = params[0].name + "<br>";
        for (let i = 0; i < params.length; i++) {
          html += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + params[i].color + ';"></span>';
          if (optionTimeline.options[myChart.getOption().timeline[0].currentIndex].series[params[i].seriesIndex].type === "line") {
            html += params[i].seriesName + ": " + params[i].value + "%<br>";
          } else {
            html += params[i].seriesName + ": " + params[i].value + "<br>";
          }
        }
        return html;
      }
    },
    grid: { left: 20, right: 12, top: 54, bottom: 70, containLabel: true },
    toolbox: { right: 4, top: 0, feature: { dataView: {show: false}, restore: {show: false}, saveAsImage: {show: false} } },
    legend: {
      left: 140, bottom: 200, itemWidth: 13, itemHeight: 13, itemGap: 10,
      textStyle: { color: '#fff', fontSize: 11 },
      data: ['大中型车辆流量', '小型车辆流量', '速度']
    },
    xAxis: [{
      type: 'category',
      axisTick: { alignWithLabel: true },
      axisLabel: { formatter: '{value}', color: "#ffffff" },
      data: hours
    }],
    yAxis: [
      {
        type: 'value',
        name: '大中型车辆',
        nameRotate: 0, nameGap: 20,
        nameTextStyle: { padding: [0, -75, -5, 0], color: colors[0], fontSize: 12 },
        min: 0, max: 400, position: 'right', offset: 70,
        axisLine: { lineStyle: { color: colors[0] } },
        axisLabel: { color: colors[0], formatter: '{value} pcu/h' }
      },
      {
        type: 'value',
        name: '小型车辆',
        nameRotate: 0, nameGap: 20,
        nameTextStyle: { padding: [0, -75, -5, 0], color: colors[1], fontSize: 12 },
        min: 0, max: 800, position: 'right', offset: 0,
        axisLine: { lineStyle: { color: colors[1] } },
        axisLabel: { color: colors[1], formatter: '{value} pcu/h' }
      },
      {
        type: 'value',
        name: '速度',
        nameRotate: 0, nameGap: 20,
        nameTextStyle: { padding: [0, 50, -20, 0], color: colors[2], fontSize: 12 },
        min: 25, max: 38, position: 'left',
        axisLine: { lineStyle: { color: colors[2] } },
        axisLabel: { color: colors[2], formatter: '{value} km/h' }
      }
    ],
    // 全局动画设置：切天时平滑过渡
    animationDurationUpdate: 600,
    animationEasingUpdate: 'cubicOut'
  };

  // ===== 为每天生成一个 option =====
  const optionTimeline = {
    baseOption,
    options: weekData.map(d => ({
      title: {
        subtext: d.date,                // 显示当前日期
        left: 10,
        top: 6,
        subtextStyle: { color: 'rgba(238, 255, 0, 1)', fontSize: 14 }
      },
      series: [
        {
          name: '大中型车辆流量',
          type: 'bar',
          data: d.bar1.slice(),
          itemStyle: { borderRadius: 2 },
          universalTransition: true
        },
        {
          name: '小型车辆流量',
          type: 'bar',
          yAxisIndex: 1,
          barGap: '-50%',
          data: d.bar2.slice(),
          itemStyle: { borderRadius: 2 },
          universalTransition: true
        },
        {
          name: '速度',
          type: 'line',
          yAxisIndex: 2,
          smooth: true,
          symbolSize: 6,
          data: d.line.slice(),
          universalTransition: true
        }
      ]
    }))
  };

  myChart.setOption(optionTimeline);
  window.addEventListener('resize', () => myChart.resize());
}
});