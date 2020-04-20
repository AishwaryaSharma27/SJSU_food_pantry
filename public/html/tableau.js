function initViz() {
    var containerDiv = document.getElementById("vizContainer"),
    url = "https://public.tableau.com/views/Main_dashboard/MainDashboard?:display_count=y&:origin=viz_share_link";
    options = {
        width: '1200px',
        height: '800px',
          hideTabs: false,
                              hideToolbar: true,
    }
    var viz = new tableau.Viz(containerDiv, url,options);
    return viz;
}
