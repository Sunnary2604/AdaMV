let legendState = true;
let axisState = new Map();
axisState.set('x', true);
axisState.set('y', true);
let titleState = new Map();
titleState.set('x', true);
titleState.set('y', true);

function svModify(view, viewport) {
    let viewArray = view.id.split("-");
    let viewDoor = viewArray[0];
    let viewId = viewArray[2].slice(9, viewArray[2].length);

    let viewData, viewRes;
    if (viewDoor == 'left') {
        viewData = data;
        viewRes = res;
    } else {
        viewData = rightData;
        viewRes = rightRes;
    }

    d3.select('.' + viewDoor + '-bottom-content').select(".container").selectAll("*").remove();
    let boxHeight = d3.select('.' + viewDoor + '-bottom-content').style('height');
    let titleHeight = d3.select('#' + viewDoor + '-bottom-title').style('height');
    let containerHeight = parseFloat(boxHeight) - parseFloat(titleHeight);

    let container = d3.select('.' + viewDoor + '-bottom-content').select(".container")
        .style('flex-direction', 'row').style('width', "100%").style('height', containerHeight + 'px')
        .style('padding-left', 0).style('padding-right', 0).style('padding-top', '10px').style('padding-bottom', '10px');
    let cBox1 = container.append('div').style('width', '33%').style('height', '100%')
        .style('float', 'left').style('border-right', '1px solid #bebdbe');
    bbox1(cBox1, viewId, viewData, viewRes);

    if (viewRes[parseInt(viewId)].hasOwnProperty('layer')) {
        let cBox2 = container.append('div').style('width', '33%').style('height', '100%')
            .style('float', 'left').style('border-right', '1px solid #bebdbe');
        legend(cBox2, viewRes, viewId, view, viewDoor);

    } else if (viewRes[parseInt(viewId)]['mark']['type'] != 'text') {
        let cBox2 = container.append('div').style('width', '33%').style('height', '100%')
            .style('float', 'left').style('border-right', '1px solid #bebdbe');
        let cBox3 = container.append('div').style('width', '33%').style('height', '100%').style('float', 'left');
        if (viewRes[parseInt(viewId)]['config'].hasOwnProperty('legend')) {
            legend(cBox2, viewRes, viewId, view, viewDoor);
        }

        bbox2(cBox2, viewRes, view, viewId, viewDoor, 'x', 'axisX', viewport, viewData);
        bbox2(cBox3, viewRes, view, viewId, viewDoor, 'y', 'axisY', viewport, viewData);
    }
}

function legend(cBox3, viewRes, viewId, view, viewDoor) {
    cBox3.append('div').attr('class', 'cRow total-span-title')
        .text('Legend');
    let cBox31 = cBox3.append('div').attr('class', 'cRow');
    cBox31.append('span').attr('class', 'span-title').text('display:');
    cBox31.append('div').style('width', '50%').style('margin-left', '5px').attr('id', 'legend_On_off'+viewDoor);
    $("#legend_On_off"+viewDoor).append("<div class=\"form-check form-switch\">\n" +
        "  <input class=\"form-check-input legend_switch"+viewDoor+"\" type=\"checkbox\" checked>\n" +
        "</div>");

    $('.legend_switch'+viewDoor).click(function () {
        if (viewRes[parseInt(viewId)]['encoding'].hasOwnProperty('color')) {
            if (legendState) {
                viewRes[parseInt(viewId)]['encoding']['color']['legend'] = null;
            } else {
                delete viewRes[parseInt(viewId)]['encoding']['color']['legend'];
            }

        } else if (viewRes[parseInt(viewId)]['encoding'].hasOwnProperty('size')) {
            if (legendState) {
                viewRes[parseInt(viewId)]['encoding']['size']['legend'] = null;
            } else {
                delete viewRes[parseInt(viewId)]['encoding']['size']['legend'];
            }

        }
        legendState = !legendState;
        vegaEmbed('#' + view.id, viewRes[parseInt(viewId)], {renderer: 'svg'});
    });


    let cBox33 = cBox3.append('div').attr('class', 'cRow');
    cBox33.append('span').attr('class', 'span-title').text('orient:');

    let legendSelect = cBox33.append('select').attr('class', 'span-content')
        .attr('id', viewDoor + 'orientLegend');
    let orientPosition = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
    let orientLegendDefault = 'top-left';
    if (viewRes[parseInt(viewId)]['config']['legend'].hasOwnProperty('orient')) {
        orientLegendDefault = viewRes[parseInt(viewId)]['config']['legend']['orient'];
    }

    for (let i = 0; i < orientPosition.length; i++) {
        let legendSelectItem = legendSelect.append('option').attr('value', orientPosition[i])
            .text(orientPosition[i]);
        if (orientPosition[i] == orientLegendDefault) {
            legendSelectItem.attr("selected", true);
        }
    }
    $("#" + viewDoor + "orientLegend").change(function () {
        if (viewRes[parseInt(viewId)]['encoding'].hasOwnProperty('color')) {
            if (viewRes[parseInt(viewId)]['encoding']['color'].hasOwnProperty('legend')) {
                viewRes[parseInt(viewId)]['encoding']['color']['legend']["orient"] = $(this).children('option:selected').val();
            } else {
                viewRes[parseInt(viewId)]['encoding']['color']['legend'] = {"orient": $(this).children('option:selected').val()};
            }
        } else if (viewRes[parseInt(viewId)]['encoding'].hasOwnProperty('size')) {
            if (viewRes[parseInt(viewId)]['encoding']['size'].hasOwnProperty('legend')) {
                viewRes[parseInt(viewId)]['encoding']['size']['legend']["orient"] = $(this).children('option:selected').val();
            } else {
                viewRes[parseInt(viewId)]['encoding']['size']['legend'] = {"orient": $(this).children('option:selected').val()};
            }
        }
        viewRes[parseInt(viewId)]['config']['legend']['orient'] = $(this).children('option:selected').val();
        vegaEmbed('#' + view.id, viewRes[parseInt(viewId)], {renderer: 'svg'});
    });

}

function bbox2(cBox2, viewRes, view, viewId, viewDoor, axis, AXIS, viewport, viewData) {
    let texHeight = cBox2.append('div').attr('class', 'cRow total-span-title')
        .text('Axis ' + axis);

    let cBox22 = cBox2.append('div').attr('class', 'cRow');
    cBox22.append('span').attr('class', 'span-title').text('display:');
    cBox22.append('div').style('width', '50%').style('margin-left', '5px').attr('id', 'Axis' + axis+viewDoor);

    $("#" + 'Axis' + axis+viewDoor).append("<div class=\"form-check form-switch\">\n" +
        "  <input class=\"form-check-input " + axis+viewDoor + "\" type=\"checkbox\" checked>\n" +
        "</div>");

    $('.' + axis+viewDoor).click(function () {
        if (axisState.get(axis)) {
            viewRes[parseInt(viewId)]['encoding'][axis]['axis'] = null;
            vegaEmbed('#' + view.id, viewRes[parseInt(viewId)], {renderer: 'svg'});
        } else {
            delete viewRes[parseInt(viewId)]['encoding'][axis]['axis'];
            vegaEmbed('#' + view.id, viewRes[parseInt(viewId)], {renderer: 'svg'});
            textWrap(viewId, viewData, viewDoor, viewport);
        }
        axisState.set(axis, !axisState.get(axis));
    });


    let title = cBox2.append('div').attr('class', 'cRow');

    title.append('span').text('title:')
        .attr('class', 'span-title');
    let titleInput = title.append('input')
        .attr('id', viewDoor + 'titleInput' + axis).style('width', '30%').attr('type', 'text')
        .style('height', texHeight.style('height'))
        .attr('value', function () {
            if (viewRes[parseInt(viewId)]['encoding'][axis].hasOwnProperty('title')) {
                return '';
            } else {
                return viewRes[parseInt(viewId)]['encoding'][axis]['field'];
            }
        });

    title.append('div').style('width', '10%').style('padding-left', '5px')
        .append('img').style('width', texHeight.style('height')).style('height', texHeight.style('height'))
        .attr('src', 'static/pic/confirm.png')
        .on('click', function () {
            viewRes[parseInt(viewId)]['encoding'][axis]['title'] = $('#' + viewDoor + 'titleInput' + axis).val();
            vegaEmbed('#' + view.id, viewRes[parseInt(viewId)], {renderer: 'svg'});
            textWrap(viewId, viewData, viewDoor, viewport);
        });

    title.append('div').style('width', '10%').style('padding-left', '5px').style('padding-right', '5px')
        .append('img').style('width', texHeight.style('height')).style('height', texHeight.style('height'))
        .attr('src', 'static/pic/cancel.png').on('click', function () {
        viewRes[parseInt(viewId)]['encoding'][axis]['title'] = null;
        vegaEmbed('#' + view.id, viewRes[parseInt(viewId)], {renderer: 'svg'});
        textWrap(viewId, viewData, viewDoor, viewport);
    });

    let label = cBox2.append('div').attr('class', 'cRow total-span-title subtotal-span-title').text('label');
    let label1 = cBox2.append('div').attr('class', 'cRow');
    label1.append('span').text('display').attr('class', 'span-title');
    label1.append('div').style('width', '50%').style('margin-left', '5px').attr('id', 'title' + axis+viewDoor);
    $('#title' + axis+viewDoor).append("<div class=\"form-check form-switch\">\n" +
        "  <input class=\"form-check-input title" + axis+viewDoor + "\" type=\"checkbox\" checked>\n" +
        "</div>");
    $('.title' + axis+viewDoor).click(function () {
        if (titleState.get(axis)) {
            axisLabel(viewRes, viewId, axis, view, false);
        } else {
            axisLabel(viewRes, viewId, axis, view, true);
            textWrap(viewId, viewData, viewDoor, viewport);
        }
        titleState.set(axis, !titleState.get(axis));

    });


    let label3 = cBox2.append('div').attr('class', 'cRow');
    label3.append('span').style('width', '50%').text('orient:')
        .style('text-align', 'right').style('margin-right', '5px');

    let labelSelect = label3.append('select').style('width', '50%').attr('id', viewDoor + 'orient' + axis);
    let orientAngle = [-90, -45, -30, 0, 30, 45, 90];
    let orientDefault = 0;
    if (viewRes[parseInt(viewId)]['config'][AXIS].hasOwnProperty('labelAngle')) {
        orientDefault = viewRes[parseInt(viewId)]['config'][AXIS]['labelAngle'];
    }
    for (let i = 0; i < orientAngle.length; i++) {
        let labelSelectItem = labelSelect.append('option').attr('value', orientAngle[i])
            .text(orientAngle[i]);
        if (orientAngle[i] == orientDefault) {
            labelSelectItem.attr("selected", true);
        }
    }
    $("#" + viewDoor + "orient" + axis).click(function () {
        if (viewRes[parseInt(viewId)]['encoding'][axis].hasOwnProperty('axis')) {
            viewRes[parseInt(viewId)]['encoding'][axis]['axis']["labelAngle"] = parseInt($(this).children('option:selected').val());
        } else {
            viewRes[parseInt(viewId)]['encoding'][axis]['axis'] = {"labelAngle": parseInt($(this).children('option:selected').val())};
        }
        if (viewRes[parseInt(viewId)]['config'][AXIS].hasOwnProperty('labelAngle')) {
            viewRes[parseInt(viewId)]['config'][AXIS]['labelAngle'] = parseInt($(this).children('option:selected').val());
        }
        vegaEmbed('#' + view.id, viewRes[parseInt(viewId)], {renderer: 'svg'});
    });
}

function axisLabel(viewRes, viewId, axis, view, flag) {
    if (viewRes[parseInt(viewId)]['encoding'][axis].hasOwnProperty('axis')) {
        viewRes[parseInt(viewId)]['encoding'][axis]['axis']["labels"] = flag;
    } else {
        viewRes[parseInt(viewId)]['encoding'][axis]['axis'] = {'labels': flag};
    }

    vegaEmbed('#' + view.id, viewRes[parseInt(viewId)], {renderer: 'svg'});
}

function bbox1(cBox1, viewId, viewData, viewRes) {
    //cBox1 bounding box, view type
    let cBox11 = cBox1.append('div').attr('class', 'cRow total-span-title').text('View Type');

    let cBox13 = cBox1.append('div').attr('class', 'cRow');
    cBox13.append('span').attr('class', 'span-title').text('mark:');
    if (viewRes[parseInt(viewId)].hasOwnProperty('layer')) {
        cBox13.append('span').attr('class', 'span-content')
            .text('map');
    } else {
        cBox13.append('span')
            .attr('class', 'span-content')
            .text(viewRes[parseInt(viewId)]['mark']['type']);
    }


    let cBox12 = cBox1.append('div').attr('class', 'cRow total-span-title').text('Bounding Box');


    let deviceWidth = viewData['Modality']['Size']['width'];
    let deviceHeight = viewData['Modality']['Size']['height'];
    let bboxValues = viewData['Interface'][parseInt(viewId)]['BoundingBox'];
    let bboxValue = [parseInt(bboxValues['CenterPosition']['x'] * deviceWidth), parseInt(bboxValues['CenterPosition']['y'] * deviceHeight),
        parseInt(bboxValues['Size']['width'] * deviceWidth), parseInt(bboxValues['Size']['height'] * deviceHeight)];
    let bbox = ['center x', 'center y', 'width', 'height'];
    for (let i = 0; i < bbox.length; i++) {
        let cBox121 = cBox1.append('div').attr('class', 'cRow');

        cBox121.append('span').attr('class', 'span-title').text(bbox[i] + ':');
        cBox121.append('span')
            .attr('class', 'span-content')
            .text(bboxValue[i].toString());

    }
}


function textWrap(i, data, idDoor, viewport) {
    setTimeout(function () {
            let adjustment;
            adjustment = judge(i, data, idDoor + "-middle-content1", viewport);
            if (adjustment.x.iflinebreak) {
                correct_label(i, idDoor + "-middle-content1");
            }
        },
        200
    );


}
