const dj = {
    stratData: {}, 
    init: function(){
        //dj.makeData();
        dj.makeChart();
    }, 
    makeData: function(){
        var dataKey = Object.keys(data);
        var dataValue = Object.values(data);
        var groups;

        var depth4Data = [];
        var depth3Data = [];
        var depth2Data = [];
        var depth1Data = {};
        dataKey.forEach(element => {
            if(data[element].level == 4){
                depth4Data.push(data[element])
            }else if(data[element].level == 3){
                depth3Data.push(data[element]);
            }else if(data[element].level == 2){
                depth2Data.push(data[element]);
            }else{
                depth1Data = data[element];
            }
        });

        depth4Data.forEach(depth4Obj => {
            var parentObj = depth3Data.filter((v) => {
                return v.id == depth4Obj.parentId;
            });
            parentObj[0].children.push(depth4Obj);
        });

        depth3Data.forEach(depth3Obj => {
            var parentObj = depth2Data.filter((v) => {
                return v.id == depth3Obj.parentId;
            });
            parentObj[0].children.push(depth3Obj);
        });
        depth1Data.children = depth2Data;
        dj.stratData = depth1Data;
    }, 
    makeChart: function(){

        var chart;
        d3.json('../employee2.json')
            .then((dataFlattened) => {
            console.log(dataFlattened)
            chart = new d3.OrgChart()
            .container('#chartContainer')
            .data(dataFlattened)
            .nodeWidth((d) => 250)
            .initialZoom(0.7)
            .nodeHeight((d) => 175)
            .childrenMargin((d) => 40)
            .compactMarginBetween((d) => 15)
            .compactMarginPair((d) => 80)
            .nodeContent(function (d, i, arr, state) {
                return `
                <div class="nodeContainer" style="height:${d.height}px;">
                    <div class="nodeDiv" style="height:${d.height - 32}px;">
                        <img class="imgDiv" src="https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/general.jpg" style="margin-left:${d.width / 2 - 30}px;"/>
                        <div class="barDiv" style="width:${d.width - 2}px;"></div>
                        <div class="infoDiv">
                            <div class="nameDiv"> ${d.data.name}</div>
                        </div> 
                    </div>     
                </div>
                `;
            })
            .render();
        });

            // d3.json('../orgData.json')
            // .then((dataFlattened) => {
            //     console.log(dataFlattened)
            //     // var strat = d3.stratify()
            //     // .id(d => d[children])
            //     // .parentId(d => d[parentId])
            //     // root = strat(dataFlattened)

            //     //console.log(root)
            //     chart = new d3.OrgChart()
            //     .container('#chartContainer')
            //     .data(dataFlattened)
            //     .render()
            // });

        //dj.stratData
        // var chart;
        // chart = new d3.OrgChart()
        // .container('#chartContainer')
        // .data(dj.stratData)
        // .render()

        // const json = JSON.stringify(dj.stratData);
        // console.log(json)

        // d3.json(json)
        
        //d3.json()

       // d3.json(data);
           // .then(element => {

                
                // new d3.OrgChart()
                // .container('#chartContainer')
                // .data(element)
                // .svgWidth(window.innerWidth)
                // .svgHeight(window.innerWidth)
                // .initialZoom(0.6)
                // .onNodeClick(d=> console.log(d+' node clicked'))
                // .render()
           // });

        //d3.json('../employee2.json')
        // d3.json(data)
        //     .then((dataFlattened) => {
        //         console.log(dataFlattened)
        //         chart = new d3.OrgChart()
        //         .container('#chartContainer')
        //         .data(dataFlattened)
        //         .nodeWidth((d) => 250)
        //         .initialZoom(0.7)
        //         .nodeHeight((d) => 175)
        //         .childrenMargin((d) => 40)
        //         .compactMarginBetween((d) => 15)
        //         .compactMarginPair((d) => 80)
        //         .nodeContent(function (d, i, arr, state) {
        //             return `
        //             <div class="nodeContainer" style="height:${d.height}px;">
        //                 <div class="nodeDiv" style="height:${d.height - 32}px;">
        //                     <img class="imgDiv" src="https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/general.jpg" style="margin-left:${d.width / 2 - 30}px;"/>
        //                     <div class="barDiv" style="width:${d.width - 2}px;"></div>
        //                     <div class="infoDiv">
        //                         <div class="nameDiv"> ${d.data.name}</div>
        //                     </div> 
        //                 </div>     
        //             </div>
        //             `;
        //         })
        //         .render();
        //    });


        // var chart;
        // d3.csv(
        //     //dj.stratData 
        //     '../orgChart.csv'
        // ).then((dataFlattened) => {
        //     console.log(dataFlattened)
        //     chart = new d3.OrgChart()
        //     .container('#chartContainer')
        //     .data(dataFlattened)
        //     .nodeWidth((d) => 250)
        //     .initialZoom(0.7)
        //     .nodeHeight((d) => 175)
        //     .childrenMargin((d) => 40)
        //     .compactMarginBetween((d) => 15)
        //     .compactMarginPair((d) => 80)
        //     .nodeContent(function (d, i, arr, state) {
        //         return `
        //         <div class="nodeContainer" style="height:${d.height}px;">
        //             <div class="nodeDiv" style="height:${d.height - 32}px;">
        //                 <img class="imgDiv" src="https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/general.jpg" style="margin-left:${d.width / 2 - 30}px;"/>
        //                 <div class="barDiv" style="width:${d.width - 2}px;"></div>
        //                 <div class="infoDiv">
        //                     <div class="nameDiv"> ${d.data.name}</div>
        //                     <div class="position">${d.data.positionName}</div>
        //                 </div> 
        //             </div>     
        //         </div>
        //         `;
        //     })
        //     .render();
        // });
    }
}

window.addEventListener('DOMContentLoaded', function(){
    dj.init();
})
