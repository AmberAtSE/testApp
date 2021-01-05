const data = {
  nodes: [
    {
      id: "0",
      x: 150,
      y: 100,
    },
    {
      id: "1",
      x: 350,
      y: 300,
    },
    {
      id: "2",
      x: 150,
      y: 500,
    },
  ],
  edges: [
    // Built-in polyline
    {
      source: "0",
      target: "1",
      controlPoints: [],
    },
    {
      source: "1",
      target: "2",
    },
  ],
};
const app = {
  map: null,
  graph: null,
  init() {
    app.createFloorPlan();
  },
  createMap() {
    // console.log("haha");
    // app.map = L.map("map").setView([51.505, -0.09], 13);
    // L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    //   attribution:
    //     '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    // }).addTo(app.map);
  },
  createFloorPlan() {
    const img = new Image();
    img.src = "./floorplan.jpg";
    let map = document.getElementById("map");
    map.style.height = (img.height / img.width) * map.scrollWidth + "px";
    console.log((img.height / img.width) * map.scrollWidth);
    const width = document.getElementById("map").scrollWidth;
    const height = document.getElementById("map").scrollHeight;
    app.graph = new G6.Graph({
      container: "map",
      width,
      height,
      // translate the graph to align the canvas's center, support by v3.5.1
      fitCenter: true,
      // make the edge link to the centers of the end nodes
      linkCenter: true,
      modes: {
        // behavior
        default: ["drag-node", "click-select"],
      },
      defaultEdge: {
        // type: "polyline",
        /* you can configure the global edge style as following lines */
        style: {
          stroke: "#F6BD16",
          lineWidth: 6,
        },
      },
      defaultNode: {
        style: {
          fill: "#f00",
        },
      },
      /* styles for different states, there are built-in styles for states: active, inactive, selected, highlight, disable */
      edgeStateStyles: {
        // edge style of active state
        active: {
          opacity: 0.5,
          stroke: "#f00",
        },
        // edge style of selected state
        selected: {
          stroke: "#ff0",
        },
      },
    });
    app.graph.data(data);
    app.graph.render();

    app.graph.on("edge:mouseenter", (evt) => {
      const { item } = evt;
      app.graph.setItemState(item, "active", true);
    });

    app.graph.on("node:dragend", (evt) => {
      const { item } = evt;
      console.log(evt);
    });

    app.graph.on("edge:mouseleave", (evt) => {
      const { item } = evt;
      app.graph.setItemState(item, "active", false);
    });

    app.graph.on("edge:click", (evt) => {
      const { item } = evt;
      app.graph.setItemState(item, "selected", true);
    });
    app.graph.on("canvas:click", (evt) => {
      app.graph.getEdges().forEach((edge) => {
        app.graph.clearItemStates(edge);
      });
    });
  },
};

document.addEventListener("DOMContentLoaded", app.init);
