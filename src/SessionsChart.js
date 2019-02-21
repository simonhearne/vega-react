import React, { PropTypes } from 'react';
import {createClassFromSpec} from 'react-vega';

export default createClassFromSpec('SessionsChart', {
    "$schema": "https://vega.github.io/schema/vega/v4.json",
    "width": 910,
    "height": 48,
    "padding": 0,
    
    "signals": [
      {"name": "show_zeros","value": true},
      {"name": "height","update": "48"},
      {
        "name": "tooltip",
        "value": {},
        "on": [
          {"events": "@sessionbar:mouseover", "update": "datum"},
          {"events": "@sessionbar:mouseout",  "update": "{}"}
        ]
      },
      {
        "name": "AnnotationValue",
        "value": {},
        "on": [
            {"events": "@annotation_point_marks:mouseover", "update": "{'x':datum.x}"},
            {"events": "@annotation_range_marks:mouseover", "update": "{'x':datum.x,'x2':datum.x2}"},
            {"events": "@annotation_point_marks:mouseout,@annotation_range_marks:mouseout",  "update": "{}"}
        ]
      }
    ],
  
    "data": [
      {
        "name": "table",
        "values":  ["86","57","99","63","106","68","107","63","101","75","99","73","94","51","96","59","89","118","72","67","94","58","106","65","98","80","111","82","117","82","100","76","126","89","114","84","114","99","151","128","134","92","136","82","133","89","129","93","131","100","129","104","138","108","136","118","134","112","162","120","139","114","162","135","145","118","142","121","150","116","136","121","114","121","134","121","146","104","123","112","124","126","148","107","131","113","127","101","117","86","101","0","0","0","0","0"]
      },
      {
        "name": "annotations",
        "values": [
          {
            "x": 6,
            "x2": 12,
            "value": "Annotation range 1"
          },
          {
            "x": 8,
            "x2": 20,
            "value": "Annotation range 2"
          },
          {
            "x": 57,
            "value": "Annotation point 1"
          },
          {
            "x": 30,
            "value": "Annotation point 2"
          },
          {
            "x": 37,
            "x2": 50,
            "value": "Annotation range 3"
          },
          {
            "x": 50,
            "x2": 60,
            "value": "Annotation range 2"
          }
        ]
      },
      {
        "name": "annotation_ranges",
        "source": "annotations",
        "transform": [
          {
            "type": "filter",
            "expr": "datum.x2"
          }
        ]
      },
      {
        "name": "annotation_points",
        "source": "annotations",
        "transform": [
          {
            "type": "filter",
            "expr": "!datum.x2"
          }
        ]
      },
      {
        "name": "table_data",
        "source":"table",
        "transform": [
          {
            "type": "window",
            "ops": ["rank"],
            "fields": [null],
            "as": ["rank"]
          },
          {
            "type": "extent",
            "field": "data",
            "signal": "extent"
          }
        ]
      }
    ],
  
    "scales": [
      {
        "name": "xscale",
        "type": "band",
        "domain": {"data":"table_data","field":"rank"},
        "range": "width",
        "padding": 0.35,
        "round": true
      },
      {
        "name": "yscale",
        "domain": {"data": "table_data", "field": "data"},
        "nice": true,
        "range": "height"
      }
    ],
  
    "axes": [
    ],
  
    "marks": [
      {
        "type": "rect",
        "name": "sessionbar",
        "from": {"data":"table_data"},
        "encode": {
          "enter": {
            "x": {"scale":"xscale","field":"rank"},
            "width": {"scale": "xscale", "band": 1},
            "y": {"signal": "scale('yscale',max(datum.data,show_zeros ? extent[1]/height : 0))"},
            "y2": {"scale": "yscale", "value": 0}
          },
          "update": {
            "fill": {"value": "hsl(195,100%,40%)"}
          },
          "hover": {
            "fill": {"value": "hsl(30,100%,60%)"}
          }
        }
      },
      {
        "type": "rect",
        "from": {"data":"annotation_ranges"},
        "name": "annotation_range_marks",
        "encode": {
          "enter": {
            "x": {"scale":"xscale","field":"x"},
            "x2": {"scale":"xscale","field":"x2"},
            "width": {"value": 10},
            "y": {"signal": "height + 3"},
            "y2": {"signal": "height + 7"},
            "cornerRadius": {"value": 3}
          },
          "update": {
            "opacity": {"value": 0.4},
            "fill": {"value": "hsl(30,100%,60%)"},
            "tooltip": {"signal": "{'title':datum.value}"},
            "zindex": {"value": 0}
          },
          "hover": {
            "fill": {"value": "hsl(195,100%,40%)"},
            "opacity": {"value": 0.9},
            "zindex": {"value": 2}
          }
        }
      },
      {
        "type": "symbol",
        "from": {"data":"annotation_points"},
        "name": "annotation_point_marks",
        "encode": {
          "enter": {
            "x": {"scale":"xscale","field":"x", "band": 0.5},
            "size": {"value": 40},
            "y": {"signal": "height + 5"}
          },
          "update": {
            "opacity": {"value": 0.4},
            "fill": {"value": "hsl(30,100%,60%)"},
            "tooltip": {"signal": "{'title':datum.value}"},
            "zindex": {"value": 0}
          },
          "hover": {
            "fill": {"value": "hsl(195,100%,40%)"},
            "opacity": {"value": 0.9},
            "zindex": {"value": 2}
          }
        }
      },
      {
        "type": "text",
        "encode": {
          "enter": {
            "align": {"value": "center"},
            "baseline": {"value": "bottom"},
            "fill": {"value": "#333"},
            "font": {"value": "Lato,sans-serif"}
          },
          "update": {
            "x": {"scale": "xscale", "signal": "tooltip.rank", "band": 0.5},
            "y": {"value": 0},
            "text": {"signal": "tooltip.data ? format(tooltip.data,',.2s') : ''"},
            "fillOpacity": [
              {"test": "datum === tooltip", "value": 0},
              {"value": 1}
            ]
          }
        }
      }
    ]
  });