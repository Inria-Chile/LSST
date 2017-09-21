import React, { Component } from 'react'
import './M1M3.css';

class M1M3 extends Component {

  constructor(props){
    super(props);
    this.data = [
        {
          "actuatorID": 101.0, 
          "force": [
            0.0, 
            0.0, 
            1.0
          ], 
          "position": [
            -30.582, 
            0.0, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 102.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            -56.794, 
            0.0, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 103.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            -83.007, 
            0.0, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 104.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            -109.22, 
            0.0, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 105.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            -135.433, 
            0.0, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 106.0, 
          "force": [
            0.0, 
            0.0, 
            1.0
          ], 
          "position": [
            -156.221, 
            0.0, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 107.0, 
          "force": [
            0.0, 
            0.0, 
            1.0
          ], 
          "position": [
            -17.475, 
            -22.701, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 108.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            -43.688, 
            -22.701, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 109.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            -69.901, 
            -22.701, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 110.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            -96.114, 
            -22.701, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 111.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            -122.326, 
            -22.701, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 112.0, 
          "force": [
            1.0, 
            0.0, 
            1.0
          ], 
          "position": [
            -148.539, 
            -22.701, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 113.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            0.0, 
            -45.402, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 114.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            -30.582, 
            -45.402, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 115.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            -56.794, 
            -45.402, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 116.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            -83.007, 
            -45.402, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 117.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            -109.22, 
            -45.402, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 118.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            -135.433, 
            -45.402, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 119.0, 
          "force": [
            0.0, 
            0.0, 
            1.0
          ], 
          "position": [
            -153.563, 
            -39.279, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 120.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            -17.475, 
            -68.103, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 121.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            -43.688, 
            -68.103, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 122.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            -69.901, 
            -68.103, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 123.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            -96.113, 
            -68.103, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 124.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            -122.326, 
            -68.103, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 125.0, 
          "force": [
            0.0, 
            0.0, 
            1.0
          ], 
          "position": [
            -146.632, 
            -59.762, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 126.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            0.0, 
            -90.804, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 127.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            -30.582, 
            -90.804, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 128.0, 
          "force": [
            1.0, 
            0.0, 
            1.0
          ], 
          "position": [
            -56.794, 
            -90.804, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 129.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            -83.007, 
            -90.804, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 130.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            -109.22, 
            -90.804, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 131.0, 
          "force": [
            0.0, 
            0.0, 
            1.0
          ], 
          "position": [
            -133.384, 
            -85.331, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 132.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            -17.475, 
            -113.505, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 133.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            -43.688, 
            -113.505, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 134.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            -69.901, 
            -113.505, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 135.0, 
          "force": [
            1.0, 
            0.0, 
            1.0
          ], 
          "position": [
            -96.113, 
            -113.505, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 136.0, 
          "force": [
            0.0, 
            0.0, 
            1.0
          ], 
          "position": [
            -115.723, 
            -108.078, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 137.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            -8.738, 
            -136.206, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 138.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            -34.95, 
            -136.206, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 139.0, 
          "force": [
            0.0, 
            0.0, 
            1.0
          ], 
          "position": [
            -61.163, 
            -128.639, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 140.0, 
          "force": [
            0.0, 
            0.0, 
            1.0
          ], 
          "position": [
            -82.273, 
            -135.291, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 141.0, 
          "force": [
            0.0, 
            0.0, 
            1.0
          ], 
          "position": [
            -14.399, 
            -157.687, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 142.0, 
          "force": [
            0.0, 
            0.0, 
            1.0
          ], 
          "position": [
            -42.72, 
            -152.471, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 143.0, 
          "force": [
            0.0, 
            0.0, 
            1.0
          ], 
          "position": [
            -63.15, 
            -145.385, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 207.0, 
          "force": [
            0.0, 
            0.0, 
            1.0
          ], 
          "position": [
            17.475, 
            -22.701, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 208.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            43.688, 
            -22.701, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 209.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            69.901, 
            -22.701, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 210.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            96.114, 
            -22.701, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 211.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            122.326, 
            -22.701, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 212.0, 
          "force": [
            -1.0, 
            0.0, 
            1.0
          ], 
          "position": [
            148.539, 
            -22.701, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 214.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            30.582, 
            -45.402, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 215.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            56.794, 
            -45.402, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 216.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            83.007, 
            -45.402, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 217.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            109.22, 
            -45.402, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 218.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            135.433, 
            -45.402, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 219.0, 
          "force": [
            0.0, 
            0.0, 
            1.0
          ], 
          "position": [
            153.563, 
            -39.279, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 220.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            17.475, 
            -68.103, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 221.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            43.688, 
            -68.103, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 222.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            69.901, 
            -68.103, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 223.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            96.113, 
            -68.103, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 224.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            122.326, 
            -68.103, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 225.0, 
          "force": [
            0.0, 
            0.0, 
            1.0
          ], 
          "position": [
            146.632, 
            -59.762, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 227.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            30.582, 
            -90.804, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 228.0, 
          "force": [
            -1.0, 
            0.0, 
            1.0
          ], 
          "position": [
            56.794, 
            -90.804, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 229.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            83.007, 
            -90.804, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 230.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            109.22, 
            -90.804, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 231.0, 
          "force": [
            0.0, 
            0.0, 
            1.0
          ], 
          "position": [
            133.384, 
            -85.331, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 232.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            17.475, 
            -113.505, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 233.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            43.688, 
            -113.505, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 234.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            69.901, 
            -113.505, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 235.0, 
          "force": [
            -1.0, 
            0.0, 
            1.0
          ], 
          "position": [
            96.113, 
            -113.505, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 236.0, 
          "force": [
            0.0, 
            0.0, 
            1.0
          ], 
          "position": [
            115.723, 
            -108.078, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 237.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            8.738, 
            -136.206, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 238.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            34.95, 
            -136.206, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 239.0, 
          "force": [
            0.0, 
            0.0, 
            1.0
          ], 
          "position": [
            61.163, 
            -128.639, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 240.0, 
          "force": [
            0.0, 
            0.0, 
            1.0
          ], 
          "position": [
            82.273, 
            -135.291, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 241.0, 
          "force": [
            0.0, 
            0.0, 
            1.0
          ], 
          "position": [
            14.399, 
            -157.687, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 242.0, 
          "force": [
            0.0, 
            0.0, 
            1.0
          ], 
          "position": [
            42.72, 
            -152.471, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 243.0, 
          "force": [
            0.0, 
            0.0, 
            1.0
          ], 
          "position": [
            63.15, 
            -145.385, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 301.0, 
          "force": [
            0.0, 
            0.0, 
            1.0
          ], 
          "position": [
            30.582, 
            0.0, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 302.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            56.794, 
            0.0, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 303.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            83.007, 
            0.0, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 304.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            109.22, 
            0.0, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 305.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            135.433, 
            0.0, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 306.0, 
          "force": [
            0.0, 
            0.0, 
            1.0
          ], 
          "position": [
            156.221, 
            -0.097, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 307.0, 
          "force": [
            0.0, 
            0.0, 
            1.0
          ], 
          "position": [
            17.475, 
            22.701, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 308.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            43.688, 
            22.701, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 309.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            69.901, 
            22.701, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 310.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            96.114, 
            22.701, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 311.0, 
          "force": [
            0.0, 
            -1.0, 
            1.0
          ], 
          "position": [
            122.326, 
            22.701, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 312.0, 
          "force": [
            -1.0, 
            0.0, 
            1.0
          ], 
          "position": [
            148.539, 
            22.701, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 313.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            0.0, 
            45.402, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 314.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            30.582, 
            45.402, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 315.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            56.794, 
            45.402, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 316.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            83.007, 
            45.402, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 317.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            109.22, 
            45.402, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 318.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            135.433, 
            45.402, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 319.0, 
          "force": [
            0.0, 
            0.0, 
            1.0
          ], 
          "position": [
            153.563, 
            39.279, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 320.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            17.475, 
            68.103, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 321.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            43.688, 
            68.103, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 322.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            69.901, 
            68.103, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 323.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            96.113, 
            68.103, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 324.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            122.326, 
            68.103, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 325.0, 
          "force": [
            0.0, 
            0.0, 
            1.0
          ], 
          "position": [
            146.632, 
            59.762, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 326.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            0.0, 
            90.804, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 327.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            30.582, 
            90.804, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 328.0, 
          "force": [
            -1.0, 
            0.0, 
            1.0
          ], 
          "position": [
            56.794, 
            90.804, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 329.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            83.007, 
            90.804, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 330.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            109.22, 
            90.804, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 331.0, 
          "force": [
            0.0, 
            0.0, 
            1.0
          ], 
          "position": [
            133.384, 
            85.331, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 332.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            17.475, 
            113.505, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 333.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            43.688, 
            113.505, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 334.0, 
          "force": [
            0.0, 
            -1.0, 
            1.0
          ], 
          "position": [
            69.901, 
            113.505, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 335.0, 
          "force": [
            -1.0, 
            0.0, 
            1.0
          ], 
          "position": [
            96.113, 
            113.505, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 336.0, 
          "force": [
            0.0, 
            0.0, 
            1.0
          ], 
          "position": [
            115.723, 
            108.078, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 337.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            8.738, 
            136.206, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 338.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            34.95, 
            136.206, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 339.0, 
          "force": [
            0.0, 
            0.0, 
            1.0
          ], 
          "position": [
            61.163, 
            128.639, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 340.0, 
          "force": [
            0.0, 
            0.0, 
            1.0
          ], 
          "position": [
            82.273, 
            135.291, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 341.0, 
          "force": [
            0.0, 
            0.0, 
            1.0
          ], 
          "position": [
            14.399, 
            157.687, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 342.0, 
          "force": [
            0.0, 
            0.0, 
            1.0
          ], 
          "position": [
            42.72, 
            152.471, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 343.0, 
          "force": [
            0.0, 
            0.0, 
            1.0
          ], 
          "position": [
            63.15, 
            145.385, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 407.0, 
          "force": [
            0.0, 
            0.0, 
            1.0
          ], 
          "position": [
            -17.475, 
            22.701, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 408.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            -43.688, 
            22.701, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 409.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            -69.901, 
            22.701, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 410.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            -96.114, 
            22.701, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 411.0, 
          "force": [
            0.0, 
            -1.0, 
            1.0
          ], 
          "position": [
            -122.326, 
            22.701, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 412.0, 
          "force": [
            1.0, 
            0.0, 
            1.0
          ], 
          "position": [
            -148.539, 
            22.701, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 414.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            -30.582, 
            45.402, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 415.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            -56.794, 
            45.402, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 416.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            -83.007, 
            45.402, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 417.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            -109.22, 
            45.402, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 418.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            -135.433, 
            45.402, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 419.0, 
          "force": [
            0.0, 
            0.0, 
            1.0
          ], 
          "position": [
            -153.563, 
            39.279, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 420.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            -17.475, 
            68.103, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 421.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            -43.688, 
            68.103, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 422.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            -69.901, 
            68.103, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 423.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            -96.113, 
            68.103, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 424.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            -122.326, 
            68.103, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 425.0, 
          "force": [
            0.0, 
            0.0, 
            1.0
          ], 
          "position": [
            -146.632, 
            59.762, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 427.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            -30.582, 
            90.804, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 428.0, 
          "force": [
            1.0, 
            0.0, 
            1.0
          ], 
          "position": [
            -56.794, 
            90.804, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 429.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            -83.007, 
            90.804, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 430.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            -109.22, 
            90.804, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 431.0, 
          "force": [
            0.0, 
            0.0, 
            1.0
          ], 
          "position": [
            -133.384, 
            85.331, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 432.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            -17.475, 
            113.505, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 433.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            -43.688, 
            113.505, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 434.0, 
          "force": [
            0.0, 
            -1.0, 
            1.0
          ], 
          "position": [
            -69.901, 
            113.505, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 435.0, 
          "force": [
            1.0, 
            0.0, 
            1.0
          ], 
          "position": [
            -96.113, 
            113.505, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 436.0, 
          "force": [
            0.0, 
            0.0, 
            1.0
          ], 
          "position": [
            -115.723, 
            108.078, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 437.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            -8.738, 
            136.206, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 438.0, 
          "force": [
            0.0, 
            1.0, 
            1.0
          ], 
          "position": [
            -34.95, 
            136.206, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 439.0, 
          "force": [
            0.0, 
            0.0, 
            1.0
          ], 
          "position": [
            -61.163, 
            128.639, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 440.0, 
          "force": [
            0.0, 
            0.0, 
            1.0
          ], 
          "position": [
            -82.273, 
            135.291, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 441.0, 
          "force": [
            0.0, 
            0.0, 
            1.0
          ], 
          "position": [
            -14.399, 
            157.687, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 442.0, 
          "force": [
            0.0, 
            0.0, 
            1.0
          ], 
          "position": [
            -42.72, 
            152.471, 
            -2.512
          ]
        }, 
        {
          "actuatorID": 443.0, 
          "force": [
            0.0, 
            0.0, 
            1.0
          ], 
          "position": [
            -63.15, 
            145.385, 
            -2.512
          ]
        }
      ]
    let yMax = -Infinity;
    let xMax = -Infinity;
    let yMin = Infinity;
    let xMin = Infinity;
    let maxRadius = 0;
    this.data.forEach(act => {
        if(xMax < act.position[0])
            xMax = act.position[0];
        if(xMin > act.position[0])
            xMin = act.position[0];
        if(yMax < act.position[1])
            yMax = act.position[1];
        if(yMin > act.position[1])
            yMin = act.position[1];
        if(maxRadius < Math.sqrt(Math.pow(act.position[0], 2) + Math.pow(act.position[1], 2)))
            maxRadius = Math.sqrt(Math.pow(act.position[0], 2) + Math.pow(act.position[1], 2));
    });
    this.xRadius = (xMax - xMin)/2;
    this.yRadius = (yMax - yMin)/2;
    this.xCenter = (xMax + xMin)/2;
    this.yCenter = (yMax + yMin)/2;
    this.maxRadius = maxRadius;
    console.log(yMax, xMax, yMin, xMin);
    this.data.forEach(act => {
        console.log(Math.sqrt(Math.pow(act.position[0], 2) + Math.pow(act.position[1], 2))
                    /
                    this.maxRadius);
        
    });
  }
  
  componentDidMount() {
  }

  componentDidUpdate(){
  }

  
  render() {
    // let data = this.props.data;
    console.log(this.data);
    
    return (
        <div className="mirror-container" ref="container">
            <svg
                className="svg-container"
                height={this.props.height}
                width={this.props.width}>
                <g className="scatter">
                    {this.data.map(act => (
                        <circle
                            cx={(act.position[0] + this.xRadius)*1.5}
                            cy={(act.position[1] + this.yRadius)*1.5}
                            key={act.actuatorID}
                            fill={this.props.colormap(Math.sqrt(Math.pow(act.position[0], 2) + Math.pow(act.position[1], 2))/this.maxRadius)}
                            r={8}/>
                        )
                    )}
                </g>
            </svg>
        </div>
    );
  }
}


export default M1M3;