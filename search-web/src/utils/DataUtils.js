import lodash from 'lodash';
export function jsonToArray(_jsonArr, rowName, columnName, valueName) {

    let columnsArr = [];
    let columnsObj = {};
    let rowsArr = [];
    let rowsObj = {};

    columnsArr.push(rowName);

    let i = 1;
    let j = 1;
    for (let index = 0; index < _jsonArr.length; index++) {

        const element = _jsonArr[index];
        let _rowName = element[rowName];
        let _columnName = element[columnName];

        if (!rowsObj[_rowName]) {
            rowsObj[_rowName] = i;
            rowsArr[i] = _rowName;
            i = i + 1;
        }
        if (!columnsObj[_columnName]) {
            columnsObj[_columnName] = j;
            columnsArr[j] = _columnName;
            j = j + 1;
        }
    }


    let res = [];
    res.push(columnsArr);
    for (let index = 1; index < rowsArr.length; index++) {
        const element = rowsArr[index];
        res[index] = new Array(columnsArr.length);
        res[index][0] = rowsArr[index];
    }

    for (let index = 0; index < _jsonArr.length; index++) {
        const element = _jsonArr[index];
        let _i = rowsObj[element[rowName]];
        let _j = columnsObj[element[columnName]];
        res[_i][_j] = element[valueName];
    }
    if (res.length > 1) {
        for (let i = 0; i < res.length; i++) {
            for (let j = 0; j < res[i].length; j++) {
                if (!res[i][j]) res[i][j] = 0;
            }
        }
    }

    return res;
}

export function getColumnArrByIndex(arr, columnIndex) {
    let resArr = [];
    let _obj;
    for (let index = 0; index < arr.length; index++) {
        if (arr[index][columnIndex]) _obj = arr[index][columnIndex]
        else _obj = '';
        resArr.push(_obj);
    }
    return resArr;
}

export function colorHexToRgba(hex, toumingdu) { //十六进制转为RGB
    let rgb = []; // 定义rgb数组
    if (/^\#[0-9A-F]{3}$/i.test(hex)) { //判断传入是否为#三位十六进制数
        let sixHex = '#';
        hex.replace(/[0-9A-F]/ig, function (kw) {
            sixHex += kw + kw; //把三位16进制数转化为六位
        });
        hex = sixHex; //保存回hex
    }

    if (/^#[0-9A-F]{6}$/i.test(hex)) { //判断传入是否为#六位十六进制数
        hex.replace(/[0-9A-F]{2}/ig, function (kw) {
            rgb.push(eval('0x' + kw)); //十六进制转化为十进制并存如数组
        });
        return 'rgba(' + rgb.join(',') + ',' + toumingdu + ')'; //输出RGB格式颜色
    } else {
        console.log('Input ${hex} is wrong!');
        return 'rgb(0,0,0,0)';
    }
}

export function getColorArr(color){
    let colorArr = [];
    if (/^(rgba|RGBA)/.test(color)) {
        colorArr = color.replace(/(?:\(|\)|rgba|RGBA)*/g, "").split(",");
    } else if (lodash.startsWith(color,'#')) {
        colorArr.push( lodash.parseInt(color.substr(1,2),16) );
        colorArr.push( lodash.parseInt(color.substr(3,2),16) );
        colorArr.push( lodash.parseInt(color.substr(5,2),16) );
        colorArr.push( 1 );
    } else if (/^(rgb|RGB)/.test(color)) {
        colorArr = color.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
        colorArr.push( 1 );
    }
    return colorArr;
}

export function gradientColor(startColor, endColor, step) { //开始颜色 结束颜色 分几段
    let startColorArr = getColorArr(startColor);
    let endColorArr = getColorArr(endColor);

    let _nc = (_sc,_ec,n) => {
        return _sc + (_ec-_sc)/step*n;
    }

    let colorRes = []
    colorRes.push(startColor);
    if (step>2) {
        let _step = step-2;
        for (let i = 0; i < _step; i++) {
            let _c1 = lodash.round(_nc(lodash.parseInt(startColorArr[0]),lodash.parseInt(endColorArr[0]),i+1));
            let _c2 = lodash.round(_nc(lodash.parseInt(startColorArr[1]),lodash.parseInt(endColorArr[1]),i+1));
            let _c3 = lodash.round(_nc(lodash.parseInt(startColorArr[2]),lodash.parseInt(endColorArr[2]),i+1));
            let _c4 = lodash.round(_nc(parseFloat(startColorArr[3]),parseFloat(endColorArr[3]),i+1),2);
            let _resColor = 'rgba('+_c1+','+_c2+','+_c3+','+_c4+')';
            colorRes.push(_resColor);
        }
    }
    colorRes.push(endColor);
    return colorRes;
}

export function getLineJianbian(x, y, x2, y2, colorArr) {
    let _colorStops = [];
    let stop = Math.round(1 / colorArr.length * 100) / 100;
    if (!colorArr || colorArr.length == 0) return '#000000';
    _colorStops.push({
        offset: 0, color: colorArr[0]
    });
    for (let i = 1; i < colorArr.length - 1; i++) {
        _colorStops.push({
            offset: i * stop, color: colorArr[i]
        });
    }
    _colorStops.push({
        offset: 1, color: colorArr[colorArr.length - 1]
    });
    let color = {
        type: 'linear',
        x: x || 0,
        y: y || 0,
        x2: x2 || 0,
        y2: y2 || 1,
        colorStops: _colorStops,
        globalCoord: false // 缺省为 false
    }
    return color;
}

export function getJsonToArrayWithCastName(_data, rowName, columnName, valueName, castJson) {
    let _rowName, _columnName, _valueName;

    if (castJson[rowName] && castJson[rowName].toString().trim() != '') _rowName = castJson[rowName]
    else _rowName = rowName;

    if (castJson[columnName] && castJson[columnName].toString().trim() != '') _columnName = castJson[columnName]
    else _columnName = columnName;

    if (castJson[valueName] && castJson[valueName].toString().trim() != '') _valueName = castJson[valueName]
    else _valueName = valueName;
    return jsonToArray(_data, _rowName, _columnName, _valueName);
}

// 处理数据，替换数据属性名称
export function castJson(data, castFileds) {
    let _data = data;

    let _castFileds = {};
    for (let key in castFileds) {
        _castFileds[castFileds[key]] = key;
    }
    let newDataJson = [];
    for (let index in _data) {
        let _json = {};
        // let _json = _data[index];
        for (let key in _data[index]) {
            let value = _data[index][key];
            let newName = _castFileds[key] || key;
            if (newName) {
                _json[newName] = value;
                // delete _json[key];
            }
        }
        newDataJson.push(_json);
    }
    return newDataJson;
}

let geoJsonUrl = 'http://echarts.baidu.com/echarts2/doc/example/geoJson/china-main-city/650100.json'