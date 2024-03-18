import { Component, Input, OnInit } from '@angular/core';
import { Chart, ChartType ,registerables } from 'chart.js';

@Component({
  selector: 'app-pychart',
  templateUrl: './pychart.component.html',
  styleUrl: './pychart.component.css'
})
export class PychartComponent implements OnInit {
  @Input() metadata!: any;
  @Input() charttype = 'bar';
  myChart!: Chart;
  current = 'bar'
  t = true

  ngOnInit(): void {
    Chart.register(...registerables);
    this.myChart = new Chart("myChart", {
      type: 'bar',
      data: {
          labels: [],
          datasets: [{
            "borderColor": [],
            "backgroundColor": [],
            "data":[],
            "label": ""
          }]
      },
      options: {
      }
      });
      this.myChart.resize(800,400)
      this.myChart.update()
      this.myChart.clear()
  }

  ngOnChanges(){
    if(this.myChart!=undefined){
      if(this.current!=this.charttype){
        this.current=this.charttype
        this.myChart.destroy();
        let colors = this.genColors(this.metadata.data.length)
        this.myChart = new Chart("myChart", {
          type: this.current as ChartType,
          data: {
              labels: this.adjustLabels(this.metadata.labels),
              datasets: [{
                  label: this.metadata.label,
                  data:this.metadata.data,
                  backgroundColor: colors.color,
                  borderColor: colors.border,
                  borderWidth: 1
              }]
          },
          options: {
          }
          });
          if(this.current=='line' || this.current=='bar'){
            this.t=true
          }
          else{
            this.t=false
          }
          this.myChart.update()
      }
      else {

        let colors = this.genColors(this.metadata.data.length)
        this.myChart.data.datasets[0].data =  this.metadata.data
        this.myChart.data.labels = this.adjustLabels(this.metadata.labels)
        this.myChart.data.datasets[0].label = this.metadata.label
        this.myChart.data.datasets[0].backgroundColor = colors.color
        this.myChart.data.datasets[0].borderColor = colors.border
        if(this.current=='line' || this.current=='bar'){
          this.t = true
        }
        else{
          this.t=false
        }
        this.myChart.update()
      }
    }

}


  shuffle(array: string[]) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
  }

  adjustLabels(labels: string){
    let temp = []
    for(let i=0;i<labels.length;i++){
      if(labels[i].length>13){
        temp.push(labels[i].slice(0,15)+'..')
      } else {
        temp.push(labels[i])
      }
    }
    return temp
  }

  genColors(n: number) {
    let colors= [
        'rgba(255, 99, 132)',
        'rgba(54, 162, 235)',
        'rgba(255, 206, 86)',
        'rgba(75, 192, 192)',
        'rgba(153, 102, 255)',
        'rgba(255, 159, 64)',
        'rgba(0,0,0)',
        'rgba(0,0,128)',
        'rgba(255,255,0)',
        'rgba(155,066,034)',
        'rgba(248,0,0)',
        'rgba(144,20,34)',
        'rgba(144,70,132)',
        'rgba(52,59,41)',
        'rgba(189,236,182)',
    ]
    let border = []
    let color = []
    let randomized = this.shuffle(colors)

    for(var i=0; i<n;i++){
        border.push(randomized[i%15].slice(0, -1) + ',1)')
        color.push(randomized[i%15].slice(0, -1) + ',0.35)')
    }
    let output = {
        "border": border,
        "color": color
    }
    return output
  }
}
