var Yandex2AjaxTile = function (url, options) {
    this.url = url;
    this.options = options;
    this.events = new ymaps.event.Manager();
};

Yandex2AjaxTile.prototype = {
    /**
     * хранит список загруженных тайлов
     */
    loadedTiles: {},

    renderAt: function (context, clientBounds, animate) {
        //не загружаем данные второй раз
        if (this.loadedTiles[this.url]) {
            this._ready();
        } else {
            //посылаем запрос
            this._renderAt = clientBounds;
            jQuery.get(this.url, jQuery.proxy(this._callback, this));
        }

    },

    destroy: function () {
        //уничтожать - нечего
    },

    _callback: function (data) {
        //запоминаем что отработали и отрабатываем наверх
        this.loadedTiles[this.url] = true;
        this.options.get('ajaxCallback')(data, this.url, this._renderAt);
        this._ready();
    },

    _ready: function () {
        this.events.fire('ready', { target: this });
    },

    isReady: function () {
        return this.url in this.loadedTiles;
    }
};