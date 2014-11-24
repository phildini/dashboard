---
permalink: /colors/color.js
---

var stages = [
  {name: "discovery"},
  {name: "alpha"},
  {name: "beta"},
  {name: "live"}
];

var schemes = [
  "YlGn",
  "YlGnBu",
  "GnBu",
  "BuGn",
  "PuBuGn",
  "PuBu",
  "RdPu",
  "PuRd",
  "OrRd",
  "YlOrRd",
  "YlOrBr",
  "Purples",
  "Blues",
  "Greens",
  "Oranges",
  "Reds"
];

var stage = d3.select("ul.dashboard-overview")
  .selectAll("li")
  .data(stages);

var schemeSelect = d3.select("#scheme")
  .on("change", function() {
    location.hash = this.value;
  });

schemeSelect.selectAll("option")
  .data(schemes)
  .enter()
  .append("option")
    .attr("value", function(d) { return d; })
    .text(function(d) { return d; });

window.addEventListener("hashchange", onHashChange);
if (location.hash) {
  onHashChange();
} else {
  location.hash = "BuGn";
}

function setScheme(scheme) {
  var colors = colorbrewer[scheme][stages.length];
  stage
    .select(".status")
      .style("background-color", function(d, i) {
        return d.color || colors[i];
      });
  schemeSelect.property("value", scheme);
}

function onHashChange(e) {
  setScheme(location.hash.substr(1));
}
