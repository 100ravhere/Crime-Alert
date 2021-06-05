import React from "react";
import { Bar } from 'react-chartjs-2';
import {useAuth} from "../Contexts/AuthContext";
const BarChart =(props)=>
{

    const {Loc} = useAuth();
    return(
        <div>
        <Bar
        data={{
            labels:['Murder or manslaughter', 'Burglary','Sexual harassment','Cyber Crime','Domestic abuse','Fraud','Rape and sexual assault','Terrorism'],
            datasets:[
                {
                    label:`Crimes committed`,
                    data:[props.murder,props.burglary, props.sexual, props.cyber,props.domestic,props.fraud,props.rape,props.terrorism],
                    backgroundColor: [
                        'rgba(255,0,0,0.4)',
                        'rgba(255,215,0,0.6)',
                        'rgba(220,20,60,0.5)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(240,128,128,0.8)',
                        'rgba(255,255,0,0.6)',
                        'rgba(255,0,0,0.7)',
                        'rgba(255,0,0,0.5)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(0, 0, 0, 0.5)'
                    ],
                    borderWidth: 3
                
                }
            ]
        }}
        width={600}
        height={400}
        options={{maintainAspectRatio:false,
        scales:{
            yAxes:[
                {
                    ticks:{
                        beginAtZero:true
                    }
                }
            ]
        },
        plugins: {
            title: {
                display: true,
                text: `Crime Rate of ${Loc}`
            }
        }
        }}
        ></Bar>
        </div>
    )
}
export default BarChart;