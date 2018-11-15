//bootstrap
importFile('vendors/bootstrap/dist/css/bootstrap.min.css','css');
importFile('vendors/bootstrap-daterangepicker/daterangepicker.css','css');
importFile('vendors/bootstrap-treeview/dist/bootstrap-treeview.min.css','css');
//Font-Awesome
importFile('vendors/font-awesome-5/web-fonts-with-css/css/fontawesome-all.min.css','css');
//iCheck
importFile('vendors/iCheck/skins/flat/green.css','css');

//dropzone
importFile('vendors/dropzone/dist/min/dropzone.min.css','css');
//DataTables
importFile('vendors/datatables.net-bs/css/dataTables.bootstrap.min.css','css');
importFile('vendors/datatables.net-buttons-bs/css/buttons.bootstrap.min.css','css');
importFile('vendors/datatables.net-fixedheader-bs/css/fixedHeader.bootstrap.min.css','css');
importFile('vendors/datatables.net-responsive-bs/css/responsive.bootstrap.min.css','css');
importFile('vendors/datatables.net-scroller-bs/css/scroller.bootstrap.min.css','css');
//nprogress
importFile('vendors/nprogress/nprogress.css','css');
//tree grid
importFile('vendors/jquery-treegrid/css/jquery.treegrid.css','css');
//bootstrap-multiselect
importFile('vendors/bootstrap-multiselect/dist/css/bootstrap-multiselect.css','css');
//custom
importFile('css/custom.min.css','css');


function importFile(filename, filetype) {
    var rootPath = 'assets/';
    var fullfilename = rootPath + filename;

    if(filetype == "js") {
        var cssNode = document.createElement('script');
        cssNode.setAttribute("type", "text/javascript");
        cssNode.setAttribute("src", fullfilename);
    } else if(filetype == "css") {
        var cssNode = document.createElement("link");
        cssNode.setAttribute("rel", "stylesheet");
        cssNode.setAttribute("type", "text/css");
        cssNode.setAttribute("href", fullfilename);
    }
    if(typeof cssNode != "undefined")
        document.getElementsByTagName("head")[0].appendChild(cssNode);
}