// The SVG Engine application, implements ISVGEngineApp
var svgEngineApp = {};

// Notify SVG engine ready, init UI
svgEngineApp.onSVGEngineLoad = function(engine) {
	console.log("svgEngineApp.onSVGEngineLoad "+engine);
	svgEngineApp.engine=engine;
};
// Set main view implementation based on SVGEngineViews
svgEngineApp.setMainView = function(mainView) {
	console.log("svgEngineApp.setMainView "+mainView);
	svgEngineApp.mainView = mainView;
};

svgEngineApp.showTaskMessage = function(msg) {
	svgEngineApp.mainView.showTaskMessage(msg);
};
svgEngineApp.eraseTaskMessage = function() {
	svgEngineApp.mainView.eraseTaskMessage();
};
svgEngineApp.setTaskState = function(taskId,started) {
	// update button style
	// document.getElementById(taskId+"Btn").style.fontWeight=started ? "bold":"normal";
};
// Modified state change notification
svgEngineApp.onModifiedStateChange=function(modifiedState) {require('electron').ipcRenderer.send('modifiedState',modifiedState)};

// SVG view implements ISVGView
svgEngineApp.svgView = {
		
		getSVGMaxPixelSize : function() {
			return svgEngineApp.mainView.getSVGMaxPixelSize();
		},		
		setSVGPixelSize : function(w,h) {	
			svgEngineApp.mainView.setSVGPixelSize(w,h);
		},
		hasScrollbars : function() {
			return svgEngineApp.mainView.hasScrollbars();
		}
};
svgEngineApp.getSVGView = function() {return svgEngineApp.svgView;};

// Nav view 
svgEngineApp.getNavView = function() {return svgEngineApp.mainView.getNavView();};

//Document view implements IDocumentView
svgEngineApp.getDocumentView = function() {return svgEngineApp.mainView.getDocumentView();};

//Elements drawing task view implements IElementsDrawingTaskView
svgEngineApp.getElementsDrawingTaskView = function() {return svgEngineApp.mainView.getElementsDrawingTaskView();};

//Edit view implements IEditView
svgEngineApp.getEditView = function() {return svgEngineApp.mainView.getEditView();};

//Layer view implements ILayerView
svgEngineApp.getLayerView = function() {return svgEngineApp.mainView.getLayerView();};

//Selection view implements ISelectionView
svgEngineApp.getSelectionView = function() {return svgEngineApp.mainView.getSelectionView();};

//Shape drawing view implements IShapeDrawingView
svgEngineApp.getShapeDrawingView = function() {return svgEngineApp.mainView.getShapeDrawingView();};

//Draw controls view implements IDrawControlsView
svgEngineApp.getDrawControlsView = function() {return svgEngineApp.mainView.getDrawControlsView();};

//Stroke view implements IStrokeView
svgEngineApp.getStrokeView = function() {return svgEngineApp.mainView.getStrokeView();};

//Fill view implements IFillView
svgEngineApp.getFillView = function() {return svgEngineApp.mainView.getFillView();};

//Text style view implements ITextStyleView
svgEngineApp.getTextStyleView = function() {return svgEngineApp.mainView.getTextStyleView();};

//Marker style view implements IMarkerStyleView
svgEngineApp.getMarkerStyleView = function() {return svgEngineApp.mainView.getMarkerStyleView();};

