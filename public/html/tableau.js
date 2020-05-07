function initViz() {
    var containerDiv = document.getElementById("vizContainer"),
    url = "https://public.tableau.com/views/Main_dashboard_15888126425390/MainDashboard?:display_count=y&:origin=viz_share_link";
    options = {
        width: '1500px',
        height: '800px',
          hideTabs: false,
                              hideToolbar: true,
    }
    var viz = new tableau.Viz(containerDiv, url,options);
    return viz;
}
