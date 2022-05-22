/* ----------------------------------------------------------------------------------------
	COMPONENT NAME
---------------------------------------------------------------------------------------- */

function ComponentName() {
	this.$name = $('.__component-name');
	this.len = this.$name.text().length;

	if (this.len > 6) {
		this.$name.addClass('-small');
	}
}

new ComponentName();

/* ----------------------------------------------------------------------------------------
	SHORTCUT
---------------------------------------------------------------------------------------- */

function Shortcut() {
	this.$aside = $('.__aside');
	this.$headings = $('.__h1, .__h2, .__h3');
	this.shortcuts = $('<div />', {
		'class': '__shortcuts'
	});

	var that = this;

	this.$headings.each(function(index, heading) {
		var text = $(heading).text(),
			depth = $(heading).attr('class').split('').pop(),
			link = $('<a />', {
				'class': '__shortcuts__link -depth' + depth,
				href: '#shortcut' + (index + 1),
				text: text
			});
		$(that.shortcuts[0]).append(link[0]);

		$(heading).attr('id','shortcut' + (index + 1));
	});

	this.$aside.append(this.shortcuts);

}

new Shortcut();

/* ----------------------------------------------------------------------------------------
	PREVIEW
---------------------------------------------------------------------------------------- */

function Preview() {
	this.$preview = $('.__preview');
	this.$codes = $('.__code');

	this.$codes.each(function(index, code) {
		var view = $('<div />', {
			'class': '__view',
			html: $(code).text()
		});
		
		$(code).before(view);

		if ($(code).prop('scrollHeight') < 350) {
			$(code).height($(code).prop('scrollHeight'));
		} else {
			$(code).height(350);
		}
	});
}

new Preview();