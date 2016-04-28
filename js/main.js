"use strict";
!function($, window, undefined) {
    var fileName = 'mocoConfig.json';
    function setTextarea(jsonString) {
        $('#jsonOrigin').text(jsonString);
    }
    var jsonDefault = [
        {
            "request": {},
            "response": {
                "json": {}
            }
        }
    ];
    var container = $('#mainEditor')[0];
    var options = {
        mode: 'tree',
        modes: ['tree', 'view', 'code'],
        onChange: function () {
            setTextarea(editor.getText());
        }
    };
    var editor = new JSONEditor(container, options, jsonDefault);
    setTextarea(JSON.stringify(jsonDefault));
    editor.expandAll();

    FileReaderJS.setupInput($('#loadDocument')[0], {
        readAsDefault: 'Text',
        on: {
            load: function (event, file) {
                fileName = file.name;
                editor.setText(event.target.result);
                editor.expandAll();
            }
        }
    });

    $('#saveDocument').on('click', function () {
        var blob = new Blob([editor.getText()], {type: 'application/json;charset=utf-8'});
        saveAs(blob, fileName);
    });

    //汉化
    var dict = [
        {
            'class': ['jsoneditor-type-auto', 'jsoneditor-type-array', 'jsoneditor-type-object', 'jsoneditor-type-string'],
            'en': 'Type',
            'zh': '节点类型'
        },
        {
            'class': ['jsoneditor-sort-asc', 'jsoneditor-sort-desc'],
            'en': 'Sort',
            'zh': '节点排序'
        },
        {
            'class': ['jsoneditor-sort-asc'],
            'en': 'Ascending',
            'zh': '正序'
        },
        {
            'class': ['jsoneditor-sort-desc'],
            'en': 'Descending',
            'zh': '倒序'
        },
        {
            'class': ['jsoneditor-append'],
            'en': 'Append',
            'zh': '增加节点'
        },
        {
            'class': ['jsoneditor-insert'],
            'en': 'Insert',
            'zh': '插入节点'
        },
        {
            'class': ['jsoneditor-insert'],
            'en': 'Append',
            'zh': '增加节点'
        },
        {
            'class': ['jsoneditor-duplicate'],
            'en': 'Duplicate',
            'zh': '复制节点'
        },
        {
            'class': ['jsoneditor-remove'],
            'en': 'Remove',
            'zh': '移除节点'
        }
    ];

    function translate(obj, param) {
        $(param['class']).each(function (j, cls) {
            $(obj).find('.'+cls).each(function (i, item) {
                if ($(item).html().indexOf(param['en']) != -1) $(item).html($(item).html().replace(param['en'], param['zh']));
            });
        });
    }

    $('.jsoneditor').on('DOMNodeInserted', 'td', function (event) {
        var target = $(event.target);
        if (target.hasClass('jsoneditor-contextmenu-root')) {
            $(dict).each(function(i, item) {
                translate(target, item);
            });
        }
    });
}(jQuery, window);
