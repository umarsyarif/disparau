(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./node_modules/@fullcalendar/core/locales/id.js":
/*!*******************************************************!*\
  !*** ./node_modules/@fullcalendar/core/locales/id.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

(function (global, factory) {
     true ? module.exports = factory() :
    undefined;
}(this, function () { 'use strict';

    var id = {
        code: "id",
        week: {
            dow: 1,
            doy: 7 // The week that contains Jan 1st is the first week of the year.
        },
        buttonText: {
            prev: "mundur",
            next: "maju",
            today: "hari ini",
            month: "Bulan",
            week: "Minggu",
            day: "Hari",
            list: "Agenda"
        },
        weekLabel: "Mg",
        allDayHtml: "Sehari<br/>penuh",
        eventLimitText: "lebih",
        noEventsMessage: "Tidak ada acara untuk ditampilkan"
    };

    return id;

}));


/***/ }),

/***/ "./node_modules/@fullcalendar/daygrid/main.esm.js":
/*!********************************************************!*\
  !*** ./node_modules/@fullcalendar/daygrid/main.esm.js ***!
  \********************************************************/
/*! exports provided: default, AbstractDayGridView, DayBgRow, DayGrid, DayGridSlicer, DayGridView, SimpleDayGrid, buildBasicDayTable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AbstractDayGridView", function() { return AbstractDayGridView; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DayBgRow", function() { return DayBgRow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DayGrid", function() { return DayGrid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DayGridSlicer", function() { return DayGridSlicer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DayGridView", function() { return DayGridView; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SimpleDayGrid", function() { return SimpleDayGrid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildBasicDayTable", function() { return buildDayTable; });
/* harmony import */ var _fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @fullcalendar/core */ "./node_modules/@fullcalendar/core/main.esm.js");
/*!
FullCalendar Day Grid Plugin v4.4.0
Docs & License: https://fullcalendar.io/
(c) 2019 Adam Shaw
*/



/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var DayGridDateProfileGenerator = /** @class */ (function (_super) {
    __extends(DayGridDateProfileGenerator, _super);
    function DayGridDateProfileGenerator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // Computes the date range that will be rendered.
    DayGridDateProfileGenerator.prototype.buildRenderRange = function (currentRange, currentRangeUnit, isRangeAllDay) {
        var dateEnv = this.dateEnv;
        var renderRange = _super.prototype.buildRenderRange.call(this, currentRange, currentRangeUnit, isRangeAllDay);
        var start = renderRange.start;
        var end = renderRange.end;
        var endOfWeek;
        // year and month views should be aligned with weeks. this is already done for week
        if (/^(year|month)$/.test(currentRangeUnit)) {
            start = dateEnv.startOfWeek(start);
            // make end-of-week if not already
            endOfWeek = dateEnv.startOfWeek(end);
            if (endOfWeek.valueOf() !== end.valueOf()) {
                end = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["addWeeks"])(endOfWeek, 1);
            }
        }
        // ensure 6 weeks
        if (this.options.monthMode &&
            this.options.fixedWeekCount) {
            var rowCnt = Math.ceil(// could be partial weeks due to hiddenDays
            Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["diffWeeks"])(start, end));
            end = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["addWeeks"])(end, 6 - rowCnt);
        }
        return { start: start, end: end };
    };
    return DayGridDateProfileGenerator;
}(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["DateProfileGenerator"]));

/* A rectangular panel that is absolutely positioned over other content
------------------------------------------------------------------------------------------------------------------------
Options:
  - className (string)
  - content (HTML string, element, or element array)
  - parentEl
  - top
  - left
  - right (the x coord of where the right edge should be. not a "CSS" right)
  - autoHide (boolean)
  - show (callback)
  - hide (callback)
*/
var Popover = /** @class */ (function () {
    function Popover(options) {
        var _this = this;
        this.isHidden = true;
        this.margin = 10; // the space required between the popover and the edges of the scroll container
        // Triggered when the user clicks *anywhere* in the document, for the autoHide feature
        this.documentMousedown = function (ev) {
            // only hide the popover if the click happened outside the popover
            if (_this.el && !_this.el.contains(ev.target)) {
                _this.hide();
            }
        };
        this.options = options;
    }
    // Shows the popover on the specified position. Renders it if not already
    Popover.prototype.show = function () {
        if (this.isHidden) {
            if (!this.el) {
                this.render();
            }
            this.el.style.display = '';
            this.position();
            this.isHidden = false;
            this.trigger('show');
        }
    };
    // Hides the popover, through CSS, but does not remove it from the DOM
    Popover.prototype.hide = function () {
        if (!this.isHidden) {
            this.el.style.display = 'none';
            this.isHidden = true;
            this.trigger('hide');
        }
    };
    // Creates `this.el` and renders content inside of it
    Popover.prototype.render = function () {
        var _this = this;
        var options = this.options;
        var el = this.el = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["createElement"])('div', {
            className: 'fc-popover ' + (options.className || ''),
            style: {
                top: '0',
                left: '0'
            }
        });
        if (typeof options.content === 'function') {
            options.content(el);
        }
        options.parentEl.appendChild(el);
        // when a click happens on anything inside with a 'fc-close' className, hide the popover
        Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["listenBySelector"])(el, 'click', '.fc-close', function (ev) {
            _this.hide();
        });
        if (options.autoHide) {
            document.addEventListener('mousedown', this.documentMousedown);
        }
    };
    // Hides and unregisters any handlers
    Popover.prototype.destroy = function () {
        this.hide();
        if (this.el) {
            Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["removeElement"])(this.el);
            this.el = null;
        }
        document.removeEventListener('mousedown', this.documentMousedown);
    };
    // Positions the popover optimally, using the top/left/right options
    Popover.prototype.position = function () {
        var options = this.options;
        var el = this.el;
        var elDims = el.getBoundingClientRect(); // only used for width,height
        var origin = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["computeRect"])(el.offsetParent);
        var clippingRect = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["computeClippingRect"])(options.parentEl);
        var top; // the "position" (not "offset") values for the popover
        var left; //
        // compute top and left
        top = options.top || 0;
        if (options.left !== undefined) {
            left = options.left;
        }
        else if (options.right !== undefined) {
            left = options.right - elDims.width; // derive the left value from the right value
        }
        else {
            left = 0;
        }
        // constrain to the view port. if constrained by two edges, give precedence to top/left
        top = Math.min(top, clippingRect.bottom - elDims.height - this.margin);
        top = Math.max(top, clippingRect.top + this.margin);
        left = Math.min(left, clippingRect.right - elDims.width - this.margin);
        left = Math.max(left, clippingRect.left + this.margin);
        Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["applyStyle"])(el, {
            top: top - origin.top,
            left: left - origin.left
        });
    };
    // Triggers a callback. Calls a function in the option hash of the same name.
    // Arguments beyond the first `name` are forwarded on.
    // TODO: better code reuse for this. Repeat code
    // can kill this???
    Popover.prototype.trigger = function (name) {
        if (this.options[name]) {
            this.options[name].apply(this, Array.prototype.slice.call(arguments, 1));
        }
    };
    return Popover;
}());

/* Event-rendering methods for the DayGrid class
----------------------------------------------------------------------------------------------------------------------*/
// "Simple" is bad a name. has nothing to do with SimpleDayGrid
var SimpleDayGridEventRenderer = /** @class */ (function (_super) {
    __extends(SimpleDayGridEventRenderer, _super);
    function SimpleDayGridEventRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // Builds the HTML to be used for the default element for an individual segment
    SimpleDayGridEventRenderer.prototype.renderSegHtml = function (seg, mirrorInfo) {
        var context = this.context;
        var eventRange = seg.eventRange;
        var eventDef = eventRange.def;
        var eventUi = eventRange.ui;
        var allDay = eventDef.allDay;
        var isDraggable = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["computeEventDraggable"])(context, eventDef, eventUi);
        var isResizableFromStart = allDay && seg.isStart && Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["computeEventStartResizable"])(context, eventDef, eventUi);
        var isResizableFromEnd = allDay && seg.isEnd && Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["computeEventEndResizable"])(context, eventDef, eventUi);
        var classes = this.getSegClasses(seg, isDraggable, isResizableFromStart || isResizableFromEnd, mirrorInfo);
        var skinCss = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["cssToStr"])(this.getSkinCss(eventUi));
        var timeHtml = '';
        var timeText;
        var titleHtml;
        classes.unshift('fc-day-grid-event', 'fc-h-event');
        // Only display a timed events time if it is the starting segment
        if (seg.isStart) {
            timeText = this.getTimeText(eventRange);
            if (timeText) {
                timeHtml = '<span class="fc-time">' + Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["htmlEscape"])(timeText) + '</span>';
            }
        }
        titleHtml =
            '<span class="fc-title">' +
                (Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["htmlEscape"])(eventDef.title || '') || '&nbsp;') + // we always want one line of height
                '</span>';
        return '<a class="' + classes.join(' ') + '"' +
            (eventDef.url ?
                ' href="' + Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["htmlEscape"])(eventDef.url) + '"' :
                '') +
            (skinCss ?
                ' style="' + skinCss + '"' :
                '') +
            '>' +
            '<div class="fc-content">' +
            (context.options.dir === 'rtl' ?
                titleHtml + ' ' + timeHtml : // put a natural space in between
                timeHtml + ' ' + titleHtml //
            ) +
            '</div>' +
            (isResizableFromStart ?
                '<div class="fc-resizer fc-start-resizer"></div>' :
                '') +
            (isResizableFromEnd ?
                '<div class="fc-resizer fc-end-resizer"></div>' :
                '') +
            '</a>';
    };
    // Computes a default event time formatting string if `eventTimeFormat` is not explicitly defined
    SimpleDayGridEventRenderer.prototype.computeEventTimeFormat = function () {
        return {
            hour: 'numeric',
            minute: '2-digit',
            omitZeroMinute: true,
            meridiem: 'narrow'
        };
    };
    SimpleDayGridEventRenderer.prototype.computeDisplayEventEnd = function () {
        return false; // TODO: somehow consider the originating DayGrid's column count
    };
    return SimpleDayGridEventRenderer;
}(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["FgEventRenderer"]));

/* Event-rendering methods for the DayGrid class
----------------------------------------------------------------------------------------------------------------------*/
var DayGridEventRenderer = /** @class */ (function (_super) {
    __extends(DayGridEventRenderer, _super);
    function DayGridEventRenderer(dayGrid) {
        var _this = _super.call(this) || this;
        _this.dayGrid = dayGrid;
        return _this;
    }
    // Renders the given foreground event segments onto the grid
    DayGridEventRenderer.prototype.attachSegs = function (segs, mirrorInfo) {
        var rowStructs = this.rowStructs = this.renderSegRows(segs);
        // append to each row's content skeleton
        this.dayGrid.rowEls.forEach(function (rowNode, i) {
            rowNode.querySelector('.fc-content-skeleton > table').appendChild(rowStructs[i].tbodyEl);
        });
        // removes the "more.." events popover
        if (!mirrorInfo) {
            this.dayGrid.removeSegPopover();
        }
    };
    // Unrenders all currently rendered foreground event segments
    DayGridEventRenderer.prototype.detachSegs = function () {
        var rowStructs = this.rowStructs || [];
        var rowStruct;
        while ((rowStruct = rowStructs.pop())) {
            Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["removeElement"])(rowStruct.tbodyEl);
        }
        this.rowStructs = null;
    };
    // Uses the given events array to generate <tbody> elements that should be appended to each row's content skeleton.
    // Returns an array of rowStruct objects (see the bottom of `renderSegRow`).
    // PRECONDITION: each segment shoud already have a rendered and assigned `.el`
    DayGridEventRenderer.prototype.renderSegRows = function (segs) {
        var rowStructs = [];
        var segRows;
        var row;
        segRows = this.groupSegRows(segs); // group into nested arrays
        // iterate each row of segment groupings
        for (row = 0; row < segRows.length; row++) {
            rowStructs.push(this.renderSegRow(row, segRows[row]));
        }
        return rowStructs;
    };
    // Given a row # and an array of segments all in the same row, render a <tbody> element, a skeleton that contains
    // the segments. Returns object with a bunch of internal data about how the render was calculated.
    // NOTE: modifies rowSegs
    DayGridEventRenderer.prototype.renderSegRow = function (row, rowSegs) {
        var isRtl = this.context.isRtl;
        var dayGrid = this.dayGrid;
        var colCnt = dayGrid.colCnt;
        var segLevels = this.buildSegLevels(rowSegs); // group into sub-arrays of levels
        var levelCnt = Math.max(1, segLevels.length); // ensure at least one level
        var tbody = document.createElement('tbody');
        var segMatrix = []; // lookup for which segments are rendered into which level+col cells
        var cellMatrix = []; // lookup for all <td> elements of the level+col matrix
        var loneCellMatrix = []; // lookup for <td> elements that only take up a single column
        var i;
        var levelSegs;
        var col;
        var tr;
        var j;
        var seg;
        var td;
        // populates empty cells from the current column (`col`) to `endCol`
        function emptyCellsUntil(endCol) {
            while (col < endCol) {
                // try to grab a cell from the level above and extend its rowspan. otherwise, create a fresh cell
                td = (loneCellMatrix[i - 1] || [])[col];
                if (td) {
                    td.rowSpan = (td.rowSpan || 1) + 1;
                }
                else {
                    td = document.createElement('td');
                    tr.appendChild(td);
                }
                cellMatrix[i][col] = td;
                loneCellMatrix[i][col] = td;
                col++;
            }
        }
        for (i = 0; i < levelCnt; i++) { // iterate through all levels
            levelSegs = segLevels[i];
            col = 0;
            tr = document.createElement('tr');
            segMatrix.push([]);
            cellMatrix.push([]);
            loneCellMatrix.push([]);
            // levelCnt might be 1 even though there are no actual levels. protect against this.
            // this single empty row is useful for styling.
            if (levelSegs) {
                for (j = 0; j < levelSegs.length; j++) { // iterate through segments in level
                    seg = levelSegs[j];
                    var leftCol = isRtl ? (colCnt - 1 - seg.lastCol) : seg.firstCol;
                    var rightCol = isRtl ? (colCnt - 1 - seg.firstCol) : seg.lastCol;
                    emptyCellsUntil(leftCol);
                    // create a container that occupies or more columns. append the event element.
                    td = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["createElement"])('td', { className: 'fc-event-container' }, seg.el);
                    if (leftCol !== rightCol) {
                        td.colSpan = rightCol - leftCol + 1;
                    }
                    else { // a single-column segment
                        loneCellMatrix[i][col] = td;
                    }
                    while (col <= rightCol) {
                        cellMatrix[i][col] = td;
                        segMatrix[i][col] = seg;
                        col++;
                    }
                    tr.appendChild(td);
                }
            }
            emptyCellsUntil(colCnt); // finish off the row
            var introHtml = dayGrid.renderProps.renderIntroHtml();
            if (introHtml) {
                if (isRtl) {
                    Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["appendToElement"])(tr, introHtml);
                }
                else {
                    Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["prependToElement"])(tr, introHtml);
                }
            }
            tbody.appendChild(tr);
        }
        return {
            row: row,
            tbodyEl: tbody,
            cellMatrix: cellMatrix,
            segMatrix: segMatrix,
            segLevels: segLevels,
            segs: rowSegs
        };
    };
    // Stacks a flat array of segments, which are all assumed to be in the same row, into subarrays of vertical levels.
    // NOTE: modifies segs
    DayGridEventRenderer.prototype.buildSegLevels = function (segs) {
        var isRtl = this.context.isRtl;
        var colCnt = this.dayGrid.colCnt;
        var levels = [];
        var i;
        var seg;
        var j;
        // Give preference to elements with certain criteria, so they have
        // a chance to be closer to the top.
        segs = this.sortEventSegs(segs);
        for (i = 0; i < segs.length; i++) {
            seg = segs[i];
            // loop through levels, starting with the topmost, until the segment doesn't collide with other segments
            for (j = 0; j < levels.length; j++) {
                if (!isDaySegCollision(seg, levels[j])) {
                    break;
                }
            }
            // `j` now holds the desired subrow index
            seg.level = j;
            seg.leftCol = isRtl ? (colCnt - 1 - seg.lastCol) : seg.firstCol; // for sorting only
            seg.rightCol = isRtl ? (colCnt - 1 - seg.firstCol) : seg.lastCol // for sorting only
            ;
            (levels[j] || (levels[j] = [])).push(seg);
        }
        // order segments left-to-right. very important if calendar is RTL
        for (j = 0; j < levels.length; j++) {
            levels[j].sort(compareDaySegCols);
        }
        return levels;
    };
    // Given a flat array of segments, return an array of sub-arrays, grouped by each segment's row
    DayGridEventRenderer.prototype.groupSegRows = function (segs) {
        var segRows = [];
        var i;
        for (i = 0; i < this.dayGrid.rowCnt; i++) {
            segRows.push([]);
        }
        for (i = 0; i < segs.length; i++) {
            segRows[segs[i].row].push(segs[i]);
        }
        return segRows;
    };
    // Computes a default `displayEventEnd` value if one is not expliclty defined
    DayGridEventRenderer.prototype.computeDisplayEventEnd = function () {
        return this.dayGrid.colCnt === 1; // we'll likely have space if there's only one day
    };
    return DayGridEventRenderer;
}(SimpleDayGridEventRenderer));
// Computes whether two segments' columns collide. They are assumed to be in the same row.
function isDaySegCollision(seg, otherSegs) {
    var i;
    var otherSeg;
    for (i = 0; i < otherSegs.length; i++) {
        otherSeg = otherSegs[i];
        if (otherSeg.firstCol <= seg.lastCol &&
            otherSeg.lastCol >= seg.firstCol) {
            return true;
        }
    }
    return false;
}
// A cmp function for determining the leftmost event
function compareDaySegCols(a, b) {
    return a.leftCol - b.leftCol;
}

var DayGridMirrorRenderer = /** @class */ (function (_super) {
    __extends(DayGridMirrorRenderer, _super);
    function DayGridMirrorRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DayGridMirrorRenderer.prototype.attachSegs = function (segs, mirrorInfo) {
        var sourceSeg = mirrorInfo.sourceSeg;
        var rowStructs = this.rowStructs = this.renderSegRows(segs);
        // inject each new event skeleton into each associated row
        this.dayGrid.rowEls.forEach(function (rowNode, row) {
            var skeletonEl = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["htmlToElement"])('<div class="fc-mirror-skeleton"><table></table></div>'); // will be absolutely positioned
            var skeletonTopEl;
            var skeletonTop;
            // If there is an original segment, match the top position. Otherwise, put it at the row's top level
            if (sourceSeg && sourceSeg.row === row) {
                skeletonTopEl = sourceSeg.el;
            }
            else {
                skeletonTopEl = rowNode.querySelector('.fc-content-skeleton tbody');
                if (!skeletonTopEl) { // when no events
                    skeletonTopEl = rowNode.querySelector('.fc-content-skeleton table');
                }
            }
            skeletonTop = skeletonTopEl.getBoundingClientRect().top -
                rowNode.getBoundingClientRect().top; // the offsetParent origin
            skeletonEl.style.top = skeletonTop + 'px';
            skeletonEl.querySelector('table').appendChild(rowStructs[row].tbodyEl);
            rowNode.appendChild(skeletonEl);
        });
    };
    return DayGridMirrorRenderer;
}(DayGridEventRenderer));

var EMPTY_CELL_HTML = '<td style="pointer-events:none"></td>';
var DayGridFillRenderer = /** @class */ (function (_super) {
    __extends(DayGridFillRenderer, _super);
    function DayGridFillRenderer(dayGrid) {
        var _this = _super.call(this) || this;
        _this.fillSegTag = 'td'; // override the default tag name
        _this.dayGrid = dayGrid;
        return _this;
    }
    DayGridFillRenderer.prototype.renderSegs = function (type, context, segs) {
        // don't render timed background events
        if (type === 'bgEvent') {
            segs = segs.filter(function (seg) {
                return seg.eventRange.def.allDay;
            });
        }
        _super.prototype.renderSegs.call(this, type, context, segs);
    };
    DayGridFillRenderer.prototype.attachSegs = function (type, segs) {
        var els = [];
        var i;
        var seg;
        var skeletonEl;
        for (i = 0; i < segs.length; i++) {
            seg = segs[i];
            skeletonEl = this.renderFillRow(type, seg);
            this.dayGrid.rowEls[seg.row].appendChild(skeletonEl);
            els.push(skeletonEl);
        }
        return els;
    };
    // Generates the HTML needed for one row of a fill. Requires the seg's el to be rendered.
    DayGridFillRenderer.prototype.renderFillRow = function (type, seg) {
        var dayGrid = this.dayGrid;
        var isRtl = this.context.isRtl;
        var colCnt = dayGrid.colCnt;
        var leftCol = isRtl ? (colCnt - 1 - seg.lastCol) : seg.firstCol;
        var rightCol = isRtl ? (colCnt - 1 - seg.firstCol) : seg.lastCol;
        var startCol = leftCol;
        var endCol = rightCol + 1;
        var className;
        var skeletonEl;
        var trEl;
        if (type === 'businessHours') {
            className = 'bgevent';
        }
        else {
            className = type.toLowerCase();
        }
        skeletonEl = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["htmlToElement"])('<div class="fc-' + className + '-skeleton">' +
            '<table><tr></tr></table>' +
            '</div>');
        trEl = skeletonEl.getElementsByTagName('tr')[0];
        if (startCol > 0) {
            Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["appendToElement"])(trEl, 
            // will create (startCol + 1) td's
            new Array(startCol + 1).join(EMPTY_CELL_HTML));
        }
        seg.el.colSpan = endCol - startCol;
        trEl.appendChild(seg.el);
        if (endCol < colCnt) {
            Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["appendToElement"])(trEl, 
            // will create (colCnt - endCol) td's
            new Array(colCnt - endCol + 1).join(EMPTY_CELL_HTML));
        }
        var introHtml = dayGrid.renderProps.renderIntroHtml();
        if (introHtml) {
            if (isRtl) {
                Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["appendToElement"])(trEl, introHtml);
            }
            else {
                Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["prependToElement"])(trEl, introHtml);
            }
        }
        return skeletonEl;
    };
    return DayGridFillRenderer;
}(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["FillRenderer"]));

var DayTile = /** @class */ (function (_super) {
    __extends(DayTile, _super);
    function DayTile(el) {
        var _this = _super.call(this, el) || this;
        var eventRenderer = _this.eventRenderer = new DayTileEventRenderer(_this);
        var renderFrame = _this.renderFrame = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["memoizeRendering"])(_this._renderFrame);
        _this.renderFgEvents = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["memoizeRendering"])(eventRenderer.renderSegs.bind(eventRenderer), eventRenderer.unrender.bind(eventRenderer), [renderFrame]);
        _this.renderEventSelection = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["memoizeRendering"])(eventRenderer.selectByInstanceId.bind(eventRenderer), eventRenderer.unselectByInstanceId.bind(eventRenderer), [_this.renderFgEvents]);
        _this.renderEventDrag = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["memoizeRendering"])(eventRenderer.hideByHash.bind(eventRenderer), eventRenderer.showByHash.bind(eventRenderer), [renderFrame]);
        _this.renderEventResize = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["memoizeRendering"])(eventRenderer.hideByHash.bind(eventRenderer), eventRenderer.showByHash.bind(eventRenderer), [renderFrame]);
        return _this;
    }
    DayTile.prototype.firstContext = function (context) {
        context.calendar.registerInteractiveComponent(this, {
            el: this.el,
            useEventCenter: false
        });
    };
    DayTile.prototype.render = function (props, context) {
        this.renderFrame(props.date);
        this.renderFgEvents(context, props.fgSegs);
        this.renderEventSelection(props.eventSelection);
        this.renderEventDrag(props.eventDragInstances);
        this.renderEventResize(props.eventResizeInstances);
    };
    DayTile.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.renderFrame.unrender(); // should unrender everything else
        this.context.calendar.unregisterInteractiveComponent(this);
    };
    DayTile.prototype._renderFrame = function (date) {
        var _a = this.context, theme = _a.theme, dateEnv = _a.dateEnv, options = _a.options;
        var title = dateEnv.format(date, Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["createFormatter"])(options.dayPopoverFormat) // TODO: cache
        );
        this.el.innerHTML =
            '<div class="fc-header ' + theme.getClass('popoverHeader') + '">' +
                '<span class="fc-title">' +
                Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["htmlEscape"])(title) +
                '</span>' +
                '<span class="fc-close ' + theme.getIconClass('close') + '"></span>' +
                '</div>' +
                '<div class="fc-body ' + theme.getClass('popoverContent') + '">' +
                '<div class="fc-event-container"></div>' +
                '</div>';
        this.segContainerEl = this.el.querySelector('.fc-event-container');
    };
    DayTile.prototype.queryHit = function (positionLeft, positionTop, elWidth, elHeight) {
        var date = this.props.date; // HACK
        if (positionLeft < elWidth && positionTop < elHeight) {
            return {
                component: this,
                dateSpan: {
                    allDay: true,
                    range: { start: date, end: Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["addDays"])(date, 1) }
                },
                dayEl: this.el,
                rect: {
                    left: 0,
                    top: 0,
                    right: elWidth,
                    bottom: elHeight
                },
                layer: 1
            };
        }
    };
    return DayTile;
}(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["DateComponent"]));
var DayTileEventRenderer = /** @class */ (function (_super) {
    __extends(DayTileEventRenderer, _super);
    function DayTileEventRenderer(dayTile) {
        var _this = _super.call(this) || this;
        _this.dayTile = dayTile;
        return _this;
    }
    DayTileEventRenderer.prototype.attachSegs = function (segs) {
        for (var _i = 0, segs_1 = segs; _i < segs_1.length; _i++) {
            var seg = segs_1[_i];
            this.dayTile.segContainerEl.appendChild(seg.el);
        }
    };
    DayTileEventRenderer.prototype.detachSegs = function (segs) {
        for (var _i = 0, segs_2 = segs; _i < segs_2.length; _i++) {
            var seg = segs_2[_i];
            Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["removeElement"])(seg.el);
        }
    };
    return DayTileEventRenderer;
}(SimpleDayGridEventRenderer));

var DayBgRow = /** @class */ (function () {
    function DayBgRow(context) {
        this.context = context;
    }
    DayBgRow.prototype.renderHtml = function (props) {
        var parts = [];
        if (props.renderIntroHtml) {
            parts.push(props.renderIntroHtml());
        }
        for (var _i = 0, _a = props.cells; _i < _a.length; _i++) {
            var cell = _a[_i];
            parts.push(renderCellHtml(cell.date, props.dateProfile, this.context, cell.htmlAttrs));
        }
        if (!props.cells.length) {
            parts.push('<td class="fc-day ' + this.context.theme.getClass('widgetContent') + '"></td>');
        }
        if (this.context.options.dir === 'rtl') {
            parts.reverse();
        }
        return '<tr>' + parts.join('') + '</tr>';
    };
    return DayBgRow;
}());
function renderCellHtml(date, dateProfile, context, otherAttrs) {
    var dateEnv = context.dateEnv, theme = context.theme;
    var isDateValid = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["rangeContainsMarker"])(dateProfile.activeRange, date); // TODO: called too frequently. cache somehow.
    var classes = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["getDayClasses"])(date, dateProfile, context);
    classes.unshift('fc-day', theme.getClass('widgetContent'));
    return '<td class="' + classes.join(' ') + '"' +
        (isDateValid ?
            ' data-date="' + dateEnv.formatIso(date, { omitTime: true }) + '"' :
            '') +
        (otherAttrs ?
            ' ' + otherAttrs :
            '') +
        '></td>';
}

var DAY_NUM_FORMAT = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["createFormatter"])({ day: 'numeric' });
var WEEK_NUM_FORMAT = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["createFormatter"])({ week: 'numeric' });
var DayGrid = /** @class */ (function (_super) {
    __extends(DayGrid, _super);
    function DayGrid(el, renderProps) {
        var _this = _super.call(this, el) || this;
        _this.bottomCoordPadding = 0; // hack for extending the hit area for the last row of the coordinate grid
        _this.isCellSizesDirty = false;
        _this.renderProps = renderProps;
        var eventRenderer = _this.eventRenderer = new DayGridEventRenderer(_this);
        var fillRenderer = _this.fillRenderer = new DayGridFillRenderer(_this);
        _this.mirrorRenderer = new DayGridMirrorRenderer(_this);
        var renderCells = _this.renderCells = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["memoizeRendering"])(_this._renderCells, _this._unrenderCells);
        _this.renderBusinessHours = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["memoizeRendering"])(fillRenderer.renderSegs.bind(fillRenderer, 'businessHours'), fillRenderer.unrender.bind(fillRenderer, 'businessHours'), [renderCells]);
        _this.renderDateSelection = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["memoizeRendering"])(fillRenderer.renderSegs.bind(fillRenderer, 'highlight'), fillRenderer.unrender.bind(fillRenderer, 'highlight'), [renderCells]);
        _this.renderBgEvents = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["memoizeRendering"])(fillRenderer.renderSegs.bind(fillRenderer, 'bgEvent'), fillRenderer.unrender.bind(fillRenderer, 'bgEvent'), [renderCells]);
        _this.renderFgEvents = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["memoizeRendering"])(eventRenderer.renderSegs.bind(eventRenderer), eventRenderer.unrender.bind(eventRenderer), [renderCells]);
        _this.renderEventSelection = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["memoizeRendering"])(eventRenderer.selectByInstanceId.bind(eventRenderer), eventRenderer.unselectByInstanceId.bind(eventRenderer), [_this.renderFgEvents]);
        _this.renderEventDrag = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["memoizeRendering"])(_this._renderEventDrag, _this._unrenderEventDrag, [renderCells]);
        _this.renderEventResize = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["memoizeRendering"])(_this._renderEventResize, _this._unrenderEventResize, [renderCells]);
        return _this;
    }
    DayGrid.prototype.render = function (props, context) {
        var cells = props.cells;
        this.rowCnt = cells.length;
        this.colCnt = cells[0].length;
        this.renderCells(cells, props.isRigid);
        this.renderBusinessHours(context, props.businessHourSegs);
        this.renderDateSelection(context, props.dateSelectionSegs);
        this.renderBgEvents(context, props.bgEventSegs);
        this.renderFgEvents(context, props.fgEventSegs);
        this.renderEventSelection(props.eventSelection);
        this.renderEventDrag(props.eventDrag);
        this.renderEventResize(props.eventResize);
        if (this.segPopoverTile) {
            this.updateSegPopoverTile();
        }
    };
    DayGrid.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.renderCells.unrender(); // will unrender everything else
    };
    DayGrid.prototype.getCellRange = function (row, col) {
        var start = this.props.cells[row][col].date;
        var end = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["addDays"])(start, 1);
        return { start: start, end: end };
    };
    DayGrid.prototype.updateSegPopoverTile = function (date, segs) {
        var ownProps = this.props;
        this.segPopoverTile.receiveProps({
            date: date || this.segPopoverTile.props.date,
            fgSegs: segs || this.segPopoverTile.props.fgSegs,
            eventSelection: ownProps.eventSelection,
            eventDragInstances: ownProps.eventDrag ? ownProps.eventDrag.affectedInstances : null,
            eventResizeInstances: ownProps.eventResize ? ownProps.eventResize.affectedInstances : null
        }, this.context);
    };
    /* Date Rendering
    ------------------------------------------------------------------------------------------------------------------*/
    DayGrid.prototype._renderCells = function (cells, isRigid) {
        var _a = this.context, calendar = _a.calendar, view = _a.view, isRtl = _a.isRtl, dateEnv = _a.dateEnv;
        var _b = this, rowCnt = _b.rowCnt, colCnt = _b.colCnt;
        var html = '';
        var row;
        var col;
        for (row = 0; row < rowCnt; row++) {
            html += this.renderDayRowHtml(row, isRigid);
        }
        this.el.innerHTML = html;
        this.rowEls = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["findElements"])(this.el, '.fc-row');
        this.cellEls = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["findElements"])(this.el, '.fc-day, .fc-disabled-day');
        if (isRtl) {
            this.cellEls.reverse();
        }
        this.rowPositions = new _fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["PositionCache"](this.el, this.rowEls, false, true // vertical
        );
        this.colPositions = new _fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["PositionCache"](this.el, this.cellEls.slice(0, colCnt), // only the first row
        true, false // horizontal
        );
        // trigger dayRender with each cell's element
        for (row = 0; row < rowCnt; row++) {
            for (col = 0; col < colCnt; col++) {
                calendar.publiclyTrigger('dayRender', [
                    {
                        date: dateEnv.toDate(cells[row][col].date),
                        el: this.getCellEl(row, col),
                        view: view
                    }
                ]);
            }
        }
        this.isCellSizesDirty = true;
    };
    DayGrid.prototype._unrenderCells = function () {
        this.removeSegPopover();
    };
    // Generates the HTML for a single row, which is a div that wraps a table.
    // `row` is the row number.
    DayGrid.prototype.renderDayRowHtml = function (row, isRigid) {
        var theme = this.context.theme;
        var classes = ['fc-row', 'fc-week', theme.getClass('dayRow')];
        if (isRigid) {
            classes.push('fc-rigid');
        }
        var bgRow = new DayBgRow(this.context);
        return '' +
            '<div class="' + classes.join(' ') + '">' +
            '<div class="fc-bg">' +
            '<table class="' + theme.getClass('tableGrid') + '">' +
            bgRow.renderHtml({
                cells: this.props.cells[row],
                dateProfile: this.props.dateProfile,
                renderIntroHtml: this.renderProps.renderBgIntroHtml
            }) +
            '</table>' +
            '</div>' +
            '<div class="fc-content-skeleton">' +
            '<table>' +
            (this.getIsNumbersVisible() ?
                '<thead>' +
                    this.renderNumberTrHtml(row) +
                    '</thead>' :
                '') +
            '</table>' +
            '</div>' +
            '</div>';
    };
    DayGrid.prototype.getIsNumbersVisible = function () {
        return this.getIsDayNumbersVisible() ||
            this.renderProps.cellWeekNumbersVisible ||
            this.renderProps.colWeekNumbersVisible;
    };
    DayGrid.prototype.getIsDayNumbersVisible = function () {
        return this.rowCnt > 1;
    };
    /* Grid Number Rendering
    ------------------------------------------------------------------------------------------------------------------*/
    DayGrid.prototype.renderNumberTrHtml = function (row) {
        var isRtl = this.context.isRtl;
        var intro = this.renderProps.renderNumberIntroHtml(row, this);
        return '' +
            '<tr>' +
            (isRtl ? '' : intro) +
            this.renderNumberCellsHtml(row) +
            (isRtl ? intro : '') +
            '</tr>';
    };
    DayGrid.prototype.renderNumberCellsHtml = function (row) {
        var htmls = [];
        var col;
        var date;
        for (col = 0; col < this.colCnt; col++) {
            date = this.props.cells[row][col].date;
            htmls.push(this.renderNumberCellHtml(date));
        }
        if (this.context.isRtl) {
            htmls.reverse();
        }
        return htmls.join('');
    };
    // Generates the HTML for the <td>s of the "number" row in the DayGrid's content skeleton.
    // The number row will only exist if either day numbers or week numbers are turned on.
    DayGrid.prototype.renderNumberCellHtml = function (date) {
        var _a = this.context, dateEnv = _a.dateEnv, options = _a.options;
        var html = '';
        var isDateValid = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["rangeContainsMarker"])(this.props.dateProfile.activeRange, date); // TODO: called too frequently. cache somehow.
        var isDayNumberVisible = this.getIsDayNumbersVisible() && isDateValid;
        var classes;
        var weekCalcFirstDow;
        if (!isDayNumberVisible && !this.renderProps.cellWeekNumbersVisible) {
            // no numbers in day cell (week number must be along the side)
            return '<td></td>'; //  will create an empty space above events :(
        }
        classes = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["getDayClasses"])(date, this.props.dateProfile, this.context);
        classes.unshift('fc-day-top');
        if (this.renderProps.cellWeekNumbersVisible) {
            weekCalcFirstDow = dateEnv.weekDow;
        }
        html += '<td class="' + classes.join(' ') + '"' +
            (isDateValid ?
                ' data-date="' + dateEnv.formatIso(date, { omitTime: true }) + '"' :
                '') +
            '>';
        if (this.renderProps.cellWeekNumbersVisible && (date.getUTCDay() === weekCalcFirstDow)) {
            html += Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["buildGotoAnchorHtml"])(options, dateEnv, { date: date, type: 'week' }, { 'class': 'fc-week-number' }, dateEnv.format(date, WEEK_NUM_FORMAT) // inner HTML
            );
        }
        if (isDayNumberVisible) {
            html += Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["buildGotoAnchorHtml"])(options, dateEnv, date, { 'class': 'fc-day-number' }, dateEnv.format(date, DAY_NUM_FORMAT) // inner HTML
            );
        }
        html += '</td>';
        return html;
    };
    /* Sizing
    ------------------------------------------------------------------------------------------------------------------*/
    DayGrid.prototype.updateSize = function (isResize) {
        var calendar = this.context.calendar;
        var _a = this, fillRenderer = _a.fillRenderer, eventRenderer = _a.eventRenderer, mirrorRenderer = _a.mirrorRenderer;
        if (isResize ||
            this.isCellSizesDirty ||
            calendar.isEventsUpdated // hack
        ) {
            this.buildPositionCaches();
            this.isCellSizesDirty = false;
        }
        fillRenderer.computeSizes(isResize);
        eventRenderer.computeSizes(isResize);
        mirrorRenderer.computeSizes(isResize);
        fillRenderer.assignSizes(isResize);
        eventRenderer.assignSizes(isResize);
        mirrorRenderer.assignSizes(isResize);
    };
    DayGrid.prototype.buildPositionCaches = function () {
        this.buildColPositions();
        this.buildRowPositions();
    };
    DayGrid.prototype.buildColPositions = function () {
        this.colPositions.build();
    };
    DayGrid.prototype.buildRowPositions = function () {
        this.rowPositions.build();
        this.rowPositions.bottoms[this.rowCnt - 1] += this.bottomCoordPadding; // hack
    };
    /* Hit System
    ------------------------------------------------------------------------------------------------------------------*/
    DayGrid.prototype.positionToHit = function (leftPosition, topPosition) {
        var _a = this, colPositions = _a.colPositions, rowPositions = _a.rowPositions;
        var col = colPositions.leftToIndex(leftPosition);
        var row = rowPositions.topToIndex(topPosition);
        if (row != null && col != null) {
            return {
                row: row,
                col: col,
                dateSpan: {
                    range: this.getCellRange(row, col),
                    allDay: true
                },
                dayEl: this.getCellEl(row, col),
                relativeRect: {
                    left: colPositions.lefts[col],
                    right: colPositions.rights[col],
                    top: rowPositions.tops[row],
                    bottom: rowPositions.bottoms[row]
                }
            };
        }
    };
    /* Cell System
    ------------------------------------------------------------------------------------------------------------------*/
    // FYI: the first column is the leftmost column, regardless of date
    DayGrid.prototype.getCellEl = function (row, col) {
        return this.cellEls[row * this.colCnt + col];
    };
    /* Event Drag Visualization
    ------------------------------------------------------------------------------------------------------------------*/
    DayGrid.prototype._renderEventDrag = function (state) {
        if (state) {
            this.eventRenderer.hideByHash(state.affectedInstances);
            this.fillRenderer.renderSegs('highlight', this.context, state.segs);
        }
    };
    DayGrid.prototype._unrenderEventDrag = function (state) {
        if (state) {
            this.eventRenderer.showByHash(state.affectedInstances);
            this.fillRenderer.unrender('highlight', this.context);
        }
    };
    /* Event Resize Visualization
    ------------------------------------------------------------------------------------------------------------------*/
    DayGrid.prototype._renderEventResize = function (state) {
        if (state) {
            this.eventRenderer.hideByHash(state.affectedInstances);
            this.fillRenderer.renderSegs('highlight', this.context, state.segs);
            this.mirrorRenderer.renderSegs(this.context, state.segs, { isResizing: true, sourceSeg: state.sourceSeg });
        }
    };
    DayGrid.prototype._unrenderEventResize = function (state) {
        if (state) {
            this.eventRenderer.showByHash(state.affectedInstances);
            this.fillRenderer.unrender('highlight', this.context);
            this.mirrorRenderer.unrender(this.context, state.segs, { isResizing: true, sourceSeg: state.sourceSeg });
        }
    };
    /* More+ Link Popover
    ------------------------------------------------------------------------------------------------------------------*/
    DayGrid.prototype.removeSegPopover = function () {
        if (this.segPopover) {
            this.segPopover.hide(); // in handler, will call segPopover's removeElement
        }
    };
    // Limits the number of "levels" (vertically stacking layers of events) for each row of the grid.
    // `levelLimit` can be false (don't limit), a number, or true (should be computed).
    DayGrid.prototype.limitRows = function (levelLimit) {
        var rowStructs = this.eventRenderer.rowStructs || [];
        var row; // row #
        var rowLevelLimit;
        for (row = 0; row < rowStructs.length; row++) {
            this.unlimitRow(row);
            if (!levelLimit) {
                rowLevelLimit = false;
            }
            else if (typeof levelLimit === 'number') {
                rowLevelLimit = levelLimit;
            }
            else {
                rowLevelLimit = this.computeRowLevelLimit(row);
            }
            if (rowLevelLimit !== false) {
                this.limitRow(row, rowLevelLimit);
            }
        }
    };
    // Computes the number of levels a row will accomodate without going outside its bounds.
    // Assumes the row is "rigid" (maintains a constant height regardless of what is inside).
    // `row` is the row number.
    DayGrid.prototype.computeRowLevelLimit = function (row) {
        var rowEl = this.rowEls[row]; // the containing "fake" row div
        var rowBottom = rowEl.getBoundingClientRect().bottom; // relative to viewport!
        var trEls = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["findChildren"])(this.eventRenderer.rowStructs[row].tbodyEl);
        var i;
        var trEl;
        // Reveal one level <tr> at a time and stop when we find one out of bounds
        for (i = 0; i < trEls.length; i++) {
            trEl = trEls[i];
            trEl.classList.remove('fc-limited'); // reset to original state (reveal)
            if (trEl.getBoundingClientRect().bottom > rowBottom) {
                return i;
            }
        }
        return false; // should not limit at all
    };
    // Limits the given grid row to the maximum number of levels and injects "more" links if necessary.
    // `row` is the row number.
    // `levelLimit` is a number for the maximum (inclusive) number of levels allowed.
    DayGrid.prototype.limitRow = function (row, levelLimit) {
        var _this = this;
        var colCnt = this.colCnt;
        var isRtl = this.context.isRtl;
        var rowStruct = this.eventRenderer.rowStructs[row];
        var moreNodes = []; // array of "more" <a> links and <td> DOM nodes
        var col = 0; // col #, left-to-right (not chronologically)
        var levelSegs; // array of segment objects in the last allowable level, ordered left-to-right
        var cellMatrix; // a matrix (by level, then column) of all <td> elements in the row
        var limitedNodes; // array of temporarily hidden level <tr> and segment <td> DOM nodes
        var i;
        var seg;
        var segsBelow; // array of segment objects below `seg` in the current `col`
        var totalSegsBelow; // total number of segments below `seg` in any of the columns `seg` occupies
        var colSegsBelow; // array of segment arrays, below seg, one for each column (offset from segs's first column)
        var td;
        var rowSpan;
        var segMoreNodes; // array of "more" <td> cells that will stand-in for the current seg's cell
        var j;
        var moreTd;
        var moreWrap;
        var moreLink;
        // Iterates through empty level cells and places "more" links inside if need be
        var emptyCellsUntil = function (endCol) {
            while (col < endCol) {
                segsBelow = _this.getCellSegs(row, col, levelLimit);
                if (segsBelow.length) {
                    td = cellMatrix[levelLimit - 1][col];
                    moreLink = _this.renderMoreLink(row, col, segsBelow);
                    moreWrap = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["createElement"])('div', null, moreLink);
                    td.appendChild(moreWrap);
                    moreNodes.push(moreWrap);
                }
                col++;
            }
        };
        if (levelLimit && levelLimit < rowStruct.segLevels.length) { // is it actually over the limit?
            levelSegs = rowStruct.segLevels[levelLimit - 1];
            cellMatrix = rowStruct.cellMatrix;
            limitedNodes = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["findChildren"])(rowStruct.tbodyEl).slice(levelLimit); // get level <tr> elements past the limit
            limitedNodes.forEach(function (node) {
                node.classList.add('fc-limited'); // hide elements and get a simple DOM-nodes array
            });
            // iterate though segments in the last allowable level
            for (i = 0; i < levelSegs.length; i++) {
                seg = levelSegs[i];
                var leftCol = isRtl ? (colCnt - 1 - seg.lastCol) : seg.firstCol;
                var rightCol = isRtl ? (colCnt - 1 - seg.firstCol) : seg.lastCol;
                emptyCellsUntil(leftCol); // process empty cells before the segment
                // determine *all* segments below `seg` that occupy the same columns
                colSegsBelow = [];
                totalSegsBelow = 0;
                while (col <= rightCol) {
                    segsBelow = this.getCellSegs(row, col, levelLimit);
                    colSegsBelow.push(segsBelow);
                    totalSegsBelow += segsBelow.length;
                    col++;
                }
                if (totalSegsBelow) { // do we need to replace this segment with one or many "more" links?
                    td = cellMatrix[levelLimit - 1][leftCol]; // the segment's parent cell
                    rowSpan = td.rowSpan || 1;
                    segMoreNodes = [];
                    // make a replacement <td> for each column the segment occupies. will be one for each colspan
                    for (j = 0; j < colSegsBelow.length; j++) {
                        moreTd = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["createElement"])('td', { className: 'fc-more-cell', rowSpan: rowSpan });
                        segsBelow = colSegsBelow[j];
                        moreLink = this.renderMoreLink(row, leftCol + j, [seg].concat(segsBelow) // count seg as hidden too
                        );
                        moreWrap = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["createElement"])('div', null, moreLink);
                        moreTd.appendChild(moreWrap);
                        segMoreNodes.push(moreTd);
                        moreNodes.push(moreTd);
                    }
                    td.classList.add('fc-limited');
                    Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["insertAfterElement"])(td, segMoreNodes);
                    limitedNodes.push(td);
                }
            }
            emptyCellsUntil(this.colCnt); // finish off the level
            rowStruct.moreEls = moreNodes; // for easy undoing later
            rowStruct.limitedEls = limitedNodes; // for easy undoing later
        }
    };
    // Reveals all levels and removes all "more"-related elements for a grid's row.
    // `row` is a row number.
    DayGrid.prototype.unlimitRow = function (row) {
        var rowStruct = this.eventRenderer.rowStructs[row];
        if (rowStruct.moreEls) {
            rowStruct.moreEls.forEach(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["removeElement"]);
            rowStruct.moreEls = null;
        }
        if (rowStruct.limitedEls) {
            rowStruct.limitedEls.forEach(function (limitedEl) {
                limitedEl.classList.remove('fc-limited');
            });
            rowStruct.limitedEls = null;
        }
    };
    // Renders an <a> element that represents hidden event element for a cell.
    // Responsible for attaching click handler as well.
    DayGrid.prototype.renderMoreLink = function (row, col, hiddenSegs) {
        var _this = this;
        var _a = this.context, calendar = _a.calendar, view = _a.view, dateEnv = _a.dateEnv, options = _a.options, isRtl = _a.isRtl;
        var a = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["createElement"])('a', { className: 'fc-more' });
        a.innerText = this.getMoreLinkText(hiddenSegs.length);
        a.addEventListener('click', function (ev) {
            var clickOption = options.eventLimitClick;
            var _col = isRtl ? _this.colCnt - col - 1 : col; // HACK: props.cells has different dir system?
            var date = _this.props.cells[row][_col].date;
            var moreEl = ev.currentTarget;
            var dayEl = _this.getCellEl(row, col);
            var allSegs = _this.getCellSegs(row, col);
            // rescope the segments to be within the cell's date
            var reslicedAllSegs = _this.resliceDaySegs(allSegs, date);
            var reslicedHiddenSegs = _this.resliceDaySegs(hiddenSegs, date);
            if (typeof clickOption === 'function') {
                // the returned value can be an atomic option
                clickOption = calendar.publiclyTrigger('eventLimitClick', [
                    {
                        date: dateEnv.toDate(date),
                        allDay: true,
                        dayEl: dayEl,
                        moreEl: moreEl,
                        segs: reslicedAllSegs,
                        hiddenSegs: reslicedHiddenSegs,
                        jsEvent: ev,
                        view: view
                    }
                ]);
            }
            if (clickOption === 'popover') {
                _this.showSegPopover(row, col, moreEl, reslicedAllSegs);
            }
            else if (typeof clickOption === 'string') { // a view name
                calendar.zoomTo(date, clickOption);
            }
        });
        return a;
    };
    // Reveals the popover that displays all events within a cell
    DayGrid.prototype.showSegPopover = function (row, col, moreLink, segs) {
        var _this = this;
        var _a = this.context, calendar = _a.calendar, view = _a.view, theme = _a.theme, isRtl = _a.isRtl;
        var _col = isRtl ? this.colCnt - col - 1 : col; // HACK: props.cells has different dir system?
        var moreWrap = moreLink.parentNode; // the <div> wrapper around the <a>
        var topEl; // the element we want to match the top coordinate of
        var options;
        if (this.rowCnt === 1) {
            topEl = view.el; // will cause the popover to cover any sort of header
        }
        else {
            topEl = this.rowEls[row]; // will align with top of row
        }
        options = {
            className: 'fc-more-popover ' + theme.getClass('popover'),
            parentEl: view.el,
            top: Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["computeRect"])(topEl).top,
            autoHide: true,
            content: function (el) {
                _this.segPopoverTile = new DayTile(el);
                _this.updateSegPopoverTile(_this.props.cells[row][_col].date, segs);
            },
            hide: function () {
                _this.segPopoverTile.destroy();
                _this.segPopoverTile = null;
                _this.segPopover.destroy();
                _this.segPopover = null;
            }
        };
        // Determine horizontal coordinate.
        // We use the moreWrap instead of the <td> to avoid border confusion.
        if (isRtl) {
            options.right = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["computeRect"])(moreWrap).right + 1; // +1 to be over cell border
        }
        else {
            options.left = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["computeRect"])(moreWrap).left - 1; // -1 to be over cell border
        }
        this.segPopover = new Popover(options);
        this.segPopover.show();
        calendar.releaseAfterSizingTriggers(); // hack for eventPositioned
    };
    // Given the events within an array of segment objects, reslice them to be in a single day
    DayGrid.prototype.resliceDaySegs = function (segs, dayDate) {
        var dayStart = dayDate;
        var dayEnd = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["addDays"])(dayStart, 1);
        var dayRange = { start: dayStart, end: dayEnd };
        var newSegs = [];
        for (var _i = 0, segs_1 = segs; _i < segs_1.length; _i++) {
            var seg = segs_1[_i];
            var eventRange = seg.eventRange;
            var origRange = eventRange.range;
            var slicedRange = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["intersectRanges"])(origRange, dayRange);
            if (slicedRange) {
                newSegs.push(__assign({}, seg, { eventRange: {
                        def: eventRange.def,
                        ui: __assign({}, eventRange.ui, { durationEditable: false }),
                        instance: eventRange.instance,
                        range: slicedRange
                    }, isStart: seg.isStart && slicedRange.start.valueOf() === origRange.start.valueOf(), isEnd: seg.isEnd && slicedRange.end.valueOf() === origRange.end.valueOf() }));
            }
        }
        return newSegs;
    };
    // Generates the text that should be inside a "more" link, given the number of events it represents
    DayGrid.prototype.getMoreLinkText = function (num) {
        var opt = this.context.options.eventLimitText;
        if (typeof opt === 'function') {
            return opt(num);
        }
        else {
            return '+' + num + ' ' + opt;
        }
    };
    // Returns segments within a given cell.
    // If `startLevel` is specified, returns only events including and below that level. Otherwise returns all segs.
    DayGrid.prototype.getCellSegs = function (row, col, startLevel) {
        var segMatrix = this.eventRenderer.rowStructs[row].segMatrix;
        var level = startLevel || 0;
        var segs = [];
        var seg;
        while (level < segMatrix.length) {
            seg = segMatrix[level][col];
            if (seg) {
                segs.push(seg);
            }
            level++;
        }
        return segs;
    };
    return DayGrid;
}(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["DateComponent"]));

var WEEK_NUM_FORMAT$1 = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["createFormatter"])({ week: 'numeric' });
/* An abstract class for the daygrid views, as well as month view. Renders one or more rows of day cells.
----------------------------------------------------------------------------------------------------------------------*/
// It is a manager for a DayGrid subcomponent, which does most of the heavy lifting.
// It is responsible for managing width/height.
var AbstractDayGridView = /** @class */ (function (_super) {
    __extends(AbstractDayGridView, _super);
    function AbstractDayGridView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.processOptions = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["memoize"])(_this._processOptions);
        _this.renderSkeleton = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["memoizeRendering"])(_this._renderSkeleton, _this._unrenderSkeleton);
        /* Header Rendering
        ------------------------------------------------------------------------------------------------------------------*/
        // Generates the HTML that will go before the day-of week header cells
        _this.renderHeadIntroHtml = function () {
            var _a = _this.context, theme = _a.theme, options = _a.options;
            if (_this.colWeekNumbersVisible) {
                return '' +
                    '<th class="fc-week-number ' + theme.getClass('widgetHeader') + '" ' + _this.weekNumberStyleAttr() + '>' +
                    '<span>' + // needed for matchCellWidths
                    Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["htmlEscape"])(options.weekLabel) +
                    '</span>' +
                    '</th>';
            }
            return '';
        };
        /* Day Grid Rendering
        ------------------------------------------------------------------------------------------------------------------*/
        // Generates the HTML that will go before content-skeleton cells that display the day/week numbers
        _this.renderDayGridNumberIntroHtml = function (row, dayGrid) {
            var _a = _this.context, options = _a.options, dateEnv = _a.dateEnv;
            var weekStart = dayGrid.props.cells[row][0].date;
            if (_this.colWeekNumbersVisible) {
                return '' +
                    '<td class="fc-week-number" ' + _this.weekNumberStyleAttr() + '>' +
                    Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["buildGotoAnchorHtml"])(// aside from link, important for matchCellWidths
                    options, dateEnv, { date: weekStart, type: 'week', forceOff: dayGrid.colCnt === 1 }, dateEnv.format(weekStart, WEEK_NUM_FORMAT$1) // inner HTML
                    ) +
                    '</td>';
            }
            return '';
        };
        // Generates the HTML that goes before the day bg cells for each day-row
        _this.renderDayGridBgIntroHtml = function () {
            var theme = _this.context.theme;
            if (_this.colWeekNumbersVisible) {
                return '<td class="fc-week-number ' + theme.getClass('widgetContent') + '" ' + _this.weekNumberStyleAttr() + '></td>';
            }
            return '';
        };
        // Generates the HTML that goes before every other type of row generated by DayGrid.
        // Affects mirror-skeleton and highlight-skeleton rows.
        _this.renderDayGridIntroHtml = function () {
            if (_this.colWeekNumbersVisible) {
                return '<td class="fc-week-number" ' + _this.weekNumberStyleAttr() + '></td>';
            }
            return '';
        };
        return _this;
    }
    AbstractDayGridView.prototype._processOptions = function (options) {
        if (options.weekNumbers) {
            if (options.weekNumbersWithinDays) {
                this.cellWeekNumbersVisible = true;
                this.colWeekNumbersVisible = false;
            }
            else {
                this.cellWeekNumbersVisible = false;
                this.colWeekNumbersVisible = true;
            }
        }
        else {
            this.colWeekNumbersVisible = false;
            this.cellWeekNumbersVisible = false;
        }
    };
    AbstractDayGridView.prototype.render = function (props, context) {
        _super.prototype.render.call(this, props, context);
        this.processOptions(context.options);
        this.renderSkeleton(context);
    };
    AbstractDayGridView.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.renderSkeleton.unrender();
    };
    AbstractDayGridView.prototype._renderSkeleton = function (context) {
        this.el.classList.add('fc-dayGrid-view');
        this.el.innerHTML = this.renderSkeletonHtml();
        this.scroller = new _fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["ScrollComponent"]('hidden', // overflow x
        'auto' // overflow y
        );
        var dayGridContainerEl = this.scroller.el;
        this.el.querySelector('.fc-body > tr > td').appendChild(dayGridContainerEl);
        dayGridContainerEl.classList.add('fc-day-grid-container');
        var dayGridEl = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["createElement"])('div', { className: 'fc-day-grid' });
        dayGridContainerEl.appendChild(dayGridEl);
        this.dayGrid = new DayGrid(dayGridEl, {
            renderNumberIntroHtml: this.renderDayGridNumberIntroHtml,
            renderBgIntroHtml: this.renderDayGridBgIntroHtml,
            renderIntroHtml: this.renderDayGridIntroHtml,
            colWeekNumbersVisible: this.colWeekNumbersVisible,
            cellWeekNumbersVisible: this.cellWeekNumbersVisible
        });
    };
    AbstractDayGridView.prototype._unrenderSkeleton = function () {
        this.el.classList.remove('fc-dayGrid-view');
        this.dayGrid.destroy();
        this.scroller.destroy();
    };
    // Builds the HTML skeleton for the view.
    // The day-grid component will render inside of a container defined by this HTML.
    AbstractDayGridView.prototype.renderSkeletonHtml = function () {
        var _a = this.context, theme = _a.theme, options = _a.options;
        return '' +
            '<table class="' + theme.getClass('tableGrid') + '">' +
            (options.columnHeader ?
                '<thead class="fc-head">' +
                    '<tr>' +
                    '<td class="fc-head-container ' + theme.getClass('widgetHeader') + '">&nbsp;</td>' +
                    '</tr>' +
                    '</thead>' :
                '') +
            '<tbody class="fc-body">' +
            '<tr>' +
            '<td class="' + theme.getClass('widgetContent') + '"></td>' +
            '</tr>' +
            '</tbody>' +
            '</table>';
    };
    // Generates an HTML attribute string for setting the width of the week number column, if it is known
    AbstractDayGridView.prototype.weekNumberStyleAttr = function () {
        if (this.weekNumberWidth != null) {
            return 'style="width:' + this.weekNumberWidth + 'px"';
        }
        return '';
    };
    // Determines whether each row should have a constant height
    AbstractDayGridView.prototype.hasRigidRows = function () {
        var eventLimit = this.context.options.eventLimit;
        return eventLimit && typeof eventLimit !== 'number';
    };
    /* Dimensions
    ------------------------------------------------------------------------------------------------------------------*/
    AbstractDayGridView.prototype.updateSize = function (isResize, viewHeight, isAuto) {
        _super.prototype.updateSize.call(this, isResize, viewHeight, isAuto); // will call updateBaseSize. important that executes first
        this.dayGrid.updateSize(isResize);
    };
    // Refreshes the horizontal dimensions of the view
    AbstractDayGridView.prototype.updateBaseSize = function (isResize, viewHeight, isAuto) {
        var dayGrid = this.dayGrid;
        var eventLimit = this.context.options.eventLimit;
        var headRowEl = this.header ? this.header.el : null; // HACK
        var scrollerHeight;
        var scrollbarWidths;
        // hack to give the view some height prior to dayGrid's columns being rendered
        // TODO: separate setting height from scroller VS dayGrid.
        if (!dayGrid.rowEls) {
            if (!isAuto) {
                scrollerHeight = this.computeScrollerHeight(viewHeight);
                this.scroller.setHeight(scrollerHeight);
            }
            return;
        }
        if (this.colWeekNumbersVisible) {
            // Make sure all week number cells running down the side have the same width.
            this.weekNumberWidth = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["matchCellWidths"])(Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["findElements"])(this.el, '.fc-week-number'));
        }
        // reset all heights to be natural
        this.scroller.clear();
        if (headRowEl) {
            Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["uncompensateScroll"])(headRowEl);
        }
        dayGrid.removeSegPopover(); // kill the "more" popover if displayed
        // is the event limit a constant level number?
        if (eventLimit && typeof eventLimit === 'number') {
            dayGrid.limitRows(eventLimit); // limit the levels first so the height can redistribute after
        }
        // distribute the height to the rows
        // (viewHeight is a "recommended" value if isAuto)
        scrollerHeight = this.computeScrollerHeight(viewHeight);
        this.setGridHeight(scrollerHeight, isAuto);
        // is the event limit dynamically calculated?
        if (eventLimit && typeof eventLimit !== 'number') {
            dayGrid.limitRows(eventLimit); // limit the levels after the grid's row heights have been set
        }
        if (!isAuto) { // should we force dimensions of the scroll container?
            this.scroller.setHeight(scrollerHeight);
            scrollbarWidths = this.scroller.getScrollbarWidths();
            if (scrollbarWidths.left || scrollbarWidths.right) { // using scrollbars?
                if (headRowEl) {
                    Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["compensateScroll"])(headRowEl, scrollbarWidths);
                }
                // doing the scrollbar compensation might have created text overflow which created more height. redo
                scrollerHeight = this.computeScrollerHeight(viewHeight);
                this.scroller.setHeight(scrollerHeight);
            }
            // guarantees the same scrollbar widths
            this.scroller.lockOverflow(scrollbarWidths);
        }
    };
    // given a desired total height of the view, returns what the height of the scroller should be
    AbstractDayGridView.prototype.computeScrollerHeight = function (viewHeight) {
        return viewHeight -
            Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["subtractInnerElHeight"])(this.el, this.scroller.el); // everything that's NOT the scroller
    };
    // Sets the height of just the DayGrid component in this view
    AbstractDayGridView.prototype.setGridHeight = function (height, isAuto) {
        if (this.context.options.monthMode) {
            // if auto, make the height of each row the height that it would be if there were 6 weeks
            if (isAuto) {
                height *= this.dayGrid.rowCnt / 6;
            }
            Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["distributeHeight"])(this.dayGrid.rowEls, height, !isAuto); // if auto, don't compensate for height-hogging rows
        }
        else {
            if (isAuto) {
                Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["undistributeHeight"])(this.dayGrid.rowEls); // let the rows be their natural height with no expanding
            }
            else {
                Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["distributeHeight"])(this.dayGrid.rowEls, height, true); // true = compensate for height-hogging rows
            }
        }
    };
    /* Scroll
    ------------------------------------------------------------------------------------------------------------------*/
    AbstractDayGridView.prototype.computeDateScroll = function (duration) {
        return { top: 0 };
    };
    AbstractDayGridView.prototype.queryDateScroll = function () {
        return { top: this.scroller.getScrollTop() };
    };
    AbstractDayGridView.prototype.applyDateScroll = function (scroll) {
        if (scroll.top !== undefined) {
            this.scroller.setScrollTop(scroll.top);
        }
    };
    return AbstractDayGridView;
}(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["View"]));
AbstractDayGridView.prototype.dateProfileGeneratorClass = DayGridDateProfileGenerator;

var SimpleDayGrid = /** @class */ (function (_super) {
    __extends(SimpleDayGrid, _super);
    function SimpleDayGrid(dayGrid) {
        var _this = _super.call(this, dayGrid.el) || this;
        _this.slicer = new DayGridSlicer();
        _this.dayGrid = dayGrid;
        return _this;
    }
    SimpleDayGrid.prototype.firstContext = function (context) {
        context.calendar.registerInteractiveComponent(this, { el: this.dayGrid.el });
    };
    SimpleDayGrid.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.context.calendar.unregisterInteractiveComponent(this);
    };
    SimpleDayGrid.prototype.render = function (props, context) {
        var dayGrid = this.dayGrid;
        var dateProfile = props.dateProfile, dayTable = props.dayTable;
        dayGrid.receiveProps(__assign({}, this.slicer.sliceProps(props, dateProfile, props.nextDayThreshold, context.calendar, dayGrid, dayTable), { dateProfile: dateProfile, cells: dayTable.cells, isRigid: props.isRigid }), context);
    };
    SimpleDayGrid.prototype.buildPositionCaches = function () {
        this.dayGrid.buildPositionCaches();
    };
    SimpleDayGrid.prototype.queryHit = function (positionLeft, positionTop) {
        var rawHit = this.dayGrid.positionToHit(positionLeft, positionTop);
        if (rawHit) {
            return {
                component: this.dayGrid,
                dateSpan: rawHit.dateSpan,
                dayEl: rawHit.dayEl,
                rect: {
                    left: rawHit.relativeRect.left,
                    right: rawHit.relativeRect.right,
                    top: rawHit.relativeRect.top,
                    bottom: rawHit.relativeRect.bottom
                },
                layer: 0
            };
        }
    };
    return SimpleDayGrid;
}(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["DateComponent"]));
var DayGridSlicer = /** @class */ (function (_super) {
    __extends(DayGridSlicer, _super);
    function DayGridSlicer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DayGridSlicer.prototype.sliceRange = function (dateRange, dayTable) {
        return dayTable.sliceRange(dateRange);
    };
    return DayGridSlicer;
}(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["Slicer"]));

var DayGridView = /** @class */ (function (_super) {
    __extends(DayGridView, _super);
    function DayGridView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.buildDayTable = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["memoize"])(buildDayTable);
        return _this;
    }
    DayGridView.prototype.render = function (props, context) {
        _super.prototype.render.call(this, props, context); // will call _renderSkeleton/_unrenderSkeleton
        var dateProfile = this.props.dateProfile;
        var dayTable = this.dayTable =
            this.buildDayTable(dateProfile, props.dateProfileGenerator);
        if (this.header) {
            this.header.receiveProps({
                dateProfile: dateProfile,
                dates: dayTable.headerDates,
                datesRepDistinctDays: dayTable.rowCnt === 1,
                renderIntroHtml: this.renderHeadIntroHtml
            }, context);
        }
        this.simpleDayGrid.receiveProps({
            dateProfile: dateProfile,
            dayTable: dayTable,
            businessHours: props.businessHours,
            dateSelection: props.dateSelection,
            eventStore: props.eventStore,
            eventUiBases: props.eventUiBases,
            eventSelection: props.eventSelection,
            eventDrag: props.eventDrag,
            eventResize: props.eventResize,
            isRigid: this.hasRigidRows(),
            nextDayThreshold: this.context.nextDayThreshold
        }, context);
    };
    DayGridView.prototype._renderSkeleton = function (context) {
        _super.prototype._renderSkeleton.call(this, context);
        if (context.options.columnHeader) {
            this.header = new _fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["DayHeader"](this.el.querySelector('.fc-head-container'));
        }
        this.simpleDayGrid = new SimpleDayGrid(this.dayGrid);
    };
    DayGridView.prototype._unrenderSkeleton = function () {
        _super.prototype._unrenderSkeleton.call(this);
        if (this.header) {
            this.header.destroy();
        }
        this.simpleDayGrid.destroy();
    };
    return DayGridView;
}(AbstractDayGridView));
function buildDayTable(dateProfile, dateProfileGenerator) {
    var daySeries = new _fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["DaySeries"](dateProfile.renderRange, dateProfileGenerator);
    return new _fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["DayTable"](daySeries, /year|month|week/.test(dateProfile.currentRangeUnit));
}

var main = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["createPlugin"])({
    defaultView: 'dayGridMonth',
    views: {
        dayGrid: DayGridView,
        dayGridDay: {
            type: 'dayGrid',
            duration: { days: 1 }
        },
        dayGridWeek: {
            type: 'dayGrid',
            duration: { weeks: 1 }
        },
        dayGridMonth: {
            type: 'dayGrid',
            duration: { months: 1 },
            monthMode: true,
            fixedWeekCount: true
        }
    }
});

/* harmony default export */ __webpack_exports__["default"] = (main);



/***/ }),

/***/ "./node_modules/@fullcalendar/interaction/main.esm.js":
/*!************************************************************!*\
  !*** ./node_modules/@fullcalendar/interaction/main.esm.js ***!
  \************************************************************/
/*! exports provided: default, Draggable, FeaturefulElementDragging, PointerDragging, ThirdPartyDraggable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Draggable", function() { return ExternalDraggable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeaturefulElementDragging", function() { return FeaturefulElementDragging; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PointerDragging", function() { return PointerDragging; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThirdPartyDraggable", function() { return ThirdPartyDraggable; });
/* harmony import */ var _fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @fullcalendar/core */ "./node_modules/@fullcalendar/core/main.esm.js");
/*!
FullCalendar Interaction Plugin v4.4.0
Docs & License: https://fullcalendar.io/
(c) 2019 Adam Shaw
*/



/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["config"].touchMouseIgnoreWait = 500;
var ignoreMouseDepth = 0;
var listenerCnt = 0;
var isWindowTouchMoveCancelled = false;
/*
Uses a "pointer" abstraction, which monitors UI events for both mouse and touch.
Tracks when the pointer "drags" on a certain element, meaning down+move+up.

Also, tracks if there was touch-scrolling.
Also, can prevent touch-scrolling from happening.
Also, can fire pointermove events when scrolling happens underneath, even when no real pointer movement.

emits:
- pointerdown
- pointermove
- pointerup
*/
var PointerDragging = /** @class */ (function () {
    function PointerDragging(containerEl) {
        var _this = this;
        this.subjectEl = null;
        this.downEl = null;
        // options that can be directly assigned by caller
        this.selector = ''; // will cause subjectEl in all emitted events to be this element
        this.handleSelector = '';
        this.shouldIgnoreMove = false;
        this.shouldWatchScroll = true; // for simulating pointermove on scroll
        // internal states
        this.isDragging = false;
        this.isTouchDragging = false;
        this.wasTouchScroll = false;
        // Mouse
        // ----------------------------------------------------------------------------------------------------
        this.handleMouseDown = function (ev) {
            if (!_this.shouldIgnoreMouse() &&
                isPrimaryMouseButton(ev) &&
                _this.tryStart(ev)) {
                var pev = _this.createEventFromMouse(ev, true);
                _this.emitter.trigger('pointerdown', pev);
                _this.initScrollWatch(pev);
                if (!_this.shouldIgnoreMove) {
                    document.addEventListener('mousemove', _this.handleMouseMove);
                }
                document.addEventListener('mouseup', _this.handleMouseUp);
            }
        };
        this.handleMouseMove = function (ev) {
            var pev = _this.createEventFromMouse(ev);
            _this.recordCoords(pev);
            _this.emitter.trigger('pointermove', pev);
        };
        this.handleMouseUp = function (ev) {
            document.removeEventListener('mousemove', _this.handleMouseMove);
            document.removeEventListener('mouseup', _this.handleMouseUp);
            _this.emitter.trigger('pointerup', _this.createEventFromMouse(ev));
            _this.cleanup(); // call last so that pointerup has access to props
        };
        // Touch
        // ----------------------------------------------------------------------------------------------------
        this.handleTouchStart = function (ev) {
            if (_this.tryStart(ev)) {
                _this.isTouchDragging = true;
                var pev = _this.createEventFromTouch(ev, true);
                _this.emitter.trigger('pointerdown', pev);
                _this.initScrollWatch(pev);
                // unlike mouse, need to attach to target, not document
                // https://stackoverflow.com/a/45760014
                var target = ev.target;
                if (!_this.shouldIgnoreMove) {
                    target.addEventListener('touchmove', _this.handleTouchMove);
                }
                target.addEventListener('touchend', _this.handleTouchEnd);
                target.addEventListener('touchcancel', _this.handleTouchEnd); // treat it as a touch end
                // attach a handler to get called when ANY scroll action happens on the page.
                // this was impossible to do with normal on/off because 'scroll' doesn't bubble.
                // http://stackoverflow.com/a/32954565/96342
                window.addEventListener('scroll', _this.handleTouchScroll, true // useCapture
                );
            }
        };
        this.handleTouchMove = function (ev) {
            var pev = _this.createEventFromTouch(ev);
            _this.recordCoords(pev);
            _this.emitter.trigger('pointermove', pev);
        };
        this.handleTouchEnd = function (ev) {
            if (_this.isDragging) { // done to guard against touchend followed by touchcancel
                var target = ev.target;
                target.removeEventListener('touchmove', _this.handleTouchMove);
                target.removeEventListener('touchend', _this.handleTouchEnd);
                target.removeEventListener('touchcancel', _this.handleTouchEnd);
                window.removeEventListener('scroll', _this.handleTouchScroll, true); // useCaptured=true
                _this.emitter.trigger('pointerup', _this.createEventFromTouch(ev));
                _this.cleanup(); // call last so that pointerup has access to props
                _this.isTouchDragging = false;
                startIgnoringMouse();
            }
        };
        this.handleTouchScroll = function () {
            _this.wasTouchScroll = true;
        };
        this.handleScroll = function (ev) {
            if (!_this.shouldIgnoreMove) {
                var pageX = (window.pageXOffset - _this.prevScrollX) + _this.prevPageX;
                var pageY = (window.pageYOffset - _this.prevScrollY) + _this.prevPageY;
                _this.emitter.trigger('pointermove', {
                    origEvent: ev,
                    isTouch: _this.isTouchDragging,
                    subjectEl: _this.subjectEl,
                    pageX: pageX,
                    pageY: pageY,
                    deltaX: pageX - _this.origPageX,
                    deltaY: pageY - _this.origPageY
                });
            }
        };
        this.containerEl = containerEl;
        this.emitter = new _fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["EmitterMixin"]();
        containerEl.addEventListener('mousedown', this.handleMouseDown);
        containerEl.addEventListener('touchstart', this.handleTouchStart, { passive: true });
        listenerCreated();
    }
    PointerDragging.prototype.destroy = function () {
        this.containerEl.removeEventListener('mousedown', this.handleMouseDown);
        this.containerEl.removeEventListener('touchstart', this.handleTouchStart, { passive: true });
        listenerDestroyed();
    };
    PointerDragging.prototype.tryStart = function (ev) {
        var subjectEl = this.querySubjectEl(ev);
        var downEl = ev.target;
        if (subjectEl &&
            (!this.handleSelector || Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["elementClosest"])(downEl, this.handleSelector))) {
            this.subjectEl = subjectEl;
            this.downEl = downEl;
            this.isDragging = true; // do this first so cancelTouchScroll will work
            this.wasTouchScroll = false;
            return true;
        }
        return false;
    };
    PointerDragging.prototype.cleanup = function () {
        isWindowTouchMoveCancelled = false;
        this.isDragging = false;
        this.subjectEl = null;
        this.downEl = null;
        // keep wasTouchScroll around for later access
        this.destroyScrollWatch();
    };
    PointerDragging.prototype.querySubjectEl = function (ev) {
        if (this.selector) {
            return Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["elementClosest"])(ev.target, this.selector);
        }
        else {
            return this.containerEl;
        }
    };
    PointerDragging.prototype.shouldIgnoreMouse = function () {
        return ignoreMouseDepth || this.isTouchDragging;
    };
    // can be called by user of this class, to cancel touch-based scrolling for the current drag
    PointerDragging.prototype.cancelTouchScroll = function () {
        if (this.isDragging) {
            isWindowTouchMoveCancelled = true;
        }
    };
    // Scrolling that simulates pointermoves
    // ----------------------------------------------------------------------------------------------------
    PointerDragging.prototype.initScrollWatch = function (ev) {
        if (this.shouldWatchScroll) {
            this.recordCoords(ev);
            window.addEventListener('scroll', this.handleScroll, true); // useCapture=true
        }
    };
    PointerDragging.prototype.recordCoords = function (ev) {
        if (this.shouldWatchScroll) {
            this.prevPageX = ev.pageX;
            this.prevPageY = ev.pageY;
            this.prevScrollX = window.pageXOffset;
            this.prevScrollY = window.pageYOffset;
        }
    };
    PointerDragging.prototype.destroyScrollWatch = function () {
        if (this.shouldWatchScroll) {
            window.removeEventListener('scroll', this.handleScroll, true); // useCaptured=true
        }
    };
    // Event Normalization
    // ----------------------------------------------------------------------------------------------------
    PointerDragging.prototype.createEventFromMouse = function (ev, isFirst) {
        var deltaX = 0;
        var deltaY = 0;
        // TODO: repeat code
        if (isFirst) {
            this.origPageX = ev.pageX;
            this.origPageY = ev.pageY;
        }
        else {
            deltaX = ev.pageX - this.origPageX;
            deltaY = ev.pageY - this.origPageY;
        }
        return {
            origEvent: ev,
            isTouch: false,
            subjectEl: this.subjectEl,
            pageX: ev.pageX,
            pageY: ev.pageY,
            deltaX: deltaX,
            deltaY: deltaY
        };
    };
    PointerDragging.prototype.createEventFromTouch = function (ev, isFirst) {
        var touches = ev.touches;
        var pageX;
        var pageY;
        var deltaX = 0;
        var deltaY = 0;
        // if touch coords available, prefer,
        // because FF would give bad ev.pageX ev.pageY
        if (touches && touches.length) {
            pageX = touches[0].pageX;
            pageY = touches[0].pageY;
        }
        else {
            pageX = ev.pageX;
            pageY = ev.pageY;
        }
        // TODO: repeat code
        if (isFirst) {
            this.origPageX = pageX;
            this.origPageY = pageY;
        }
        else {
            deltaX = pageX - this.origPageX;
            deltaY = pageY - this.origPageY;
        }
        return {
            origEvent: ev,
            isTouch: true,
            subjectEl: this.subjectEl,
            pageX: pageX,
            pageY: pageY,
            deltaX: deltaX,
            deltaY: deltaY
        };
    };
    return PointerDragging;
}());
// Returns a boolean whether this was a left mouse click and no ctrl key (which means right click on Mac)
function isPrimaryMouseButton(ev) {
    return ev.button === 0 && !ev.ctrlKey;
}
// Ignoring fake mouse events generated by touch
// ----------------------------------------------------------------------------------------------------
function startIgnoringMouse() {
    ignoreMouseDepth++;
    setTimeout(function () {
        ignoreMouseDepth--;
    }, _fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["config"].touchMouseIgnoreWait);
}
// We want to attach touchmove as early as possible for Safari
// ----------------------------------------------------------------------------------------------------
function listenerCreated() {
    if (!(listenerCnt++)) {
        window.addEventListener('touchmove', onWindowTouchMove, { passive: false });
    }
}
function listenerDestroyed() {
    if (!(--listenerCnt)) {
        window.removeEventListener('touchmove', onWindowTouchMove, { passive: false });
    }
}
function onWindowTouchMove(ev) {
    if (isWindowTouchMoveCancelled) {
        ev.preventDefault();
    }
}

/*
An effect in which an element follows the movement of a pointer across the screen.
The moving element is a clone of some other element.
Must call start + handleMove + stop.
*/
var ElementMirror = /** @class */ (function () {
    function ElementMirror() {
        this.isVisible = false; // must be explicitly enabled
        this.sourceEl = null;
        this.mirrorEl = null;
        this.sourceElRect = null; // screen coords relative to viewport
        // options that can be set directly by caller
        this.parentNode = document.body;
        this.zIndex = 9999;
        this.revertDuration = 0;
    }
    ElementMirror.prototype.start = function (sourceEl, pageX, pageY) {
        this.sourceEl = sourceEl;
        this.sourceElRect = this.sourceEl.getBoundingClientRect();
        this.origScreenX = pageX - window.pageXOffset;
        this.origScreenY = pageY - window.pageYOffset;
        this.deltaX = 0;
        this.deltaY = 0;
        this.updateElPosition();
    };
    ElementMirror.prototype.handleMove = function (pageX, pageY) {
        this.deltaX = (pageX - window.pageXOffset) - this.origScreenX;
        this.deltaY = (pageY - window.pageYOffset) - this.origScreenY;
        this.updateElPosition();
    };
    // can be called before start
    ElementMirror.prototype.setIsVisible = function (bool) {
        if (bool) {
            if (!this.isVisible) {
                if (this.mirrorEl) {
                    this.mirrorEl.style.display = '';
                }
                this.isVisible = bool; // needs to happen before updateElPosition
                this.updateElPosition(); // because was not updating the position while invisible
            }
        }
        else {
            if (this.isVisible) {
                if (this.mirrorEl) {
                    this.mirrorEl.style.display = 'none';
                }
                this.isVisible = bool;
            }
        }
    };
    // always async
    ElementMirror.prototype.stop = function (needsRevertAnimation, callback) {
        var _this = this;
        var done = function () {
            _this.cleanup();
            callback();
        };
        if (needsRevertAnimation &&
            this.mirrorEl &&
            this.isVisible &&
            this.revertDuration && // if 0, transition won't work
            (this.deltaX || this.deltaY) // if same coords, transition won't work
        ) {
            this.doRevertAnimation(done, this.revertDuration);
        }
        else {
            setTimeout(done, 0);
        }
    };
    ElementMirror.prototype.doRevertAnimation = function (callback, revertDuration) {
        var mirrorEl = this.mirrorEl;
        var finalSourceElRect = this.sourceEl.getBoundingClientRect(); // because autoscrolling might have happened
        mirrorEl.style.transition =
            'top ' + revertDuration + 'ms,' +
                'left ' + revertDuration + 'ms';
        Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["applyStyle"])(mirrorEl, {
            left: finalSourceElRect.left,
            top: finalSourceElRect.top
        });
        Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["whenTransitionDone"])(mirrorEl, function () {
            mirrorEl.style.transition = '';
            callback();
        });
    };
    ElementMirror.prototype.cleanup = function () {
        if (this.mirrorEl) {
            Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["removeElement"])(this.mirrorEl);
            this.mirrorEl = null;
        }
        this.sourceEl = null;
    };
    ElementMirror.prototype.updateElPosition = function () {
        if (this.sourceEl && this.isVisible) {
            Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["applyStyle"])(this.getMirrorEl(), {
                left: this.sourceElRect.left + this.deltaX,
                top: this.sourceElRect.top + this.deltaY
            });
        }
    };
    ElementMirror.prototype.getMirrorEl = function () {
        var sourceElRect = this.sourceElRect;
        var mirrorEl = this.mirrorEl;
        if (!mirrorEl) {
            mirrorEl = this.mirrorEl = this.sourceEl.cloneNode(true); // cloneChildren=true
            // we don't want long taps or any mouse interaction causing selection/menus.
            // would use preventSelection(), but that prevents selectstart, causing problems.
            mirrorEl.classList.add('fc-unselectable');
            mirrorEl.classList.add('fc-dragging');
            Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["applyStyle"])(mirrorEl, {
                position: 'fixed',
                zIndex: this.zIndex,
                visibility: '',
                boxSizing: 'border-box',
                width: sourceElRect.right - sourceElRect.left,
                height: sourceElRect.bottom - sourceElRect.top,
                right: 'auto',
                bottom: 'auto',
                margin: 0
            });
            this.parentNode.appendChild(mirrorEl);
        }
        return mirrorEl;
    };
    return ElementMirror;
}());

/*
Is a cache for a given element's scroll information (all the info that ScrollController stores)
in addition the "client rectangle" of the element.. the area within the scrollbars.

The cache can be in one of two modes:
- doesListening:false - ignores when the container is scrolled by someone else
- doesListening:true - watch for scrolling and update the cache
*/
var ScrollGeomCache = /** @class */ (function (_super) {
    __extends(ScrollGeomCache, _super);
    function ScrollGeomCache(scrollController, doesListening) {
        var _this = _super.call(this) || this;
        _this.handleScroll = function () {
            _this.scrollTop = _this.scrollController.getScrollTop();
            _this.scrollLeft = _this.scrollController.getScrollLeft();
            _this.handleScrollChange();
        };
        _this.scrollController = scrollController;
        _this.doesListening = doesListening;
        _this.scrollTop = _this.origScrollTop = scrollController.getScrollTop();
        _this.scrollLeft = _this.origScrollLeft = scrollController.getScrollLeft();
        _this.scrollWidth = scrollController.getScrollWidth();
        _this.scrollHeight = scrollController.getScrollHeight();
        _this.clientWidth = scrollController.getClientWidth();
        _this.clientHeight = scrollController.getClientHeight();
        _this.clientRect = _this.computeClientRect(); // do last in case it needs cached values
        if (_this.doesListening) {
            _this.getEventTarget().addEventListener('scroll', _this.handleScroll);
        }
        return _this;
    }
    ScrollGeomCache.prototype.destroy = function () {
        if (this.doesListening) {
            this.getEventTarget().removeEventListener('scroll', this.handleScroll);
        }
    };
    ScrollGeomCache.prototype.getScrollTop = function () {
        return this.scrollTop;
    };
    ScrollGeomCache.prototype.getScrollLeft = function () {
        return this.scrollLeft;
    };
    ScrollGeomCache.prototype.setScrollTop = function (top) {
        this.scrollController.setScrollTop(top);
        if (!this.doesListening) {
            // we are not relying on the element to normalize out-of-bounds scroll values
            // so we need to sanitize ourselves
            this.scrollTop = Math.max(Math.min(top, this.getMaxScrollTop()), 0);
            this.handleScrollChange();
        }
    };
    ScrollGeomCache.prototype.setScrollLeft = function (top) {
        this.scrollController.setScrollLeft(top);
        if (!this.doesListening) {
            // we are not relying on the element to normalize out-of-bounds scroll values
            // so we need to sanitize ourselves
            this.scrollLeft = Math.max(Math.min(top, this.getMaxScrollLeft()), 0);
            this.handleScrollChange();
        }
    };
    ScrollGeomCache.prototype.getClientWidth = function () {
        return this.clientWidth;
    };
    ScrollGeomCache.prototype.getClientHeight = function () {
        return this.clientHeight;
    };
    ScrollGeomCache.prototype.getScrollWidth = function () {
        return this.scrollWidth;
    };
    ScrollGeomCache.prototype.getScrollHeight = function () {
        return this.scrollHeight;
    };
    ScrollGeomCache.prototype.handleScrollChange = function () {
    };
    return ScrollGeomCache;
}(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["ScrollController"]));
var ElementScrollGeomCache = /** @class */ (function (_super) {
    __extends(ElementScrollGeomCache, _super);
    function ElementScrollGeomCache(el, doesListening) {
        return _super.call(this, new _fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["ElementScrollController"](el), doesListening) || this;
    }
    ElementScrollGeomCache.prototype.getEventTarget = function () {
        return this.scrollController.el;
    };
    ElementScrollGeomCache.prototype.computeClientRect = function () {
        return Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["computeInnerRect"])(this.scrollController.el);
    };
    return ElementScrollGeomCache;
}(ScrollGeomCache));
var WindowScrollGeomCache = /** @class */ (function (_super) {
    __extends(WindowScrollGeomCache, _super);
    function WindowScrollGeomCache(doesListening) {
        return _super.call(this, new _fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["WindowScrollController"](), doesListening) || this;
    }
    WindowScrollGeomCache.prototype.getEventTarget = function () {
        return window;
    };
    WindowScrollGeomCache.prototype.computeClientRect = function () {
        return {
            left: this.scrollLeft,
            right: this.scrollLeft + this.clientWidth,
            top: this.scrollTop,
            bottom: this.scrollTop + this.clientHeight
        };
    };
    // the window is the only scroll object that changes it's rectangle relative
    // to the document's topleft as it scrolls
    WindowScrollGeomCache.prototype.handleScrollChange = function () {
        this.clientRect = this.computeClientRect();
    };
    return WindowScrollGeomCache;
}(ScrollGeomCache));

// If available we are using native "performance" API instead of "Date"
// Read more about it on MDN:
// https://developer.mozilla.org/en-US/docs/Web/API/Performance
var getTime = typeof performance === 'function' ? performance.now : Date.now;
/*
For a pointer interaction, automatically scrolls certain scroll containers when the pointer
approaches the edge.

The caller must call start + handleMove + stop.
*/
var AutoScroller = /** @class */ (function () {
    function AutoScroller() {
        var _this = this;
        // options that can be set by caller
        this.isEnabled = true;
        this.scrollQuery = [window, '.fc-scroller'];
        this.edgeThreshold = 50; // pixels
        this.maxVelocity = 300; // pixels per second
        // internal state
        this.pointerScreenX = null;
        this.pointerScreenY = null;
        this.isAnimating = false;
        this.scrollCaches = null;
        // protect against the initial pointerdown being too close to an edge and starting the scroll
        this.everMovedUp = false;
        this.everMovedDown = false;
        this.everMovedLeft = false;
        this.everMovedRight = false;
        this.animate = function () {
            if (_this.isAnimating) { // wasn't cancelled between animation calls
                var edge = _this.computeBestEdge(_this.pointerScreenX + window.pageXOffset, _this.pointerScreenY + window.pageYOffset);
                if (edge) {
                    var now = getTime();
                    _this.handleSide(edge, (now - _this.msSinceRequest) / 1000);
                    _this.requestAnimation(now);
                }
                else {
                    _this.isAnimating = false; // will stop animation
                }
            }
        };
    }
    AutoScroller.prototype.start = function (pageX, pageY) {
        if (this.isEnabled) {
            this.scrollCaches = this.buildCaches();
            this.pointerScreenX = null;
            this.pointerScreenY = null;
            this.everMovedUp = false;
            this.everMovedDown = false;
            this.everMovedLeft = false;
            this.everMovedRight = false;
            this.handleMove(pageX, pageY);
        }
    };
    AutoScroller.prototype.handleMove = function (pageX, pageY) {
        if (this.isEnabled) {
            var pointerScreenX = pageX - window.pageXOffset;
            var pointerScreenY = pageY - window.pageYOffset;
            var yDelta = this.pointerScreenY === null ? 0 : pointerScreenY - this.pointerScreenY;
            var xDelta = this.pointerScreenX === null ? 0 : pointerScreenX - this.pointerScreenX;
            if (yDelta < 0) {
                this.everMovedUp = true;
            }
            else if (yDelta > 0) {
                this.everMovedDown = true;
            }
            if (xDelta < 0) {
                this.everMovedLeft = true;
            }
            else if (xDelta > 0) {
                this.everMovedRight = true;
            }
            this.pointerScreenX = pointerScreenX;
            this.pointerScreenY = pointerScreenY;
            if (!this.isAnimating) {
                this.isAnimating = true;
                this.requestAnimation(getTime());
            }
        }
    };
    AutoScroller.prototype.stop = function () {
        if (this.isEnabled) {
            this.isAnimating = false; // will stop animation
            for (var _i = 0, _a = this.scrollCaches; _i < _a.length; _i++) {
                var scrollCache = _a[_i];
                scrollCache.destroy();
            }
            this.scrollCaches = null;
        }
    };
    AutoScroller.prototype.requestAnimation = function (now) {
        this.msSinceRequest = now;
        requestAnimationFrame(this.animate);
    };
    AutoScroller.prototype.handleSide = function (edge, seconds) {
        var scrollCache = edge.scrollCache;
        var edgeThreshold = this.edgeThreshold;
        var invDistance = edgeThreshold - edge.distance;
        var velocity = // the closer to the edge, the faster we scroll
         (invDistance * invDistance) / (edgeThreshold * edgeThreshold) * // quadratic
            this.maxVelocity * seconds;
        var sign = 1;
        switch (edge.name) {
            case 'left':
                sign = -1;
            // falls through
            case 'right':
                scrollCache.setScrollLeft(scrollCache.getScrollLeft() + velocity * sign);
                break;
            case 'top':
                sign = -1;
            // falls through
            case 'bottom':
                scrollCache.setScrollTop(scrollCache.getScrollTop() + velocity * sign);
                break;
        }
    };
    // left/top are relative to document topleft
    AutoScroller.prototype.computeBestEdge = function (left, top) {
        var edgeThreshold = this.edgeThreshold;
        var bestSide = null;
        for (var _i = 0, _a = this.scrollCaches; _i < _a.length; _i++) {
            var scrollCache = _a[_i];
            var rect = scrollCache.clientRect;
            var leftDist = left - rect.left;
            var rightDist = rect.right - left;
            var topDist = top - rect.top;
            var bottomDist = rect.bottom - top;
            // completely within the rect?
            if (leftDist >= 0 && rightDist >= 0 && topDist >= 0 && bottomDist >= 0) {
                if (topDist <= edgeThreshold && this.everMovedUp && scrollCache.canScrollUp() &&
                    (!bestSide || bestSide.distance > topDist)) {
                    bestSide = { scrollCache: scrollCache, name: 'top', distance: topDist };
                }
                if (bottomDist <= edgeThreshold && this.everMovedDown && scrollCache.canScrollDown() &&
                    (!bestSide || bestSide.distance > bottomDist)) {
                    bestSide = { scrollCache: scrollCache, name: 'bottom', distance: bottomDist };
                }
                if (leftDist <= edgeThreshold && this.everMovedLeft && scrollCache.canScrollLeft() &&
                    (!bestSide || bestSide.distance > leftDist)) {
                    bestSide = { scrollCache: scrollCache, name: 'left', distance: leftDist };
                }
                if (rightDist <= edgeThreshold && this.everMovedRight && scrollCache.canScrollRight() &&
                    (!bestSide || bestSide.distance > rightDist)) {
                    bestSide = { scrollCache: scrollCache, name: 'right', distance: rightDist };
                }
            }
        }
        return bestSide;
    };
    AutoScroller.prototype.buildCaches = function () {
        return this.queryScrollEls().map(function (el) {
            if (el === window) {
                return new WindowScrollGeomCache(false); // false = don't listen to user-generated scrolls
            }
            else {
                return new ElementScrollGeomCache(el, false); // false = don't listen to user-generated scrolls
            }
        });
    };
    AutoScroller.prototype.queryScrollEls = function () {
        var els = [];
        for (var _i = 0, _a = this.scrollQuery; _i < _a.length; _i++) {
            var query = _a[_i];
            if (typeof query === 'object') {
                els.push(query);
            }
            else {
                els.push.apply(els, Array.prototype.slice.call(document.querySelectorAll(query)));
            }
        }
        return els;
    };
    return AutoScroller;
}());

/*
Monitors dragging on an element. Has a number of high-level features:
- minimum distance required before dragging
- minimum wait time ("delay") before dragging
- a mirror element that follows the pointer
*/
var FeaturefulElementDragging = /** @class */ (function (_super) {
    __extends(FeaturefulElementDragging, _super);
    function FeaturefulElementDragging(containerEl) {
        var _this = _super.call(this, containerEl) || this;
        // options that can be directly set by caller
        // the caller can also set the PointerDragging's options as well
        _this.delay = null;
        _this.minDistance = 0;
        _this.touchScrollAllowed = true; // prevents drag from starting and blocks scrolling during drag
        _this.mirrorNeedsRevert = false;
        _this.isInteracting = false; // is the user validly moving the pointer? lasts until pointerup
        _this.isDragging = false; // is it INTENTFULLY dragging? lasts until after revert animation
        _this.isDelayEnded = false;
        _this.isDistanceSurpassed = false;
        _this.delayTimeoutId = null;
        _this.onPointerDown = function (ev) {
            if (!_this.isDragging) { // so new drag doesn't happen while revert animation is going
                _this.isInteracting = true;
                _this.isDelayEnded = false;
                _this.isDistanceSurpassed = false;
                Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["preventSelection"])(document.body);
                Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["preventContextMenu"])(document.body);
                // prevent links from being visited if there's an eventual drag.
                // also prevents selection in older browsers (maybe?).
                // not necessary for touch, besides, browser would complain about passiveness.
                if (!ev.isTouch) {
                    ev.origEvent.preventDefault();
                }
                _this.emitter.trigger('pointerdown', ev);
                if (!_this.pointer.shouldIgnoreMove) {
                    // actions related to initiating dragstart+dragmove+dragend...
                    _this.mirror.setIsVisible(false); // reset. caller must set-visible
                    _this.mirror.start(ev.subjectEl, ev.pageX, ev.pageY); // must happen on first pointer down
                    _this.startDelay(ev);
                    if (!_this.minDistance) {
                        _this.handleDistanceSurpassed(ev);
                    }
                }
            }
        };
        _this.onPointerMove = function (ev) {
            if (_this.isInteracting) { // if false, still waiting for previous drag's revert
                _this.emitter.trigger('pointermove', ev);
                if (!_this.isDistanceSurpassed) {
                    var minDistance = _this.minDistance;
                    var distanceSq = void 0; // current distance from the origin, squared
                    var deltaX = ev.deltaX, deltaY = ev.deltaY;
                    distanceSq = deltaX * deltaX + deltaY * deltaY;
                    if (distanceSq >= minDistance * minDistance) { // use pythagorean theorem
                        _this.handleDistanceSurpassed(ev);
                    }
                }
                if (_this.isDragging) {
                    // a real pointer move? (not one simulated by scrolling)
                    if (ev.origEvent.type !== 'scroll') {
                        _this.mirror.handleMove(ev.pageX, ev.pageY);
                        _this.autoScroller.handleMove(ev.pageX, ev.pageY);
                    }
                    _this.emitter.trigger('dragmove', ev);
                }
            }
        };
        _this.onPointerUp = function (ev) {
            if (_this.isInteracting) { // if false, still waiting for previous drag's revert
                _this.isInteracting = false;
                Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["allowSelection"])(document.body);
                Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["allowContextMenu"])(document.body);
                _this.emitter.trigger('pointerup', ev); // can potentially set mirrorNeedsRevert
                if (_this.isDragging) {
                    _this.autoScroller.stop();
                    _this.tryStopDrag(ev); // which will stop the mirror
                }
                if (_this.delayTimeoutId) {
                    clearTimeout(_this.delayTimeoutId);
                    _this.delayTimeoutId = null;
                }
            }
        };
        var pointer = _this.pointer = new PointerDragging(containerEl);
        pointer.emitter.on('pointerdown', _this.onPointerDown);
        pointer.emitter.on('pointermove', _this.onPointerMove);
        pointer.emitter.on('pointerup', _this.onPointerUp);
        _this.mirror = new ElementMirror();
        _this.autoScroller = new AutoScroller();
        return _this;
    }
    FeaturefulElementDragging.prototype.destroy = function () {
        this.pointer.destroy();
    };
    FeaturefulElementDragging.prototype.startDelay = function (ev) {
        var _this = this;
        if (typeof this.delay === 'number') {
            this.delayTimeoutId = setTimeout(function () {
                _this.delayTimeoutId = null;
                _this.handleDelayEnd(ev);
            }, this.delay); // not assignable to number!
        }
        else {
            this.handleDelayEnd(ev);
        }
    };
    FeaturefulElementDragging.prototype.handleDelayEnd = function (ev) {
        this.isDelayEnded = true;
        this.tryStartDrag(ev);
    };
    FeaturefulElementDragging.prototype.handleDistanceSurpassed = function (ev) {
        this.isDistanceSurpassed = true;
        this.tryStartDrag(ev);
    };
    FeaturefulElementDragging.prototype.tryStartDrag = function (ev) {
        if (this.isDelayEnded && this.isDistanceSurpassed) {
            if (!this.pointer.wasTouchScroll || this.touchScrollAllowed) {
                this.isDragging = true;
                this.mirrorNeedsRevert = false;
                this.autoScroller.start(ev.pageX, ev.pageY);
                this.emitter.trigger('dragstart', ev);
                if (this.touchScrollAllowed === false) {
                    this.pointer.cancelTouchScroll();
                }
            }
        }
    };
    FeaturefulElementDragging.prototype.tryStopDrag = function (ev) {
        // .stop() is ALWAYS asynchronous, which we NEED because we want all pointerup events
        // that come from the document to fire beforehand. much more convenient this way.
        this.mirror.stop(this.mirrorNeedsRevert, this.stopDrag.bind(this, ev) // bound with args
        );
    };
    FeaturefulElementDragging.prototype.stopDrag = function (ev) {
        this.isDragging = false;
        this.emitter.trigger('dragend', ev);
    };
    // fill in the implementations...
    FeaturefulElementDragging.prototype.setIgnoreMove = function (bool) {
        this.pointer.shouldIgnoreMove = bool;
    };
    FeaturefulElementDragging.prototype.setMirrorIsVisible = function (bool) {
        this.mirror.setIsVisible(bool);
    };
    FeaturefulElementDragging.prototype.setMirrorNeedsRevert = function (bool) {
        this.mirrorNeedsRevert = bool;
    };
    FeaturefulElementDragging.prototype.setAutoScrollEnabled = function (bool) {
        this.autoScroller.isEnabled = bool;
    };
    return FeaturefulElementDragging;
}(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["ElementDragging"]));

/*
When this class is instantiated, it records the offset of an element (relative to the document topleft),
and continues to monitor scrolling, updating the cached coordinates if it needs to.
Does not access the DOM after instantiation, so highly performant.

Also keeps track of all scrolling/overflow:hidden containers that are parents of the given element
and an determine if a given point is inside the combined clipping rectangle.
*/
var OffsetTracker = /** @class */ (function () {
    function OffsetTracker(el) {
        this.origRect = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["computeRect"])(el);
        // will work fine for divs that have overflow:hidden
        this.scrollCaches = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["getClippingParents"])(el).map(function (el) {
            return new ElementScrollGeomCache(el, true); // listen=true
        });
    }
    OffsetTracker.prototype.destroy = function () {
        for (var _i = 0, _a = this.scrollCaches; _i < _a.length; _i++) {
            var scrollCache = _a[_i];
            scrollCache.destroy();
        }
    };
    OffsetTracker.prototype.computeLeft = function () {
        var left = this.origRect.left;
        for (var _i = 0, _a = this.scrollCaches; _i < _a.length; _i++) {
            var scrollCache = _a[_i];
            left += scrollCache.origScrollLeft - scrollCache.getScrollLeft();
        }
        return left;
    };
    OffsetTracker.prototype.computeTop = function () {
        var top = this.origRect.top;
        for (var _i = 0, _a = this.scrollCaches; _i < _a.length; _i++) {
            var scrollCache = _a[_i];
            top += scrollCache.origScrollTop - scrollCache.getScrollTop();
        }
        return top;
    };
    OffsetTracker.prototype.isWithinClipping = function (pageX, pageY) {
        var point = { left: pageX, top: pageY };
        for (var _i = 0, _a = this.scrollCaches; _i < _a.length; _i++) {
            var scrollCache = _a[_i];
            if (!isIgnoredClipping(scrollCache.getEventTarget()) &&
                !Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["pointInsideRect"])(point, scrollCache.clientRect)) {
                return false;
            }
        }
        return true;
    };
    return OffsetTracker;
}());
// certain clipping containers should never constrain interactions, like <html> and <body>
// https://github.com/fullcalendar/fullcalendar/issues/3615
function isIgnoredClipping(node) {
    var tagName = node.tagName;
    return tagName === 'HTML' || tagName === 'BODY';
}

/*
Tracks movement over multiple droppable areas (aka "hits")
that exist in one or more DateComponents.
Relies on an existing draggable.

emits:
- pointerdown
- dragstart
- hitchange - fires initially, even if not over a hit
- pointerup
- (hitchange - again, to null, if ended over a hit)
- dragend
*/
var HitDragging = /** @class */ (function () {
    function HitDragging(dragging, droppableStore) {
        var _this = this;
        // options that can be set by caller
        this.useSubjectCenter = false;
        this.requireInitial = true; // if doesn't start out on a hit, won't emit any events
        this.initialHit = null;
        this.movingHit = null;
        this.finalHit = null; // won't ever be populated if shouldIgnoreMove
        this.handlePointerDown = function (ev) {
            var dragging = _this.dragging;
            _this.initialHit = null;
            _this.movingHit = null;
            _this.finalHit = null;
            _this.prepareHits();
            _this.processFirstCoord(ev);
            if (_this.initialHit || !_this.requireInitial) {
                dragging.setIgnoreMove(false);
                _this.emitter.trigger('pointerdown', ev); // TODO: fire this before computing processFirstCoord, so listeners can cancel. this gets fired by almost every handler :(
            }
            else {
                dragging.setIgnoreMove(true);
            }
        };
        this.handleDragStart = function (ev) {
            _this.emitter.trigger('dragstart', ev);
            _this.handleMove(ev, true); // force = fire even if initially null
        };
        this.handleDragMove = function (ev) {
            _this.emitter.trigger('dragmove', ev);
            _this.handleMove(ev);
        };
        this.handlePointerUp = function (ev) {
            _this.releaseHits();
            _this.emitter.trigger('pointerup', ev);
        };
        this.handleDragEnd = function (ev) {
            if (_this.movingHit) {
                _this.emitter.trigger('hitupdate', null, true, ev);
            }
            _this.finalHit = _this.movingHit;
            _this.movingHit = null;
            _this.emitter.trigger('dragend', ev);
        };
        this.droppableStore = droppableStore;
        dragging.emitter.on('pointerdown', this.handlePointerDown);
        dragging.emitter.on('dragstart', this.handleDragStart);
        dragging.emitter.on('dragmove', this.handleDragMove);
        dragging.emitter.on('pointerup', this.handlePointerUp);
        dragging.emitter.on('dragend', this.handleDragEnd);
        this.dragging = dragging;
        this.emitter = new _fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["EmitterMixin"]();
    }
    // sets initialHit
    // sets coordAdjust
    HitDragging.prototype.processFirstCoord = function (ev) {
        var origPoint = { left: ev.pageX, top: ev.pageY };
        var adjustedPoint = origPoint;
        var subjectEl = ev.subjectEl;
        var subjectRect;
        if (subjectEl !== document) {
            subjectRect = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["computeRect"])(subjectEl);
            adjustedPoint = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["constrainPoint"])(adjustedPoint, subjectRect);
        }
        var initialHit = this.initialHit = this.queryHitForOffset(adjustedPoint.left, adjustedPoint.top);
        if (initialHit) {
            if (this.useSubjectCenter && subjectRect) {
                var slicedSubjectRect = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["intersectRects"])(subjectRect, initialHit.rect);
                if (slicedSubjectRect) {
                    adjustedPoint = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["getRectCenter"])(slicedSubjectRect);
                }
            }
            this.coordAdjust = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["diffPoints"])(adjustedPoint, origPoint);
        }
        else {
            this.coordAdjust = { left: 0, top: 0 };
        }
    };
    HitDragging.prototype.handleMove = function (ev, forceHandle) {
        var hit = this.queryHitForOffset(ev.pageX + this.coordAdjust.left, ev.pageY + this.coordAdjust.top);
        if (forceHandle || !isHitsEqual(this.movingHit, hit)) {
            this.movingHit = hit;
            this.emitter.trigger('hitupdate', hit, false, ev);
        }
    };
    HitDragging.prototype.prepareHits = function () {
        this.offsetTrackers = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["mapHash"])(this.droppableStore, function (interactionSettings) {
            interactionSettings.component.buildPositionCaches();
            return new OffsetTracker(interactionSettings.el);
        });
    };
    HitDragging.prototype.releaseHits = function () {
        var offsetTrackers = this.offsetTrackers;
        for (var id in offsetTrackers) {
            offsetTrackers[id].destroy();
        }
        this.offsetTrackers = {};
    };
    HitDragging.prototype.queryHitForOffset = function (offsetLeft, offsetTop) {
        var _a = this, droppableStore = _a.droppableStore, offsetTrackers = _a.offsetTrackers;
        var bestHit = null;
        for (var id in droppableStore) {
            var component = droppableStore[id].component;
            var offsetTracker = offsetTrackers[id];
            if (offsetTracker.isWithinClipping(offsetLeft, offsetTop)) {
                var originLeft = offsetTracker.computeLeft();
                var originTop = offsetTracker.computeTop();
                var positionLeft = offsetLeft - originLeft;
                var positionTop = offsetTop - originTop;
                var origRect = offsetTracker.origRect;
                var width = origRect.right - origRect.left;
                var height = origRect.bottom - origRect.top;
                if (
                // must be within the element's bounds
                positionLeft >= 0 && positionLeft < width &&
                    positionTop >= 0 && positionTop < height) {
                    var hit = component.queryHit(positionLeft, positionTop, width, height);
                    if (hit &&
                        (
                        // make sure the hit is within activeRange, meaning it's not a deal cell
                        !component.props.dateProfile || // hack for DayTile
                            Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["rangeContainsRange"])(component.props.dateProfile.activeRange, hit.dateSpan.range)) &&
                        (!bestHit || hit.layer > bestHit.layer)) {
                        // TODO: better way to re-orient rectangle
                        hit.rect.left += originLeft;
                        hit.rect.right += originLeft;
                        hit.rect.top += originTop;
                        hit.rect.bottom += originTop;
                        bestHit = hit;
                    }
                }
            }
        }
        return bestHit;
    };
    return HitDragging;
}());
function isHitsEqual(hit0, hit1) {
    if (!hit0 && !hit1) {
        return true;
    }
    if (Boolean(hit0) !== Boolean(hit1)) {
        return false;
    }
    return Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["isDateSpansEqual"])(hit0.dateSpan, hit1.dateSpan);
}

/*
Monitors when the user clicks on a specific date/time of a component.
A pointerdown+pointerup on the same "hit" constitutes a click.
*/
var DateClicking = /** @class */ (function (_super) {
    __extends(DateClicking, _super);
    function DateClicking(settings) {
        var _this = _super.call(this, settings) || this;
        _this.handlePointerDown = function (ev) {
            var dragging = _this.dragging;
            // do this in pointerdown (not dragend) because DOM might be mutated by the time dragend is fired
            dragging.setIgnoreMove(!_this.component.isValidDateDownEl(dragging.pointer.downEl));
        };
        // won't even fire if moving was ignored
        _this.handleDragEnd = function (ev) {
            var component = _this.component;
            var _a = component.context, calendar = _a.calendar, view = _a.view;
            var pointer = _this.dragging.pointer;
            if (!pointer.wasTouchScroll) {
                var _b = _this.hitDragging, initialHit = _b.initialHit, finalHit = _b.finalHit;
                if (initialHit && finalHit && isHitsEqual(initialHit, finalHit)) {
                    calendar.triggerDateClick(initialHit.dateSpan, initialHit.dayEl, view, ev.origEvent);
                }
            }
        };
        var component = settings.component;
        // we DO want to watch pointer moves because otherwise finalHit won't get populated
        _this.dragging = new FeaturefulElementDragging(component.el);
        _this.dragging.autoScroller.isEnabled = false;
        var hitDragging = _this.hitDragging = new HitDragging(_this.dragging, Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["interactionSettingsToStore"])(settings));
        hitDragging.emitter.on('pointerdown', _this.handlePointerDown);
        hitDragging.emitter.on('dragend', _this.handleDragEnd);
        return _this;
    }
    DateClicking.prototype.destroy = function () {
        this.dragging.destroy();
    };
    return DateClicking;
}(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["Interaction"]));

/*
Tracks when the user selects a portion of time of a component,
constituted by a drag over date cells, with a possible delay at the beginning of the drag.
*/
var DateSelecting = /** @class */ (function (_super) {
    __extends(DateSelecting, _super);
    function DateSelecting(settings) {
        var _this = _super.call(this, settings) || this;
        _this.dragSelection = null;
        _this.handlePointerDown = function (ev) {
            var _a = _this, component = _a.component, dragging = _a.dragging;
            var options = component.context.options;
            var canSelect = options.selectable &&
                component.isValidDateDownEl(ev.origEvent.target);
            // don't bother to watch expensive moves if component won't do selection
            dragging.setIgnoreMove(!canSelect);
            // if touch, require user to hold down
            dragging.delay = ev.isTouch ? getComponentTouchDelay(component) : null;
        };
        _this.handleDragStart = function (ev) {
            _this.component.context.calendar.unselect(ev); // unselect previous selections
        };
        _this.handleHitUpdate = function (hit, isFinal) {
            var calendar = _this.component.context.calendar;
            var dragSelection = null;
            var isInvalid = false;
            if (hit) {
                dragSelection = joinHitsIntoSelection(_this.hitDragging.initialHit, hit, calendar.pluginSystem.hooks.dateSelectionTransformers);
                if (!dragSelection || !_this.component.isDateSelectionValid(dragSelection)) {
                    isInvalid = true;
                    dragSelection = null;
                }
            }
            if (dragSelection) {
                calendar.dispatch({ type: 'SELECT_DATES', selection: dragSelection });
            }
            else if (!isFinal) { // only unselect if moved away while dragging
                calendar.dispatch({ type: 'UNSELECT_DATES' });
            }
            if (!isInvalid) {
                Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["enableCursor"])();
            }
            else {
                Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["disableCursor"])();
            }
            if (!isFinal) {
                _this.dragSelection = dragSelection; // only clear if moved away from all hits while dragging
            }
        };
        _this.handlePointerUp = function (pev) {
            if (_this.dragSelection) {
                // selection is already rendered, so just need to report selection
                _this.component.context.calendar.triggerDateSelect(_this.dragSelection, pev);
                _this.dragSelection = null;
            }
        };
        var component = settings.component;
        var options = component.context.options;
        var dragging = _this.dragging = new FeaturefulElementDragging(component.el);
        dragging.touchScrollAllowed = false;
        dragging.minDistance = options.selectMinDistance || 0;
        dragging.autoScroller.isEnabled = options.dragScroll;
        var hitDragging = _this.hitDragging = new HitDragging(_this.dragging, Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["interactionSettingsToStore"])(settings));
        hitDragging.emitter.on('pointerdown', _this.handlePointerDown);
        hitDragging.emitter.on('dragstart', _this.handleDragStart);
        hitDragging.emitter.on('hitupdate', _this.handleHitUpdate);
        hitDragging.emitter.on('pointerup', _this.handlePointerUp);
        return _this;
    }
    DateSelecting.prototype.destroy = function () {
        this.dragging.destroy();
    };
    return DateSelecting;
}(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["Interaction"]));
function getComponentTouchDelay(component) {
    var options = component.context.options;
    var delay = options.selectLongPressDelay;
    if (delay == null) {
        delay = options.longPressDelay;
    }
    return delay;
}
function joinHitsIntoSelection(hit0, hit1, dateSelectionTransformers) {
    var dateSpan0 = hit0.dateSpan;
    var dateSpan1 = hit1.dateSpan;
    var ms = [
        dateSpan0.range.start,
        dateSpan0.range.end,
        dateSpan1.range.start,
        dateSpan1.range.end
    ];
    ms.sort(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["compareNumbers"]);
    var props = {};
    for (var _i = 0, dateSelectionTransformers_1 = dateSelectionTransformers; _i < dateSelectionTransformers_1.length; _i++) {
        var transformer = dateSelectionTransformers_1[_i];
        var res = transformer(hit0, hit1);
        if (res === false) {
            return null;
        }
        else if (res) {
            __assign(props, res);
        }
    }
    props.range = { start: ms[0], end: ms[3] };
    props.allDay = dateSpan0.allDay;
    return props;
}

var EventDragging = /** @class */ (function (_super) {
    __extends(EventDragging, _super);
    function EventDragging(settings) {
        var _this = _super.call(this, settings) || this;
        // internal state
        _this.subjectSeg = null; // the seg being selected/dragged
        _this.isDragging = false;
        _this.eventRange = null;
        _this.relevantEvents = null; // the events being dragged
        _this.receivingCalendar = null;
        _this.validMutation = null;
        _this.mutatedRelevantEvents = null;
        _this.handlePointerDown = function (ev) {
            var origTarget = ev.origEvent.target;
            var _a = _this, component = _a.component, dragging = _a.dragging;
            var mirror = dragging.mirror;
            var options = component.context.options;
            var initialCalendar = component.context.calendar;
            var subjectSeg = _this.subjectSeg = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["getElSeg"])(ev.subjectEl);
            var eventRange = _this.eventRange = subjectSeg.eventRange;
            var eventInstanceId = eventRange.instance.instanceId;
            _this.relevantEvents = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["getRelevantEvents"])(initialCalendar.state.eventStore, eventInstanceId);
            dragging.minDistance = ev.isTouch ? 0 : options.eventDragMinDistance;
            dragging.delay =
                // only do a touch delay if touch and this event hasn't been selected yet
                (ev.isTouch && eventInstanceId !== component.props.eventSelection) ?
                    getComponentTouchDelay$1(component) :
                    null;
            mirror.parentNode = initialCalendar.el;
            mirror.revertDuration = options.dragRevertDuration;
            var isValid = component.isValidSegDownEl(origTarget) &&
                !Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["elementClosest"])(origTarget, '.fc-resizer'); // NOT on a resizer
            dragging.setIgnoreMove(!isValid);
            // disable dragging for elements that are resizable (ie, selectable)
            // but are not draggable
            _this.isDragging = isValid &&
                ev.subjectEl.classList.contains('fc-draggable');
        };
        _this.handleDragStart = function (ev) {
            var context = _this.component.context;
            var initialCalendar = context.calendar;
            var eventRange = _this.eventRange;
            var eventInstanceId = eventRange.instance.instanceId;
            if (ev.isTouch) {
                // need to select a different event?
                if (eventInstanceId !== _this.component.props.eventSelection) {
                    initialCalendar.dispatch({ type: 'SELECT_EVENT', eventInstanceId: eventInstanceId });
                }
            }
            else {
                // if now using mouse, but was previous touch interaction, clear selected event
                initialCalendar.dispatch({ type: 'UNSELECT_EVENT' });
            }
            if (_this.isDragging) {
                initialCalendar.unselect(ev); // unselect *date* selection
                initialCalendar.publiclyTrigger('eventDragStart', [
                    {
                        el: _this.subjectSeg.el,
                        event: new _fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["EventApi"](initialCalendar, eventRange.def, eventRange.instance),
                        jsEvent: ev.origEvent,
                        view: context.view
                    }
                ]);
            }
        };
        _this.handleHitUpdate = function (hit, isFinal) {
            if (!_this.isDragging) {
                return;
            }
            var relevantEvents = _this.relevantEvents;
            var initialHit = _this.hitDragging.initialHit;
            var initialCalendar = _this.component.context.calendar;
            // states based on new hit
            var receivingCalendar = null;
            var mutation = null;
            var mutatedRelevantEvents = null;
            var isInvalid = false;
            var interaction = {
                affectedEvents: relevantEvents,
                mutatedEvents: Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["createEmptyEventStore"])(),
                isEvent: true,
                origSeg: _this.subjectSeg
            };
            if (hit) {
                var receivingComponent = hit.component;
                receivingCalendar = receivingComponent.context.calendar;
                var receivingOptions = receivingComponent.context.options;
                if (initialCalendar === receivingCalendar ||
                    receivingOptions.editable && receivingOptions.droppable) {
                    mutation = computeEventMutation(initialHit, hit, receivingCalendar.pluginSystem.hooks.eventDragMutationMassagers);
                    if (mutation) {
                        mutatedRelevantEvents = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["applyMutationToEventStore"])(relevantEvents, receivingCalendar.eventUiBases, mutation, receivingCalendar);
                        interaction.mutatedEvents = mutatedRelevantEvents;
                        if (!receivingComponent.isInteractionValid(interaction)) {
                            isInvalid = true;
                            mutation = null;
                            mutatedRelevantEvents = null;
                            interaction.mutatedEvents = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["createEmptyEventStore"])();
                        }
                    }
                }
                else {
                    receivingCalendar = null;
                }
            }
            _this.displayDrag(receivingCalendar, interaction);
            if (!isInvalid) {
                Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["enableCursor"])();
            }
            else {
                Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["disableCursor"])();
            }
            if (!isFinal) {
                if (initialCalendar === receivingCalendar && // TODO: write test for this
                    isHitsEqual(initialHit, hit)) {
                    mutation = null;
                }
                _this.dragging.setMirrorNeedsRevert(!mutation);
                // render the mirror if no already-rendered mirror
                // TODO: wish we could somehow wait for dispatch to guarantee render
                _this.dragging.setMirrorIsVisible(!hit || !document.querySelector('.fc-mirror'));
                // assign states based on new hit
                _this.receivingCalendar = receivingCalendar;
                _this.validMutation = mutation;
                _this.mutatedRelevantEvents = mutatedRelevantEvents;
            }
        };
        _this.handlePointerUp = function () {
            if (!_this.isDragging) {
                _this.cleanup(); // because handleDragEnd won't fire
            }
        };
        _this.handleDragEnd = function (ev) {
            if (_this.isDragging) {
                var context = _this.component.context;
                var initialCalendar_1 = context.calendar;
                var initialView = context.view;
                var _a = _this, receivingCalendar = _a.receivingCalendar, validMutation = _a.validMutation;
                var eventDef = _this.eventRange.def;
                var eventInstance = _this.eventRange.instance;
                var eventApi = new _fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["EventApi"](initialCalendar_1, eventDef, eventInstance);
                var relevantEvents_1 = _this.relevantEvents;
                var mutatedRelevantEvents = _this.mutatedRelevantEvents;
                var finalHit = _this.hitDragging.finalHit;
                _this.clearDrag(); // must happen after revert animation
                initialCalendar_1.publiclyTrigger('eventDragStop', [
                    {
                        el: _this.subjectSeg.el,
                        event: eventApi,
                        jsEvent: ev.origEvent,
                        view: initialView
                    }
                ]);
                if (validMutation) {
                    // dropped within same calendar
                    if (receivingCalendar === initialCalendar_1) {
                        initialCalendar_1.dispatch({
                            type: 'MERGE_EVENTS',
                            eventStore: mutatedRelevantEvents
                        });
                        var transformed = {};
                        for (var _i = 0, _b = initialCalendar_1.pluginSystem.hooks.eventDropTransformers; _i < _b.length; _i++) {
                            var transformer = _b[_i];
                            __assign(transformed, transformer(validMutation, initialCalendar_1));
                        }
                        var eventDropArg = __assign({}, transformed, { el: ev.subjectEl, delta: validMutation.datesDelta, oldEvent: eventApi, event: new _fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["EventApi"](// the data AFTER the mutation
                            initialCalendar_1, mutatedRelevantEvents.defs[eventDef.defId], eventInstance ? mutatedRelevantEvents.instances[eventInstance.instanceId] : null), revert: function () {
                                initialCalendar_1.dispatch({
                                    type: 'MERGE_EVENTS',
                                    eventStore: relevantEvents_1
                                });
                            }, jsEvent: ev.origEvent, view: initialView });
                        initialCalendar_1.publiclyTrigger('eventDrop', [eventDropArg]);
                        // dropped in different calendar
                    }
                    else if (receivingCalendar) {
                        initialCalendar_1.publiclyTrigger('eventLeave', [
                            {
                                draggedEl: ev.subjectEl,
                                event: eventApi,
                                view: initialView
                            }
                        ]);
                        initialCalendar_1.dispatch({
                            type: 'REMOVE_EVENT_INSTANCES',
                            instances: _this.mutatedRelevantEvents.instances
                        });
                        receivingCalendar.dispatch({
                            type: 'MERGE_EVENTS',
                            eventStore: _this.mutatedRelevantEvents
                        });
                        if (ev.isTouch) {
                            receivingCalendar.dispatch({
                                type: 'SELECT_EVENT',
                                eventInstanceId: eventInstance.instanceId
                            });
                        }
                        var dropArg = __assign({}, receivingCalendar.buildDatePointApi(finalHit.dateSpan), { draggedEl: ev.subjectEl, jsEvent: ev.origEvent, view: finalHit.component // should this be finalHit.component.view? See #4644
                         });
                        receivingCalendar.publiclyTrigger('drop', [dropArg]);
                        receivingCalendar.publiclyTrigger('eventReceive', [
                            {
                                draggedEl: ev.subjectEl,
                                event: new _fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["EventApi"](// the data AFTER the mutation
                                receivingCalendar, mutatedRelevantEvents.defs[eventDef.defId], mutatedRelevantEvents.instances[eventInstance.instanceId]),
                                view: finalHit.component // should this be finalHit.component.view? See #4644
                            }
                        ]);
                    }
                }
                else {
                    initialCalendar_1.publiclyTrigger('_noEventDrop');
                }
            }
            _this.cleanup();
        };
        var component = _this.component;
        var options = component.context.options;
        var dragging = _this.dragging = new FeaturefulElementDragging(component.el);
        dragging.pointer.selector = EventDragging.SELECTOR;
        dragging.touchScrollAllowed = false;
        dragging.autoScroller.isEnabled = options.dragScroll;
        var hitDragging = _this.hitDragging = new HitDragging(_this.dragging, _fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["interactionSettingsStore"]);
        hitDragging.useSubjectCenter = settings.useEventCenter;
        hitDragging.emitter.on('pointerdown', _this.handlePointerDown);
        hitDragging.emitter.on('dragstart', _this.handleDragStart);
        hitDragging.emitter.on('hitupdate', _this.handleHitUpdate);
        hitDragging.emitter.on('pointerup', _this.handlePointerUp);
        hitDragging.emitter.on('dragend', _this.handleDragEnd);
        return _this;
    }
    EventDragging.prototype.destroy = function () {
        this.dragging.destroy();
    };
    // render a drag state on the next receivingCalendar
    EventDragging.prototype.displayDrag = function (nextCalendar, state) {
        var initialCalendar = this.component.context.calendar;
        var prevCalendar = this.receivingCalendar;
        // does the previous calendar need to be cleared?
        if (prevCalendar && prevCalendar !== nextCalendar) {
            // does the initial calendar need to be cleared?
            // if so, don't clear all the way. we still need to to hide the affectedEvents
            if (prevCalendar === initialCalendar) {
                prevCalendar.dispatch({
                    type: 'SET_EVENT_DRAG',
                    state: {
                        affectedEvents: state.affectedEvents,
                        mutatedEvents: Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["createEmptyEventStore"])(),
                        isEvent: true,
                        origSeg: state.origSeg
                    }
                });
                // completely clear the old calendar if it wasn't the initial
            }
            else {
                prevCalendar.dispatch({ type: 'UNSET_EVENT_DRAG' });
            }
        }
        if (nextCalendar) {
            nextCalendar.dispatch({ type: 'SET_EVENT_DRAG', state: state });
        }
    };
    EventDragging.prototype.clearDrag = function () {
        var initialCalendar = this.component.context.calendar;
        var receivingCalendar = this.receivingCalendar;
        if (receivingCalendar) {
            receivingCalendar.dispatch({ type: 'UNSET_EVENT_DRAG' });
        }
        // the initial calendar might have an dummy drag state from displayDrag
        if (initialCalendar !== receivingCalendar) {
            initialCalendar.dispatch({ type: 'UNSET_EVENT_DRAG' });
        }
    };
    EventDragging.prototype.cleanup = function () {
        this.subjectSeg = null;
        this.isDragging = false;
        this.eventRange = null;
        this.relevantEvents = null;
        this.receivingCalendar = null;
        this.validMutation = null;
        this.mutatedRelevantEvents = null;
    };
    EventDragging.SELECTOR = '.fc-draggable, .fc-resizable'; // TODO: test this in IE11
    return EventDragging;
}(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["Interaction"]));
function computeEventMutation(hit0, hit1, massagers) {
    var dateSpan0 = hit0.dateSpan;
    var dateSpan1 = hit1.dateSpan;
    var date0 = dateSpan0.range.start;
    var date1 = dateSpan1.range.start;
    var standardProps = {};
    if (dateSpan0.allDay !== dateSpan1.allDay) {
        standardProps.allDay = dateSpan1.allDay;
        standardProps.hasEnd = hit1.component.context.options.allDayMaintainDuration;
        if (dateSpan1.allDay) {
            // means date1 is already start-of-day,
            // but date0 needs to be converted
            date0 = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["startOfDay"])(date0);
        }
    }
    var delta = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["diffDates"])(date0, date1, hit0.component.context.dateEnv, hit0.component === hit1.component ?
        hit0.component.largeUnit :
        null);
    if (delta.milliseconds) { // has hours/minutes/seconds
        standardProps.allDay = false;
    }
    var mutation = {
        datesDelta: delta,
        standardProps: standardProps
    };
    for (var _i = 0, massagers_1 = massagers; _i < massagers_1.length; _i++) {
        var massager = massagers_1[_i];
        massager(mutation, hit0, hit1);
    }
    return mutation;
}
function getComponentTouchDelay$1(component) {
    var options = component.context.options;
    var delay = options.eventLongPressDelay;
    if (delay == null) {
        delay = options.longPressDelay;
    }
    return delay;
}

var EventDragging$1 = /** @class */ (function (_super) {
    __extends(EventDragging, _super);
    function EventDragging(settings) {
        var _this = _super.call(this, settings) || this;
        // internal state
        _this.draggingSeg = null; // TODO: rename to resizingSeg? subjectSeg?
        _this.eventRange = null;
        _this.relevantEvents = null;
        _this.validMutation = null;
        _this.mutatedRelevantEvents = null;
        _this.handlePointerDown = function (ev) {
            var component = _this.component;
            var seg = _this.querySeg(ev);
            var eventRange = _this.eventRange = seg.eventRange;
            _this.dragging.minDistance = component.context.options.eventDragMinDistance;
            // if touch, need to be working with a selected event
            _this.dragging.setIgnoreMove(!_this.component.isValidSegDownEl(ev.origEvent.target) ||
                (ev.isTouch && _this.component.props.eventSelection !== eventRange.instance.instanceId));
        };
        _this.handleDragStart = function (ev) {
            var _a = _this.component.context, calendar = _a.calendar, view = _a.view;
            var eventRange = _this.eventRange;
            _this.relevantEvents = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["getRelevantEvents"])(calendar.state.eventStore, _this.eventRange.instance.instanceId);
            _this.draggingSeg = _this.querySeg(ev);
            calendar.unselect();
            calendar.publiclyTrigger('eventResizeStart', [
                {
                    el: _this.draggingSeg.el,
                    event: new _fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["EventApi"](calendar, eventRange.def, eventRange.instance),
                    jsEvent: ev.origEvent,
                    view: view
                }
            ]);
        };
        _this.handleHitUpdate = function (hit, isFinal, ev) {
            var calendar = _this.component.context.calendar;
            var relevantEvents = _this.relevantEvents;
            var initialHit = _this.hitDragging.initialHit;
            var eventInstance = _this.eventRange.instance;
            var mutation = null;
            var mutatedRelevantEvents = null;
            var isInvalid = false;
            var interaction = {
                affectedEvents: relevantEvents,
                mutatedEvents: Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["createEmptyEventStore"])(),
                isEvent: true,
                origSeg: _this.draggingSeg
            };
            if (hit) {
                mutation = computeMutation(initialHit, hit, ev.subjectEl.classList.contains('fc-start-resizer'), eventInstance.range, calendar.pluginSystem.hooks.eventResizeJoinTransforms);
            }
            if (mutation) {
                mutatedRelevantEvents = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["applyMutationToEventStore"])(relevantEvents, calendar.eventUiBases, mutation, calendar);
                interaction.mutatedEvents = mutatedRelevantEvents;
                if (!_this.component.isInteractionValid(interaction)) {
                    isInvalid = true;
                    mutation = null;
                    mutatedRelevantEvents = null;
                    interaction.mutatedEvents = null;
                }
            }
            if (mutatedRelevantEvents) {
                calendar.dispatch({
                    type: 'SET_EVENT_RESIZE',
                    state: interaction
                });
            }
            else {
                calendar.dispatch({ type: 'UNSET_EVENT_RESIZE' });
            }
            if (!isInvalid) {
                Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["enableCursor"])();
            }
            else {
                Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["disableCursor"])();
            }
            if (!isFinal) {
                if (mutation && isHitsEqual(initialHit, hit)) {
                    mutation = null;
                }
                _this.validMutation = mutation;
                _this.mutatedRelevantEvents = mutatedRelevantEvents;
            }
        };
        _this.handleDragEnd = function (ev) {
            var _a = _this.component.context, calendar = _a.calendar, view = _a.view;
            var eventDef = _this.eventRange.def;
            var eventInstance = _this.eventRange.instance;
            var eventApi = new _fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["EventApi"](calendar, eventDef, eventInstance);
            var relevantEvents = _this.relevantEvents;
            var mutatedRelevantEvents = _this.mutatedRelevantEvents;
            calendar.publiclyTrigger('eventResizeStop', [
                {
                    el: _this.draggingSeg.el,
                    event: eventApi,
                    jsEvent: ev.origEvent,
                    view: view
                }
            ]);
            if (_this.validMutation) {
                calendar.dispatch({
                    type: 'MERGE_EVENTS',
                    eventStore: mutatedRelevantEvents
                });
                calendar.publiclyTrigger('eventResize', [
                    {
                        el: _this.draggingSeg.el,
                        startDelta: _this.validMutation.startDelta || Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["createDuration"])(0),
                        endDelta: _this.validMutation.endDelta || Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["createDuration"])(0),
                        prevEvent: eventApi,
                        event: new _fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["EventApi"](// the data AFTER the mutation
                        calendar, mutatedRelevantEvents.defs[eventDef.defId], eventInstance ? mutatedRelevantEvents.instances[eventInstance.instanceId] : null),
                        revert: function () {
                            calendar.dispatch({
                                type: 'MERGE_EVENTS',
                                eventStore: relevantEvents
                            });
                        },
                        jsEvent: ev.origEvent,
                        view: view
                    }
                ]);
            }
            else {
                calendar.publiclyTrigger('_noEventResize');
            }
            // reset all internal state
            _this.draggingSeg = null;
            _this.relevantEvents = null;
            _this.validMutation = null;
            // okay to keep eventInstance around. useful to set it in handlePointerDown
        };
        var component = settings.component;
        var dragging = _this.dragging = new FeaturefulElementDragging(component.el);
        dragging.pointer.selector = '.fc-resizer';
        dragging.touchScrollAllowed = false;
        dragging.autoScroller.isEnabled = component.context.options.dragScroll;
        var hitDragging = _this.hitDragging = new HitDragging(_this.dragging, Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["interactionSettingsToStore"])(settings));
        hitDragging.emitter.on('pointerdown', _this.handlePointerDown);
        hitDragging.emitter.on('dragstart', _this.handleDragStart);
        hitDragging.emitter.on('hitupdate', _this.handleHitUpdate);
        hitDragging.emitter.on('dragend', _this.handleDragEnd);
        return _this;
    }
    EventDragging.prototype.destroy = function () {
        this.dragging.destroy();
    };
    EventDragging.prototype.querySeg = function (ev) {
        return Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["getElSeg"])(Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["elementClosest"])(ev.subjectEl, this.component.fgSegSelector));
    };
    return EventDragging;
}(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["Interaction"]));
function computeMutation(hit0, hit1, isFromStart, instanceRange, transforms) {
    var dateEnv = hit0.component.context.dateEnv;
    var date0 = hit0.dateSpan.range.start;
    var date1 = hit1.dateSpan.range.start;
    var delta = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["diffDates"])(date0, date1, dateEnv, hit0.component.largeUnit);
    var props = {};
    for (var _i = 0, transforms_1 = transforms; _i < transforms_1.length; _i++) {
        var transform = transforms_1[_i];
        var res = transform(hit0, hit1);
        if (res === false) {
            return null;
        }
        else if (res) {
            __assign(props, res);
        }
    }
    if (isFromStart) {
        if (dateEnv.add(instanceRange.start, delta) < instanceRange.end) {
            props.startDelta = delta;
            return props;
        }
    }
    else {
        if (dateEnv.add(instanceRange.end, delta) > instanceRange.start) {
            props.endDelta = delta;
            return props;
        }
    }
    return null;
}

var UnselectAuto = /** @class */ (function () {
    function UnselectAuto(calendar) {
        var _this = this;
        this.isRecentPointerDateSelect = false; // wish we could use a selector to detect date selection, but uses hit system
        this.onSelect = function (selectInfo) {
            if (selectInfo.jsEvent) {
                _this.isRecentPointerDateSelect = true;
            }
        };
        this.onDocumentPointerUp = function (pev) {
            var _a = _this, calendar = _a.calendar, documentPointer = _a.documentPointer;
            var state = calendar.state;
            // touch-scrolling should never unfocus any type of selection
            if (!documentPointer.wasTouchScroll) {
                if (state.dateSelection && // an existing date selection?
                    !_this.isRecentPointerDateSelect // a new pointer-initiated date selection since last onDocumentPointerUp?
                ) {
                    var unselectAuto = calendar.viewOpt('unselectAuto');
                    var unselectCancel = calendar.viewOpt('unselectCancel');
                    if (unselectAuto && (!unselectAuto || !Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["elementClosest"])(documentPointer.downEl, unselectCancel))) {
                        calendar.unselect(pev);
                    }
                }
                if (state.eventSelection && // an existing event selected?
                    !Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["elementClosest"])(documentPointer.downEl, EventDragging.SELECTOR) // interaction DIDN'T start on an event
                ) {
                    calendar.dispatch({ type: 'UNSELECT_EVENT' });
                }
            }
            _this.isRecentPointerDateSelect = false;
        };
        this.calendar = calendar;
        var documentPointer = this.documentPointer = new PointerDragging(document);
        documentPointer.shouldIgnoreMove = true;
        documentPointer.shouldWatchScroll = false;
        documentPointer.emitter.on('pointerup', this.onDocumentPointerUp);
        /*
        TODO: better way to know about whether there was a selection with the pointer
        */
        calendar.on('select', this.onSelect);
    }
    UnselectAuto.prototype.destroy = function () {
        this.calendar.off('select', this.onSelect);
        this.documentPointer.destroy();
    };
    return UnselectAuto;
}());

/*
Given an already instantiated draggable object for one-or-more elements,
Interprets any dragging as an attempt to drag an events that lives outside
of a calendar onto a calendar.
*/
var ExternalElementDragging = /** @class */ (function () {
    function ExternalElementDragging(dragging, suppliedDragMeta) {
        var _this = this;
        this.receivingCalendar = null;
        this.droppableEvent = null; // will exist for all drags, even if create:false
        this.suppliedDragMeta = null;
        this.dragMeta = null;
        this.handleDragStart = function (ev) {
            _this.dragMeta = _this.buildDragMeta(ev.subjectEl);
        };
        this.handleHitUpdate = function (hit, isFinal, ev) {
            var dragging = _this.hitDragging.dragging;
            var receivingCalendar = null;
            var droppableEvent = null;
            var isInvalid = false;
            var interaction = {
                affectedEvents: Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["createEmptyEventStore"])(),
                mutatedEvents: Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["createEmptyEventStore"])(),
                isEvent: _this.dragMeta.create,
                origSeg: null
            };
            if (hit) {
                receivingCalendar = hit.component.context.calendar;
                if (_this.canDropElOnCalendar(ev.subjectEl, receivingCalendar)) {
                    droppableEvent = computeEventForDateSpan(hit.dateSpan, _this.dragMeta, receivingCalendar);
                    interaction.mutatedEvents = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["eventTupleToStore"])(droppableEvent);
                    isInvalid = !Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["isInteractionValid"])(interaction, receivingCalendar);
                    if (isInvalid) {
                        interaction.mutatedEvents = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["createEmptyEventStore"])();
                        droppableEvent = null;
                    }
                }
            }
            _this.displayDrag(receivingCalendar, interaction);
            // show mirror if no already-rendered mirror element OR if we are shutting down the mirror (?)
            // TODO: wish we could somehow wait for dispatch to guarantee render
            dragging.setMirrorIsVisible(isFinal || !droppableEvent || !document.querySelector('.fc-mirror'));
            if (!isInvalid) {
                Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["enableCursor"])();
            }
            else {
                Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["disableCursor"])();
            }
            if (!isFinal) {
                dragging.setMirrorNeedsRevert(!droppableEvent);
                _this.receivingCalendar = receivingCalendar;
                _this.droppableEvent = droppableEvent;
            }
        };
        this.handleDragEnd = function (pev) {
            var _a = _this, receivingCalendar = _a.receivingCalendar, droppableEvent = _a.droppableEvent;
            _this.clearDrag();
            if (receivingCalendar && droppableEvent) {
                var finalHit = _this.hitDragging.finalHit;
                var finalView = finalHit.component.context.view;
                var dragMeta = _this.dragMeta;
                var arg = __assign({}, receivingCalendar.buildDatePointApi(finalHit.dateSpan), { draggedEl: pev.subjectEl, jsEvent: pev.origEvent, view: finalView });
                receivingCalendar.publiclyTrigger('drop', [arg]);
                if (dragMeta.create) {
                    receivingCalendar.dispatch({
                        type: 'MERGE_EVENTS',
                        eventStore: Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["eventTupleToStore"])(droppableEvent)
                    });
                    if (pev.isTouch) {
                        receivingCalendar.dispatch({
                            type: 'SELECT_EVENT',
                            eventInstanceId: droppableEvent.instance.instanceId
                        });
                    }
                    // signal that an external event landed
                    receivingCalendar.publiclyTrigger('eventReceive', [
                        {
                            draggedEl: pev.subjectEl,
                            event: new _fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["EventApi"](receivingCalendar, droppableEvent.def, droppableEvent.instance),
                            view: finalView
                        }
                    ]);
                }
            }
            _this.receivingCalendar = null;
            _this.droppableEvent = null;
        };
        var hitDragging = this.hitDragging = new HitDragging(dragging, _fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["interactionSettingsStore"]);
        hitDragging.requireInitial = false; // will start outside of a component
        hitDragging.emitter.on('dragstart', this.handleDragStart);
        hitDragging.emitter.on('hitupdate', this.handleHitUpdate);
        hitDragging.emitter.on('dragend', this.handleDragEnd);
        this.suppliedDragMeta = suppliedDragMeta;
    }
    ExternalElementDragging.prototype.buildDragMeta = function (subjectEl) {
        if (typeof this.suppliedDragMeta === 'object') {
            return Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["parseDragMeta"])(this.suppliedDragMeta);
        }
        else if (typeof this.suppliedDragMeta === 'function') {
            return Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["parseDragMeta"])(this.suppliedDragMeta(subjectEl));
        }
        else {
            return getDragMetaFromEl(subjectEl);
        }
    };
    ExternalElementDragging.prototype.displayDrag = function (nextCalendar, state) {
        var prevCalendar = this.receivingCalendar;
        if (prevCalendar && prevCalendar !== nextCalendar) {
            prevCalendar.dispatch({ type: 'UNSET_EVENT_DRAG' });
        }
        if (nextCalendar) {
            nextCalendar.dispatch({ type: 'SET_EVENT_DRAG', state: state });
        }
    };
    ExternalElementDragging.prototype.clearDrag = function () {
        if (this.receivingCalendar) {
            this.receivingCalendar.dispatch({ type: 'UNSET_EVENT_DRAG' });
        }
    };
    ExternalElementDragging.prototype.canDropElOnCalendar = function (el, receivingCalendar) {
        var dropAccept = receivingCalendar.opt('dropAccept');
        if (typeof dropAccept === 'function') {
            return dropAccept(el);
        }
        else if (typeof dropAccept === 'string' && dropAccept) {
            return Boolean(Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["elementMatches"])(el, dropAccept));
        }
        return true;
    };
    return ExternalElementDragging;
}());
// Utils for computing event store from the DragMeta
// ----------------------------------------------------------------------------------------------------
function computeEventForDateSpan(dateSpan, dragMeta, calendar) {
    var defProps = __assign({}, dragMeta.leftoverProps);
    for (var _i = 0, _a = calendar.pluginSystem.hooks.externalDefTransforms; _i < _a.length; _i++) {
        var transform = _a[_i];
        __assign(defProps, transform(dateSpan, dragMeta));
    }
    var def = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["parseEventDef"])(defProps, dragMeta.sourceId, dateSpan.allDay, calendar.opt('forceEventDuration') || Boolean(dragMeta.duration), // hasEnd
    calendar);
    var start = dateSpan.range.start;
    // only rely on time info if drop zone is all-day,
    // otherwise, we already know the time
    if (dateSpan.allDay && dragMeta.startTime) {
        start = calendar.dateEnv.add(start, dragMeta.startTime);
    }
    var end = dragMeta.duration ?
        calendar.dateEnv.add(start, dragMeta.duration) :
        calendar.getDefaultEventEnd(dateSpan.allDay, start);
    var instance = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["createEventInstance"])(def.defId, { start: start, end: end });
    return { def: def, instance: instance };
}
// Utils for extracting data from element
// ----------------------------------------------------------------------------------------------------
function getDragMetaFromEl(el) {
    var str = getEmbeddedElData(el, 'event');
    var obj = str ?
        JSON.parse(str) :
        { create: false }; // if no embedded data, assume no event creation
    return Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["parseDragMeta"])(obj);
}
_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["config"].dataAttrPrefix = '';
function getEmbeddedElData(el, name) {
    var prefix = _fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["config"].dataAttrPrefix;
    var prefixedName = (prefix ? prefix + '-' : '') + name;
    return el.getAttribute('data-' + prefixedName) || '';
}

/*
Makes an element (that is *external* to any calendar) draggable.
Can pass in data that determines how an event will be created when dropped onto a calendar.
Leverages FullCalendar's internal drag-n-drop functionality WITHOUT a third-party drag system.
*/
var ExternalDraggable = /** @class */ (function () {
    function ExternalDraggable(el, settings) {
        var _this = this;
        if (settings === void 0) { settings = {}; }
        this.handlePointerDown = function (ev) {
            var dragging = _this.dragging;
            var _a = _this.settings, minDistance = _a.minDistance, longPressDelay = _a.longPressDelay;
            dragging.minDistance =
                minDistance != null ?
                    minDistance :
                    (ev.isTouch ? 0 : _fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["globalDefaults"].eventDragMinDistance);
            dragging.delay =
                ev.isTouch ? // TODO: eventually read eventLongPressDelay instead vvv
                    (longPressDelay != null ? longPressDelay : _fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["globalDefaults"].longPressDelay) :
                    0;
        };
        this.handleDragStart = function (ev) {
            if (ev.isTouch &&
                _this.dragging.delay &&
                ev.subjectEl.classList.contains('fc-event')) {
                _this.dragging.mirror.getMirrorEl().classList.add('fc-selected');
            }
        };
        this.settings = settings;
        var dragging = this.dragging = new FeaturefulElementDragging(el);
        dragging.touchScrollAllowed = false;
        if (settings.itemSelector != null) {
            dragging.pointer.selector = settings.itemSelector;
        }
        if (settings.appendTo != null) {
            dragging.mirror.parentNode = settings.appendTo; // TODO: write tests
        }
        dragging.emitter.on('pointerdown', this.handlePointerDown);
        dragging.emitter.on('dragstart', this.handleDragStart);
        new ExternalElementDragging(dragging, settings.eventData);
    }
    ExternalDraggable.prototype.destroy = function () {
        this.dragging.destroy();
    };
    return ExternalDraggable;
}());

/*
Detects when a *THIRD-PARTY* drag-n-drop system interacts with elements.
The third-party system is responsible for drawing the visuals effects of the drag.
This class simply monitors for pointer movements and fires events.
It also has the ability to hide the moving element (the "mirror") during the drag.
*/
var InferredElementDragging = /** @class */ (function (_super) {
    __extends(InferredElementDragging, _super);
    function InferredElementDragging(containerEl) {
        var _this = _super.call(this, containerEl) || this;
        _this.shouldIgnoreMove = false;
        _this.mirrorSelector = '';
        _this.currentMirrorEl = null;
        _this.handlePointerDown = function (ev) {
            _this.emitter.trigger('pointerdown', ev);
            if (!_this.shouldIgnoreMove) {
                // fire dragstart right away. does not support delay or min-distance
                _this.emitter.trigger('dragstart', ev);
            }
        };
        _this.handlePointerMove = function (ev) {
            if (!_this.shouldIgnoreMove) {
                _this.emitter.trigger('dragmove', ev);
            }
        };
        _this.handlePointerUp = function (ev) {
            _this.emitter.trigger('pointerup', ev);
            if (!_this.shouldIgnoreMove) {
                // fire dragend right away. does not support a revert animation
                _this.emitter.trigger('dragend', ev);
            }
        };
        var pointer = _this.pointer = new PointerDragging(containerEl);
        pointer.emitter.on('pointerdown', _this.handlePointerDown);
        pointer.emitter.on('pointermove', _this.handlePointerMove);
        pointer.emitter.on('pointerup', _this.handlePointerUp);
        return _this;
    }
    InferredElementDragging.prototype.destroy = function () {
        this.pointer.destroy();
    };
    InferredElementDragging.prototype.setIgnoreMove = function (bool) {
        this.shouldIgnoreMove = bool;
    };
    InferredElementDragging.prototype.setMirrorIsVisible = function (bool) {
        if (bool) {
            // restore a previously hidden element.
            // use the reference in case the selector class has already been removed.
            if (this.currentMirrorEl) {
                this.currentMirrorEl.style.visibility = '';
                this.currentMirrorEl = null;
            }
        }
        else {
            var mirrorEl = this.mirrorSelector ?
                document.querySelector(this.mirrorSelector) :
                null;
            if (mirrorEl) {
                this.currentMirrorEl = mirrorEl;
                mirrorEl.style.visibility = 'hidden';
            }
        }
    };
    return InferredElementDragging;
}(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["ElementDragging"]));

/*
Bridges third-party drag-n-drop systems with FullCalendar.
Must be instantiated and destroyed by caller.
*/
var ThirdPartyDraggable = /** @class */ (function () {
    function ThirdPartyDraggable(containerOrSettings, settings) {
        var containerEl = document;
        if (
        // wish we could just test instanceof EventTarget, but doesn't work in IE11
        containerOrSettings === document ||
            containerOrSettings instanceof Element) {
            containerEl = containerOrSettings;
            settings = settings || {};
        }
        else {
            settings = (containerOrSettings || {});
        }
        var dragging = this.dragging = new InferredElementDragging(containerEl);
        if (typeof settings.itemSelector === 'string') {
            dragging.pointer.selector = settings.itemSelector;
        }
        else if (containerEl === document) {
            dragging.pointer.selector = '[data-event]';
        }
        if (typeof settings.mirrorSelector === 'string') {
            dragging.mirrorSelector = settings.mirrorSelector;
        }
        new ExternalElementDragging(dragging, settings.eventData);
    }
    ThirdPartyDraggable.prototype.destroy = function () {
        this.dragging.destroy();
    };
    return ThirdPartyDraggable;
}());

var main = Object(_fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__["createPlugin"])({
    componentInteractions: [DateClicking, DateSelecting, EventDragging, EventDragging$1],
    calendarInteractions: [UnselectAuto],
    elementDraggingImpl: FeaturefulElementDragging
});

/* harmony default export */ __webpack_exports__["default"] = (main);



/***/ }),

/***/ "./node_modules/@fullcalendar/vue/main.esm.js":
/*!****************************************************!*\
  !*** ./node_modules/@fullcalendar/vue/main.esm.js ***!
  \****************************************************/
/*! exports provided: default, install */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony import */ var fast_deep_equal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-deep-equal */ "./node_modules/@fullcalendar/vue/node_modules/fast-deep-equal/index.js");
/* harmony import */ var fast_deep_equal__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fast_deep_equal__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _fullcalendar_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @fullcalendar/core */ "./node_modules/@fullcalendar/core/main.esm.js");
/*
FullCalendar Vue Component v4.4.0
Docs: https://fullcalendar.io/docs/vue
License: MIT
*/



function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

var hasOwnProperty = Object.prototype.hasOwnProperty;
/*
Really simple clone utility. Only copies plain arrays, objects, and Dates. Transfers everything else as-is.
Wanted to use a third-party lib, but none did exactly this.
*/

function deepCopy(input) {
  if (Array.isArray(input)) {
    return input.map(deepCopy);
  } else if (input instanceof Date) {
    return new Date(input.valueOf());
  } else if (_typeof(input) === 'object' && input) {
    // non-null object
    return mapHash(input, deepCopy);
  } else {
    // everything else (null, function, etc)
    return input;
  }
}
function mapHash(input, func) {
  var output = {};

  for (var key in input) {
    if (hasOwnProperty.call(input, key)) {
      output[key] = func(input[key], key);
    }
  }

  return output;
}

/*
the docs point to this file as an index of options.
when this files is moved, update the docs.
*/

/*
TODO: figure out booleans so attributes can be defined like:
<FullCalendar editable />
*/
var PROP_DEFS = {
  header: {},
  footer: {},
  customButtons: {},
  buttonIcons: {},
  themeSystem: {},
  bootstrapFontAwesome: {},
  firstDay: {},
  dir: {},
  weekends: {},
  hiddenDays: {},
  fixedWeekCount: {},
  weekNumbers: {},
  weekNumbersWithinDays: {},
  weekNumberCalculation: {},
  businessHours: {},
  showNonCurrentDates: {},
  height: {},
  contentHeight: {},
  aspectRatio: {},
  handleWindowResize: {},
  windowResizeDelay: {},
  eventLimit: {},
  eventLimitClick: {},
  timeZone: {},
  now: {},
  defaultView: {},
  allDaySlot: {},
  allDayText: {},
  slotDuration: {},
  slotLabelFormat: {},
  slotLabelInterval: {},
  snapDuration: {},
  scrollTime: {},
  minTime: {},
  maxTime: {},
  slotEventOverlap: {},
  listDayFormat: {},
  listDayAltFormat: {},
  noEventsMessage: {},
  defaultDate: {},
  nowIndicator: {},
  visibleRange: {},
  validRange: {},
  dateIncrement: {},
  dateAlignment: {},
  duration: {},
  dayCount: {},
  locales: {},
  locale: {},
  eventTimeFormat: {},
  columnHeader: {},
  columnHeaderFormat: {},
  columnHeaderText: {},
  columnHeaderHtml: {},
  titleFormat: {},
  weekLabel: {},
  displayEventTime: {},
  displayEventEnd: {},
  eventLimitText: {},
  dayPopoverFormat: {},
  navLinks: {},
  navLinkDayClick: {},
  navLinkWeekClick: {},
  selectable: {},
  selectMirror: {},
  unselectAuto: {},
  unselectCancel: {},
  defaultAllDayEventDuration: {},
  defaultTimedEventDuration: {},
  cmdFormatter: {},
  defaultRangeSeparator: {},
  selectConstraint: {},
  selectOverlap: {},
  selectAllow: {},
  editable: {},
  eventStartEditable: {},
  eventDurationEditable: {},
  eventConstraint: {},
  eventOverlap: {},
  eventAllow: {},
  eventClassName: {},
  eventClassNames: {},
  eventBackgroundColor: {},
  eventBorderColor: {},
  eventTextColor: {},
  eventColor: {},
  events: {},
  eventSources: {},
  allDayDefault: {},
  startParam: {},
  endParam: {},
  lazyFetching: {},
  nextDayThreshold: {},
  eventOrder: {},
  rerenderDelay: {},
  dragRevertDuration: {},
  dragScroll: {},
  longPressDelay: {},
  eventLongPressDelay: {},
  droppable: {},
  dropAccept: {},
  eventDataTransform: {},
  allDayMaintainDuration: {},
  eventResizableFromStart: {},
  timeGridEventMinHeight: {},
  allDayHtml: {},
  eventDragMinDistance: {},
  eventResourceEditable: {},
  eventSourceFailure: {},
  eventSourceSuccess: {},
  forceEventDuration: {},
  progressiveEventRendering: {},
  selectLongPressDelay: {},
  selectMinDistance: {},
  timeZoneParam: {},
  titleRangeSeparator: {},
  // compound OptionsInput...
  buttonText: {},
  views: {},
  plugins: {},
  // scheduler...
  schedulerLicenseKey: {},
  resources: {},
  resourceLabelText: {},
  resourceOrder: {},
  filterResourcesWithEvents: {},
  resourceText: {},
  resourceGroupField: {},
  resourceGroupText: {},
  resourceAreaWidth: {},
  resourceColumns: {},
  resourcesInitiallyExpanded: {},
  slotWidth: {},
  datesAboveResources: {},
  googleCalendarApiKey: {},
  refetchResourcesOnNavigate: {},
  // used to be emissions but are now props...
  datesRender: {},
  datesDestroy: {},
  dayRender: {},
  eventRender: {},
  eventDestroy: {},
  viewSkeletonRender: {},
  viewSkeletonDestroy: {},
  resourceRender: {}
};
var PROP_IS_DEEP = {
  header: true,
  footer: true,
  events: true,
  eventSources: true,
  resources: true
};
var EMISSION_NAMES = ['windowResize', 'dateClick', 'eventClick', 'eventMouseEnter', 'eventMouseLeave', 'select', 'unselect', 'loading', 'eventPositioned', '_eventsPositioned', 'eventDragStart', 'eventDragStop', 'eventDrop', 'eventResizeStart', 'eventResizeStop', 'eventResize', 'drop', 'eventReceive', 'eventLeave', '_destroyed', // should now be props... (TODO: eventually remove)
'datesRender', 'datesDestroy', 'dayRender', 'eventRender', 'eventDestroy', 'viewSkeletonRender', 'viewSkeletonDestroy', 'resourceRender']; // identify deprecated emissions (TODO: eventually remove)

var EMISSION_USE_PROP = {
  datesRender: true,
  datesDestroy: true,
  dayRender: true,
  eventRender: true,
  eventDestroy: true,
  viewSkeletonRender: true,
  viewSkeletonDestroy: true,
  resourceRender: true
};

/*
VOCAB:
"props" are the values passed in from the parent (they are NOT listeners/emissions)
"emissions" are another way to say "events that will fire"
"options" are the options that the FullCalendar API accepts

NOTE: "deep" props are complex objects that we want to watch for internal changes.
Vue allows a reference to be internally mutated. Each time we detect a mutation,
we use deepCopy to freeze the state. This has the added benefit of stripping the
getter/setter methods that Vue embeds.
*/

var FullCalendarComponent = {
  props: PROP_DEFS,
  // INTERNALS
  // this.$options.calendar
  // this.$options.deepCopies - all current deep options
  // this.$options.dirtyOptions - null/undefined means nothing dirty
  data: function data() {
    return {
      renderId: 0,
      deepCopies: {}
    };
  },
  render: function render(createElement) {
    return createElement('div', {
      // when renderId is changed, Vue will trigger a real-DOM async rerender, calling beforeUpdate/updated
      attrs: {
        'data-fc-render-id': this.renderId
      }
    });
  },
  mounted: function mounted() {
    warnDeprecatedListeners(this.$listeners);
    this.$options.calendar = new _fullcalendar_core__WEBPACK_IMPORTED_MODULE_1__["Calendar"](this.$el, this.buildCalendarOptions());
    this.$options.calendar.render();
  },
  beforeUpdate: function beforeUpdate() {
    this.renderDirty();
  },
  beforeDestroy: function beforeDestroy() {
    this.$options.calendar.destroy();
  },
  watch: mapHash(PROP_DEFS, buildPropWatcher),
  methods: {
    buildCalendarOptions: function buildCalendarOptions() {
      var _this = this;

      var options = {};
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        var _loop = function _loop() {
          var emissionName = _step.value;

          options[emissionName] = function () {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            _this.$emit.apply(_this, [emissionName].concat(args));
          };
        };

        for (var _iterator = EMISSION_NAMES[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          _loop();
        } // do after emissions. these props will override emissions with same name

      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      for (var propName in PROP_DEFS) {
        var propVal = this[propName]; // protect against FullCalendar choking on undefined options

        if (propVal !== undefined) {
          if (PROP_IS_DEEP[propName]) {
            propVal = deepCopy(propVal); // freeze state

            this.deepCopies[propName] = propVal; // side effect!
          }

          options[propName] = propVal;
        }
      }

      return options;
    },
    recordDirtyOption: function recordDirtyOption(optionName, newVal) {
      (this.$options.dirtyOptions || (this.$options.dirtyOptions = {}))[optionName] = newVal;
      this.renderId++; // triggers a render eventually
    },
    renderDirty: function renderDirty() {
      var dirtyOptions = this.$options.dirtyOptions;

      if (dirtyOptions) {
        this.$options.dirtyOptions = null; // clear before rendering. might trigger new dirtiness

        this.$options.calendar.mutateOptions(dirtyOptions, [], false, fast_deep_equal__WEBPACK_IMPORTED_MODULE_0___default.a);
      }
    },
    getApi: function getApi() {
      return this.$options.calendar;
    }
  }
};

function buildPropWatcher(propDef, propName) {
  if (PROP_IS_DEEP[propName]) {
    return {
      deep: true,
      // listen to children as well
      handler: function handler(newVal) {
        // use this instead of the handler's param because if same reference, will always be equal
        var oldVal = this.deepCopies[propName];

        if (!fast_deep_equal__WEBPACK_IMPORTED_MODULE_0___default()(newVal, oldVal)) {
          newVal = deepCopy(newVal); // freeze state

          this.deepCopies[propName] = newVal; // always keep this up to date

          this.recordDirtyOption(propName, newVal);
        }
      }
    };
  } else {
    return function (newVal) {
      this.recordDirtyOption(propName, newVal);
    };
  }
}

function warnDeprecatedListeners(listenerHash) {
  for (var emissionName in listenerHash) {
    if (EMISSION_USE_PROP[emissionName]) {
      console.warn('Use of ' + emissionName + ' as an event is deprecated. Please convert to a prop.');
    }
  }
}

/*
Registers the component globally if appropriate.
This modules exposes the component AND an install function.

Derived from:
https://vuejs.org/v2/cookbook/packaging-sfc-for-npm.html
*/

var installed = false; // declare install function executed by Vue.use()

function install(Vue) {
  if (!installed) {
    installed = true;
    Vue.component('FullCalendar', FullCalendarComponent);
  }
} // detect a globally availble version of Vue (eg. in browser via <script> tag)

var GlobalVue;

if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
} // auto-install if possible


if (GlobalVue) {
  GlobalVue.use({
    install: install
  });
} // to allow use as module (npm/webpack/etc.) export component

/* harmony default export */ __webpack_exports__["default"] = (FullCalendarComponent);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/@fullcalendar/vue/node_modules/fast-deep-equal/index.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@fullcalendar/vue/node_modules/fast-deep-equal/index.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isArray = Array.isArray;
var keyList = Object.keys;
var hasProp = Object.prototype.hasOwnProperty;

module.exports = function equal(a, b) {
  if (a === b) return true;

  if (a && b && typeof a == 'object' && typeof b == 'object') {
    var arrA = isArray(a)
      , arrB = isArray(b)
      , i
      , length
      , key;

    if (arrA && arrB) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;)
        if (!equal(a[i], b[i])) return false;
      return true;
    }

    if (arrA != arrB) return false;

    var dateA = a instanceof Date
      , dateB = b instanceof Date;
    if (dateA != dateB) return false;
    if (dateA && dateB) return a.getTime() == b.getTime();

    var regexpA = a instanceof RegExp
      , regexpB = b instanceof RegExp;
    if (regexpA != regexpB) return false;
    if (regexpA && regexpB) return a.toString() == b.toString();

    var keys = keyList(a);
    length = keys.length;

    if (length !== keyList(b).length)
      return false;

    for (i = length; i-- !== 0;)
      if (!hasProp.call(b, keys[i])) return false;

    for (i = length; i-- !== 0;) {
      key = keys[i];
      if (!equal(a[key], b[key])) return false;
    }

    return true;
  }

  return a!==a && b!==b;
};


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/@fullcalendar/core/main.css":
/*!****************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/@fullcalendar/core/main.css ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "@charset \"UTF-8\";\n.fc {\n  direction: ltr;\n  text-align: left;\n}\n\n.fc-rtl {\n  text-align: right;\n}\n\nbody .fc {\n  /* extra precedence to overcome jqui */\n  font-size: 1em;\n}\n\n/* Colors\n--------------------------------------------------------------------------------------------------*/\n.fc-highlight {\n  /* when user is selecting cells */\n  background: #bce8f1;\n  opacity: 0.3;\n}\n\n.fc-bgevent {\n  /* default look for background events */\n  background: #8fdf82;\n  opacity: 0.3;\n}\n\n.fc-nonbusiness {\n  /* default look for non-business-hours areas */\n  /* will inherit .fc-bgevent's styles */\n  background: #d7d7d7;\n}\n\n/* Popover\n--------------------------------------------------------------------------------------------------*/\n.fc-popover {\n  position: absolute;\n  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);\n}\n\n.fc-popover .fc-header {\n  /* TODO: be more consistent with fc-head/fc-body */\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  padding: 2px 4px;\n}\n\n.fc-rtl .fc-popover .fc-header {\n  flex-direction: row-reverse;\n}\n\n.fc-popover .fc-header .fc-title {\n  margin: 0 2px;\n}\n\n.fc-popover .fc-header .fc-close {\n  cursor: pointer;\n  opacity: 0.65;\n  font-size: 1.1em;\n}\n\n/* Misc Reusable Components\n--------------------------------------------------------------------------------------------------*/\n.fc-divider {\n  border-style: solid;\n  border-width: 1px;\n}\n\nhr.fc-divider {\n  height: 0;\n  margin: 0;\n  padding: 0 0 2px;\n  /* height is unreliable across browsers, so use padding */\n  border-width: 1px 0;\n}\n\n.fc-bg,\n.fc-bgevent-skeleton,\n.fc-highlight-skeleton,\n.fc-mirror-skeleton {\n  /* these element should always cling to top-left/right corners */\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n}\n\n.fc-bg {\n  bottom: 0;\n  /* strech bg to bottom edge */\n}\n\n.fc-bg table {\n  height: 100%;\n  /* strech bg to bottom edge */\n}\n\n/* Tables\n--------------------------------------------------------------------------------------------------*/\n.fc table {\n  width: 100%;\n  box-sizing: border-box;\n  /* fix scrollbar issue in firefox */\n  table-layout: fixed;\n  border-collapse: collapse;\n  border-spacing: 0;\n  font-size: 1em;\n  /* normalize cross-browser */\n}\n\n.fc th {\n  text-align: center;\n}\n\n.fc th,\n.fc td {\n  border-style: solid;\n  border-width: 1px;\n  padding: 0;\n  vertical-align: top;\n}\n\n.fc td.fc-today {\n  border-style: double;\n  /* overcome neighboring borders */\n}\n\n/* Internal Nav Links\n--------------------------------------------------------------------------------------------------*/\na[data-goto] {\n  cursor: pointer;\n}\n\na[data-goto]:hover {\n  text-decoration: underline;\n}\n\n/* Fake Table Rows\n--------------------------------------------------------------------------------------------------*/\n.fc .fc-row {\n  /* extra precedence to overcome themes forcing a 1px border */\n  /* no visible border by default. but make available if need be (scrollbar width compensation) */\n  border-style: solid;\n  border-width: 0;\n}\n\n.fc-row table {\n  /* don't put left/right border on anything within a fake row.\n     the outer tbody will worry about this */\n  border-left: 0 hidden transparent;\n  border-right: 0 hidden transparent;\n  /* no bottom borders on rows */\n  border-bottom: 0 hidden transparent;\n}\n\n.fc-row:first-child table {\n  border-top: 0 hidden transparent;\n  /* no top border on first row */\n}\n\n/* Day Row (used within the header and the DayGrid)\n--------------------------------------------------------------------------------------------------*/\n.fc-row {\n  position: relative;\n}\n\n.fc-row .fc-bg {\n  z-index: 1;\n}\n\n/* highlighting cells & background event skeleton */\n.fc-row .fc-bgevent-skeleton,\n.fc-row .fc-highlight-skeleton {\n  bottom: 0;\n  /* stretch skeleton to bottom of row */\n}\n\n.fc-row .fc-bgevent-skeleton table,\n.fc-row .fc-highlight-skeleton table {\n  height: 100%;\n  /* stretch skeleton to bottom of row */\n}\n\n.fc-row .fc-highlight-skeleton td,\n.fc-row .fc-bgevent-skeleton td {\n  border-color: transparent;\n}\n\n.fc-row .fc-bgevent-skeleton {\n  z-index: 2;\n}\n\n.fc-row .fc-highlight-skeleton {\n  z-index: 3;\n}\n\n/*\nrow content (which contains day/week numbers and events) as well as \"mirror\" (which contains\ntemporary rendered events).\n*/\n.fc-row .fc-content-skeleton {\n  position: relative;\n  z-index: 4;\n  padding-bottom: 2px;\n  /* matches the space above the events */\n}\n\n.fc-row .fc-mirror-skeleton {\n  z-index: 5;\n}\n\n.fc .fc-row .fc-content-skeleton table,\n.fc .fc-row .fc-content-skeleton td,\n.fc .fc-row .fc-mirror-skeleton td {\n  /* see-through to the background below */\n  /* extra precedence to prevent theme-provided backgrounds */\n  background: none;\n  /* in case <td>s are globally styled */\n  border-color: transparent;\n}\n\n.fc-row .fc-content-skeleton td,\n.fc-row .fc-mirror-skeleton td {\n  /* don't put a border between events and/or the day number */\n  border-bottom: 0;\n}\n\n.fc-row .fc-content-skeleton tbody td,\n.fc-row .fc-mirror-skeleton tbody td {\n  /* don't put a border between event cells */\n  border-top: 0;\n}\n\n/* Scrolling Container\n--------------------------------------------------------------------------------------------------*/\n.fc-scroller {\n  -webkit-overflow-scrolling: touch;\n}\n\n/* TODO: move to timegrid/daygrid */\n.fc-scroller > .fc-day-grid,\n.fc-scroller > .fc-time-grid {\n  position: relative;\n  /* re-scope all positions */\n  width: 100%;\n  /* hack to force re-sizing this inner element when scrollbars appear/disappear */\n}\n\n/* Global Event Styles\n--------------------------------------------------------------------------------------------------*/\n.fc-event {\n  position: relative;\n  /* for resize handle and other inner positioning */\n  display: block;\n  /* make the <a> tag block */\n  font-size: 0.85em;\n  line-height: 1.4;\n  border-radius: 3px;\n  border: 1px solid #3788d8;\n}\n\n.fc-event,\n.fc-event-dot {\n  background-color: #3788d8;\n  /* default BACKGROUND color */\n}\n\n.fc-event,\n.fc-event:hover {\n  color: #fff;\n  /* default TEXT color */\n  text-decoration: none;\n  /* if <a> has an href */\n}\n\n.fc-event[href],\n.fc-event.fc-draggable {\n  cursor: pointer;\n  /* give events with links and draggable events a hand mouse pointer */\n}\n\n.fc-not-allowed,\n.fc-not-allowed .fc-event {\n  /* to override an event's custom cursor */\n  cursor: not-allowed;\n}\n\n.fc-event .fc-content {\n  position: relative;\n  z-index: 2;\n}\n\n/* resizer (cursor AND touch devices) */\n.fc-event .fc-resizer {\n  position: absolute;\n  z-index: 4;\n}\n\n/* resizer (touch devices) */\n.fc-event .fc-resizer {\n  display: none;\n}\n\n.fc-event.fc-allow-mouse-resize .fc-resizer,\n.fc-event.fc-selected .fc-resizer {\n  /* only show when hovering or selected (with touch) */\n  display: block;\n}\n\n/* hit area */\n.fc-event.fc-selected .fc-resizer:before {\n  /* 40x40 touch area */\n  content: \"\";\n  position: absolute;\n  z-index: 9999;\n  /* user of this util can scope within a lower z-index */\n  top: 50%;\n  left: 50%;\n  width: 40px;\n  height: 40px;\n  margin-left: -20px;\n  margin-top: -20px;\n}\n\n/* Event Selection (only for touch devices)\n--------------------------------------------------------------------------------------------------*/\n.fc-event.fc-selected {\n  z-index: 9999 !important;\n  /* overcomes inline z-index */\n  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);\n}\n\n.fc-event.fc-selected:after {\n  content: \"\";\n  position: absolute;\n  z-index: 1;\n  /* same z-index as fc-bg, behind text */\n  /* overcome the borders */\n  top: -1px;\n  right: -1px;\n  bottom: -1px;\n  left: -1px;\n  /* darkening effect */\n  background: #000;\n  opacity: 0.25;\n}\n\n/* Event Dragging\n--------------------------------------------------------------------------------------------------*/\n.fc-event.fc-dragging.fc-selected {\n  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.3);\n}\n\n.fc-event.fc-dragging:not(.fc-selected) {\n  opacity: 0.75;\n}\n\n/* Horizontal Events\n--------------------------------------------------------------------------------------------------*/\n/* bigger touch area when selected */\n.fc-h-event.fc-selected:before {\n  content: \"\";\n  position: absolute;\n  z-index: 3;\n  /* below resizers */\n  top: -10px;\n  bottom: -10px;\n  left: 0;\n  right: 0;\n}\n\n/* events that are continuing to/from another week. kill rounded corners and butt up against edge */\n.fc-ltr .fc-h-event.fc-not-start,\n.fc-rtl .fc-h-event.fc-not-end {\n  margin-left: 0;\n  border-left-width: 0;\n  padding-left: 1px;\n  /* replace the border with padding */\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0;\n}\n\n.fc-ltr .fc-h-event.fc-not-end,\n.fc-rtl .fc-h-event.fc-not-start {\n  margin-right: 0;\n  border-right-width: 0;\n  padding-right: 1px;\n  /* replace the border with padding */\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n}\n\n/* resizer (cursor AND touch devices) */\n/* left resizer  */\n.fc-ltr .fc-h-event .fc-start-resizer,\n.fc-rtl .fc-h-event .fc-end-resizer {\n  cursor: w-resize;\n  left: -1px;\n  /* overcome border */\n}\n\n/* right resizer */\n.fc-ltr .fc-h-event .fc-end-resizer,\n.fc-rtl .fc-h-event .fc-start-resizer {\n  cursor: e-resize;\n  right: -1px;\n  /* overcome border */\n}\n\n/* resizer (mouse devices) */\n.fc-h-event.fc-allow-mouse-resize .fc-resizer {\n  width: 7px;\n  top: -1px;\n  /* overcome top border */\n  bottom: -1px;\n  /* overcome bottom border */\n}\n\n/* resizer (touch devices) */\n.fc-h-event.fc-selected .fc-resizer {\n  /* 8x8 little dot */\n  border-radius: 4px;\n  border-width: 1px;\n  width: 6px;\n  height: 6px;\n  border-style: solid;\n  border-color: inherit;\n  background: #fff;\n  /* vertically center */\n  top: 50%;\n  margin-top: -4px;\n}\n\n/* left resizer  */\n.fc-ltr .fc-h-event.fc-selected .fc-start-resizer,\n.fc-rtl .fc-h-event.fc-selected .fc-end-resizer {\n  margin-left: -4px;\n  /* centers the 8x8 dot on the left edge */\n}\n\n/* right resizer */\n.fc-ltr .fc-h-event.fc-selected .fc-end-resizer,\n.fc-rtl .fc-h-event.fc-selected .fc-start-resizer {\n  margin-right: -4px;\n  /* centers the 8x8 dot on the right edge */\n}\n\n/* DayGrid events\n----------------------------------------------------------------------------------------------------\nWe use the full \"fc-day-grid-event\" class instead of using descendants because the event won't\nbe a descendant of the grid when it is being dragged.\n*/\n.fc-day-grid-event {\n  margin: 1px 2px 0;\n  /* spacing between events and edges */\n  padding: 0 1px;\n}\n\ntr:first-child > td > .fc-day-grid-event {\n  margin-top: 2px;\n  /* a little bit more space before the first event */\n}\n\n.fc-mirror-skeleton tr:first-child > td > .fc-day-grid-event {\n  margin-top: 0;\n  /* except for mirror skeleton */\n}\n\n.fc-day-grid-event .fc-content {\n  /* force events to be one-line tall */\n  white-space: nowrap;\n  overflow: hidden;\n}\n\n.fc-day-grid-event .fc-time {\n  font-weight: bold;\n}\n\n/* resizer (cursor devices) */\n/* left resizer  */\n.fc-ltr .fc-day-grid-event.fc-allow-mouse-resize .fc-start-resizer,\n.fc-rtl .fc-day-grid-event.fc-allow-mouse-resize .fc-end-resizer {\n  margin-left: -2px;\n  /* to the day cell's edge */\n}\n\n/* right resizer */\n.fc-ltr .fc-day-grid-event.fc-allow-mouse-resize .fc-end-resizer,\n.fc-rtl .fc-day-grid-event.fc-allow-mouse-resize .fc-start-resizer {\n  margin-right: -2px;\n  /* to the day cell's edge */\n}\n\n/* Event Limiting\n--------------------------------------------------------------------------------------------------*/\n/* \"more\" link that represents hidden events */\na.fc-more {\n  margin: 1px 3px;\n  font-size: 0.85em;\n  cursor: pointer;\n  text-decoration: none;\n}\n\na.fc-more:hover {\n  text-decoration: underline;\n}\n\n.fc-limited {\n  /* rows and cells that are hidden because of a \"more\" link */\n  display: none;\n}\n\n/* popover that appears when \"more\" link is clicked */\n.fc-day-grid .fc-row {\n  z-index: 1;\n  /* make the \"more\" popover one higher than this */\n}\n\n.fc-more-popover {\n  z-index: 2;\n  width: 220px;\n}\n\n.fc-more-popover .fc-event-container {\n  padding: 10px;\n}\n\n/* Now Indicator\n--------------------------------------------------------------------------------------------------*/\n.fc-now-indicator {\n  position: absolute;\n  border: 0 solid red;\n}\n\n/* Utilities\n--------------------------------------------------------------------------------------------------*/\n.fc-unselectable {\n  -webkit-user-select: none;\n  -khtml-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  -webkit-touch-callout: none;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n}\n\n/*\nTODO: more distinction between this file and common.css\n*/\n/* Colors\n--------------------------------------------------------------------------------------------------*/\n.fc-unthemed th,\n.fc-unthemed td,\n.fc-unthemed thead,\n.fc-unthemed tbody,\n.fc-unthemed .fc-divider,\n.fc-unthemed .fc-row,\n.fc-unthemed .fc-content,\n.fc-unthemed .fc-popover,\n.fc-unthemed .fc-list-view,\n.fc-unthemed .fc-list-heading td {\n  border-color: #ddd;\n}\n\n.fc-unthemed .fc-popover {\n  background-color: #fff;\n}\n\n.fc-unthemed .fc-divider,\n.fc-unthemed .fc-popover .fc-header,\n.fc-unthemed .fc-list-heading td {\n  background: #eee;\n}\n\n.fc-unthemed td.fc-today {\n  background: #fcf8e3;\n}\n\n.fc-unthemed .fc-disabled-day {\n  background: #d7d7d7;\n  opacity: 0.3;\n}\n\n/* Icons\n--------------------------------------------------------------------------------------------------\nfrom https://feathericons.com/ and built with IcoMoon\n*/\n@font-face {\n  font-family: \"fcicons\";\n  src: url(\"data:application/x-font-ttf;charset=utf-8;base64,AAEAAAALAIAAAwAwT1MvMg8SBfAAAAC8AAAAYGNtYXAXVtKNAAABHAAAAFRnYXNwAAAAEAAAAXAAAAAIZ2x5ZgYydxIAAAF4AAAFNGhlYWQUJ7cIAAAGrAAAADZoaGVhB20DzAAABuQAAAAkaG10eCIABhQAAAcIAAAALGxvY2ED4AU6AAAHNAAAABhtYXhwAA8AjAAAB0wAAAAgbmFtZXsr690AAAdsAAABhnBvc3QAAwAAAAAI9AAAACAAAwPAAZAABQAAApkCzAAAAI8CmQLMAAAB6wAzAQkAAAAAAAAAAAAAAAAAAAABEAAAAAAAAAAAAAAAAAAAAABAAADpBgPA/8AAQAPAAEAAAAABAAAAAAAAAAAAAAAgAAAAAAADAAAAAwAAABwAAQADAAAAHAADAAEAAAAcAAQAOAAAAAoACAACAAIAAQAg6Qb//f//AAAAAAAg6QD//f//AAH/4xcEAAMAAQAAAAAAAAAAAAAAAQAB//8ADwABAAAAAAAAAAAAAgAANzkBAAAAAAEAAAAAAAAAAAACAAA3OQEAAAAAAQAAAAAAAAAAAAIAADc5AQAAAAABAWIAjQKeAskAEwAAJSc3NjQnJiIHAQYUFwEWMjc2NCcCnuLiDQ0MJAz/AA0NAQAMJAwNDcni4gwjDQwM/wANIwz/AA0NDCMNAAAAAQFiAI0CngLJABMAACUBNjQnASYiBwYUHwEHBhQXFjI3AZ4BAA0N/wAMJAwNDeLiDQ0MJAyNAQAMIw0BAAwMDSMM4uINIwwNDQAAAAIA4gC3Ax4CngATACcAACUnNzY0JyYiDwEGFB8BFjI3NjQnISc3NjQnJiIPAQYUHwEWMjc2NCcB87e3DQ0MIw3VDQ3VDSMMDQ0BK7e3DQ0MJAzVDQ3VDCQMDQ3zuLcMJAwNDdUNIwzWDAwNIwy4twwkDA0N1Q0jDNYMDA0jDAAAAgDiALcDHgKeABMAJwAAJTc2NC8BJiIHBhQfAQcGFBcWMjchNzY0LwEmIgcGFB8BBwYUFxYyNwJJ1Q0N1Q0jDA0Nt7cNDQwjDf7V1Q0N1QwkDA0Nt7cNDQwkDLfWDCMN1Q0NDCQMt7gMIw0MDNYMIw3VDQ0MJAy3uAwjDQwMAAADAFUAAAOrA1UAMwBoAHcAABMiBgcOAQcOAQcOARURFBYXHgEXHgEXHgEzITI2Nz4BNz4BNz4BNRE0JicuAScuAScuASMFITIWFx4BFx4BFx4BFREUBgcOAQcOAQcOASMhIiYnLgEnLgEnLgE1ETQ2Nz4BNz4BNz4BMxMhMjY1NCYjISIGFRQWM9UNGAwLFQkJDgUFBQUFBQ4JCRULDBgNAlYNGAwLFQkJDgUFBQUFBQ4JCRULDBgN/aoCVgQIBAQHAwMFAQIBAQIBBQMDBwQECAT9qgQIBAQHAwMFAQIBAQIBBQMDBwQECASAAVYRGRkR/qoRGRkRA1UFBAUOCQkVDAsZDf2rDRkLDBUJCA4FBQUFBQUOCQgVDAsZDQJVDRkLDBUJCQ4FBAVVAgECBQMCBwQECAX9qwQJAwQHAwMFAQICAgIBBQMDBwQDCQQCVQUIBAQHAgMFAgEC/oAZEhEZGRESGQAAAAADAFUAAAOrA1UAMwBoAIkAABMiBgcOAQcOAQcOARURFBYXHgEXHgEXHgEzITI2Nz4BNz4BNz4BNRE0JicuAScuAScuASMFITIWFx4BFx4BFx4BFREUBgcOAQcOAQcOASMhIiYnLgEnLgEnLgE1ETQ2Nz4BNz4BNz4BMxMzFRQWMzI2PQEzMjY1NCYrATU0JiMiBh0BIyIGFRQWM9UNGAwLFQkJDgUFBQUFBQ4JCRULDBgNAlYNGAwLFQkJDgUFBQUFBQ4JCRULDBgN/aoCVgQIBAQHAwMFAQIBAQIBBQMDBwQECAT9qgQIBAQHAwMFAQIBAQIBBQMDBwQECASAgBkSEhmAERkZEYAZEhIZgBEZGREDVQUEBQ4JCRUMCxkN/asNGQsMFQkIDgUFBQUFBQ4JCBUMCxkNAlUNGQsMFQkJDgUEBVUCAQIFAwIHBAQIBf2rBAkDBAcDAwUBAgICAgEFAwMHBAMJBAJVBQgEBAcCAwUCAQL+gIASGRkSgBkSERmAEhkZEoAZERIZAAABAOIAjQMeAskAIAAAExcHBhQXFjI/ARcWMjc2NC8BNzY0JyYiDwEnJiIHBhQX4uLiDQ0MJAzi4gwkDA0N4uINDQwkDOLiDCQMDQ0CjeLiDSMMDQ3h4Q0NDCMN4uIMIw0MDOLiDAwNIwwAAAABAAAAAQAAa5n0y18PPPUACwQAAAAAANivOVsAAAAA2K85WwAAAAADqwNVAAAACAACAAAAAAAAAAEAAAPA/8AAAAQAAAAAAAOrAAEAAAAAAAAAAAAAAAAAAAALBAAAAAAAAAAAAAAAAgAAAAQAAWIEAAFiBAAA4gQAAOIEAABVBAAAVQQAAOIAAAAAAAoAFAAeAEQAagCqAOoBngJkApoAAQAAAAsAigADAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAA4ArgABAAAAAAABAAcAAAABAAAAAAACAAcAYAABAAAAAAADAAcANgABAAAAAAAEAAcAdQABAAAAAAAFAAsAFQABAAAAAAAGAAcASwABAAAAAAAKABoAigADAAEECQABAA4ABwADAAEECQACAA4AZwADAAEECQADAA4APQADAAEECQAEAA4AfAADAAEECQAFABYAIAADAAEECQAGAA4AUgADAAEECQAKADQApGZjaWNvbnMAZgBjAGkAYwBvAG4Ac1ZlcnNpb24gMS4wAFYAZQByAHMAaQBvAG4AIAAxAC4AMGZjaWNvbnMAZgBjAGkAYwBvAG4Ac2ZjaWNvbnMAZgBjAGkAYwBvAG4Ac1JlZ3VsYXIAUgBlAGcAdQBsAGEAcmZjaWNvbnMAZgBjAGkAYwBvAG4Ac0ZvbnQgZ2VuZXJhdGVkIGJ5IEljb01vb24uAEYAbwBuAHQAIABnAGUAbgBlAHIAYQB0AGUAZAAgAGIAeQAgAEkAYwBvAE0AbwBvAG4ALgAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=\") format(\"truetype\");\n  font-weight: normal;\n  font-style: normal;\n}\n.fc-icon {\n  /* use !important to prevent issues with browser extensions that change fonts */\n  font-family: \"fcicons\" !important;\n  speak: none;\n  font-style: normal;\n  font-weight: normal;\n  font-variant: normal;\n  text-transform: none;\n  line-height: 1;\n  /* Better Font Rendering =========== */\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n.fc-icon-chevron-left:before {\n  content: \"\\E900\";\n}\n\n.fc-icon-chevron-right:before {\n  content: \"\\E901\";\n}\n\n.fc-icon-chevrons-left:before {\n  content: \"\\E902\";\n}\n\n.fc-icon-chevrons-right:before {\n  content: \"\\E903\";\n}\n\n.fc-icon-minus-square:before {\n  content: \"\\E904\";\n}\n\n.fc-icon-plus-square:before {\n  content: \"\\E905\";\n}\n\n.fc-icon-x:before {\n  content: \"\\E906\";\n}\n\n.fc-icon {\n  display: inline-block;\n  width: 1em;\n  height: 1em;\n  text-align: center;\n}\n\n/* Buttons\n--------------------------------------------------------------------------------------------------\nLots taken from Flatly (MIT): https://bootswatch.com/4/flatly/bootstrap.css\n*/\n/* reset */\n.fc-button {\n  border-radius: 0;\n  overflow: visible;\n  text-transform: none;\n  margin: 0;\n  font-family: inherit;\n  font-size: inherit;\n  line-height: inherit;\n}\n\n.fc-button:focus {\n  outline: 1px dotted;\n  outline: 5px auto -webkit-focus-ring-color;\n}\n\n.fc-button {\n  -webkit-appearance: button;\n}\n\n.fc-button:not(:disabled) {\n  cursor: pointer;\n}\n\n.fc-button::-moz-focus-inner {\n  padding: 0;\n  border-style: none;\n}\n\n/* theme */\n.fc-button {\n  display: inline-block;\n  font-weight: 400;\n  color: #212529;\n  text-align: center;\n  vertical-align: middle;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  background-color: transparent;\n  border: 1px solid transparent;\n  padding: 0.4em 0.65em;\n  font-size: 1em;\n  line-height: 1.5;\n  border-radius: 0.25em;\n}\n\n.fc-button:hover {\n  color: #212529;\n  text-decoration: none;\n}\n\n.fc-button:focus {\n  outline: 0;\n  -webkit-box-shadow: 0 0 0 0.2rem rgba(44, 62, 80, 0.25);\n  box-shadow: 0 0 0 0.2rem rgba(44, 62, 80, 0.25);\n}\n\n.fc-button:disabled {\n  opacity: 0.65;\n}\n\n/* \"primary\" coloring */\n.fc-button-primary {\n  color: #fff;\n  background-color: #2C3E50;\n  border-color: #2C3E50;\n}\n\n.fc-button-primary:hover {\n  color: #fff;\n  background-color: #1e2b37;\n  border-color: #1a252f;\n}\n\n.fc-button-primary:focus {\n  -webkit-box-shadow: 0 0 0 0.2rem rgba(76, 91, 106, 0.5);\n  box-shadow: 0 0 0 0.2rem rgba(76, 91, 106, 0.5);\n}\n\n.fc-button-primary:disabled {\n  color: #fff;\n  background-color: #2C3E50;\n  border-color: #2C3E50;\n}\n\n.fc-button-primary:not(:disabled):active,\n.fc-button-primary:not(:disabled).fc-button-active {\n  color: #fff;\n  background-color: #1a252f;\n  border-color: #151e27;\n}\n\n.fc-button-primary:not(:disabled):active:focus,\n.fc-button-primary:not(:disabled).fc-button-active:focus {\n  -webkit-box-shadow: 0 0 0 0.2rem rgba(76, 91, 106, 0.5);\n  box-shadow: 0 0 0 0.2rem rgba(76, 91, 106, 0.5);\n}\n\n/* icons within buttons */\n.fc-button .fc-icon {\n  vertical-align: middle;\n  font-size: 1.5em;\n}\n\n/* Buttons Groups\n--------------------------------------------------------------------------------------------------*/\n.fc-button-group {\n  position: relative;\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  vertical-align: middle;\n}\n\n.fc-button-group > .fc-button {\n  position: relative;\n  -webkit-box-flex: 1;\n  -ms-flex: 1 1 auto;\n  flex: 1 1 auto;\n}\n\n.fc-button-group > .fc-button:hover {\n  z-index: 1;\n}\n\n.fc-button-group > .fc-button:focus,\n.fc-button-group > .fc-button:active,\n.fc-button-group > .fc-button.fc-button-active {\n  z-index: 1;\n}\n\n.fc-button-group > .fc-button:not(:first-child) {\n  margin-left: -1px;\n}\n\n.fc-button-group > .fc-button:not(:last-child) {\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n}\n\n.fc-button-group > .fc-button:not(:first-child) {\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0;\n}\n\n/* Popover\n--------------------------------------------------------------------------------------------------*/\n.fc-unthemed .fc-popover {\n  border-width: 1px;\n  border-style: solid;\n}\n\n/* List View\n--------------------------------------------------------------------------------------------------*/\n.fc-unthemed .fc-list-item:hover td {\n  background-color: #f5f5f5;\n}\n\n/* Toolbar\n--------------------------------------------------------------------------------------------------*/\n.fc-toolbar {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.fc-toolbar.fc-header-toolbar {\n  margin-bottom: 1.5em;\n}\n\n.fc-toolbar.fc-footer-toolbar {\n  margin-top: 1.5em;\n}\n\n/* inner content */\n.fc-toolbar > * > :not(:first-child) {\n  margin-left: 0.75em;\n}\n\n.fc-toolbar h2 {\n  font-size: 1.75em;\n  margin: 0;\n}\n\n/* View Structure\n--------------------------------------------------------------------------------------------------*/\n.fc-view-container {\n  position: relative;\n}\n\n/* undo twitter bootstrap's box-sizing rules. normalizes positioning techniques */\n/* don't do this for the toolbar because we'll want bootstrap to style those buttons as some pt */\n.fc-view-container *,\n.fc-view-container *:before,\n.fc-view-container *:after {\n  -webkit-box-sizing: content-box;\n  -moz-box-sizing: content-box;\n  box-sizing: content-box;\n}\n\n.fc-view,\n.fc-view > table {\n  /* so dragged elements can be above the view's main element */\n  position: relative;\n  z-index: 1;\n}\n\n@media print {\n  .fc {\n    max-width: 100% !important;\n  }\n\n  /* Global Event Restyling\n  --------------------------------------------------------------------------------------------------*/\n  .fc-event {\n    background: #fff !important;\n    color: #000 !important;\n    page-break-inside: avoid;\n  }\n\n  .fc-event .fc-resizer {\n    display: none;\n  }\n\n  /* Table & Day-Row Restyling\n  --------------------------------------------------------------------------------------------------*/\n  .fc th,\n.fc td,\n.fc hr,\n.fc thead,\n.fc tbody,\n.fc-row {\n    border-color: #ccc !important;\n    background: #fff !important;\n  }\n\n  /* kill the overlaid, absolutely-positioned components */\n  /* common... */\n  .fc-bg,\n.fc-bgevent-skeleton,\n.fc-highlight-skeleton,\n.fc-mirror-skeleton,\n.fc-bgevent-container,\n.fc-business-container,\n.fc-highlight-container,\n.fc-mirror-container {\n    display: none;\n  }\n\n  /* don't force a min-height on rows (for DayGrid) */\n  .fc tbody .fc-row {\n    height: auto !important;\n    /* undo height that JS set in distributeHeight */\n    min-height: 0 !important;\n    /* undo the min-height from each view's specific stylesheet */\n  }\n\n  .fc tbody .fc-row .fc-content-skeleton {\n    position: static;\n    /* undo .fc-rigid */\n    padding-bottom: 0 !important;\n    /* use a more border-friendly method for this... */\n  }\n\n  .fc tbody .fc-row .fc-content-skeleton tbody tr:last-child td {\n    /* only works in newer browsers */\n    padding-bottom: 1em;\n    /* ...gives space within the skeleton. also ensures min height in a way */\n  }\n\n  .fc tbody .fc-row .fc-content-skeleton table {\n    /* provides a min-height for the row, but only effective for IE, which exaggerates this value,\n       making it look more like 3em. for other browers, it will already be this tall */\n    height: 1em;\n  }\n\n  /* Undo month-view event limiting. Display all events and hide the \"more\" links\n  --------------------------------------------------------------------------------------------------*/\n  .fc-more-cell,\n.fc-more {\n    display: none !important;\n  }\n\n  .fc tr.fc-limited {\n    display: table-row !important;\n  }\n\n  .fc td.fc-limited {\n    display: table-cell !important;\n  }\n\n  .fc-popover {\n    display: none;\n    /* never display the \"more..\" popover in print mode */\n  }\n\n  /* TimeGrid Restyling\n  --------------------------------------------------------------------------------------------------*/\n  /* undo the min-height 100% trick used to fill the container's height */\n  .fc-time-grid {\n    min-height: 0 !important;\n  }\n\n  /* don't display the side axis at all (\"all-day\" and time cells) */\n  .fc-timeGrid-view .fc-axis {\n    display: none;\n  }\n\n  /* don't display the horizontal lines */\n  .fc-slats,\n.fc-time-grid hr {\n    /* this hr is used when height is underused and needs to be filled */\n    display: none !important;\n    /* important overrides inline declaration */\n  }\n\n  /* let the container that holds the events be naturally positioned and create real height */\n  .fc-time-grid .fc-content-skeleton {\n    position: static;\n  }\n\n  /* in case there are no events, we still want some height */\n  .fc-time-grid .fc-content-skeleton table {\n    height: 4em;\n  }\n\n  /* kill the horizontal spacing made by the event container. event margins will be done below */\n  .fc-time-grid .fc-event-container {\n    margin: 0 !important;\n  }\n\n  /* TimeGrid *Event* Restyling\n  --------------------------------------------------------------------------------------------------*/\n  /* naturally position events, vertically stacking them */\n  .fc-time-grid .fc-event {\n    position: static !important;\n    margin: 3px 2px !important;\n  }\n\n  /* for events that continue to a future day, give the bottom border back */\n  .fc-time-grid .fc-event.fc-not-end {\n    border-bottom-width: 1px !important;\n  }\n\n  /* indicate the event continues via \"...\" text */\n  .fc-time-grid .fc-event.fc-not-end:after {\n    content: \"...\";\n  }\n\n  /* for events that are continuations from previous days, give the top border back */\n  .fc-time-grid .fc-event.fc-not-start {\n    border-top-width: 1px !important;\n  }\n\n  /* indicate the event is a continuation via \"...\" text */\n  .fc-time-grid .fc-event.fc-not-start:before {\n    content: \"...\";\n  }\n\n  /* time */\n  /* undo a previous declaration and let the time text span to a second line */\n  .fc-time-grid .fc-event .fc-time {\n    white-space: normal !important;\n  }\n\n  /* hide the the time that is normally displayed... */\n  .fc-time-grid .fc-event .fc-time span {\n    display: none;\n  }\n\n  /* ...replace it with a more verbose version (includes AM/PM) stored in an html attribute */\n  .fc-time-grid .fc-event .fc-time:after {\n    content: attr(data-full);\n  }\n\n  /* Vertical Scroller & Containers\n  --------------------------------------------------------------------------------------------------*/\n  /* kill the scrollbars and allow natural height */\n  .fc-scroller,\n.fc-day-grid-container,\n.fc-time-grid-container {\n    /* */\n    overflow: visible !important;\n    height: auto !important;\n  }\n\n  /* kill the horizontal border/padding used to compensate for scrollbars */\n  .fc-row {\n    border: 0 !important;\n    margin: 0 !important;\n  }\n\n  /* Button Controls\n  --------------------------------------------------------------------------------------------------*/\n  .fc-button-group,\n.fc button {\n    display: none;\n    /* don't display any button-related controls */\n  }\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/@fullcalendar/daygrid/main.css":
/*!*******************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/@fullcalendar/daygrid/main.css ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* DayGridView\n--------------------------------------------------------------------------------------------------*/\n/* day row structure */\n.fc-dayGridWeek-view .fc-content-skeleton,\n.fc-dayGridDay-view .fc-content-skeleton {\n  /* there may be week numbers in these views, so no padding-top */\n  padding-bottom: 1em;\n  /* ensure a space at bottom of cell for user selecting/clicking */\n}\n\n.fc-dayGrid-view .fc-body .fc-row {\n  min-height: 4em;\n  /* ensure that all rows are at least this tall */\n}\n\n/* a \"rigid\" row will take up a constant amount of height because content-skeleton is absolute */\n.fc-row.fc-rigid {\n  overflow: hidden;\n}\n\n.fc-row.fc-rigid .fc-content-skeleton {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n}\n\n/* week and day number styling */\n.fc-day-top.fc-other-month {\n  opacity: 0.3;\n}\n\n.fc-dayGrid-view .fc-week-number,\n.fc-dayGrid-view .fc-day-number {\n  padding: 2px;\n}\n\n.fc-dayGrid-view th.fc-week-number,\n.fc-dayGrid-view th.fc-day-number {\n  padding: 0 2px;\n  /* column headers can't have as much v space */\n}\n\n.fc-ltr .fc-dayGrid-view .fc-day-top .fc-day-number {\n  float: right;\n}\n\n.fc-rtl .fc-dayGrid-view .fc-day-top .fc-day-number {\n  float: left;\n}\n\n.fc-ltr .fc-dayGrid-view .fc-day-top .fc-week-number {\n  float: left;\n  border-radius: 0 0 3px 0;\n}\n\n.fc-rtl .fc-dayGrid-view .fc-day-top .fc-week-number {\n  float: right;\n  border-radius: 0 0 0 3px;\n}\n\n.fc-dayGrid-view .fc-day-top .fc-week-number {\n  min-width: 1.5em;\n  text-align: center;\n  background-color: #f2f2f2;\n  color: #808080;\n}\n\n/* when week/day number have own column */\n.fc-dayGrid-view td.fc-week-number {\n  text-align: center;\n}\n\n.fc-dayGrid-view td.fc-week-number > * {\n  /* work around the way we do column resizing and ensure a minimum width */\n  display: inline-block;\n  min-width: 1.25em;\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/lib/css-base.js":
/*!*************************************************!*\
  !*** ./node_modules/css-loader/lib/css-base.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target, parent) {
  if (parent){
    return parent.querySelector(target);
  }
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target, parent) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target, parent);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ "./node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertAt.before, target);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	if(options.attrs.nonce === undefined) {
		var nonce = getNonce();
		if (nonce) {
			options.attrs.nonce = nonce;
		}
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function getNonce() {
	if (false) {}

	return __webpack_require__.nc;
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = typeof options.transform === 'function'
		 ? options.transform(obj.css) 
		 : options.transform.default(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ })

}]);