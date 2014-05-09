/*! TableMaker */
(function() {
	TableMaker = function (columns, options) {    var cls = arguments.callee;
    if (!(this instanceof cls)) {
        return new cls(columns, options);
    }
    this.__init__(columns, options);
};

TableMaker.prototype = {

	__class__: TableMaker,
    
	__init__: function (columns, options) {
		this.columns = columns;
		this.elements = 0;
		
		this.options = $.extend({}, {
			columnClass: "tm_td",
			rowClass: "tm_tr",
			tableClass: "tm_table"
		}, options || {});
		
		this.html = "<table class='" + this.options.tableClass + "'>";
	},
	
	add: function(elementHTML)
	{
		if (this.elements % this.columns == 0)
		{
			this.html += "<tr class='" + this.options.rowClass + "'>";
		}
		this.html += "<td class='" + this.options.columnClass + "'>";
		this.html += elementHTML;
		this.html += "<td>";
		
		this.elements++;
		if (this.elements % this.columns == 0)
		{
			this.html += "</tr>";
		}
	},
	
	close: function()
	{
		this.html += "</tr>";
		this.html += "</table>";
		return this.html;
	}
	
}
})();
